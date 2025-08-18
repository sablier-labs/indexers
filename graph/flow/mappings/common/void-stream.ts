import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../common/constants";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleVoidFlowStream(event: ethereum.Event, params: Params.VoidFlowStream): void {
  const id = params.streamId;
  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this VoidFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Void is actually an adjustment with the new rate set to zero.
  const now = event.block.timestamp;
  const elapsedTime = now.minus(stream.lastAdjustmentTimestamp);
  const streamedAmount = stream.ratePerSecond.times(elapsedTime);
  const snapshotAmount = stream.snapshotAmount.plus(streamedAmount);

  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const maxAvailable = withdrawnAmount.plus(availableAmount);

  stream.depletionTime = ZERO;
  stream.forgivenDebt = params.writtenOffDebt;
  stream.lastAdjustmentTimestamp = now;
  stream.paused = true;
  stream.pausedTime = now;
  stream.ratePerSecond = ZERO;
  stream.snapshotAmount = maxAvailable.lt(snapshotAmount) ? maxAvailable : snapshotAmount;
  stream.voidedTime = now;
  stream.voided = true;

  /* --------------------------------- ACTION --------------------------------- */
  const action = Store.Action.create(event, {
    addressA: params.recipient,
    addressB: params.sender,
    amountA: params.newTotalDebt,
    amountB: params.writtenOffDebt,
    category: "Void",
    streamId: stream.id,
  } as CommonParams.Action);
  stream.lastAdjustmentAction = action.id;
  stream.pausedAction = action.id;
  stream.voidedAction = action.id;
  stream.save();
}
