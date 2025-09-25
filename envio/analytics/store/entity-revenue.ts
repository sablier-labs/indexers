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
  dailyRevenueId: string;
  dailyRevenue: Entity.DailyRevenue | undefined;
  dailyCurrencyRevenueId: string;
  dailyCurrencyRevenue: Entity.DailyCurrencyRevenue | undefined;
  revenueTxId: string;
  revenueTx: Entity.RevenueTransaction | undefined;
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

  // Revenues are charged via `msg.value`.
  const msgValue = Number(formatEther(event.transaction.value));
  if (msgValue === 0) {
    return;
  }

  try {
    // Load and validate entities. If the revenue transaction already exists, we stop here.
    const entities = await loadEntities(context, event);
    if (context.isPreload || entities.revenueTx) {
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

    // Update revenue entities.
    upsertDailyRevenue(context, entities, event, { date, gbpValue, msgValue, usdValue });
    upsertDailyCurrencyRevenue(context, entities, event, { currency, date, msgValue });

    // Create revenue transaction entities.
    createRevenueTx(context, entities, event, { currency, gbpValue, msgValue, usdValue });
  } catch (error) {
    context.log.error("Failed to create or update revenue entities", { error, event });
  }
}

function createRevenueTx(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; gbpValue: number; msgValue: number; usdValue: number },
): void {
  const { revenueTxId, dailyRevenueId, dailyCurrencyRevenueId } = entities;
  const { currency, gbpValue, msgValue, usdValue } = params;

  const revenueTx: Entity.RevenueTransaction = {
    amount: msgValue,
    amountGBP: gbpValue,
    amountUSD: usdValue,
    block: BigInt(event.block.number),
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress.toLowerCase(),
    currency,
    dailyCurrencyRevenue_id: dailyCurrencyRevenueId,
    dailyRevenue_id: dailyRevenueId,
    hash: event.transaction.hash,
    id: revenueTxId,
    timestamp: getDateTimestamp(event.block.timestamp),
  };

  context.RevenueTransaction.set(revenueTx);
}

async function loadEntities(context: HandlerContext, event: Envio.Event): Promise<LoadedEntities> {
  const dailyRevenueId = Id.dailyRevenue(event.block.timestamp);
  const dailyCurrencyRevenueId = Id.dailyCurrencyRevenue(event.chainId, event.block.timestamp);
  const revenueTxId = Id.revenueTransaction(event.chainId, event.transaction.hash);

  const [dailyRevenue, dailyCurrencyRevenue, revenueTx] = await Promise.all([
    context.DailyRevenue.get(dailyRevenueId),
    context.DailyCurrencyRevenue.get(dailyCurrencyRevenueId),
    context.RevenueTransaction.get(revenueTxId),
  ]);

  return {
    dailyCurrencyRevenue,
    dailyCurrencyRevenueId,
    dailyRevenue,
    dailyRevenueId,
    revenueTx,
    revenueTxId,
  };
}

function upsertDailyRevenue(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { date: string; gbpValue: number; msgValue: number; usdValue: number },
): void {
  let { dailyRevenue } = entities;
  const { dailyRevenueId } = entities;
  const { date, gbpValue, usdValue } = params;

  if (!dailyRevenue) {
    dailyRevenue = {
      amountGBP: gbpValue,
      amountUSD: usdValue,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyRevenueId,
    };
  } else {
    dailyRevenue = {
      ...dailyRevenue,
      amountGBP: dailyRevenue.amountGBP + gbpValue,
      amountUSD: dailyRevenue.amountUSD + usdValue,
    };
  }

  context.DailyRevenue.set(dailyRevenue);
}

function upsertDailyCurrencyRevenue(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; date: string; msgValue: number },
): void {
  let { dailyCurrencyRevenue } = entities;
  const { dailyCurrencyRevenueId } = entities;
  const { currency, date, msgValue } = params;

  if (!dailyCurrencyRevenue) {
    dailyCurrencyRevenue = {
      amount: msgValue,
      currency,
      dailyRevenue_id: entities.dailyRevenueId,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: dailyCurrencyRevenueId,
    };
  } else {
    dailyCurrencyRevenue = {
      ...dailyCurrencyRevenue,
      amount: dailyCurrencyRevenue.amount + msgValue,
    };
  }

  context.DailyCurrencyRevenue.set(dailyCurrencyRevenue);
}
