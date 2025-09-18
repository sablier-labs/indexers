import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_RefundFromFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_RefundFromFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";

type Handler = Handler_v1_0 & Handler_v1_1;

const handler: Handler = async ({ context, event }) => {
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.Stream.getOrThrow(streamId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  const refundedAmount = stream.refundedAmount + event.params.amount;
  const availableAmount = stream.availableAmount - event.params.amount;
  const scaledAvailableAmount = scale(availableAmount, stream.assetDecimalsValue);

  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const streamedAmount = stream.ratePerSecond * elapsedTime;
  const snapshotAmount = stream.snapshotAmount + streamedAmount;
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);

  const notWithdrawnAmount = snapshotAmount - withdrawnAmount;

  // If the entire available amount is refunded, the stream starts accruing now.
  const extraAmount = scaledAvailableAmount - notWithdrawnAmount;
  let depletionTime: bigint = now;
  if (extraAmount !== 0n && stream.ratePerSecond !== 0n) {
    depletionTime = now + extraAmount / stream.ratePerSecond;
  }

  const updatedStream = {
    ...stream,
    availableAmount,
    depletionTime,
    refundedAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.sender,
    amountA: event.params.amount,
    category: "Refund",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const refundStream = { handler };
