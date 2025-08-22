// biome-ignore-all assist/source/organizeImports: grouped exports
// Context
import type { HandlerContext, LoaderContext } from "./bindings/src/Types";
export namespace Context {
  export type Handler = HandlerContext;
  export type Loader = LoaderContext;
}

// Contracts
import {
  SablierLockup_v2_0,
  SablierV2LockupDynamic_v1_0,
  SablierV2LockupDynamic_v1_1,
  SablierV2LockupDynamic_v1_2,
  SablierV2LockupLinear_v1_0,
  SablierV2LockupLinear_v1_1,
  SablierV2LockupLinear_v1_2,
  SablierV2LockupTranched_v1_2,
} from "./bindings/src/Handlers.gen";
export namespace Contract {
  export const Lockup_v2_0 = SablierLockup_v2_0;
  export const LockupDynamic_v1_0 = SablierV2LockupDynamic_v1_0;
  export const LockupDynamic_v1_1 = SablierV2LockupDynamic_v1_1;
  export const LockupDynamic_v1_2 = SablierV2LockupDynamic_v1_2;
  export const LockupLinear_v1_0 = SablierV2LockupLinear_v1_0;
  export const LockupLinear_v1_1 = SablierV2LockupLinear_v1_1;
  export const LockupLinear_v1_2 = SablierV2LockupLinear_v1_2;
  export const LockupTranched_v1_2 = SablierV2LockupTranched_v1_2;
}

// Enums
import type { ActionCategory_t, StreamCategory_t } from "./bindings/src/db/Enums.gen";
export namespace Enum {
  export type ActionCategory = ActionCategory_t;
  export type StreamCategory = StreamCategory_t;
}

// Entities
import type {
  Action as EntityAction,
  Asset as EntityAsset,
  Batch as EntityBatch,
  Batcher as EntityBatcher,
  Segment as EntitySegment,
  Stream as EntityStream,
  Tranche as EntityTranche,
  Watcher as EntityWatcher,
} from "./bindings/src/Types.gen";

export namespace Entity {
  export type Action = EntityAction;
  export type Asset = EntityAsset;
  export type Batch = EntityBatch;
  export type Batcher = EntityBatcher;
  export type Segment = EntitySegment;
  export type Stream = EntityStream;
  export type Tranche = EntityTranche;
  export type Watcher = EntityWatcher;
}
