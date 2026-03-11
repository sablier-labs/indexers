import { isDeprecatedStream } from "../../../../common/deprecated";
import { Id } from "../../../../common/id";
import type {
  SablierFlow_v1_0_AdjustFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_AdjustFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_AdjustFlowStream_handler as Handler_v2_0,
} from "../../../bindings/src/Types.gen";
import { scale } from "../../../helpers";
import * as StreamsWatcher from "../../../store/entity-watcher";
import * as FlowAction from "../../../store/flow/entity-action";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.FlowStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this adjust event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const now = BigInt(event.block.timestamp);
  // If the stream has not started yet, the snapshot amount is not updated.
  let snapshotAmount = stream.snapshotAmount;
  if (now > stream.startTime) {
    const actualAdjustmentTime =
      stream.lastAdjustmentTimestamp > stream.startTime
        ? stream.lastAdjustmentTimestamp
        : stream.startTime;
    const elapsedTime = now - actualAdjustmentTime;
    const streamedAmount = stream.ratePerSecond * elapsedTime;
    snapshotAmount = stream.snapshotAmount + streamedAmount;
  }

  // The depletion time is recalculated only if the current depletion time is in the future.
  let depletionTime = stream.depletionTime;
  if (stream.depletionTime > now) {
    const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
    const notWithdrawn = snapshotAmount - withdrawnAmount;
    const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
    const extraAmount = availableAmount - notWithdrawn;
    const actualStartTime = now > stream.startTime ? now : stream.startTime;
    depletionTime = actualStartTime + extraAmount / event.params.newRatePerSecond;
  }

  const updatedStream = {
    ...stream,
    depletionTime,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    ratePerSecond: event.params.newRatePerSecond,
    snapshotAmount,
  };
  context.FlowStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  FlowAction.create(context, event, ensuredWatcher, {
    amountA: event.params.oldRatePerSecond,
    amountB: event.params.newRatePerSecond,
    category: "Adjust",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

export const adjustStream = { handler };
