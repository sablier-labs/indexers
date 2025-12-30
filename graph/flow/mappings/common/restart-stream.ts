import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { computeDepletionTime, computeSnapshotAmount } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleRestartFlowStream(
  event: ethereum.Event,
  params: Params.RestartFlowStream
): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this Restart event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Restart is actually an adjustment.
  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);
  stream.depletionTime = computeDepletionTime(stream, now, snapshotAmount, params.ratePerSecond);
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
