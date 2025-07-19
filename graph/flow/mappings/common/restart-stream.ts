import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleRestartFlowStream(event: ethereum.Event, params: Params.RestartFlowStream): void {
  const id = params.streamId;
  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this Restart event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Restart is actually an adjustment.
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = stream.snapshotAmount.minus(withdrawnAmount);

  const now = event.block.timestamp;
  let depletionTime = now;
  if (availableAmount.gt(notWithdrawnAmount)) {
    const extraAmount = availableAmount.minus(notWithdrawnAmount);
    depletionTime = now.plus(extraAmount.div(stream.ratePerSecond));
  }
  stream.depletionTime = depletionTime;
  stream.lastAdjustmentTimestamp = now;
  stream.paused = false;
  stream.pausedTime = null;
  stream.pausedAction = null;
  stream.ratePerSecond = params.ratePerSecond;

  /* --------------------------------- ACTION --------------------------------- */
  const action = Store.Action.create(event, {
    addressA: params.sender,
    amountA: params.ratePerSecond,
    category: "Restart",
    streamId: stream.id,
  } as CommonParams.Action);
  stream.lastAdjustmentAction = action.id;
  stream.save();
}
