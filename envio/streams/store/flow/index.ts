import * as EntityBatch from "./entity-batch.js";
import * as EntityBatcher from "./entity-batcher.js";
import * as EntityStream from "./entity-stream.js";

export const Store = {
  Batch: EntityBatch,
  Batcher: EntityBatcher,
  Stream: EntityStream,
};
