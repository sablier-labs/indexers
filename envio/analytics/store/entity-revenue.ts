import { sablier } from "sablier";
import { tangle } from "sablier/dist/chains";
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { FEB_3_2025 } from "../../common/constants";
import { getDate, getDateTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { fetchCryptoPrice, fetchGBPExchangeRate } from "../effects";
import { Id } from "../helpers";

// Testnet ETH doesn't have value, and TNT is not transferable.
const TESTNETS = sablier.chains.getTestnets();
const EXCLUDED_CHAINS = [...TESTNETS.map((c) => c.id), tangle.id];

type LoadedEntities = {
  revenue: Entity.Revenue | undefined;
  revenueTx: Entity.RevenueTransaction | undefined;
  revenueId: string;
  revenueTxId: string;
};

/**
 * The `Revenue` entity aggregates revenues by date.
 * The `RevenueTransaction` entity tracks particular revenue transactions.
 * @see {@link: file://./../schema.graphql}
 */
export async function createOrUpdate(context: HandlerContext, event: Envio.Event): Promise<void> {
  // Check for excluded chains.
  if (EXCLUDED_CHAINS.includes(event.chainId)) {
    return;
  }

  // We started charging fees on 2025-02-03, see https://x.com/Sablier/status/1879564876122906829
  if (event.block.timestamp < FEB_3_2025) {
    return;
  }

  // Revenues are charged via `msg.value`.
  const msgValue = Number(formatEther(event.transaction.value));
  if (msgValue === 0) {
    return;
  }

  // Load and validate entities. If the revenue transaction already exists, we stop here.
  const entities = await loadEntities(context, event);
  if (context.isPreload || entities.revenueTx) {
    return;
  }

  const date = getDate(event.block.timestamp);
  const chain = sablier.chains.getOrThrow(event.chainId);
  const currency = chain.nativeCurrency.symbol;
  if (!fetchCryptoPrice[currency]) {
    context.log.error("No fetchPrice effect found for currency", { currency, event });
    return;
  }

  // Fetch the USD price of the native currency and the GBP exchange rate.
  const priceUSD = await context.effect(fetchCryptoPrice[currency], date);
  const gbpExchangeRate = await context.effect(fetchGBPExchangeRate, date);

  // Calculate fiat values.
  const usdValue = priceUSD * msgValue;
  const gbpValue = usdValue / gbpExchangeRate;

  // Update revenue entities.
  await upsertRevenue(context, entities, event, { currency, date, gbpValue, msgValue, usdValue });

  // Create revenue transaction entities.
  await createRevenueTx(context, entities, event, { currency, gbpValue, msgValue, usdValue });
}

async function createRevenueTx(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; gbpValue: number; msgValue: number; usdValue: number },
): Promise<void> {
  const { revenueTxId, revenueId } = entities;
  const { currency, gbpValue, msgValue, usdValue } = params;

  const revenueTx: Entity.RevenueTransaction = {
    amount: msgValue,
    block: BigInt(event.block.number),
    currency,
    hash: event.transaction.hash,
    id: revenueTxId,
    revenue_id: revenueId,
    timestamp: BigInt(event.block.timestamp),
    valueGBP: gbpValue,
    valueUSD: usdValue,
  };

  context.RevenueTransaction.set(revenueTx);
}

async function loadEntities(context: HandlerContext, event: Envio.Event): Promise<LoadedEntities> {
  const revenueId = Id.revenue(event.chainId, event.block.timestamp);
  const revenueTxId = Id.revenueTransaction(revenueId, event.transaction.hash);

  const [revenue, revenueTx] = await Promise.all([
    context.Revenue.get(revenueId),
    context.RevenueTransaction.get(revenueTxId),
  ]);

  return {
    revenue,
    revenueId,
    revenueTx,
    revenueTxId,
  };
}

async function upsertRevenue(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { currency: string; date: string; gbpValue: number; msgValue: number; usdValue: number },
): Promise<void> {
  let { revenue } = entities;
  const { revenueId } = entities;
  const { currency, date, gbpValue, msgValue, usdValue } = params;

  if (!revenue) {
    // Create new revenue entity
    revenue = {
      amount: msgValue,
      chainId: BigInt(event.chainId),
      currency,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: revenueId,
      valueGBP: gbpValue,
      valueUSD: usdValue,
    };
  } else {
    // Update existing revenue entity
    revenue = {
      ...revenue,
      amount: revenue.amount + msgValue,
      valueGBP: revenue.valueGBP + gbpValue,
      valueUSD: revenue.valueUSD + usdValue,
    };
  }

  context.Revenue.set(revenue);
}
