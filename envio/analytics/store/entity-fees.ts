/**
 * @see {@link: file://./../analytics.graphql}
 */
import { sablier } from "sablier";
import { gnosis, tangle } from "sablier/evm/chains";
import { formatEther, parseEther, parseUnits } from "viem";
import type { Envio } from "../../common/bindings";
import { FEB_03_2025 } from "../../common/constants";
import { getDate, getDateTimestamp, getTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { coinConfigs } from "../effects/coingecko";
import { fetchGBPExchangeRate } from "../effects/forex";
import { Id } from "../helpers";

// Testnet ETH doesn't have value, and TNT is not transferable.
const TESTNETS = sablier.chains.getTestnets();
const EXCLUDED_CHAINS = [...TESTNETS.map((c) => c.id), tangle.id];

type LoadedEntities = {
  dailyFiatFeesId: string;
  dailyFiatFees: Entity.FiatFeesDaily | undefined;
  dailyCryptoFeesId: string;
  dailyCryptoFees: Entity.CryptoFeesDaily | undefined;
  feeTxId: string;
  feeTx: Entity.FeeTransaction | undefined;
};

export async function createOrUpdate(context: HandlerContext, event: Envio.Event): Promise<void> {
  // Check for excluded chains.
  if (EXCLUDED_CHAINS.includes(event.chainId)) {
    return;
  }

  // We started charging fees on 2025-02-03, see https://x.com/Sablier/status/1879564876122906829
  if (event.block.timestamp < FEB_03_2025) {
    return;
  }

  // Fees are charged via `msg.value`.
  const msgValue = formatEther(event.transaction.value);
  if (msgValue === "0") {
    return;
  }

  try {
    // Load and validate entities. If the fee transaction already exists, we stop here.
    const entities = await loadEntities(context, event);
    if (context.isPreload || entities.feeTx) {
      return;
    }

    const date = getDate(event.block.timestamp);
    const chain = sablier.chains.getOrThrow(event.chainId);
    const currency = chain.nativeCurrency.symbol;
    let priceUSD = 0;

    if (event.chainId !== gnosis.id) {
      if (!coinConfigs[currency]) {
        context.log.error("No fetchPrice effect found for currency", { currency, event });
        return;
      }
      // Fetch the USD price of the native currency and the GBP exchange rate.
      priceUSD = await context.effect(coinConfigs[currency].effect, date);
    } else {
      // Gnosis uses xDAI as a native currency.
      priceUSD = 1;
    }

    // Fetch the GBP/USD exchange rate.
    const gbpExchangeRate = await context.effect(fetchGBPExchangeRate, date);

    // Calculate fiat values.
    const msgValueNum = Number(msgValue);
    const usdValue = (priceUSD * msgValueNum).toString();
    const gbpValue = (Number(usdValue) / gbpExchangeRate).toString();

    // Update fee entities.
    upsertFiatFeesDaily(context, entities, event, { date, gbpValue, msgValue, usdValue });
    upsertCryptoFeesDaily(context, entities, event, { currency, date, msgValue });

    // Create fee transaction entities.
    createFeeTx(context, entities, event, { currency, gbpValue, msgValue, usdValue });
  } catch (error) {
    context.log.error("Failed to create or update fee entities", { error, event });
  }
}

function createFeeTx(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; gbpValue: string; msgValue: string; usdValue: string }
): void {
  const { feeTxId, dailyFiatFeesId, dailyCryptoFeesId } = entities;
  const { currency, gbpValue, msgValue, usdValue } = params;

  const feeTx: Entity.FeeTransaction = {
    amount: event.transaction.value,
    amountDisplay: msgValue,
    amountDisplayGBP: gbpValue,
    amountDisplayUSD: usdValue,
    amountGBP: parseUnits(gbpValue, 2),
    amountUSD: parseUnits(usdValue, 2),
    block: BigInt(event.block.number),
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress,
    currency,
    dailyCryptoFees_id: dailyCryptoFeesId,
    dailyFiatFees_id: dailyFiatFeesId,
    hash: event.transaction.hash,
    id: feeTxId,
    timestamp: getTimestamp(event.block.timestamp),
  };

  context.FeeTransaction.set(feeTx);
}

async function loadEntities(context: HandlerContext, event: Envio.Event): Promise<LoadedEntities> {
  const dailyFiatFeesId = Id.dailyFiatFees(event.block.timestamp);
  const dailyCryptoFeesId = Id.dailyCryptoFees(event.chainId, event.block.timestamp);
  const feeTxId = Id.feeTransaction(event.chainId, event.transaction.hash);

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
  params: { date: string; gbpValue: string; msgValue: string; usdValue: string }
): void {
  let { dailyFiatFees } = entities;
  const { dailyFiatFeesId } = entities;
  const { date, gbpValue, usdValue } = params;

  if (dailyFiatFees) {
    const newGBPValue = (Number(dailyFiatFees.amountDisplayGBP) + Number(gbpValue)).toString();
    const newUSDValue = (Number(dailyFiatFees.amountDisplayUSD) + Number(usdValue)).toString();
    dailyFiatFees = {
      ...dailyFiatFees,
      amountDisplayGBP: newGBPValue,
      amountDisplayUSD: newUSDValue,
      amountGBP: parseUnits(newGBPValue, 2),
      amountUSD: parseUnits(newUSDValue, 2),
    };
  } else {
    dailyFiatFees = {
      amountDisplayGBP: gbpValue,
      amountDisplayUSD: usdValue,
      amountGBP: parseUnits(gbpValue, 2),
      amountUSD: parseUnits(usdValue, 2),
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
  params: { currency: string; date: string; msgValue: string }
): void {
  let { dailyCryptoFees } = entities;
  const { dailyCryptoFeesId } = entities;
  const { currency, date, msgValue } = params;

  if (dailyCryptoFees) {
    const newAmount = (Number(dailyCryptoFees.amountDisplay) + Number(msgValue)).toString();
    dailyCryptoFees = {
      ...dailyCryptoFees,
      amount: parseEther(newAmount),
      amountDisplay: newAmount,
    };
  } else {
    dailyCryptoFees = {
      amount: parseEther(msgValue),
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
