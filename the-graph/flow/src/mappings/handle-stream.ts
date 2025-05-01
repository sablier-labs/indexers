import { dataSource, log } from "@graphprotocol/graph-ts";
import {
  AdjustFlowStream as EventAdjust,
  Approval as EventApproval,
  ApprovalForAll as EventApprovalForAll,
  CreateFlowStream as EventCreate,
  DepositFlowStream as EventDeposit,
  PauseFlowStream as EventPause,
  RefundFromFlowStream as EventRefund,
  RestartFlowStream as EventRestart,
  Transfer as EventTransfer,
  TransferAdmin as EventTransferAdmin,
  VoidFlowStream as EventVoid,
  WithdrawFromFlowStream as EventWithdraw,
} from "../generated/types/templates/ContractFlow/SablierFlow";
import { ADDRESS_ZERO, FLOW_SCALED_DECIMALS, one, zero } from "../constants";
import {
  createAction,
  createStream,
  getContractByAddress,
  getStreamByIdFromSource,
} from "../helpers";
import { toScaled } from "../utils";

export function handleCreate(event: EventCreate): void {
  let stream = createStream(event);
  if (stream == null) {
    return;
  }
  let action = createAction(event);
  action.category = "Create";
  action.addressA = event.params.sender;
  action.addressB = event.params.recipient;
  action.amountA = event.params.ratePerSecond; /** Scaled 18D */

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleAdjust(event: EventAdjust): void {
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
  action.category = "Adjust";
  action.amountA = event.params.oldRatePerSecond; /** Scaled 18D */
  action.amountB = event.params.newRatePerSecond; /** Scaled 18D */
  /** --------------- */

  stream.lastAdjustmentAction = action.id;

  /** --------------- */

  const timeSinceLastSnapshot = event.block.timestamp.minus(
    stream.lastAdjustmentTimestamp,
  );

  const snapshotAmountScaled = stream.snapshotAmount.plus(
    stream.ratePerSecond.times(timeSinceLastSnapshot),
  ); /** Scaled 18D */

  /** The depletionTime should be recalculated only if depletion is happening in the future (meaning extra amount exists inside the stream) */

  if (stream.depletionTime.gt(event.block.timestamp)) {
    const withdrawnAmountScaled = toScaled(
      stream.withdrawnAmount,
      stream.asset,
    ); /** Scaled 18D */

    const notWithdrawnScaled = snapshotAmountScaled.minus(
      withdrawnAmountScaled,
    ); /** Scaled 18D */

    const availableAmountScaled = toScaled(
      stream.availableAmount,
      stream.asset,
    ); /** Scaled 18D */

    const extraAmountScaled =
      availableAmountScaled.minus(notWithdrawnScaled); /** Scaled 18D */

    stream.depletionTime = event.block.timestamp.plus(
      extraAmountScaled.div(event.params.newRatePerSecond),
    );
  }

  stream.ratePerSecond = event.params.newRatePerSecond; /** Scaled 18D */
  stream.lastAdjustmentTimestamp = event.block.timestamp;
  stream.snapshotAmount = snapshotAmountScaled; /** Scaled 18D */

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleDeposit(event: EventDeposit): void {
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
  action.category = "Deposit";
  action.addressA = event.params.funder;
  action.amountA = event.params.amount;

  /** --------------- */

  stream.depositedAmount = stream.depositedAmount.plus(event.params.amount);

  const availableAmount = stream.availableAmount.plus(event.params.amount);
  const availableAmountScaled = toScaled(
    availableAmount,
    stream.asset,
  ); /** Scaled 18D */

  const timeSinceLastSnapshot = event.block.timestamp.minus(
    stream.lastAdjustmentTimestamp,
  );

  const snapshotAmountScaled = stream.snapshotAmount.plus(
    stream.ratePerSecond.times(timeSinceLastSnapshot),
  ); /** Scaled 18D */

  const withdrawnAmountScaled = toScaled(
    stream.withdrawnAmount,
    stream.asset,
  ); /** Scaled 18D */

  const notWithdrawnScaled = snapshotAmountScaled.minus(
    withdrawnAmountScaled,
  ); /** Scaled 18D */

  /** If the the stream still has debt mimic the contract behavior */

  if (availableAmountScaled.gt(notWithdrawnScaled)) {
    const extraAmountScaled =
      availableAmountScaled.minus(notWithdrawnScaled); /** Scaled 18D */

    if (!stream.ratePerSecond.isZero()) {
      stream.depletionTime = event.block.timestamp.plus(
        extraAmountScaled.div(stream.ratePerSecond),
      );
    }
  }

  stream.availableAmount = availableAmount;
  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handlePause(event: EventPause): void {
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
  action.category = "Pause";
  action.addressA = event.params.recipient;
  action.addressB = event.params.sender;
  action.amountA = event.params.totalDebt;

  stream.paused = true;
  stream.pausedTime = event.block.timestamp;
  stream.pausedAction = action.id;

  /** --------------- */

  /* Paused is actually an adjustment with the newRate per second equal to zero */

  const timeSinceLastSnapshot = event.block.timestamp.minus(
    stream.lastAdjustmentTimestamp,
  );

  const snapshotAmountScaled = stream.snapshotAmount.plus(
    stream.ratePerSecond.times(timeSinceLastSnapshot),
  ); /** Scaled 18D */

  stream.lastAdjustmentAction = action.id;
  stream.lastAdjustmentTimestamp = event.block.timestamp;
  stream.snapshotAmount = snapshotAmountScaled; /** Scaled 18D */

  stream.ratePerSecond = zero;

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleRefund(event: EventRefund): void {
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
  action.category = "Refund";
  action.addressA = event.params.sender;
  action.amountA = event.params.amount;

  /** --------------- */

  stream.refundedAmount = stream.refundedAmount.plus(event.params.amount);

  stream.availableAmount = stream.availableAmount.minus(event.params.amount);
  const availableAmountScaled = toScaled(
    stream.availableAmount,
    stream.asset,
  ); /** Scaled 18D */

  const timeSinceLastSnapshot = event.block.timestamp.minus(
    stream.lastAdjustmentTimestamp,
  );

  const snapshotAmountScaled = stream.snapshotAmount.plus(
    stream.ratePerSecond.times(timeSinceLastSnapshot),
  ); /** Scaled 18D */

  const withdrawnAmountScaled = toScaled(
    stream.withdrawnAmount,
    stream.asset,
  ); /** Scaled 18D */

  const notWithdrawnScaled = snapshotAmountScaled.minus(
    withdrawnAmountScaled,
  ); /** Scaled 18D */

  /** If refunded all the available amount the stream start accruing now  */
  const extraAmountScaled = availableAmountScaled.minus(notWithdrawnScaled);

  if (extraAmountScaled.equals(zero) || stream.ratePerSecond.equals(zero)) {
    stream.depletionTime = event.block.timestamp;
  } else {
    stream.depletionTime = event.block.timestamp.plus(
      extraAmountScaled.div(stream.ratePerSecond),
    );
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleRestart(event: EventRestart): void {
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
  action.category = "Restart";
  action.addressA = event.params.sender;
  action.amountA = event.params.ratePerSecond; /** Scaled 18D */

  stream.paused = false;
  stream.pausedTime = null;
  stream.pausedAction = null;
  stream.voided = false;
  stream.voidedTime = null;
  stream.voidedAction = null;

  /** Restart is actually an adjustment */

  stream.lastAdjustmentAction = action.id;
  stream.lastAdjustmentTimestamp = event.block.timestamp;
  stream.ratePerSecond = event.params.ratePerSecond; /** Scaled 18D */

  const withdrawnAmountScaled = toScaled(
    stream.withdrawnAmount,
    stream.asset,
  ); /** Scaled 18D */

  const notWithdrawnScaled = stream.snapshotAmount.minus(
    withdrawnAmountScaled,
  ); /** Scaled 18D */

  const availableAmountScaled = toScaled(
    stream.availableAmount,
    stream.asset,
  ); /** Scaled 18D */

  if (availableAmountScaled.gt(notWithdrawnScaled)) {
    const extraAmountScaled =
      availableAmountScaled.minus(notWithdrawnScaled); /** Scaled 18D */

    stream.depletionTime = event.block.timestamp.plus(
      extraAmountScaled.div(stream.ratePerSecond),
    );
  } else {
    stream.depletionTime = event.block.timestamp;
  }

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleTransfer(event: EventTransfer): void {
  /**
   * As described in issue #18, we will first filter out
   * any `Transfer` events emitted by the initial mint transaction
   */

  if (event.params.from.equals(ADDRESS_ZERO)) {
    return;
  }

  /** --------------- */

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

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleVoid(event: EventVoid): void {
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
  action.category = "Void";
  action.addressA = event.params.recipient;
  action.addressB = event.params.sender;
  action.amountA = event.params.newTotalDebt;
  action.amountB = event.params.writtenOffDebt;

  const timeSinceLastSnapshot = event.block.timestamp.minus(
    stream.lastAdjustmentTimestamp,
  );

  const snapshotAmountScaled = stream.snapshotAmount.plus(
    stream.ratePerSecond.times(timeSinceLastSnapshot),
  ); /** Scaled 18D */

  const withdrawnAmountScaled = toScaled(
    stream.withdrawnAmount,
    stream.asset,
  ); /** Scaled 18D */

  const availableAmountScaled = toScaled(
    stream.availableAmount,
    stream.asset,
  ); /** Scaled 18D */

  const maxAvailableScaled = withdrawnAmountScaled.plus(
    availableAmountScaled,
  ); /** Scaled 18D */

  stream.voided = true;
  stream.paused = true;

  stream.pausedTime = event.block.timestamp;
  stream.pausedAction = action.id;
  stream.voidedTime = event.block.timestamp;
  stream.voidedAction = action.id;
  /**Void is actually an adjustment with the newRate per second equal to zero */
  stream.lastAdjustmentAction = action.id;
  stream.lastAdjustmentTimestamp = event.block.timestamp;

  stream.snapshotAmount = maxAvailableScaled.lt(snapshotAmountScaled)
    ? maxAvailableScaled
    : snapshotAmountScaled; /** Scaled 18D */
  stream.forgivenDebt = event.params.writtenOffDebt;
  stream.ratePerSecond = zero;
  stream.depletionTime = zero;

  stream.save();
  action.stream = stream.id;
  action.save();
}

export function handleWithdraw(event: EventWithdraw): void {
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
  action.category = "Withdraw";
  action.addressA = event.params.caller;
  action.addressB = event.params.to;
  action.amountA = event.params.withdrawAmount;

  stream.availableAmount = stream.availableAmount.minus(
    event.params.withdrawAmount,
  );
  stream.withdrawnAmount = stream.withdrawnAmount.plus(
    event.params.withdrawAmount,
  );

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
  let contract = getContractByAddress(dataSource.address());
  if (contract == null) {
    log.info(
      "[SABLIER] Contract hasn't been registered before this transfer admin event: {}",
      [dataSource.address().toHexString()],
    );
    log.error("[SABLIER]", []);
    return;
  }

  contract.admin = event.params.newAdmin;
  contract.save();
}
