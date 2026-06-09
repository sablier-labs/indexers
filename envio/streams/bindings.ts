// biome-ignore-all assist/source/organizeImports: grouped exports
import { contract } from "../common/facade.js";
import type { EventHandler as FacadeEventHandler } from "../common/facade.js";
import type { EvmOnEventContext } from "envio";

export type {
  Entity,
  Enum,
  EvmContractRegisterContext,
  EvmContractRegisterHandler,
  EvmEvent,
  EvmOnEventContext,
  EvmOnEventHandler,
  Logger,
} from "envio";

export namespace Context {
  export type Handler = EvmOnEventContext;
}

export type HandlerContext = Context.Handler;
export type EventHandler<
  ContractName extends string,
  EventName extends string,
> = FacadeEventHandler<ContractName, EventName>;

const flowEvents = [
  "Approval",
  "ApprovalForAll",
  "Transfer",
  "AdjustFlowStream",
  "CreateFlowStream",
  "DepositFlowStream",
  "PauseFlowStream",
  "RefundFromFlowStream",
  "RestartFlowStream",
  "VoidFlowStream",
  "WithdrawFromFlowStream",
] as const;

const lockupEvents = [
  "Approval",
  "ApprovalForAll",
  "Transfer",
  "CancelLockupStream",
  "RenounceLockupStream",
  "WithdrawFromLockupStream",
] as const;

export namespace Contract {
  /* -------------------------------------------------------------------------- */
  /*                                    v1.0                                    */
  /* -------------------------------------------------------------------------- */
  export const Flow_v1_0 = contract("SablierFlow_v1_0", flowEvents);
  export const LockupDynamic_v1_0 = contract("SablierV2LockupDynamic_v1_0", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
  ] as const);
  export const LockupLinear_v1_0 = contract("SablierV2LockupLinear_v1_0", [
    ...lockupEvents,
    "CreateLockupLinearStream",
  ] as const);

  /* -------------------------------------------------------------------------- */
  /*                                    v1.1                                    */
  /* -------------------------------------------------------------------------- */
  export const Flow_v1_1 = contract("SablierFlow_v1_1", flowEvents);
  export const LockupDynamic_v1_1 = contract("SablierV2LockupDynamic_v1_1", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
  ] as const);
  export const LockupLinear_v1_1 = contract("SablierV2LockupLinear_v1_1", [
    ...lockupEvents,
    "CreateLockupLinearStream",
  ] as const);

  /* -------------------------------------------------------------------------- */
  /*                                    v1.2                                    */
  /* -------------------------------------------------------------------------- */
  export const LockupDynamic_v1_2 = contract("SablierV2LockupDynamic_v1_2", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
  ] as const);
  export const LockupLinear_v1_2 = contract("SablierV2LockupLinear_v1_2", [
    ...lockupEvents,
    "CreateLockupLinearStream",
  ] as const);
  export const LockupTranched_v1_2 = contract("SablierV2LockupTranched_v1_2", [
    ...lockupEvents,
    "CreateLockupTranchedStream",
  ] as const);

  /* -------------------------------------------------------------------------- */
  /*                                    v2.0                                    */
  /* -------------------------------------------------------------------------- */
  export const Flow_v2_0 = contract("SablierFlow_v2_0", flowEvents);
  export const Lockup_v2_0 = contract("SablierLockup_v2_0", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
    "CreateLockupLinearStream",
    "CreateLockupTranchedStream",
  ] as const);

  /* -------------------------------------------------------------------------- */
  /*                                    v3.0                                    */
  /* -------------------------------------------------------------------------- */
  export const Flow_v3_0 = contract("SablierFlow_v3_0", flowEvents);
  export const Lockup_v3_0 = contract("SablierLockup_v3_0", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
    "CreateLockupLinearStream",
    "CreateLockupTranchedStream",
  ] as const);

  /* -------------------------------------------------------------------------- */
  /*                                    v4.0                                    */
  /* -------------------------------------------------------------------------- */
  export const Lockup_v4_0 = contract("SablierLockup_v4_0", [
    ...lockupEvents,
    "CreateLockupDynamicStream",
    "CreateLockupLinearStream",
    "CreateLockupTranchedStream",
  ] as const);
}

/* -------------------------------------------------------------------------- */
/*                                    v1.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierFlow_v1_0_AdjustFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "AdjustFlowStream"
>;
export type SablierFlow_v1_0_ApprovalForAll_handler = EventHandler<
  "SablierFlow_v1_0",
  "ApprovalForAll"
>;
export type SablierFlow_v1_0_Approval_handler = EventHandler<"SablierFlow_v1_0", "Approval">;
export type SablierFlow_v1_0_CreateFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "CreateFlowStream"
>;
export type SablierFlow_v1_0_DepositFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "DepositFlowStream"
>;
export type SablierFlow_v1_0_PauseFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "PauseFlowStream"
>;
export type SablierFlow_v1_0_RefundFromFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "RefundFromFlowStream"
>;
export type SablierFlow_v1_0_RestartFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "RestartFlowStream"
>;
export type SablierFlow_v1_0_Transfer_handler = EventHandler<"SablierFlow_v1_0", "Transfer">;
export type SablierFlow_v1_0_VoidFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "VoidFlowStream"
>;
export type SablierFlow_v1_0_WithdrawFromFlowStream_handler = EventHandler<
  "SablierFlow_v1_0",
  "WithdrawFromFlowStream"
>;
export type SablierV2LockupLinear_v1_0_ApprovalForAll_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "ApprovalForAll"
>;
export type SablierV2LockupLinear_v1_0_Approval_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "Approval"
>;
export type SablierV2LockupLinear_v1_0_CancelLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "CancelLockupStream"
>;
export type SablierV2LockupLinear_v1_0_RenounceLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "RenounceLockupStream"
>;
export type SablierV2LockupLinear_v1_0_Transfer_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "Transfer"
>;
export type SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_0",
  "WithdrawFromLockupStream"
>;

/* -------------------------------------------------------------------------- */
/*                                    v1.1                                    */
/* -------------------------------------------------------------------------- */
export type SablierFlow_v1_1_AdjustFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "AdjustFlowStream"
>;
export type SablierFlow_v1_1_ApprovalForAll_handler = EventHandler<
  "SablierFlow_v1_1",
  "ApprovalForAll"
>;
export type SablierFlow_v1_1_Approval_handler = EventHandler<"SablierFlow_v1_1", "Approval">;
export type SablierFlow_v1_1_CreateFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "CreateFlowStream"
>;
export type SablierFlow_v1_1_DepositFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "DepositFlowStream"
>;
export type SablierFlow_v1_1_PauseFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "PauseFlowStream"
>;
export type SablierFlow_v1_1_RefundFromFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "RefundFromFlowStream"
>;
export type SablierFlow_v1_1_RestartFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "RestartFlowStream"
>;
export type SablierFlow_v1_1_Transfer_handler = EventHandler<"SablierFlow_v1_1", "Transfer">;
export type SablierFlow_v1_1_VoidFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "VoidFlowStream"
>;
export type SablierFlow_v1_1_WithdrawFromFlowStream_handler = EventHandler<
  "SablierFlow_v1_1",
  "WithdrawFromFlowStream"
>;
export type SablierV2LockupLinear_v1_1_ApprovalForAll_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "ApprovalForAll"
>;
export type SablierV2LockupLinear_v1_1_Approval_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "Approval"
>;
export type SablierV2LockupLinear_v1_1_CancelLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "CancelLockupStream"
>;
export type SablierV2LockupLinear_v1_1_RenounceLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "RenounceLockupStream"
>;
export type SablierV2LockupLinear_v1_1_Transfer_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "Transfer"
>;
export type SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_1",
  "WithdrawFromLockupStream"
>;

/* -------------------------------------------------------------------------- */
/*                                    v1.2                                    */
/* -------------------------------------------------------------------------- */
export type SablierV2LockupLinear_v1_2_ApprovalForAll_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "ApprovalForAll"
>;
export type SablierV2LockupLinear_v1_2_Approval_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "Approval"
>;
export type SablierV2LockupLinear_v1_2_CancelLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "CancelLockupStream"
>;
export type SablierV2LockupLinear_v1_2_RenounceLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "RenounceLockupStream"
>;
export type SablierV2LockupLinear_v1_2_Transfer_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "Transfer"
>;
export type SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler = EventHandler<
  "SablierV2LockupLinear_v1_2",
  "WithdrawFromLockupStream"
>;

/* -------------------------------------------------------------------------- */
/*                                    v2.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierFlow_v2_0_AdjustFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "AdjustFlowStream"
>;
export type SablierFlow_v2_0_ApprovalForAll_handler = EventHandler<
  "SablierFlow_v2_0",
  "ApprovalForAll"
>;
export type SablierFlow_v2_0_Approval_handler = EventHandler<"SablierFlow_v2_0", "Approval">;
export type SablierFlow_v2_0_CreateFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "CreateFlowStream"
>;
export type SablierFlow_v2_0_DepositFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "DepositFlowStream"
>;
export type SablierFlow_v2_0_PauseFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "PauseFlowStream"
>;
export type SablierFlow_v2_0_RefundFromFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "RefundFromFlowStream"
>;
export type SablierFlow_v2_0_RestartFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "RestartFlowStream"
>;
export type SablierFlow_v2_0_Transfer_handler = EventHandler<"SablierFlow_v2_0", "Transfer">;
export type SablierFlow_v2_0_VoidFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "VoidFlowStream"
>;
export type SablierFlow_v2_0_WithdrawFromFlowStream_handler = EventHandler<
  "SablierFlow_v2_0",
  "WithdrawFromFlowStream"
>;
export type SablierLockup_v2_0_ApprovalForAll_handler = EventHandler<
  "SablierLockup_v2_0",
  "ApprovalForAll"
>;
export type SablierLockup_v2_0_Approval_handler = EventHandler<"SablierLockup_v2_0", "Approval">;
export type SablierLockup_v2_0_CancelLockupStream_handler = EventHandler<
  "SablierLockup_v2_0",
  "CancelLockupStream"
>;
export type SablierLockup_v2_0_RenounceLockupStream_handler = EventHandler<
  "SablierLockup_v2_0",
  "RenounceLockupStream"
>;
export type SablierLockup_v2_0_Transfer_handler = EventHandler<"SablierLockup_v2_0", "Transfer">;
export type SablierLockup_v2_0_WithdrawFromLockupStream_handler = EventHandler<
  "SablierLockup_v2_0",
  "WithdrawFromLockupStream"
>;

/* -------------------------------------------------------------------------- */
/*                                    v3.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierFlow_v3_0_AdjustFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "AdjustFlowStream"
>;
export type SablierFlow_v3_0_ApprovalForAll_handler = EventHandler<
  "SablierFlow_v3_0",
  "ApprovalForAll"
>;
export type SablierFlow_v3_0_Approval_handler = EventHandler<"SablierFlow_v3_0", "Approval">;
export type SablierFlow_v3_0_CreateFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "CreateFlowStream"
>;
export type SablierFlow_v3_0_DepositFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "DepositFlowStream"
>;
export type SablierFlow_v3_0_PauseFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "PauseFlowStream"
>;
export type SablierFlow_v3_0_RefundFromFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "RefundFromFlowStream"
>;
export type SablierFlow_v3_0_RestartFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "RestartFlowStream"
>;
export type SablierFlow_v3_0_Transfer_handler = EventHandler<"SablierFlow_v3_0", "Transfer">;
export type SablierFlow_v3_0_VoidFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "VoidFlowStream"
>;
export type SablierFlow_v3_0_WithdrawFromFlowStream_handler = EventHandler<
  "SablierFlow_v3_0",
  "WithdrawFromFlowStream"
>;
export type SablierLockup_v3_0_ApprovalForAll_handler = EventHandler<
  "SablierLockup_v3_0",
  "ApprovalForAll"
>;
export type SablierLockup_v3_0_Approval_handler = EventHandler<"SablierLockup_v3_0", "Approval">;
export type SablierLockup_v3_0_CancelLockupStream_handler = EventHandler<
  "SablierLockup_v3_0",
  "CancelLockupStream"
>;
export type SablierLockup_v3_0_RenounceLockupStream_handler = EventHandler<
  "SablierLockup_v3_0",
  "RenounceLockupStream"
>;
export type SablierLockup_v3_0_Transfer_handler = EventHandler<"SablierLockup_v3_0", "Transfer">;
export type SablierLockup_v3_0_WithdrawFromLockupStream_handler = EventHandler<
  "SablierLockup_v3_0",
  "WithdrawFromLockupStream"
>;

/* -------------------------------------------------------------------------- */
/*                                    v4.0                                    */
/* -------------------------------------------------------------------------- */
export type SablierLockup_v4_0_ApprovalForAll_handler = EventHandler<
  "SablierLockup_v4_0",
  "ApprovalForAll"
>;
export type SablierLockup_v4_0_Approval_handler = EventHandler<"SablierLockup_v4_0", "Approval">;
export type SablierLockup_v4_0_CancelLockupStream_handler = EventHandler<
  "SablierLockup_v4_0",
  "CancelLockupStream"
>;
export type SablierLockup_v4_0_RenounceLockupStream_handler = EventHandler<
  "SablierLockup_v4_0",
  "RenounceLockupStream"
>;
export type SablierLockup_v4_0_Transfer_handler = EventHandler<"SablierLockup_v4_0", "Transfer">;
export type SablierLockup_v4_0_WithdrawFromLockupStream_handler = EventHandler<
  "SablierLockup_v4_0",
  "WithdrawFromLockupStream"
>;
