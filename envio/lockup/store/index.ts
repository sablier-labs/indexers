import * as EntityBatch from "./entity-batch";
import * as EntityBatcher from "./entity-batcher";
import * as EntityStream from "./entity-stream";

export const Store = {
  Batch: EntityBatch,
  Batcher: EntityBatcher,
  Stream: EntityStream,
};
