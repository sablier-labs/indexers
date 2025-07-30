import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../common/constants";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleRefundFromFlowStream(event: ethereum.Event, params: Params.RefundFromFlowStream): void {
  const id = params.streamId;
  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this Refund event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.refundedAmount = stream.refundedAmount.plus(params.amount);
  stream.availableAmount = stream.availableAmount.minus(params.amount);

  const now = event.block.timestamp;
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const elapsedTime = now.minus(stream.lastAdjustmentTimestamp);
  const streamedAmount = stream.ratePerSecond.times(elapsedTime);
  const snapshotAmount = stream.snapshotAmount.plus(streamedAmount);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount.minus(withdrawnAmount);

  // If the entire available amount is refunded, the stream starts accruing now.
  const extraAmount = availableAmount.minus(notWithdrawnAmount);
  const depletionTime = now;
  if (extraAmount.notEqual(ZERO) || stream.ratePerSecond.notEqual(ZERO)) {
    stream.depletionTime = now.plus(extraAmount.div(stream.ratePerSecond));
  }
  stream.depletionTime = depletionTime;
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.sender,
    amountA: params.amount,
    category: "Refund",
    streamId: stream.id,
  } as CommonParams.Action);
}
