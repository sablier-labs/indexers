import type { Logger } from "envio";
import { sablier } from "sablier";
import { formatEther } from "viem";
import type { Envio } from "../bindings";
import type { CommonEntities } from "../entities";
import { getDate, getDateTimestamp } from "../helpers";
import { Id } from "../id";

type RevenueContext = {
  log: Logger;
  Revenue: { set: (revenue: CommonEntities.Revenue) => void };
  RevenueTransaction: {
    get: (id: string) => Promise<CommonEntities.RevenueTransaction | undefined>;
    set: (revenueTransaction: CommonEntities.RevenueTransaction) => void;
  };
};

export async function createOrUpdate(
  context: RevenueContext,
  event: Envio.Event,
  revenue?: CommonEntities.Revenue,
): Promise<void> {
  // Revenues are charged via `msg.value`.
  const msgValue = Number(formatEther(event.transaction.value));
  if (msgValue === 0) {
    return;
  }

  // Check if the revenue transaction already exists. A single transaction can emit multiple events that lead here.
  const revenueId = Id.revenue(event.chainId, event.block.timestamp);
  const revenueTxId = Id.revenueTransaction(revenueId, event.transaction.hash);
  let revenueTx = await context.RevenueTransaction.get(revenueTxId);
  if (revenueTx) {
    return;
  }

  /* --------------------------------- REVENUE -------------------------------- */
  if (revenue) {
    revenue = {
      ...revenue,
      amount: revenue.amount + msgValue,
    };
  } else {
    revenue = {
      amount: msgValue,
      chainId: BigInt(event.chainId),
      currency: sablier.chains.getOrThrow(event.chainId).nativeCurrency.symbol,
      date: getDate(event.block.timestamp),
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: revenueId,
    };
  }
  context.Revenue.set(revenue);

  /* --------------------------- REVENUE TRANSACTION -------------------------- */
  revenueTx = {
    amount: msgValue,
    block: BigInt(event.block.number),
    hash: event.transaction.hash,
    id: revenueTxId,
    revenue_id: revenueId,
    timestamp: BigInt(event.block.timestamp),
  };
  context.RevenueTransaction.set(revenueTx);
}
