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

// Entities & Enums
export type { Entity, Enum } from "./bindings/src/Types.js";
