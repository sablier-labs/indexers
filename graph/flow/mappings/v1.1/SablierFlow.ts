import {
  AdjustFlowStream,
  Approval,
  ApprovalForAll,
  CreateFlowStream,
  DepositFlowStream,
  PauseFlowStream,
  RefundFromFlowStream,
  RestartFlowStream,
  Transfer,
  VoidFlowStream,
  WithdrawFromFlowStream,
} from "../../bindings/SablierFlow_v1_1/SablierFlow";

import {
  handleAdjustFlowStream,
  handleApproval,
  handleApprovalForAll,
  handleCreateFlowStream,
  handleDepositFlowStream,
  handlePauseFlowStream,
  handleRefundFromFlowStream,
  handleRestartFlowStream,
  handleTransfer,
  handleVoidFlowStream,
  handleWithdrawFromFlowStream,
} from "../common";

export function handle_SablierFlow_v1_1_AdjustFlowStream(event: AdjustFlowStream): void {
  handleAdjustFlowStream(event, {
    newRatePerSecond: event.params.newRatePerSecond,
    oldRatePerSecond: event.params.oldRatePerSecond,
    tokenId: event.params.streamId,
  });
}

export function handle_SablierFlow_v1_1_Approval(event: Approval): void {
  handleApproval(event, {
    approved: event.params.approved,
    owner: event.params.owner,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierFlow_v1_1_ApprovalForAll(event: ApprovalForAll): void {
  handleApprovalForAll(event, {
    approved: event.params.approved,
    operator: event.params.operator,
    owner: event.params.owner,
  });
}

export function handle_SablierFlow_v1_1_CreateFlowStream(event: CreateFlowStream): void {
  handleCreateFlowStream(event, {
    ratePerSecond: event.params.ratePerSecond,
    recipient: event.params.recipient,
    sender: event.params.sender,
    streamId: event.params.streamId,
    token: event.params.token,
    transferable: event.params.transferable,
  });
}

export function handle_SablierFlow_v1_1_DepositFlowStream(event: DepositFlowStream): void {
  handleDepositFlowStream(event, {
    amount: event.params.amount,
    funder: event.params.funder,
    streamId: event.params.streamId,
  });
}

export function handle_SablierFlow_v1_1_PauseFlowStream(event: PauseFlowStream): void {
  handlePauseFlowStream(event, {
    recipient: event.params.recipient,
    sender: event.params.sender,
    streamId: event.params.streamId,
    totalDebt: event.params.totalDebt,
  });
}

export function handle_SablierFlow_v1_1_RefundFromFlowStream(event: RefundFromFlowStream): void {
  handleRefundFromFlowStream(event, {
    amount: event.params.amount,
    sender: event.params.sender,
    streamId: event.params.streamId,
  });
}

export function handle_SablierFlow_v1_1_RestartFlowStream(event: RestartFlowStream): void {
  handleRestartFlowStream(event, {
    ratePerSecond: event.params.ratePerSecond,
    sender: event.params.sender,
    streamId: event.params.streamId,
  });
}

export function handle_SablierFlow_v1_1_Transfer(event: Transfer): void {
  handleTransfer(event, {
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierFlow_v1_1_VoidFlowStream(event: VoidFlowStream): void {
  handleVoidFlowStream(event, {
    newTotalDebt: event.params.newTotalDebt,
    recipient: event.params.recipient,
    sender: event.params.sender,
    streamId: event.params.streamId,
    writtenOffDebt: event.params.writtenOffDebt,
  });
}

export function handle_SablierFlow_v1_1_WithdrawFromFlowStream(event: WithdrawFromFlowStream): void {
  handleWithdrawFromFlowStream(event, {
    caller: event.params.caller,
    streamId: event.params.streamId,
    to: event.params.to,
    withdrawAmount: event.params.withdrawAmount,
  });
}
