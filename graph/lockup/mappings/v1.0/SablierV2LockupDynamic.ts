import {
  Approval,
  ApprovalForAll,
  CancelLockupStream,
  CreateLockupDynamicStream,
  RenounceLockupStream,
  Transfer,
  WithdrawFromLockupStream,
} from "../../bindings/SablierV2LockupDynamic_v1_0/SablierV2LockupDynamic";
import { convertSegmentsV1_0 } from "../../helpers";
import { Store } from "../../store";
import {
  handleApproval,
  handleApprovalForAll,
  handleCancelLockupStream,
  handleRenounceLockupStream,
  handleTransfer,
  handleWithdrawFromStream,
} from "../common";

export function handle_SablierV2LockupDynamic_v1_0_Approval(event: Approval): void {
  handleApproval(event, {
    approved: event.params.approved,
    owner: event.params.owner,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierV2LockupDynamic_v1_0_ApprovalForAll(event: ApprovalForAll): void {
  handleApprovalForAll(event, {
    approved: event.params.approved,
    operator: event.params.operator,
    owner: event.params.owner,
  });
}

export function handle_SablierV2LockupDynamic_v1_0_CancelLockupStream(event: CancelLockupStream): void {
  handleCancelLockupStream(event, {
    recipient: event.params.recipient,
    recipientAmount: event.params.recipientAmount,
    sender: event.params.sender,
    senderAmount: event.params.senderAmount,
    streamId: event.params.streamId,
  });
}

export function handle_SablierV2LockupDynamic_v1_0_CreateLockupDynamicStream(event: CreateLockupDynamicStream): void {
  const params = event.params;
  Store.Stream.createDynamic(
    event,
    {
      asset: params.asset,
      cancelable: params.cancelable,
      category: "LockupDynamic",
      depositAmount: params.amounts.deposit,
      endTime: params.range.end,
      funder: params.funder,
      recipient: params.recipient,
      sender: params.sender,
      shape: null,
      startTime: params.range.start,
      streamId: params.streamId,
      transferable: true,
    },
    {
      segments: convertSegmentsV1_0(params.segments),
    },
  );
}

export function handle_SablierV2LockupDynamic_v1_0_RenounceLockupStream(event: RenounceLockupStream): void {
  handleRenounceLockupStream(event, {
    streamId: event.params.streamId,
  });
}

export function handle_SablierV2LockupDynamic_v1_0_Transfer(event: Transfer): void {
  handleTransfer(event, {
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierV2LockupDynamic_v1_0_WithdrawFromLockupStream(event: WithdrawFromLockupStream): void {
  handleWithdrawFromStream(event, {
    amount: event.params.amount,
    streamId: event.params.streamId,
    to: event.params.to,
  });
}
