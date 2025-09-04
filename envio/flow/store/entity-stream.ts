import type { Envio } from "../../common/bindings";
import { getContract } from "../../common/deployments";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";
import type { Params } from "../helpers/types";
import { update as updateBatch } from "./entity-batch";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.CreateEntities,
  params: Params.Create,
): Entity.Stream {
  const { asset, batch, batcher, watcher } = entities;

  const counter = watcher.streamCounter;
  const tokenId = params.tokenId;
  const now = BigInt(event.block.timestamp);
  const streamId = Id.stream(event.srcAddress, event.chainId, tokenId);
  const flow = getContract("flow", event.chainId, event.srcAddress);

  /* --------------------------------- STREAM --------------------------------- */
  const stream: Entity.Stream = {
    alias: Id.streamAlias(flow.alias, event.chainId, tokenId),
    asset_id: asset.id,
    assetDecimalsValue: asset.decimals,
    availableAmount: 0n,
    batch_id: batch.id,
    category: "Flow",
    chainId: BigInt(event.chainId),
    contract: event.srcAddress.toLowerCase(),
    creator: event.transaction.from?.toLowerCase() || "",
    depletionTime: params.startTime,
    depositedAmount: 0n,
    forgivenDebt: 0n,
    hash: event.transaction.hash,
    id: streamId,
    lastAdjustmentAction_id: undefined,
    lastAdjustmentTimestamp: params.startTime,
    paused: false,
    pausedAction_id: undefined,
    pausedTime: undefined,
    position: batch.size,
    ratePerSecond: params.ratePerSecond,
    recipient: params.recipient.toLowerCase(),
    refundedAmount: 0n,
    sender: params.sender.toLowerCase(),
    snapshotAmount: 0n,
    startTime: params.startTime,
    subgraphId: counter,
    timestamp: now,
    tokenId: tokenId,
    transferable: params.transferable,
    version: flow.version,
    voided: false,
    voidedAction_id: undefined,
    voidedTime: undefined,
    withdrawnAmount: 0n,
  };
  context.Stream.set(stream);

  /* ---------------------------------- BATCH --------------------------------- */
  updateBatch(context, event, batch, batcher);

  return stream;
}
