import { isDeprecatedStream } from "../../../common/deprecated";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_VoidFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_VoidFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_VoidFlowStream_handler as Handler_v2_0,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";

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
    context.Stream.getOrThrow(streamId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */

  // Void is actually an adjustment with the new rate set to zero.
  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const streamedAmount = stream.ratePerSecond * elapsedTime;
  const snapshotAmount = stream.snapshotAmount + streamedAmount;

  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const maxAvailable = withdrawnAmount + availableAmount;

  const updatedStream: Entity.Stream = {
    ...stream,
    depletionTime: 0n,
    forgivenDebt: event.params.writtenOffDebt,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: BigInt(event.block.timestamp),
    paused: true,
    pausedAction_id: Id.action(event),
    pausedTime: BigInt(event.block.timestamp),
    ratePerSecond: 0n,
    snapshotAmount: maxAvailable < snapshotAmount ? maxAvailable : snapshotAmount,
    voided: true,
    voidedAction_id: Id.action(event),
    voidedTime: BigInt(event.block.timestamp),
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.recipient,
    addressB: event.params.sender,
    amountA: event.params.newTotalDebt,
    amountB: event.params.writtenOffDebt,
    category: "Void",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const voidStream = { handler };
