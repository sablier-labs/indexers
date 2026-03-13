import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../../common/logger";
import { CommonParams } from "../../../../common/types";
import { computeDepletionTime, computeSnapshotAmount } from "../../../helpers/flow/stream-amounts";
import { Params } from "../../../helpers/flow/types";
import { FlowStore, Store } from "../../../store";

export function handleRefundFromFlowStream(
  event: ethereum.Event,
  params: Params.RefundFromFlowStream
): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = FlowStore.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this Refund event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.refundedAmount = stream.refundedAmount.plus(params.amount);
  stream.availableAmount = stream.availableAmount.minus(params.amount);

  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);
  stream.depletionTime = computeDepletionTime(stream, now, snapshotAmount, stream.ratePerSecond);
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  FlowStore.Action.create(event, {
    addressA: params.sender,
    amountA: params.amount,
    category: "Refund",
    streamId: stream.id,
  } as CommonParams.Action);
}
