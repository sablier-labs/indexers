// biome-ignore-all assist/source/organizeImports: grouped exports

// Context
import type { HandlerContext } from "./bindings/src/Types.js";
export namespace Context {
  export type Handler = HandlerContext;
}

// Contracts
import {
  SablierFlow_v1_0,
  SablierFlow_v1_1,
  SablierFlow_v2_0,
  SablierFlow_v3_0,
  SablierLockup_v2_0,
  SablierLockup_v3_0,
  SablierLockup_v4_0,
  SablierV2LockupDynamic_v1_0,
  SablierV2LockupDynamic_v1_1,
  SablierV2LockupDynamic_v1_2,
  SablierV2LockupLinear_v1_0,
  SablierV2LockupLinear_v1_1,
  SablierV2LockupLinear_v1_2,
  SablierV2LockupTranched_v1_2,
  USDC as USDC_Contract,
} from "./bindings/src/Indexer.gen.js";
export namespace Contract {
  // Flow
  export const Flow_v1_0 = SablierFlow_v1_0;
  export const Flow_v1_1 = SablierFlow_v1_1;
  export const Flow_v2_0 = SablierFlow_v2_0;
  export const Flow_v3_0 = SablierFlow_v3_0;
  // Lockup
  export const Lockup_v2_0 = SablierLockup_v2_0;
  export const Lockup_v3_0 = SablierLockup_v3_0;
  export const Lockup_v4_0 = SablierLockup_v4_0;
  export const LockupDynamic_v1_0 = SablierV2LockupDynamic_v1_0;
  export const LockupDynamic_v1_1 = SablierV2LockupDynamic_v1_1;
  export const LockupDynamic_v1_2 = SablierV2LockupDynamic_v1_2;
  export const LockupLinear_v1_0 = SablierV2LockupLinear_v1_0;
  export const LockupLinear_v1_1 = SablierV2LockupLinear_v1_1;
  export const LockupLinear_v1_2 = SablierV2LockupLinear_v1_2;
  export const LockupTranched_v1_2 = SablierV2LockupTranched_v1_2;
  // USDC
  export const USDC = USDC_Contract;
}

// Enums
import type { Enum as EnumLookup } from "./bindings/src/Types.js";
export namespace Enum {
  export type FlowActionCategory = EnumLookup<"FlowActionCategory">;
  export type LockupActionCategory = EnumLookup<"LockupActionCategory">;
  export type LockupStreamCategory = EnumLookup<"LockupStreamCategory">;
  export type ShapeSource = EnumLookup<"ShapeSource">;
}

// Entities
import type {
  Asset as EntityAsset,
  Contract as EntityContract,
  DeprecatedStream as EntityDeprecatedStream,
  FlowAction as EntityFlowAction,
  FlowBatch as EntityFlowBatch,
  FlowBatcher as EntityFlowBatcher,
  FlowStream as EntityFlowStream,
  LockupAction as EntityLockupAction,
  LockupBatch as EntityLockupBatch,
  LockupBatcher as EntityLockupBatcher,
  LockupStream as EntityLockupStream,
  Segment as EntitySegment,
  Sponsor as EntitySponsor,
  Sponsorship as EntitySponsorship,
  Tranche as EntityTranche,
  Watcher as EntityWatcher,
} from "./bindings/src/Types.js";

export namespace Entity {
  // Shared
  export type Asset = EntityAsset;
  export type Contract = EntityContract;
  export type DeprecatedStream = EntityDeprecatedStream;
  export type Watcher = EntityWatcher;
  // Flow
  export type FlowAction = EntityFlowAction;
  export type FlowBatch = EntityFlowBatch;
  export type FlowBatcher = EntityFlowBatcher;
  export type FlowStream = EntityFlowStream;
  // Lockup
  export type LockupAction = EntityLockupAction;
  export type LockupBatch = EntityLockupBatch;
  export type LockupBatcher = EntityLockupBatcher;
  export type LockupStream = EntityLockupStream;
  export type Segment = EntitySegment;
  export type Sponsor = EntitySponsor;
  export type Sponsorship = EntitySponsorship;
  export type Tranche = EntityTranche;
}
