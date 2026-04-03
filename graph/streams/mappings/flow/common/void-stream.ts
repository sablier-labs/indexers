import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../../common/constants";
import { logError } from "../../../../common/logger";
import { CommonParams } from "../../../../common/types";
import { scale } from "../../../helpers/flow/amounts";
import { computeSnapshotAmount } from "../../../helpers/flow/stream-amounts";
import { Params } from "../../../helpers/flow/types";
import { FlowStore, Store } from "../../../store";

export function handleVoidFlowStream(event: ethereum.Event, params: Params.VoidFlowStream): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = FlowStore.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this VoidFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Void is actually an adjustment with the new rate set to zero.
  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);

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
  const action = FlowStore.Action.create(event, {
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
