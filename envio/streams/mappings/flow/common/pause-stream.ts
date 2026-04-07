import { isDeprecatedStream } from "../../../../common/deprecated.js";
import { Id } from "../../../../common/id.js";
import type {
  SablierFlow_v1_0_PauseFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_PauseFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_PauseFlowStream_handler as Handler_v2_0,
  SablierFlow_v3_0_PauseFlowStream_handler as Handler_v3_0,
} from "../../../bindings/src/Indexer.gen.js";
import type { Entity } from "../../../bindings.js";
import { computeSnapshotAmount } from "../../../helpers/index.js";
import * as StreamsWatcher from "../../../store/entity-watcher.js";
import * as FlowAction from "../../../store/flow/entity-action.js";

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0 & Handler_v3_0;

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

  if (!stream) {
    context.log.error("Stream not saved before this pause event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Paused is actually an adjustment with the new rate set to zero.
  const now = BigInt(event.block.timestamp);
  const snapshotAmount = computeSnapshotAmount(stream, now);

  const updatedStream: Entity<"FlowStream"> = {
    ...stream,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    paused: true,
    pausedAction_id: Id.action(event),
    pausedTime: now,
    ratePerSecond: 0n,
    snapshotAmount,
  };
  context.FlowStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */

  FlowAction.create(context, event, ensuredWatcher, {
    addressA: event.params.recipient,
    addressB: event.params.sender,
    amountA: event.params.totalDebt,
    category: "Pause",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

export const pauseStream = { handler };
