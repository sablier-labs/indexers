import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleAdjustFlowStream(event: ethereum.Event, params: Params.AdjustFlowStream): void {
  const tokenId = params.tokenId;
  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    logError("Stream not saved before this AdjustFlowStream event: {}", [tokenId.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  const now = event.block.timestamp;
  const elapsedTime = now.minus(stream.lastAdjustmentTimestamp);
  const streamedAmount = stream.ratePerSecond.times(elapsedTime);
  const snapshotAmount = stream.snapshotAmount.plus(streamedAmount);

  // The depletion time is recalculated only if the current depletion time is in the future.
  if (stream.depletionTime.gt(now)) {
    const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
    const notWithdrawn = snapshotAmount.minus(withdrawnAmount);
    const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
    const extraAmount = availableAmount.minus(notWithdrawn);
    stream.depletionTime = now.plus(extraAmount.div(params.newRatePerSecond));
  }

  stream.lastAdjustmentTimestamp = now;
  stream.ratePerSecond = params.newRatePerSecond;
  stream.snapshotAmount = snapshotAmount;

  /* --------------------------------- ACTION --------------------------------- */
  const action = Store.Action.create(event, {
    amountA: params.oldRatePerSecond,
    amountB: params.newRatePerSecond,
    category: "Adjust",
    streamId: stream.id,
  } as CommonParams.Action);
  stream.lastAdjustmentAction = action.id;
  stream.save();
}
