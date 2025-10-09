import { Address, ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../common/constants";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleDepositFlowStream(event: ethereum.Event, params: Params.DepositFlowStream): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this DepositFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.depositedAmount = stream.depositedAmount.plus(params.amount);
  stream.availableAmount = stream.availableAmount.plus(params.amount);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);

  const now = event.block.timestamp;

  let snapshotAmount = stream.snapshotAmount;
  // If the stream has not started yet, the snapshot amount is not updated.
  if (now.gt(stream.startTime)) {
    const actualAdjustmentTime = stream.lastAdjustmentTimestamp.gt(stream.startTime)
      ? stream.lastAdjustmentTimestamp
      : stream.startTime;
    const elapsedTime = now.minus(actualAdjustmentTime);
    snapshotAmount = stream.snapshotAmount.plus(stream.ratePerSecond.times(elapsedTime));
  }
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount.minus(withdrawnAmount);

  // If the stream still has debt, mimic the contract behavior.
  if (availableAmount.gt(notWithdrawnAmount)) {
    const extraAmount = availableAmount.minus(notWithdrawnAmount);

    if (stream.ratePerSecond.gt(ZERO)) {
      const actualStartTime = now.gt(stream.startTime) ? now : stream.startTime;
      stream.depletionTime = actualStartTime.plus(extraAmount.div(stream.ratePerSecond));
    }
  }
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.funder,
    addressB: Address.fromBytes(stream.recipient),
    amountA: params.amount,
    category: "Deposit",
    streamId: stream.id,
  } as CommonParams.Action);
}
