import {
  Approval,
  ApprovalForAll,
  CancelLockupStream,
  CreateLockupDynamicStream,
  RenounceLockupStream,
  Transfer,
  WithdrawFromLockupStream,
} from "../../bindings/SablierV2LockupDynamic_v1_2/SablierV2LockupDynamic";
import { convertSegmentsV1_2 } from "../../helpers";
import { Store } from "../../store";
import {
  handleApproval,
  handleApprovalForAll,
  handleCancelLockupStream,
  handleRenounceLockupStream,
  handleTransfer,
  handleWithdrawFromStream,
} from "../common";

export function handle_SablierV2LockupDynamic_v1_2_Approval(event: Approval): void {
  handleApproval(event, {
    approved: event.params.approved,
    owner: event.params.owner,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierV2LockupDynamic_v1_2_ApprovalForAll(event: ApprovalForAll): void {
  handleApprovalForAll(event, {
    approved: event.params.approved,
    operator: event.params.operator,
    owner: event.params.owner,
  });
}

export function handle_SablierV2LockupDynamic_v1_2_CancelLockupStream(event: CancelLockupStream): void {
  handleCancelLockupStream(event, {
    recipient: event.params.recipient,
    recipientAmount: event.params.recipientAmount,
    sender: event.params.sender,
    senderAmount: event.params.senderAmount,
    streamId: event.params.streamId,
  });
}

export function handle_SablierV2LockupDynamic_v1_2_CreateLockupDynamicStream(event: CreateLockupDynamicStream): void {
  const params = event.params;
  Store.Stream.createDynamic(
    event,
    {
      asset: params.asset,
      cancelable: params.cancelable,
      category: "LockupDynamic",
      depositAmount: params.amounts.deposit,
      endTime: params.timestamps.end,
      funder: params.funder,
      recipient: params.recipient,
      sender: params.sender,
      shape: null,
      startTime: params.timestamps.start,
      streamId: params.streamId,
      transferable: params.transferable,
    },
    {
      segments: convertSegmentsV1_2(params.segments),
    },
  );
}

export function handle_SablierV2LockupDynamic_v1_2_RenounceLockupStream(event: RenounceLockupStream): void {
  handleRenounceLockupStream(event, {
    streamId: event.params.streamId,
  });
}

export function handle_SablierV2LockupDynamic_v1_2_Transfer(event: Transfer): void {
  handleTransfer(event, {
    from: event.params.from,
    to: event.params.to,
    tokenId: event.params.tokenId,
  });
}

export function handle_SablierV2LockupDynamic_v1_2_WithdrawFromLockupStream(event: WithdrawFromLockupStream): void {
  handleWithdrawFromStream(event, {
    amount: event.params.amount,
    streamId: event.params.streamId,
    to: event.params.to,
  });
}
