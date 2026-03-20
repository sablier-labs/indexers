import { isDeprecatedStream } from "../../../common/deprecated";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_VoidFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_VoidFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_VoidFlowStream_handler as Handler_v2_0,
  SablierFlow_v3_0_VoidFlowStream_handler as Handler_v3_0,
} from "../../bindings/src/Types.gen";
import { computeSnapshotAmount, scale } from "../../helpers";

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
    context.Stream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this void event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? CommonStore.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Void is actually an adjustment with the new rate set to zero.
  const now = BigInt(event.block.timestamp);
  const snapshotAmount = computeSnapshotAmount(stream, now);

  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const maxAvailable = withdrawnAmount + availableAmount;

  const updatedStream: Entity.Stream = {
    ...stream,
    depletionTime: 0n,
    forgivenDebt: event.params.writtenOffDebt,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    paused: true,
    pausedAction_id: Id.action(event),
    pausedTime: now,
    ratePerSecond: 0n,
    snapshotAmount: maxAvailable < snapshotAmount ? maxAvailable : snapshotAmount,
    voided: true,
    voidedAction_id: Id.action(event),
    voidedTime: now,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, ensuredWatcher, {
    addressA: event.params.recipient,
    addressB: event.params.sender,
    amountA: event.params.newTotalDebt,
    amountB: event.params.writtenOffDebt,
    category: "Void",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, ensuredWatcher);
};

export const voidStream = { handler };
