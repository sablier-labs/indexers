  @genType
module SablierFlow_v1_0 = {
  module Approval = Types.MakeRegister(Types.SablierFlow_v1_0.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierFlow_v1_0.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierFlow_v1_0.Transfer)
  module AdjustFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.AdjustFlowStream)
  module CreateFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.CreateFlowStream)
  module DepositFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.DepositFlowStream)
  module PauseFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.PauseFlowStream)
  module RefundFromFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.RefundFromFlowStream)
  module RestartFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.RestartFlowStream)
  module VoidFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.VoidFlowStream)
  module WithdrawFromFlowStream = Types.MakeRegister(Types.SablierFlow_v1_0.WithdrawFromFlowStream)
}

  @genType
module SablierFlow_v1_1 = {
  module Approval = Types.MakeRegister(Types.SablierFlow_v1_1.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierFlow_v1_1.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierFlow_v1_1.Transfer)
  module AdjustFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.AdjustFlowStream)
  module CreateFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.CreateFlowStream)
  module DepositFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.DepositFlowStream)
  module PauseFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.PauseFlowStream)
  module RefundFromFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.RefundFromFlowStream)
  module RestartFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.RestartFlowStream)
  module VoidFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.VoidFlowStream)
  module WithdrawFromFlowStream = Types.MakeRegister(Types.SablierFlow_v1_1.WithdrawFromFlowStream)
}

  @genType
module SablierLockup_v2_0 = {
  module Approval = Types.MakeRegister(Types.SablierLockup_v2_0.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierLockup_v2_0.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierLockup_v2_0.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierLockup_v2_0.CancelLockupStream)
  module CreateLockupDynamicStream = Types.MakeRegister(Types.SablierLockup_v2_0.CreateLockupDynamicStream)
  module CreateLockupLinearStream = Types.MakeRegister(Types.SablierLockup_v2_0.CreateLockupLinearStream)
  module CreateLockupTranchedStream = Types.MakeRegister(Types.SablierLockup_v2_0.CreateLockupTranchedStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierLockup_v2_0.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierLockup_v2_0.WithdrawFromLockupStream)
}

  @genType
module SablierMerkleFactory_v1_3 = {
  module CreateMerkleInstant = Types.MakeRegister(Types.SablierMerkleFactory_v1_3.CreateMerkleInstant)
  module CreateMerkleLL = Types.MakeRegister(Types.SablierMerkleFactory_v1_3.CreateMerkleLL)
  module CreateMerkleLT = Types.MakeRegister(Types.SablierMerkleFactory_v1_3.CreateMerkleLT)
}

  @genType
module SablierMerkleInstant_v1_3 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierMerkleInstant_v1_3.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierMerkleInstant_v1_3.Clawback)
  module Claim = Types.MakeRegister(Types.SablierMerkleInstant_v1_3.Claim)
}

  @genType
module SablierMerkleLL_v1_3 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierMerkleLL_v1_3.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierMerkleLL_v1_3.Clawback)
  module Claim = Types.MakeRegister(Types.SablierMerkleLL_v1_3.Claim)
}

  @genType
module SablierMerkleLT_v1_3 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierMerkleLT_v1_3.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierMerkleLT_v1_3.Clawback)
  module Claim = Types.MakeRegister(Types.SablierMerkleLT_v1_3.Claim)
}

  @genType
module SablierV2LockupDynamic_v1_0 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.CancelLockupStream)
  module CreateLockupDynamicStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupDynamic_v1_1 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.CancelLockupStream)
  module CreateLockupDynamicStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupDynamic_v1_2 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.CancelLockupStream)
  module CreateLockupDynamicStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupLinear_v1_0 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.CancelLockupStream)
  module CreateLockupLinearStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupLinear_v1_1 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.CancelLockupStream)
  module CreateLockupLinearStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupLinear_v1_2 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.CancelLockupStream)
  module CreateLockupLinearStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream)
}

  @genType
module SablierV2LockupTranched_v1_2 = {
  module Approval = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.Approval)
  module ApprovalForAll = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.ApprovalForAll)
  module Transfer = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.Transfer)
  module CancelLockupStream = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.CancelLockupStream)
  module CreateLockupTranchedStream = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream)
  module RenounceLockupStream = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.RenounceLockupStream)
  module WithdrawFromLockupStream = Types.MakeRegister(Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream)
}

  @genType
module SablierV2MerkleLL_v1_2 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierV2MerkleLL_v1_2.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierV2MerkleLL_v1_2.Clawback)
  module Claim = Types.MakeRegister(Types.SablierV2MerkleLL_v1_2.Claim)
}

  @genType
module SablierV2MerkleLT_v1_2 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierV2MerkleLT_v1_2.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierV2MerkleLT_v1_2.Clawback)
  module Claim = Types.MakeRegister(Types.SablierV2MerkleLT_v1_2.Claim)
}

  @genType
module SablierV2MerkleLockupFactory_v1_2 = {
  module CreateMerkleLL = Types.MakeRegister(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL)
  module CreateMerkleLT = Types.MakeRegister(Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT)
}

  @genType
module SablierV2MerkleStreamerFactory_v1_1 = {
  module CreateMerkleStreamerLL = Types.MakeRegister(Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL)
}

  @genType
module SablierV2MerkleStreamerLL_v1_1 = {
  module TransferAdmin = Types.MakeRegister(Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin)
  module Clawback = Types.MakeRegister(Types.SablierV2MerkleStreamerLL_v1_1.Clawback)
  module Claim = Types.MakeRegister(Types.SablierV2MerkleStreamerLL_v1_1.Claim)
}

