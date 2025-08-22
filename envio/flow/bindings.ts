// biome-ignore-all assist/source/organizeImports: grouped exports

// Context
import type { HandlerContext, LoaderContext } from "./bindings/src/Types";
export namespace Context {
  export type Handler = HandlerContext;
  export type Loader = LoaderContext;
}

// Contracts
import { SablierFlow_v1_0, SablierFlow_v1_1 } from "./bindings/src/Handlers.gen";
export namespace Contract {
  export const Flow_v1_0 = SablierFlow_v1_0;
  export const Flow_v1_1 = SablierFlow_v1_1;
}

// Enums
import type { ActionCategory_t } from "./bindings/src/db/Enums.gen";
export namespace Enum {
  export type ActionCategory = ActionCategory_t;
}

// Entities
import type {
  Action as EntityAction,
  Asset as EntityAsset,
  Batch as EntityBatch,
  Batcher as EntityBatcher,
  Stream as EntityStream,
  Watcher as EntityWatcher,
} from "./bindings/src/Types.gen";

export namespace Entity {
  export type Action = EntityAction;
  export type Asset = EntityAsset;
  export type Batch = EntityBatch;
  export type Batcher = EntityBatcher;
  export type Stream = EntityStream;
  export type Watcher = EntityWatcher;
}
