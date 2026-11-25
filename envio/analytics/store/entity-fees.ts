/**
 * @see {@link: file://./../analytics.graphql}
 */
import { sablier } from "sablier";
import { gnosis } from "sablier/evm/chains";
import { formatEther, parseUnits } from "viem";
import type { Envio } from "../../common/bindings.js";
import { FEB_03_2025 } from "../../common/constants.js";
import { getDate, getDateTimestamp, getTimestamp } from "../../common/time.js";
import type { Entity, HandlerContext } from "../bindings.js";
import { coinConfigs } from "../effects/coingecko.js";
import { fetchGBPExchangeRate } from "../effects/forex.js";
import { addDecimalStrings, Id, toDecimalString } from "../helpers/index.js";
// Imported directly rather than through `store/index.ts` to avoid a circular import.
import * as AirdropCampaign from "./entity-airdrop-campaign.js";
import * as FeeLedger from "./entity-fee-ledger.js";
import type { FeePolicy, ResolvedFee } from "./fee-resolver.js";
import { resolveFee } from "./fee-resolver.js";

type LoadedEntities = {
  dailyFiatFeesId: string;
  dailyFiatFees: Entity<"FiatFeesDaily"> | undefined;
  dailyCryptoFeesId: string;
  dailyCryptoFees: Entity<"CryptoFeesDaily"> | undefined;
  feeTxId: string;
  feeTx: Entity<"FeeTransaction"> | undefined;
};

/**
 * Records the native-currency fee paid to `event.srcAddress` in this event's transaction. At most one fee is recorded
 * per (transaction, contract): later events from the same contract in the same transaction are ignored before any fee
 * resolution, so they never trigger RPC calls.
 */
export async function createOrUpdate(
  context: HandlerContext,
  event: Envio.Event,
  policy: FeePolicy
): Promise<void> {
  // Check for excluded chains.
  if (FeeLedger.FEE_EXCLUDED_CHAINS.includes(event.chainId)) {
    return;
  }

  // We started charging fees on 2025-02-03, see https://x.com/Sablier/status/1879564876122906829
  if (event.block.timestamp < FEB_03_2025) {
    return;
  }

  try {
    // Load and validate entities. If the fee transaction already exists for this contract, we stop here.
    const entities = await loadEntities(context, event);
    if (entities.feeTx) {
      return;
    }

    // A campaign pays for the streams it creates but never forwards native value to Lockup, so a transaction sent to
    // a campaign cannot carry a Lockup fee.
    const to = event.transaction.to?.toLowerCase();
    if (
      to &&
      to !== event.srcAddress.toLowerCase() &&
      (await AirdropCampaign.exists(context, event.chainId, to))
    ) {
      return;
    }

    // Fees are charged via `msg.value`.
    const fee = await resolveFee(context, event, policy);
    if (!fee) {
      return;
    }
    const msgValue = formatEther(fee.amount);

    const date = getDate(event.block.timestamp);
    const chain = sablier.chains.getOrThrow(event.chainId);
    const currency = chain.nativeCurrency.symbol;
    let priceUSD = 0;

    if (event.chainId === gnosis.id) {
      // Gnosis uses xDAI as a native currency.
      priceUSD = 1;
    } else {
      const coinConfig = coinConfigs[currency];
      if (!coinConfig) {
        throw new Error(`No USD price effect configured for ${currency}`);
      }
      // Fetch the USD price of the native currency and the GBP exchange rate.
      priceUSD = await context.effect(coinConfig.effect, date);
    }
    if (!Number.isFinite(priceUSD) || priceUSD <= 0) {
      throw new Error(`Invalid USD price for ${currency} on ${date}: ${priceUSD}`);
    }

    // Fetch the GBP/USD exchange rate.
    const gbpExchangeRate = await context.effect(fetchGBPExchangeRate, date);
    if (!Number.isFinite(gbpExchangeRate) || gbpExchangeRate <= 0) {
      throw new Error(`Invalid GBP/USD exchange rate on ${date}: ${gbpExchangeRate}`);
    }

    // Calculate fiat values.
    const msgValueNum = Number(msgValue);
    const usdValue = toDecimalString(priceUSD * msgValueNum);
    const gbpValue = toDecimalString(Number(usdValue) / gbpExchangeRate);

    // Update fee entities.
    upsertFiatFeesDaily(context, entities, event, { date, gbpValue, usdValue });
    upsertCryptoFeesDaily(context, entities, event, {
      amount: fee.amount,
      currency,
      date,
      msgValue,
    });

    // Create fee transaction entities.
    createFeeTx(context, entities, event, { currency, fee, gbpValue, msgValue, usdValue });

    // Attribute the fee to the ledger it accumulates in until swept.
    if (policy.ledger !== "none") {
      const key: FeeLedger.LedgerKey =
        policy.ledger === "comptroller"
          ? { kind: "comptroller" }
          : { address: event.srcAddress, kind: "contract" };
      await FeeLedger.attribute(context, event.chainId, key, fee.amount);
    }
  } catch (error) {
    context.log.error("Failed to create or update fee entities", { error, event });
    throw error;
  }
}

function createFeeTx(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: {
    currency: string;
    fee: ResolvedFee;
    gbpValue: string;
    msgValue: string;
    usdValue: string;
  }
): void {
  const { feeTxId, dailyFiatFeesId, dailyCryptoFeesId } = entities;
  const { currency, fee, gbpValue, msgValue, usdValue } = params;

  const feeTx: Entity<"FeeTransaction"> = {
    amount: fee.amount,
    amountDisplay: msgValue,
    amountDisplayGBP: gbpValue,
    amountDisplayUSD: usdValue,
    amountGBP: parseFiatUnits(gbpValue),
    amountUSD: parseFiatUnits(usdValue),
    block: BigInt(event.block.number),
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress,
    currency,
    dailyCryptoFees_id: dailyCryptoFeesId,
    dailyFiatFees_id: dailyFiatFeesId,
    hash: event.transaction.hash,
    id: feeTxId,
    source: fee.source,
    timestamp: getTimestamp(event.block.timestamp),
  };

  context.FeeTransaction.set(feeTx);
}

async function loadEntities(context: HandlerContext, event: Envio.Event): Promise<LoadedEntities> {
  const dailyFiatFeesId = Id.dailyFiatFees(event.block.timestamp);
  const dailyCryptoFeesId = Id.dailyCryptoFees(event.chainId, event.block.timestamp);
  const feeTxId = Id.feeTransaction(event.chainId, event.transaction.hash, event.srcAddress);

  const [dailyFiatFees, dailyCryptoFees, feeTx] = await Promise.all([
    context.FiatFeesDaily.get(dailyFiatFeesId),
    context.CryptoFeesDaily.get(dailyCryptoFeesId),
    context.FeeTransaction.get(feeTxId),
  ]);

  return {
    dailyCryptoFees,
    dailyCryptoFeesId,
    dailyFiatFees,
    dailyFiatFeesId,
    feeTx,
    feeTxId,
  };
}

function upsertFiatFeesDaily(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { date: string; gbpValue: string; usdValue: string }
): void {
  let { dailyFiatFees } = entities;
  const { dailyFiatFeesId } = entities;
  const { date, gbpValue, usdValue } = params;

  if (dailyFiatFees) {
    const newGBPValue = addDecimalStrings(dailyFiatFees.amountDisplayGBP, gbpValue);
    const newUSDValue = addDecimalStrings(dailyFiatFees.amountDisplayUSD, usdValue);
    dailyFiatFees = {
      ...dailyFiatFees,
      amountDisplayGBP: newGBPValue,
      amountDisplayUSD: newUSDValue,
      amountGBP: parseFiatUnits(newGBPValue),
      amountUSD: parseFiatUnits(newUSDValue),
    };
  } else {
    dailyFiatFees = {
      amountDisplayGBP: gbpValue,
      amountDisplayUSD: usdValue,
      amountGBP: parseFiatUnits(gbpValue),
      amountUSD: parseFiatUnits(usdValue),
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyFiatFeesId,
    };
  }

  context.FiatFeesDaily.set(dailyFiatFees);
}

function upsertCryptoFeesDaily(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { amount: bigint; currency: string; date: string; msgValue: string }
): void {
  let { dailyCryptoFees } = entities;
  const { dailyCryptoFeesId } = entities;
  const { amount, currency, date, msgValue } = params;

  if (dailyCryptoFees) {
    const newAmount = dailyCryptoFees.amount + amount;
    dailyCryptoFees = {
      ...dailyCryptoFees,
      amount: newAmount,
      amountDisplay: formatEther(newAmount),
    };
  } else {
    dailyCryptoFees = {
      amount,
      amountDisplay: msgValue,
      currency,
      dailyFiatFees_id: entities.dailyFiatFeesId,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyCryptoFeesId,
    };
  }

  context.CryptoFeesDaily.set(dailyCryptoFees);
}

function parseFiatUnits(value: string): bigint {
  return parseUnits(toDecimalString(value), 2);
}
