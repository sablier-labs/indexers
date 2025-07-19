import { Address, ethereum } from "@graphprotocol/graph-ts";
import { ONE, TWO } from "../../common/constants";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";
import { getOrCreateBatcher } from "./entity-batcher";

/**
 * This function may be run multiple times within the same transaction:
 *
 * 1. For the 1st stream, the Batch entity is created with a size of one and all other fields null.
 * 2. For the 2nd stream, all fields are set.
 * 3. For the 3rd stream and later, only the size is updated.
 *
 * The rationale is that creating the batch entity makes sense only if there are at least 2 streams.
 */
export function createOrUpdateBatch(event: ethereum.Event, sender: Address): Entity.Batch {
  const id = Id.batch(event, sender);
  const batcher = getOrCreateBatcher(sender);

  let batch = Entity.Batch.load(id);
  if (batch === null) {
    batch = new Entity.Batch(id);
    batch.size = ONE;
  } else {
    const hash = batch.hash;
    if (hash === null) {
      const newBatchCounter = batcher.batchCounter.plus(ONE);
      batcher.batchCounter = newBatchCounter;
      batcher.save();

      batch.batcher = batcher.id;
      batch.hash = event.transaction.hash;
      batch.position = newBatchCounter;
      batch.size = TWO;
      batch.timestamp = event.block.timestamp;
    } else {
      batch.size = batch.size.plus(ONE);
    }
  }

  batch.save();
  return batch;
}
