/**
 * @see {@link: file://./../analytics.graphql}
 */

import type { Sablier } from "sablier";
import { sablier } from "sablier";
import { formatEther } from "viem";
import type { Envio } from "../../common/bindings";
import { getDate, getDateTimestamp, getTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";

type Params = {
  admin: string;
  airdropCampaign: string | undefined;
  amount: bigint;
  protocol: Sablier.Protocol;
};

type LoadedEntities = {
  feeCollection: Entity.FeeCollectionDaily | undefined;
  feeCollectionId: string;
  feeCollectionTransaction: Entity.FeeCollection | undefined;
  feeCollectionTransactionId: string;
};

export async function create(context: HandlerContext, event: Envio.Event, params: Params): Promise<void> {
  const { admin, airdropCampaign, amount, protocol } = params;

  // Ignore zero-amount fee collections. This behavior is allowed in the contracts due to the
  // need to keep the contract size small.
  if (amount === 0n) {
    return;
  }

  const chain = sablier.chains.getOrThrow(event.chainId);
  const currency = chain.nativeCurrency.symbol;

  // Load entities
  const entities = await loadEntities(context, event, currency);

  // If preload or transaction already exists, return early
  if (context.isPreload || entities.feeCollectionTransaction) {
    return;
  }

  const amountFormatted = formatEther(amount);

  // Update daily aggregates
  upsertFeeCollection(context, entities, event, { amountFormatted, currency });

  // Create transaction entity
  const transaction: Entity.FeeCollection = {
    admin,
    airdropCampaign: airdropCampaign,
    amount: amountFormatted,
    block: BigInt(event.block.number),
    caller: event.transaction.from || "",
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress,
    currency,
    daily_id: entities.feeCollectionId,
    hash: event.transaction.hash,
    id: entities.feeCollectionTransactionId,
    logIndex: BigInt(event.logIndex),
    protocol,
    timestamp: getTimestamp(event.block.timestamp),
  };

  context.FeeCollection.set(transaction);
}

async function loadEntities(context: HandlerContext, event: Envio.Event, currency: string): Promise<LoadedEntities> {
  const feeCollectionId = Id.feeCollectionDaily(event.block.timestamp, currency);
  const feeCollectionTransactionId = Id.feeCollection(event.chainId, event.transaction.hash, event.logIndex);

  const [feeCollection, feeCollectionTransaction] = await Promise.all([
    context.FeeCollectionDaily.get(feeCollectionId),
    context.FeeCollection.get(feeCollectionTransactionId),
  ]);

  return {
    feeCollection,
    feeCollectionId,
    feeCollectionTransaction,
    feeCollectionTransactionId,
  };
}

function upsertFeeCollection(
  context: HandlerContext,
  entities: LoadedEntities,
  event: Envio.Event,
  params: { amountFormatted: string; currency: string },
): void {
  let { feeCollection } = entities;
  const { feeCollectionId } = entities;
  const { amountFormatted, currency } = params;

  const date = getDate(event.block.timestamp);

  if (!feeCollection) {
    feeCollection = {
      amount: amountFormatted,
      currency,
      date,
      dateTimestamp: getDateTimestamp(event.block.timestamp),
      id: feeCollectionId,
    };
  } else {
    feeCollection = {
      ...feeCollection,
      amount: (Number(feeCollection.amount) + Number(amountFormatted)).toString(),
    };
  }

  context.FeeCollectionDaily.set(feeCollection);
}
