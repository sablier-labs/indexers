import type { Envio } from "../../common/bindings";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";
import { update as updateBatcher } from "./entity-batcher";

export function create(event: Envio.Event, sender: Envio.Address): Entity.Batch {
  const id = Id.batch(event, sender);
  const batch: Entity.Batch = {
    batcher_id: undefined,
    hash: undefined,
    id,
    position: 0n,
    size: 0n,
    timestamp: undefined,
  };
  return batch;
}

/**
 * This function may be run multiple times within the same transaction:
 *
 * 1. For the 1st stream, only the size is updated.
 * 2. For the 2nd stream, all fields are set to signal the existence of the batch.
 * 3. For the 3rd stream and later, only the size is updated.
 *
 * The rationale is that creating the batch entity makes sense only if there are at least 2 streams.
 */
export function update(
  context: Context.Handler,
  event: Envio.Event,
  batch: Entity.Batch,
  batcher: Entity.Batcher
): void {
  const newBatchSize = batch.size + 1n;

  if (newBatchSize === 2n) {
    const updatedBatcher = updateBatcher(context, batcher);
    const updatedBatch: Entity.Batch = {
      ...batch,
      batcher_id: batcher.id,
      hash: event.transaction.hash,
      position: updatedBatcher.batchCounter,
      size: newBatchSize,
      timestamp: BigInt(event.block.timestamp),
    };
    context.Batch.set(updatedBatch);
  } else {
    const updatedBatch: Entity.Batch = {
      ...batch,
      size: newBatchSize,
    };
    context.Batch.set(updatedBatch);
  }
}
