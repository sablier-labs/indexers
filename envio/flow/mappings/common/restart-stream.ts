import { isDeprecatedStream } from "../../../common/deprecated";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_RestartFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_RestartFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_RestartFlowStream_handler as Handler_v2_0,
  SablierFlow_v2_1_RestartFlowStream_handler as Handler_v2_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0 & Handler_v2_1;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.Stream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this restart event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? CommonStore.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Restart is actually an adjustment
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = stream.snapshotAmount - withdrawnAmount;

  const now = BigInt(event.block.timestamp);
  let depletionTime = now;
  if (availableAmount > notWithdrawnAmount) {
    const extraAmountScaled = availableAmount - notWithdrawnAmount;

    depletionTime = now + extraAmountScaled / event.params.ratePerSecond;
  }

  const updatedStream: Entity.Stream = {
    ...stream,
    depletionTime,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    paused: false,
    pausedAction_id: undefined,
    pausedTime: undefined,
    ratePerSecond: event.params.ratePerSecond,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, ensuredWatcher, {
    addressA: event.params.sender,
    amountA: event.params.ratePerSecond,
    category: "Restart",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, ensuredWatcher);
};

export const restartStream = { handler };
