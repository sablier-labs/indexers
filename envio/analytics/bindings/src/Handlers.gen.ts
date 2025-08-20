/* TypeScript file generated from Handlers.res by genType. */

/* eslint-disable */
/* tslint:disable */

const HandlersJS = require('./Handlers.res.js');

import type {HandlerTypes_eventConfig as Types_HandlerTypes_eventConfig} from './Types.gen';

import type {SablierFlow_v1_0_AdjustFlowStream_eventFilters as Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_AdjustFlowStream_event as Types_SablierFlow_v1_0_AdjustFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_ApprovalForAll_eventFilters as Types_SablierFlow_v1_0_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_ApprovalForAll_event as Types_SablierFlow_v1_0_ApprovalForAll_event} from './Types.gen';

import type {SablierFlow_v1_0_Approval_eventFilters as Types_SablierFlow_v1_0_Approval_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_Approval_event as Types_SablierFlow_v1_0_Approval_event} from './Types.gen';

import type {SablierFlow_v1_0_CreateFlowStream_eventFilters as Types_SablierFlow_v1_0_CreateFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_CreateFlowStream_event as Types_SablierFlow_v1_0_CreateFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_DepositFlowStream_eventFilters as Types_SablierFlow_v1_0_DepositFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_DepositFlowStream_event as Types_SablierFlow_v1_0_DepositFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_PauseFlowStream_eventFilters as Types_SablierFlow_v1_0_PauseFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_PauseFlowStream_event as Types_SablierFlow_v1_0_PauseFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_RefundFromFlowStream_eventFilters as Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_RefundFromFlowStream_event as Types_SablierFlow_v1_0_RefundFromFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_RestartFlowStream_eventFilters as Types_SablierFlow_v1_0_RestartFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_RestartFlowStream_event as Types_SablierFlow_v1_0_RestartFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_Transfer_eventFilters as Types_SablierFlow_v1_0_Transfer_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_Transfer_event as Types_SablierFlow_v1_0_Transfer_event} from './Types.gen';

import type {SablierFlow_v1_0_VoidFlowStream_eventFilters as Types_SablierFlow_v1_0_VoidFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_VoidFlowStream_event as Types_SablierFlow_v1_0_VoidFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters as Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_0_WithdrawFromFlowStream_event as Types_SablierFlow_v1_0_WithdrawFromFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_AdjustFlowStream_eventFilters as Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_AdjustFlowStream_event as Types_SablierFlow_v1_1_AdjustFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_ApprovalForAll_eventFilters as Types_SablierFlow_v1_1_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_ApprovalForAll_event as Types_SablierFlow_v1_1_ApprovalForAll_event} from './Types.gen';

import type {SablierFlow_v1_1_Approval_eventFilters as Types_SablierFlow_v1_1_Approval_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_Approval_event as Types_SablierFlow_v1_1_Approval_event} from './Types.gen';

import type {SablierFlow_v1_1_CreateFlowStream_eventFilters as Types_SablierFlow_v1_1_CreateFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_CreateFlowStream_event as Types_SablierFlow_v1_1_CreateFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_DepositFlowStream_eventFilters as Types_SablierFlow_v1_1_DepositFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_DepositFlowStream_event as Types_SablierFlow_v1_1_DepositFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_PauseFlowStream_eventFilters as Types_SablierFlow_v1_1_PauseFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_PauseFlowStream_event as Types_SablierFlow_v1_1_PauseFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_RefundFromFlowStream_eventFilters as Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_RefundFromFlowStream_event as Types_SablierFlow_v1_1_RefundFromFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_RestartFlowStream_eventFilters as Types_SablierFlow_v1_1_RestartFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_RestartFlowStream_event as Types_SablierFlow_v1_1_RestartFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_Transfer_eventFilters as Types_SablierFlow_v1_1_Transfer_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_Transfer_event as Types_SablierFlow_v1_1_Transfer_event} from './Types.gen';

import type {SablierFlow_v1_1_VoidFlowStream_eventFilters as Types_SablierFlow_v1_1_VoidFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_VoidFlowStream_event as Types_SablierFlow_v1_1_VoidFlowStream_event} from './Types.gen';

import type {SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters as Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters} from './Types.gen';

import type {SablierFlow_v1_1_WithdrawFromFlowStream_event as Types_SablierFlow_v1_1_WithdrawFromFlowStream_event} from './Types.gen';

import type {SablierLockup_v2_0_ApprovalForAll_eventFilters as Types_SablierLockup_v2_0_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_ApprovalForAll_event as Types_SablierLockup_v2_0_ApprovalForAll_event} from './Types.gen';

import type {SablierLockup_v2_0_Approval_eventFilters as Types_SablierLockup_v2_0_Approval_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_Approval_event as Types_SablierLockup_v2_0_Approval_event} from './Types.gen';

import type {SablierLockup_v2_0_CancelLockupStream_eventFilters as Types_SablierLockup_v2_0_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_CancelLockupStream_event as Types_SablierLockup_v2_0_CancelLockupStream_event} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters as Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupDynamicStream_event as Types_SablierLockup_v2_0_CreateLockupDynamicStream_event} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupLinearStream_eventFilters as Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupLinearStream_event as Types_SablierLockup_v2_0_CreateLockupLinearStream_event} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters as Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_CreateLockupTranchedStream_event as Types_SablierLockup_v2_0_CreateLockupTranchedStream_event} from './Types.gen';

import type {SablierLockup_v2_0_RenounceLockupStream_eventFilters as Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_RenounceLockupStream_event as Types_SablierLockup_v2_0_RenounceLockupStream_event} from './Types.gen';

import type {SablierLockup_v2_0_Transfer_eventFilters as Types_SablierLockup_v2_0_Transfer_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_Transfer_event as Types_SablierLockup_v2_0_Transfer_event} from './Types.gen';

import type {SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters as Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierLockup_v2_0_WithdrawFromLockupStream_event as Types_SablierLockup_v2_0_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters as Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleInstant_event as Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters as Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleLL_event as Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters as Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters} from './Types.gen';

import type {SablierMerkleFactory_v1_3_CreateMerkleLT_event as Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event} from './Types.gen';

import type {SablierMerkleInstant_v1_3_Claim_eventFilters as Types_SablierMerkleInstant_v1_3_Claim_eventFilters} from './Types.gen';

import type {SablierMerkleInstant_v1_3_Claim_event as Types_SablierMerkleInstant_v1_3_Claim_event} from './Types.gen';

import type {SablierMerkleInstant_v1_3_Clawback_eventFilters as Types_SablierMerkleInstant_v1_3_Clawback_eventFilters} from './Types.gen';

import type {SablierMerkleInstant_v1_3_Clawback_event as Types_SablierMerkleInstant_v1_3_Clawback_event} from './Types.gen';

import type {SablierMerkleInstant_v1_3_TransferAdmin_eventFilters as Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierMerkleInstant_v1_3_TransferAdmin_event as Types_SablierMerkleInstant_v1_3_TransferAdmin_event} from './Types.gen';

import type {SablierMerkleLL_v1_3_Claim_eventFilters as Types_SablierMerkleLL_v1_3_Claim_eventFilters} from './Types.gen';

import type {SablierMerkleLL_v1_3_Claim_event as Types_SablierMerkleLL_v1_3_Claim_event} from './Types.gen';

import type {SablierMerkleLL_v1_3_Clawback_eventFilters as Types_SablierMerkleLL_v1_3_Clawback_eventFilters} from './Types.gen';

import type {SablierMerkleLL_v1_3_Clawback_event as Types_SablierMerkleLL_v1_3_Clawback_event} from './Types.gen';

import type {SablierMerkleLL_v1_3_TransferAdmin_eventFilters as Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierMerkleLL_v1_3_TransferAdmin_event as Types_SablierMerkleLL_v1_3_TransferAdmin_event} from './Types.gen';

import type {SablierMerkleLT_v1_3_Claim_eventFilters as Types_SablierMerkleLT_v1_3_Claim_eventFilters} from './Types.gen';

import type {SablierMerkleLT_v1_3_Claim_event as Types_SablierMerkleLT_v1_3_Claim_event} from './Types.gen';

import type {SablierMerkleLT_v1_3_Clawback_eventFilters as Types_SablierMerkleLT_v1_3_Clawback_eventFilters} from './Types.gen';

import type {SablierMerkleLT_v1_3_Clawback_event as Types_SablierMerkleLT_v1_3_Clawback_event} from './Types.gen';

import type {SablierMerkleLT_v1_3_TransferAdmin_eventFilters as Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierMerkleLT_v1_3_TransferAdmin_event as Types_SablierMerkleLT_v1_3_TransferAdmin_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters as Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_ApprovalForAll_event as Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_Approval_eventFilters as Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_Approval_event as Types_SablierV2LockupDynamic_v1_0_Approval_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_CancelLockupStream_event as Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters as Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event as Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_RenounceLockupStream_event as Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_Transfer_eventFilters as Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_Transfer_event as Types_SablierV2LockupDynamic_v1_0_Transfer_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event as Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters as Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_ApprovalForAll_event as Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_Approval_eventFilters as Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_Approval_event as Types_SablierV2LockupDynamic_v1_1_Approval_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_CancelLockupStream_event as Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters as Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event as Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_RenounceLockupStream_event as Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_Transfer_eventFilters as Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_Transfer_event as Types_SablierV2LockupDynamic_v1_1_Transfer_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event as Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters as Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_ApprovalForAll_event as Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_Approval_eventFilters as Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_Approval_event as Types_SablierV2LockupDynamic_v1_2_Approval_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_CancelLockupStream_event as Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters as Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event as Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_RenounceLockupStream_event as Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_Transfer_eventFilters as Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_Transfer_event as Types_SablierV2LockupDynamic_v1_2_Transfer_event} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event as Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters as Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_ApprovalForAll_event as Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_Approval_eventFilters as Types_SablierV2LockupLinear_v1_0_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_Approval_event as Types_SablierV2LockupLinear_v1_0_Approval_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_CancelLockupStream_event as Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters as Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event as Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_RenounceLockupStream_event as Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_Transfer_eventFilters as Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_Transfer_event as Types_SablierV2LockupLinear_v1_0_Transfer_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event as Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters as Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_ApprovalForAll_event as Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_Approval_eventFilters as Types_SablierV2LockupLinear_v1_1_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_Approval_event as Types_SablierV2LockupLinear_v1_1_Approval_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_CancelLockupStream_event as Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters as Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event as Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_RenounceLockupStream_event as Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_Transfer_eventFilters as Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_Transfer_event as Types_SablierV2LockupLinear_v1_1_Transfer_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event as Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters as Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_ApprovalForAll_event as Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_Approval_eventFilters as Types_SablierV2LockupLinear_v1_2_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_Approval_event as Types_SablierV2LockupLinear_v1_2_Approval_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_CancelLockupStream_event as Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters as Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event as Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_RenounceLockupStream_event as Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_Transfer_eventFilters as Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_Transfer_event as Types_SablierV2LockupLinear_v1_2_Transfer_event} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event as Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters as Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_ApprovalForAll_event as Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_Approval_eventFilters as Types_SablierV2LockupTranched_v1_2_Approval_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_Approval_event as Types_SablierV2LockupTranched_v1_2_Approval_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters as Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_CancelLockupStream_event as Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters as Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event as Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters as Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_RenounceLockupStream_event as Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_Transfer_eventFilters as Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_Transfer_event as Types_SablierV2LockupTranched_v1_2_Transfer_event} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters as Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters} from './Types.gen';

import type {SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event as Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_Claim_eventFilters as Types_SablierV2MerkleLL_v1_2_Claim_eventFilters} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_Claim_event as Types_SablierV2MerkleLL_v1_2_Claim_event} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_Clawback_eventFilters as Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_Clawback_event as Types_SablierV2MerkleLL_v1_2_Clawback_event} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters as Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierV2MerkleLL_v1_2_TransferAdmin_event as Types_SablierV2MerkleLL_v1_2_TransferAdmin_event} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_Claim_eventFilters as Types_SablierV2MerkleLT_v1_2_Claim_eventFilters} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_Claim_event as Types_SablierV2MerkleLT_v1_2_Claim_event} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_Clawback_eventFilters as Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_Clawback_event as Types_SablierV2MerkleLT_v1_2_Clawback_event} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters as Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierV2MerkleLT_v1_2_TransferAdmin_event as Types_SablierV2MerkleLT_v1_2_TransferAdmin_event} from './Types.gen';

import type {SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters as Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters} from './Types.gen';

import type {SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event as Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event} from './Types.gen';

import type {SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters as Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters} from './Types.gen';

import type {SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event as Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event} from './Types.gen';

import type {SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters as Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters} from './Types.gen';

import type {SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event as Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters as Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_Claim_event as Types_SablierV2MerkleStreamerLL_v1_1_Claim_event} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters as Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_Clawback_event as Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters as Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters} from './Types.gen';

import type {SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event as Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event} from './Types.gen';

import type {contractRegistrations as Types_contractRegistrations} from './Types.gen';

import type {fnWithEventConfig as Types_fnWithEventConfig} from './Types.gen';

import type {genericContractRegisterArgs as Internal_genericContractRegisterArgs} from 'envio/src/Internal.gen';

import type {genericContractRegister as Internal_genericContractRegister} from 'envio/src/Internal.gen';

import type {genericHandlerArgs as Internal_genericHandlerArgs} from 'envio/src/Internal.gen';

import type {genericHandlerWithLoader as Internal_genericHandlerWithLoader} from 'envio/src/Internal.gen';

import type {genericHandler as Internal_genericHandler} from 'envio/src/Internal.gen';

import type {genericLoaderArgs as Internal_genericLoaderArgs} from 'envio/src/Internal.gen';

import type {genericLoader as Internal_genericLoader} from 'envio/src/Internal.gen';

import type {handlerContext as Types_handlerContext} from './Types.gen';

import type {loaderContext as Types_loaderContext} from './Types.gen';

export const SablierFlow_v1_0_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Approval_eventFilters>> = HandlersJS.SablierFlow_v1_0.Approval.contractRegister as any;

export const SablierFlow_v1_0_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Approval_eventFilters>> = HandlersJS.SablierFlow_v1_0.Approval.handler as any;

export const SablierFlow_v1_0_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_Approval_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.Approval.handlerWithLoader as any;

export const SablierFlow_v1_0_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierFlow_v1_0.ApprovalForAll.contractRegister as any;

export const SablierFlow_v1_0_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierFlow_v1_0.ApprovalForAll.handler as any;

export const SablierFlow_v1_0_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.ApprovalForAll.handlerWithLoader as any;

export const SablierFlow_v1_0_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Transfer_eventFilters>> = HandlersJS.SablierFlow_v1_0.Transfer.contractRegister as any;

export const SablierFlow_v1_0_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Transfer_eventFilters>> = HandlersJS.SablierFlow_v1_0.Transfer.handler as any;

export const SablierFlow_v1_0_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_Transfer_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.Transfer.handlerWithLoader as any;

export const SablierFlow_v1_0_AdjustFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.AdjustFlowStream.contractRegister as any;

export const SablierFlow_v1_0_AdjustFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.AdjustFlowStream.handler as any;

export const SablierFlow_v1_0_AdjustFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.AdjustFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_CreateFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.CreateFlowStream.contractRegister as any;

export const SablierFlow_v1_0_CreateFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.CreateFlowStream.handler as any;

export const SablierFlow_v1_0_CreateFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.CreateFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_DepositFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.DepositFlowStream.contractRegister as any;

export const SablierFlow_v1_0_DepositFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.DepositFlowStream.handler as any;

export const SablierFlow_v1_0_DepositFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.DepositFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_PauseFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.PauseFlowStream.contractRegister as any;

export const SablierFlow_v1_0_PauseFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.PauseFlowStream.handler as any;

export const SablierFlow_v1_0_PauseFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.PauseFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_RefundFromFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.RefundFromFlowStream.contractRegister as any;

export const SablierFlow_v1_0_RefundFromFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.RefundFromFlowStream.handler as any;

export const SablierFlow_v1_0_RefundFromFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.RefundFromFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_RestartFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.RestartFlowStream.contractRegister as any;

export const SablierFlow_v1_0_RestartFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.RestartFlowStream.handler as any;

export const SablierFlow_v1_0_RestartFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.RestartFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_VoidFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.VoidFlowStream.contractRegister as any;

export const SablierFlow_v1_0_VoidFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.VoidFlowStream.handler as any;

export const SablierFlow_v1_0_VoidFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.VoidFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_0_WithdrawFromFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.WithdrawFromFlowStream.contractRegister as any;

export const SablierFlow_v1_0_WithdrawFromFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_0.WithdrawFromFlowStream.handler as any;

export const SablierFlow_v1_0_WithdrawFromFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_0.WithdrawFromFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Approval_eventFilters>> = HandlersJS.SablierFlow_v1_1.Approval.contractRegister as any;

export const SablierFlow_v1_1_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Approval_eventFilters>> = HandlersJS.SablierFlow_v1_1.Approval.handler as any;

export const SablierFlow_v1_1_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_Approval_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.Approval.handlerWithLoader as any;

export const SablierFlow_v1_1_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierFlow_v1_1.ApprovalForAll.contractRegister as any;

export const SablierFlow_v1_1_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierFlow_v1_1.ApprovalForAll.handler as any;

export const SablierFlow_v1_1_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.ApprovalForAll.handlerWithLoader as any;

export const SablierFlow_v1_1_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Transfer_eventFilters>> = HandlersJS.SablierFlow_v1_1.Transfer.contractRegister as any;

export const SablierFlow_v1_1_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Transfer_eventFilters>> = HandlersJS.SablierFlow_v1_1.Transfer.handler as any;

export const SablierFlow_v1_1_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_Transfer_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.Transfer.handlerWithLoader as any;

export const SablierFlow_v1_1_AdjustFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.AdjustFlowStream.contractRegister as any;

export const SablierFlow_v1_1_AdjustFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.AdjustFlowStream.handler as any;

export const SablierFlow_v1_1_AdjustFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.AdjustFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_CreateFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.CreateFlowStream.contractRegister as any;

export const SablierFlow_v1_1_CreateFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.CreateFlowStream.handler as any;

export const SablierFlow_v1_1_CreateFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.CreateFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_DepositFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.DepositFlowStream.contractRegister as any;

export const SablierFlow_v1_1_DepositFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.DepositFlowStream.handler as any;

export const SablierFlow_v1_1_DepositFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.DepositFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_PauseFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.PauseFlowStream.contractRegister as any;

export const SablierFlow_v1_1_PauseFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.PauseFlowStream.handler as any;

export const SablierFlow_v1_1_PauseFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.PauseFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_RefundFromFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.RefundFromFlowStream.contractRegister as any;

export const SablierFlow_v1_1_RefundFromFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.RefundFromFlowStream.handler as any;

export const SablierFlow_v1_1_RefundFromFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.RefundFromFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_RestartFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.RestartFlowStream.contractRegister as any;

export const SablierFlow_v1_1_RestartFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.RestartFlowStream.handler as any;

export const SablierFlow_v1_1_RestartFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.RestartFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_VoidFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.VoidFlowStream.contractRegister as any;

export const SablierFlow_v1_1_VoidFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.VoidFlowStream.handler as any;

export const SablierFlow_v1_1_VoidFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.VoidFlowStream.handlerWithLoader as any;

export const SablierFlow_v1_1_WithdrawFromFlowStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.WithdrawFromFlowStream.contractRegister as any;

export const SablierFlow_v1_1_WithdrawFromFlowStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>> = HandlersJS.SablierFlow_v1_1.WithdrawFromFlowStream.handler as any;

export const SablierFlow_v1_1_WithdrawFromFlowStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>) => void = HandlersJS.SablierFlow_v1_1.WithdrawFromFlowStream.handlerWithLoader as any;

export const SablierLockup_v2_0_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Approval_eventFilters>> = HandlersJS.SablierLockup_v2_0.Approval.contractRegister as any;

export const SablierLockup_v2_0_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Approval_eventFilters>> = HandlersJS.SablierLockup_v2_0.Approval.handler as any;

export const SablierLockup_v2_0_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_Approval_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.Approval.handlerWithLoader as any;

export const SablierLockup_v2_0_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierLockup_v2_0.ApprovalForAll.contractRegister as any;

export const SablierLockup_v2_0_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierLockup_v2_0.ApprovalForAll.handler as any;

export const SablierLockup_v2_0_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.ApprovalForAll.handlerWithLoader as any;

export const SablierLockup_v2_0_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Transfer_eventFilters>> = HandlersJS.SablierLockup_v2_0.Transfer.contractRegister as any;

export const SablierLockup_v2_0_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Transfer_eventFilters>> = HandlersJS.SablierLockup_v2_0.Transfer.handler as any;

export const SablierLockup_v2_0_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_Transfer_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.Transfer.handlerWithLoader as any;

export const SablierLockup_v2_0_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CancelLockupStream.contractRegister as any;

export const SablierLockup_v2_0_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CancelLockupStream.handler as any;

export const SablierLockup_v2_0_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.CancelLockupStream.handlerWithLoader as any;

export const SablierLockup_v2_0_CreateLockupDynamicStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupDynamicStream.contractRegister as any;

export const SablierLockup_v2_0_CreateLockupDynamicStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupDynamicStream.handler as any;

export const SablierLockup_v2_0_CreateLockupDynamicStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.CreateLockupDynamicStream.handlerWithLoader as any;

export const SablierLockup_v2_0_CreateLockupLinearStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupLinearStream.contractRegister as any;

export const SablierLockup_v2_0_CreateLockupLinearStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupLinearStream.handler as any;

export const SablierLockup_v2_0_CreateLockupLinearStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.CreateLockupLinearStream.handlerWithLoader as any;

export const SablierLockup_v2_0_CreateLockupTranchedStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupTranchedStream.contractRegister as any;

export const SablierLockup_v2_0_CreateLockupTranchedStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.CreateLockupTranchedStream.handler as any;

export const SablierLockup_v2_0_CreateLockupTranchedStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.CreateLockupTranchedStream.handlerWithLoader as any;

export const SablierLockup_v2_0_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.RenounceLockupStream.contractRegister as any;

export const SablierLockup_v2_0_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.RenounceLockupStream.handler as any;

export const SablierLockup_v2_0_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.RenounceLockupStream.handlerWithLoader as any;

export const SablierLockup_v2_0_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.WithdrawFromLockupStream.contractRegister as any;

export const SablierLockup_v2_0_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierLockup_v2_0.WithdrawFromLockupStream.handler as any;

export const SablierLockup_v2_0_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierLockup_v2_0.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierMerkleFactory_v1_3_CreateMerkleInstant_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleInstant.contractRegister as any;

export const SablierMerkleFactory_v1_3_CreateMerkleInstant_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleInstant.handler as any;

export const SablierMerkleFactory_v1_3_CreateMerkleInstant_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>) => void = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleInstant.handlerWithLoader as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLL_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLL.contractRegister as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLL_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLL.handler as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLL_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>) => void = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLL.handlerWithLoader as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLT_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLT.contractRegister as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLT_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>> = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLT.handler as any;

export const SablierMerkleFactory_v1_3_CreateMerkleLT_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>) => void = HandlersJS.SablierMerkleFactory_v1_3.CreateMerkleLT.handlerWithLoader as any;

export const SablierMerkleInstant_v1_3_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.TransferAdmin.contractRegister as any;

export const SablierMerkleInstant_v1_3_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.TransferAdmin.handler as any;

export const SablierMerkleInstant_v1_3_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>) => void = HandlersJS.SablierMerkleInstant_v1_3.TransferAdmin.handlerWithLoader as any;

export const SablierMerkleInstant_v1_3_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.Clawback.contractRegister as any;

export const SablierMerkleInstant_v1_3_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.Clawback.handler as any;

export const SablierMerkleInstant_v1_3_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>) => void = HandlersJS.SablierMerkleInstant_v1_3.Clawback.handlerWithLoader as any;

export const SablierMerkleInstant_v1_3_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.Claim.contractRegister as any;

export const SablierMerkleInstant_v1_3_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleInstant_v1_3.Claim.handler as any;

export const SablierMerkleInstant_v1_3_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_Claim_eventFilters>) => void = HandlersJS.SablierMerkleInstant_v1_3.Claim.handlerWithLoader as any;

export const SablierMerkleLL_v1_3_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.TransferAdmin.contractRegister as any;

export const SablierMerkleLL_v1_3_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.TransferAdmin.handler as any;

export const SablierMerkleLL_v1_3_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>) => void = HandlersJS.SablierMerkleLL_v1_3.TransferAdmin.handlerWithLoader as any;

export const SablierMerkleLL_v1_3_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.Clawback.contractRegister as any;

export const SablierMerkleLL_v1_3_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.Clawback.handler as any;

export const SablierMerkleLL_v1_3_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_Clawback_eventFilters>) => void = HandlersJS.SablierMerkleLL_v1_3.Clawback.handlerWithLoader as any;

export const SablierMerkleLL_v1_3_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.Claim.contractRegister as any;

export const SablierMerkleLL_v1_3_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleLL_v1_3.Claim.handler as any;

export const SablierMerkleLL_v1_3_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_Claim_eventFilters>) => void = HandlersJS.SablierMerkleLL_v1_3.Claim.handlerWithLoader as any;

export const SablierMerkleLT_v1_3_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.TransferAdmin.contractRegister as any;

export const SablierMerkleLT_v1_3_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.TransferAdmin.handler as any;

export const SablierMerkleLT_v1_3_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>) => void = HandlersJS.SablierMerkleLT_v1_3.TransferAdmin.handlerWithLoader as any;

export const SablierMerkleLT_v1_3_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.Clawback.contractRegister as any;

export const SablierMerkleLT_v1_3_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Clawback_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.Clawback.handler as any;

export const SablierMerkleLT_v1_3_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_Clawback_eventFilters>) => void = HandlersJS.SablierMerkleLT_v1_3.Clawback.handlerWithLoader as any;

export const SablierMerkleLT_v1_3_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.Claim.contractRegister as any;

export const SablierMerkleLT_v1_3_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Claim_eventFilters>> = HandlersJS.SablierMerkleLT_v1_3.Claim.handler as any;

export const SablierMerkleLT_v1_3_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_Claim_eventFilters>) => void = HandlersJS.SablierMerkleLT_v1_3.Claim.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.Approval.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.Approval.handler as any;

export const SablierV2LockupDynamic_v1_0_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.Approval.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.ApprovalForAll.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.ApprovalForAll.handler as any;

export const SablierV2LockupDynamic_v1_0_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.Transfer.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.Transfer.handler as any;

export const SablierV2LockupDynamic_v1_0_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.Transfer.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.CancelLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.CancelLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_0_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.handler as any;

export const SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.RenounceLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_0_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.Approval.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.Approval.handler as any;

export const SablierV2LockupDynamic_v1_1_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.Approval.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.ApprovalForAll.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.ApprovalForAll.handler as any;

export const SablierV2LockupDynamic_v1_1_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.Transfer.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.Transfer.handler as any;

export const SablierV2LockupDynamic_v1_1_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.Transfer.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.CancelLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.CancelLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_1_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.handler as any;

export const SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.RenounceLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_1_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.Approval.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.Approval.handler as any;

export const SablierV2LockupDynamic_v1_2_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.Approval.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.ApprovalForAll.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.ApprovalForAll.handler as any;

export const SablierV2LockupDynamic_v1_2_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.Transfer.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.Transfer.handler as any;

export const SablierV2LockupDynamic_v1_2_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.Transfer.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.CancelLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.CancelLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_2_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.handler as any;

export const SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.RenounceLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_2_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.Approval.contractRegister as any;

export const SablierV2LockupLinear_v1_0_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.Approval.handler as any;

export const SablierV2LockupLinear_v1_0_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.Approval.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.ApprovalForAll.contractRegister as any;

export const SablierV2LockupLinear_v1_0_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.ApprovalForAll.handler as any;

export const SablierV2LockupLinear_v1_0_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.Transfer.contractRegister as any;

export const SablierV2LockupLinear_v1_0_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.Transfer.handler as any;

export const SablierV2LockupLinear_v1_0_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.Transfer.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.CancelLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_0_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.CancelLockupStream.handler as any;

export const SablierV2LockupLinear_v1_0_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_CreateLockupLinearStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.contractRegister as any;

export const SablierV2LockupLinear_v1_0_CreateLockupLinearStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.handler as any;

export const SablierV2LockupLinear_v1_0_CreateLockupLinearStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_0_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.RenounceLockupStream.handler as any;

export const SablierV2LockupLinear_v1_0_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.Approval.contractRegister as any;

export const SablierV2LockupLinear_v1_1_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.Approval.handler as any;

export const SablierV2LockupLinear_v1_1_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.Approval.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.ApprovalForAll.contractRegister as any;

export const SablierV2LockupLinear_v1_1_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.ApprovalForAll.handler as any;

export const SablierV2LockupLinear_v1_1_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.Transfer.contractRegister as any;

export const SablierV2LockupLinear_v1_1_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.Transfer.handler as any;

export const SablierV2LockupLinear_v1_1_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.Transfer.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.CancelLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_1_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.CancelLockupStream.handler as any;

export const SablierV2LockupLinear_v1_1_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_CreateLockupLinearStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.contractRegister as any;

export const SablierV2LockupLinear_v1_1_CreateLockupLinearStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.handler as any;

export const SablierV2LockupLinear_v1_1_CreateLockupLinearStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_1_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.RenounceLockupStream.handler as any;

export const SablierV2LockupLinear_v1_1_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.Approval.contractRegister as any;

export const SablierV2LockupLinear_v1_2_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.Approval.handler as any;

export const SablierV2LockupLinear_v1_2_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.Approval.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.ApprovalForAll.contractRegister as any;

export const SablierV2LockupLinear_v1_2_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.ApprovalForAll.handler as any;

export const SablierV2LockupLinear_v1_2_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.Transfer.contractRegister as any;

export const SablierV2LockupLinear_v1_2_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.Transfer.handler as any;

export const SablierV2LockupLinear_v1_2_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.Transfer.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.CancelLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_2_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.CancelLockupStream.handler as any;

export const SablierV2LockupLinear_v1_2_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_CreateLockupLinearStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.contractRegister as any;

export const SablierV2LockupLinear_v1_2_CreateLockupLinearStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.handler as any;

export const SablierV2LockupLinear_v1_2_CreateLockupLinearStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_2_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.RenounceLockupStream.handler as any;

export const SablierV2LockupLinear_v1_2_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_Approval_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.Approval.contractRegister as any;

export const SablierV2LockupTranched_v1_2_Approval_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.Approval.handler as any;

export const SablierV2LockupTranched_v1_2_Approval_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.Approval.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_ApprovalForAll_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.ApprovalForAll.contractRegister as any;

export const SablierV2LockupTranched_v1_2_ApprovalForAll_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.ApprovalForAll.handler as any;

export const SablierV2LockupTranched_v1_2_ApprovalForAll_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.ApprovalForAll.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_Transfer_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.Transfer.contractRegister as any;

export const SablierV2LockupTranched_v1_2_Transfer_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.Transfer.handler as any;

export const SablierV2LockupTranched_v1_2_Transfer_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.Transfer.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_CancelLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.CancelLockupStream.contractRegister as any;

export const SablierV2LockupTranched_v1_2_CancelLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.CancelLockupStream.handler as any;

export const SablierV2LockupTranched_v1_2_CancelLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.CancelLockupStream.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.contractRegister as any;

export const SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.handler as any;

export const SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_RenounceLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.RenounceLockupStream.contractRegister as any;

export const SablierV2LockupTranched_v1_2_RenounceLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.RenounceLockupStream.handler as any;

export const SablierV2LockupTranched_v1_2_RenounceLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.RenounceLockupStream.handlerWithLoader as any;

export const SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.contractRegister as any;

export const SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>> = HandlersJS.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.handler as any;

export const SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>) => void = HandlersJS.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.handlerWithLoader as any;

export const SablierV2MerkleLL_v1_2_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.TransferAdmin.contractRegister as any;

export const SablierV2MerkleLL_v1_2_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.TransferAdmin.handler as any;

export const SablierV2MerkleLL_v1_2_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>) => void = HandlersJS.SablierV2MerkleLL_v1_2.TransferAdmin.handlerWithLoader as any;

export const SablierV2MerkleLL_v1_2_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.Clawback.contractRegister as any;

export const SablierV2MerkleLL_v1_2_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.Clawback.handler as any;

export const SablierV2MerkleLL_v1_2_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>) => void = HandlersJS.SablierV2MerkleLL_v1_2.Clawback.handlerWithLoader as any;

export const SablierV2MerkleLL_v1_2_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.Claim.contractRegister as any;

export const SablierV2MerkleLL_v1_2_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>> = HandlersJS.SablierV2MerkleLL_v1_2.Claim.handler as any;

export const SablierV2MerkleLL_v1_2_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>) => void = HandlersJS.SablierV2MerkleLL_v1_2.Claim.handlerWithLoader as any;

export const SablierV2MerkleLT_v1_2_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.TransferAdmin.contractRegister as any;

export const SablierV2MerkleLT_v1_2_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.TransferAdmin.handler as any;

export const SablierV2MerkleLT_v1_2_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>) => void = HandlersJS.SablierV2MerkleLT_v1_2.TransferAdmin.handlerWithLoader as any;

export const SablierV2MerkleLT_v1_2_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.Clawback.contractRegister as any;

export const SablierV2MerkleLT_v1_2_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.Clawback.handler as any;

export const SablierV2MerkleLT_v1_2_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>) => void = HandlersJS.SablierV2MerkleLT_v1_2.Clawback.handlerWithLoader as any;

export const SablierV2MerkleLT_v1_2_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.Claim.contractRegister as any;

export const SablierV2MerkleLT_v1_2_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>> = HandlersJS.SablierV2MerkleLT_v1_2.Claim.handler as any;

export const SablierV2MerkleLT_v1_2_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>) => void = HandlersJS.SablierV2MerkleLT_v1_2.Claim.handlerWithLoader as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>> = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.contractRegister as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>> = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.handler as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>) => void = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.handlerWithLoader as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>> = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.contractRegister as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>> = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.handler as any;

export const SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>) => void = HandlersJS.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.handlerWithLoader as any;

export const SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>> = HandlersJS.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.contractRegister as any;

export const SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>> = HandlersJS.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.handler as any;

export const SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>) => void = HandlersJS.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.handlerWithLoader as any;

export const SablierV2MerkleStreamerLL_v1_1_TransferAdmin_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.contractRegister as any;

export const SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.handler as any;

export const SablierV2MerkleStreamerLL_v1_1_TransferAdmin_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>) => void = HandlersJS.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.handlerWithLoader as any;

export const SablierV2MerkleStreamerLL_v1_1_Clawback_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Clawback.contractRegister as any;

export const SablierV2MerkleStreamerLL_v1_1_Clawback_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Clawback.handler as any;

export const SablierV2MerkleStreamerLL_v1_1_Clawback_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>) => void = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Clawback.handlerWithLoader as any;

export const SablierV2MerkleStreamerLL_v1_1_Claim_contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Claim.contractRegister as any;

export const SablierV2MerkleStreamerLL_v1_1_Claim_handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>> = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Claim.handler as any;

export const SablierV2MerkleStreamerLL_v1_1_Claim_handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>) => void = HandlersJS.SablierV2MerkleStreamerLL_v1_1.Claim.handlerWithLoader as any;

export const SablierMerkleInstant_v1_3: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleInstant_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleInstant_v1_3_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierMerkleInstant_v1_3 as any;

export const SablierV2MerkleLT_v1_2: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLT_v1_2_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLT_v1_2_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierV2MerkleLT_v1_2 as any;

export const SablierV2MerkleStreamerFactory_v1_1: { CreateMerkleStreamerLL: {
  handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>) => void; 
  handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>>; 
  contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL_eventFilters>>
} } = HandlersJS.SablierV2MerkleStreamerFactory_v1_1 as any;

export const SablierV2MerkleStreamerLL_v1_1: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleStreamerLL_v1_1_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierV2MerkleStreamerLL_v1_1 as any;

export const SablierV2LockupLinear_v1_0: {
  CreateLockupLinearStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CreateLockupLinearStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_0_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupLinear_v1_0 as any;

export const SablierV2LockupDynamic_v1_2: {
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream_eventFilters>>
  }; 
  CreateLockupDynamicStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_2_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupDynamic_v1_2 as any;

export const SablierV2LockupLinear_v1_2: {
  CreateLockupLinearStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CreateLockupLinearStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_2_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupLinear_v1_2 as any;

export const SablierV2LockupTranched_v1_2: {
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_WithdrawFromLockupStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_Approval_eventFilters>>
  }; 
  CreateLockupTranchedStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupTranched_v1_2_CreateLockupTranchedStream_eventFilters>>
  }
} = HandlersJS.SablierV2LockupTranched_v1_2 as any;

export const SablierV2LockupDynamic_v1_1: {
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_WithdrawFromLockupStream_eventFilters>>
  }; 
  CreateLockupDynamicStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CreateLockupDynamicStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_1_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupDynamic_v1_1 as any;

export const SablierV2LockupDynamic_v1_0: {
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream_eventFilters>>
  }; 
  CreateLockupDynamicStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupDynamic_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupDynamic_v1_0_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupDynamic_v1_0 as any;

export const SablierFlow_v1_0: {
  RefundFromFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_RefundFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RefundFromFlowStream_eventFilters>>
  }; 
  WithdrawFromFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_WithdrawFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_WithdrawFromFlowStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_ApprovalForAll_eventFilters>>
  }; 
  CreateFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_CreateFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_CreateFlowStream_eventFilters>>
  }; 
  VoidFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_VoidFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_VoidFlowStream_eventFilters>>
  }; 
  RestartFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_RestartFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_RestartFlowStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Transfer_eventFilters>>
  }; 
  AdjustFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_AdjustFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_AdjustFlowStream_eventFilters>>
  }; 
  PauseFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_PauseFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_PauseFlowStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_Approval_eventFilters>>
  }; 
  DepositFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_0_DepositFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_0_DepositFlowStream_eventFilters>>
  }
} = HandlersJS.SablierFlow_v1_0 as any;

export const SablierMerkleLT_v1_3: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLT_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLT_v1_3_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierMerkleLT_v1_3 as any;

export const SablierV2LockupLinear_v1_1: {
  CreateLockupLinearStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CreateLockupLinearStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2LockupLinear_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2LockupLinear_v1_1_Approval_eventFilters>>
  }
} = HandlersJS.SablierV2LockupLinear_v1_1 as any;

export const SablierV2MerkleLockupFactory_v1_2: { CreateMerkleLL: {
  handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>) => void; 
  handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>>; 
  contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL_eventFilters>>
}; CreateMerkleLT: {
  handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>) => void; 
  handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>>; 
  contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT_eventFilters>>
} } = HandlersJS.SablierV2MerkleLockupFactory_v1_2 as any;

export const SablierLockup_v2_0: {
  CreateLockupLinearStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupLinearStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupLinearStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_ApprovalForAll_eventFilters>>
  }; 
  WithdrawFromLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_WithdrawFromLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_WithdrawFromLockupStream_eventFilters>>
  }; 
  CreateLockupDynamicStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupDynamicStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupDynamicStream_eventFilters>>
  }; 
  RenounceLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_RenounceLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_RenounceLockupStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Transfer_eventFilters>>
  }; 
  CancelLockupStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CancelLockupStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CancelLockupStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_Approval_eventFilters>>
  }; 
  CreateLockupTranchedStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_handlerContext,loaderReturn>>,Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierLockup_v2_0_CreateLockupTranchedStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierLockup_v2_0_CreateLockupTranchedStream_eventFilters>>
  }
} = HandlersJS.SablierLockup_v2_0 as any;

export const SablierMerkleFactory_v1_3: {
  CreateMerkleInstant: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleInstant_eventFilters>>
  }; 
  CreateMerkleLL: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLL_eventFilters>>
  }; 
  CreateMerkleLT: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleFactory_v1_3_CreateMerkleLT_eventFilters>>
  }
} = HandlersJS.SablierMerkleFactory_v1_3 as any;

export const SablierV2MerkleLL_v1_2: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierV2MerkleLL_v1_2_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierV2MerkleLL_v1_2_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierV2MerkleLL_v1_2 as any;

export const SablierMerkleLL_v1_3: {
  Clawback: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_Clawback_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Clawback_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_Clawback_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Clawback_eventFilters>>
  }; 
  Claim: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_Claim_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Claim_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_Claim_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_Claim_eventFilters>>
  }; 
  TransferAdmin: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_handlerContext,loaderReturn>>,Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierMerkleLL_v1_3_TransferAdmin_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierMerkleLL_v1_3_TransferAdmin_eventFilters>>
  }
} = HandlersJS.SablierMerkleLL_v1_3 as any;

export const SablierFlow_v1_1: {
  RefundFromFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_RefundFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RefundFromFlowStream_eventFilters>>
  }; 
  WithdrawFromFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_WithdrawFromFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_WithdrawFromFlowStream_eventFilters>>
  }; 
  ApprovalForAll: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_ApprovalForAll_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_ApprovalForAll_eventFilters>>
  }; 
  CreateFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_CreateFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_CreateFlowStream_eventFilters>>
  }; 
  VoidFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_VoidFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_VoidFlowStream_eventFilters>>
  }; 
  RestartFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_RestartFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_RestartFlowStream_eventFilters>>
  }; 
  Transfer: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_Transfer_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Transfer_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_Transfer_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Transfer_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Transfer_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_Transfer_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Transfer_eventFilters>>
  }; 
  AdjustFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_AdjustFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_AdjustFlowStream_eventFilters>>
  }; 
  PauseFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_PauseFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_PauseFlowStream_eventFilters>>
  }; 
  Approval: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_Approval_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Approval_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_Approval_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_Approval_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Approval_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_Approval_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_Approval_eventFilters>>
  }; 
  DepositFlowStream: {
    handlerWithLoader: <loaderReturn>(_1:Internal_genericHandlerWithLoader<Internal_genericLoader<Internal_genericLoaderArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_loaderContext>,loaderReturn>,Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_handlerContext,loaderReturn>>,Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>) => void; 
    handler: Types_fnWithEventConfig<Internal_genericHandler<Internal_genericHandlerArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_handlerContext,void>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>>; 
    contractRegister: Types_fnWithEventConfig<Internal_genericContractRegister<Internal_genericContractRegisterArgs<Types_SablierFlow_v1_1_DepositFlowStream_event,Types_contractRegistrations>>,Types_HandlerTypes_eventConfig<Types_SablierFlow_v1_1_DepositFlowStream_eventFilters>>
  }
} = HandlersJS.SablierFlow_v1_1 as any;
