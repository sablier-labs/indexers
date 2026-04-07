import * as EntityAction from "./entity-action.js";
import * as EntityBatch from "./entity-batch.js";
import * as EntityBatcher from "./entity-batcher.js";
import * as EntityStream from "./entity-stream.js";
import * as ShapeInference from "./shape-inference.js";

export const Store = {
  Action: EntityAction,
  Batch: EntityBatch,
  Batcher: EntityBatcher,
  ShapeInference,
  Stream: EntityStream,
};
