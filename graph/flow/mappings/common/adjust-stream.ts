import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { computeDepletionTime, computeSnapshotAmount } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleAdjustFlowStream(
  event: ethereum.Event,
  params: Params.AdjustFlowStream
): void {
  const tokenId = params.tokenId;
  if (Store.DeprecatedStream.exists(event.address, tokenId)) {
    return;
  }

  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    logError("Stream not saved before this AdjustFlowStream event: {}", [tokenId.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);

  // The depletion time is recalculated only if the current depletion time is in the future.
  if (stream.depletionTime.gt(now)) {
    stream.depletionTime = computeDepletionTime(
      stream,
      now,
      snapshotAmount,
      params.newRatePerSecond
    );
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
