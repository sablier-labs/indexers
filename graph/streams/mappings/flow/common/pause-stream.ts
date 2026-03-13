import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../../common/constants";
import { logError } from "../../../../common/logger";
import { CommonParams } from "../../../../common/types";
import { computeSnapshotAmount } from "../../../helpers/flow/stream-amounts";
import { Params } from "../../../helpers/flow/types";
import { FlowStore, Store } from "../../../store";

export function handlePauseFlowStream(event: ethereum.Event, params: Params.PauseFlowStream): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = FlowStore.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this Pause event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Paused is actually an adjustment with the new rate set to zero.
  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);

  stream.lastAdjustmentTimestamp = now;
  stream.paused = true;
  stream.pausedTime = now;
  stream.ratePerSecond = ZERO;
  stream.snapshotAmount = snapshotAmount;

  /* --------------------------------- ACTION --------------------------------- */
  const action = FlowStore.Action.create(event, {
    addressA: params.recipient,
    addressB: params.sender,
    amountA: params.totalDebt,
    category: "Pause",
    streamId: stream.id,
  } as CommonParams.Action);
  stream.lastAdjustmentAction = action.id;
  stream.pausedAction = action.id;
  stream.save();
}
