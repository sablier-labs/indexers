import * as EntityAction from "./entity-action";
import * as EntityBatch from "./entity-batch";
import * as EntityBatcher from "./entity-batcher";
import * as EntityStream from "./entity-stream";
import * as ShapeInference from "./shape-inference";

export const Store = {
  Action: EntityAction,
  Batch: EntityBatch,
  Batcher: EntityBatcher,
  ShapeInference,
  Stream: EntityStream,
};
