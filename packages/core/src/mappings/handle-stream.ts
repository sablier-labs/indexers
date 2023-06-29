import { dataSource, log } from "@graphprotocol/graph-ts";
import { CreateLockupDynamicStream as EventCreateDynamic } from "../generated/types/templates/ContractLockupDynamic/SablierV2LockupDynamic";
import {
  Approval as EventApproval,
  ApprovalForAll as EventApprovalForAll,
  CancelLockupStream as EventCancel,
  RenounceLockupStream as EventRenounce,
  Transfer as EventTransfer,
  TransferAdmin as EventTransferAdmin,
  WithdrawFromLockupStream as EventWithdraw,
} from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { CreateLockupLinearStream as EventCreateLinear } from "../generated/types/templates/ContractLockupLinear/SablierV2LockupLinear";
import { one, zero } from "../constants";
import {
  createAction,
  getContractById,
  getOrCreateWatcher,
  getStreamByIdFromSource,
} from "../helpers";
import { createDynamicStream, createLinearStream } from "../helpers/stream";

export function handleCreateLinear(event: EventCreateLinear): void {
  let stream = createLinearStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.amounts.deposit;

  if (stream.cancelable == false) {
    stream.renounceAction = action.id;
    stream.renounceTime = event.block.timestamp;
  }
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleCreateDynamic(event: EventCreateDynamic): void {
  let stream = createDynamicStream(event);
  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.amounts.deposit;

  if (stream.cancelable == false) {
    stream.renounceAction = action.id;
    stream.renounceTime = event.block.timestamp;
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleCancel(event: EventCancel): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    log.info(
      "[SABLIER] Stream hasn't been registered before this cancel event: {}",
      [id.toHexString()],
    );
    log.error("[SABLIER]", []);
    return;
  }

  let action = createAction(event);
  action.category = "Cancel";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.senderAmount;
  action.amountB = event.params.recipientAmount;
  /** --------------- */

  stream.cancelable = false;
  stream.canceled = true;
  stream.canceledAction = action.id;
  stream.canceledTime = event.block.timestamp;
  stream.intactAmount = event.params.recipientAmount; // The only amount remaining in the stream is the non-withdrawn recipient amount

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleRenounce(event: EventRenounce): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);

  if (stream == null) {
    return;
  }

  let action = createAction(event);
  action.category = "Renounce";

  /** --------------- */

  stream.cancelable = false;
  stream.renounceAction = action.id;
  stream.renounceTime = event.block.timestamp;

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleTransfer(event: EventTransfer): void {
  let id = event.params.tokenId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    log.info(
      "[SABLIER] Stream hasn't been registered before this transfer event: {}",
      [id.toHexString()],
    );
    log.error("[SABLIER]", []);
    return;
  }

  let action = createAction(event);
  action.category = "Transfer";

  action.addressA = event.params.from;
  action.addressB = event.params.to;

  /** --------------- */

  stream.recipient = event.params.to;
  stream.parties = [stream.sender, event.params.to];

  if (stream.proxied && stream.proxender != null) {
    stream.parties.push(stream.proxender);
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleWithdraw(event: EventWithdraw): void {
  let id = event.params.streamId;
  let stream = getStreamByIdFromSource(id);
  if (stream == null) {
    log.info(
      "[SABLIER] Stream hasn't been registered before this withdraw event: {}",
      [id.toHexString()],
    );
    log.error("[SABLIER]", []);
    return;
  }

  let action = createAction(event);
  action.category = "Withdraw";
  action.addressA = event.transaction.from;
  action.addressB = event.params.to;
  action.amountB = event.params.amount;

  /** --------------- */

  let withdrawn = stream.withdrawnAmount.plus(event.params.amount);
  stream.withdrawnAmount = withdrawn;

  if (stream.canceledAction) {
    stream.intactAmount = stream.intactAmount.minus(event.params.amount); // The intact amount (recipient) has been set in the cancel action, now subtract
  } else {
    stream.intactAmount = stream.depositAmount.minus(withdrawn);
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleApproval(event: EventApproval): void {
  let id = event.params.tokenId;
  let stream = getStreamByIdFromSource(id);

  if (stream == null) {
    log.info(
      "[SABLIER] Stream hasn't been registered before this approval event: {}",
      [id.toHexString()],
    );
    return;
  }

  let action = createAction(event);
  action.category = "Approval";

  action.addressA = event.params.owner;
  action.addressB = event.params.approved;

  /** --------------- */

  action.stream = stream.id;
  action.save();
}
export function handleApprovalForAll(event: EventApprovalForAll): void {
  let action = createAction(event);
  action.category = "ApprovalForAll";

  action.addressA = event.params.owner;
  action.addressB = event.params.operator;
  action.amountA = event.params.approved ? one : zero;

  /** --------------- */

  action.save();
}

/**
 * Use the TransferAdmin event as an `onCreate` lifecycle step
 * as it's the first one to be logged after the contract's creation
 */
export function handleTransferAdmin(event: EventTransferAdmin): void {
  let contract = getContractById(dataSource.address().toHexString());
  if (contract == null) {
    log.info(
      "[SABLIER] Contract hasn't been registered before this transfer admin event: {}",
      [dataSource.address().toHexString()],
    );
    log.error("[SABLIER]", []);
    return;
  }

  let watcher = getOrCreateWatcher();
  watcher.logs.push(
    "Transfer for: ".concat(dataSource.address().toHexString()),
  );
  watcher.save();

  contract.admin = event.params.newAdmin;
  contract.save();
}
