/**
 * @see {@link: file://./../schema.graphql}
 */

import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { getDate, getDateTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

type Params = {
  admin: string;
  airdropCampaign: string | undefined;
  amount: bigint;
  protocol: Sablier.Protocol;
};

type LoadedEntities = {
  feeCollectionDaily: Entity.FeeCollectionDaily | undefined;
  feeCollectionDailyId: string;
  feeCollectionTransaction: Entity.FeeCollectionTransaction | undefined;
  feeCollectionTransactionId: string;
};

export async function create(context: HandlerContext, event: Envio.Event, params: Params): Promise<void> {
  const { admin, airdropCampaign, amount, protocol } = params;

  const chain = sablier.chains.getOrThrow(event.chainId);
  const currency = chain.nativeCurrency.symbol;

  // Load entities
  const entities = await loadEntities(context, event, currency, protocol);

  // If preload or transaction already exists, return early
  if (context.isPreload || entities.feeCollectionTransaction) {
    return;
  }

  const amountFormatted = Number(formatEther(amount));

  // Update daily aggregates
  upsertFeeCollectionDaily(context, entities, event, { amountFormatted, currency, protocol });

  // Create transaction entity
  const transaction: Entity.FeeCollectionTransaction = {
    admin: admin.toLowerCase(),
    airdropCampaign: airdropCampaign?.toLowerCase(),
    amount: amountFormatted,
    block: BigInt(event.block.number),
    caller: event.transaction.from?.toLowerCase() || "",
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress.toLowerCase(),
    currency,
    feeCollectionDaily_id: entities.feeCollectionDailyId,
    hash: event.transaction.hash,
    id: entities.feeCollectionTransactionId,
    logIndex: BigInt(event.logIndex),
    protocol,
    timestamp: getDateTimestamp(event.block.timestamp),
  };

  context.FeeCollectionTransaction.set(transaction);
}

async function loadEntities(
  context: HandlerContext,
  event: Envio.Event,
  currency: string,
  protocol: string,
): Promise<LoadedEntities> {
  const feeCollectionDailyId = Id.feeCollectionDaily(event.chainId, event.block.timestamp, currency, protocol);
  const feeCollectionTransactionId = Id.feeCollectionTransaction(event.chainId, event.transaction.hash, event.logIndex);

  const [feeCollectionDaily, feeCollectionTransaction] = await Promise.all([
    context.FeeCollectionDaily.get(feeCollectionDailyId),
    context.FeeCollectionTransaction.get(feeCollectionTransactionId),
  ]);

  return {
    feeCollectionDaily,
    feeCollectionDailyId,
    feeCollectionTransaction,
    feeCollectionTransactionId,
  };
}

function upsertFeeCollectionDaily(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { amountFormatted: number; currency: string; protocol: string },
): void {
  let { feeCollectionDaily } = entities;
  const { feeCollectionDailyId } = entities;
  const { amountFormatted, currency, protocol } = params;

  const date = getDate(event.block.timestamp);

  if (!feeCollectionDaily) {
    feeCollectionDaily = {
      amount: amountFormatted,
      chainId: BigInt(event.chainId),
      currency,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: feeCollectionDailyId,
      protocol,
    };
  } else {
    feeCollectionDaily = {
      ...feeCollectionDaily,
      amount: feeCollectionDaily.amount + amountFormatted,
    };
  }

  context.FeeCollectionDaily.set(feeCollectionDaily);
}
