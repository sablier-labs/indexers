/**
 * @see {@link: file://./../schema.graphql}
 */
import { sablier } from "sablier";
import { gnosis, tangle } from "sablier/dist/chains";
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { FEB_03_2025 } from "../../common/constants";
import { getDate, getDateTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { coinConfigs } from "../effects/coingecko";
import { fetchGBPExchangeRate } from "../effects/forex";
import { Id } from "../helpers";

// Testnet ETH doesn't have value, and TNT is not transferable.
const TESTNETS = sablier.chains.getTestnets();
const EXCLUDED_CHAINS = [...TESTNETS.map((c) => c.id), tangle.id];

type LoadedEntities = {
  dailyFiatFeesId: string;
  dailyFiatFees: Entity.DailyFiatFees | undefined;
  dailyCryptoFeesId: string;
  dailyCryptoFees: Entity.DailyCryptoFees | undefined;
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
  const msgValue = Number(formatEther(event.transaction.value));
  if (msgValue === 0) {
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
    let priceUSD: number = 0;

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
    const usdValue = priceUSD * msgValue;
    const gbpValue = usdValue / gbpExchangeRate;

    // Update fee entities.
    upsertDailyFiatFees(context, entities, event, { date, gbpValue, msgValue, usdValue });
    upsertDailyCryptoFees(context, entities, event, { currency, date, msgValue });

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
  params: { currency: string; gbpValue: number; msgValue: number; usdValue: number },
): void {
  const { feeTxId, dailyFiatFeesId, dailyCryptoFeesId } = entities;
  const { currency, gbpValue, msgValue, usdValue } = params;

  const feeTx: Entity.FeeTransaction = {
    amount: msgValue,
    amountGBP: gbpValue,
    amountUSD: usdValue,
    block: BigInt(event.block.number),
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress.toLowerCase(),
    currency,
    dailyCryptoFees_id: dailyCryptoFeesId,
    dailyFiatFees_id: dailyFiatFeesId,
    hash: event.transaction.hash,
    id: feeTxId,
    timestamp: getDateTimestamp(event.block.timestamp),
  };

  context.FeeTransaction.set(feeTx);
}

async function loadEntities(context: HandlerContext, event: Envio.Event): Promise<LoadedEntities> {
  const dailyFiatFeesId = Id.dailyFiatFees(event.block.timestamp);
  const dailyCryptoFeesId = Id.dailyCryptoFees(event.chainId, event.block.timestamp);
  const feeTxId = Id.feeTransaction(event.chainId, event.transaction.hash);

  const [dailyFiatFees, dailyCryptoFees, feeTx] = await Promise.all([
    context.DailyFiatFees.get(dailyFiatFeesId),
    context.DailyCryptoFees.get(dailyCryptoFeesId),
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

function upsertDailyFiatFees(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { date: string; gbpValue: number; msgValue: number; usdValue: number },
): void {
  let { dailyFiatFees } = entities;
  const { dailyFiatFeesId } = entities;
  const { date, gbpValue, usdValue } = params;

  if (!dailyFiatFees) {
    dailyFiatFees = {
      amountGBP: gbpValue,
      amountUSD: usdValue,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyFiatFeesId,
    };
  } else {
    dailyFiatFees = {
      ...dailyFiatFees,
      amountGBP: dailyFiatFees.amountGBP + gbpValue,
      amountUSD: dailyFiatFees.amountUSD + usdValue,
    };
  }

  context.DailyFiatFees.set(dailyFiatFees);
}

function upsertDailyCryptoFees(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; date: string; msgValue: number },
): void {
  let { dailyCryptoFees } = entities;
  const { dailyCryptoFeesId } = entities;
  const { currency, date, msgValue } = params;

  if (!dailyCryptoFees) {
    dailyCryptoFees = {
      amount: msgValue,
      currency,
      dailyFiatFees_id: entities.dailyFiatFeesId,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyCryptoFeesId,
    };
  } else {
    dailyCryptoFees = {
      ...dailyCryptoFees,
      amount: dailyCryptoFees.amount + msgValue,
    };
  }

  context.DailyCryptoFees.set(dailyCryptoFees);
}
