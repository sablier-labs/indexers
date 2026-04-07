import { isDeprecatedStream } from "../../../../common/deprecated.js";
import { Id } from "../../../../common/id.js";
import type {
  SablierV2LockupLinear_v1_0_CancelLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_CancelLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_CancelLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_CancelLockupStream_handler as Handler_v2_0,
  SablierLockup_v3_0_CancelLockupStream_handler as Handler_v3_0,
  SablierLockup_v4_0_CancelLockupStream_handler as Handler_v4_0,
} from "../../../bindings/src/Types.js";
import type { Entity } from "../../../bindings.js";
import * as Watcher from "../../../store/entity-watcher.js";
import * as LockupAction from "../../../store/lockup/entity-action.js";

type Handler = Handler_v1_0 &
  Handler_v1_1 &
  Handler_v1_2 &
  Handler_v2_0 &
  Handler_v3_0 &
  Handler_v4_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.LockupStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this cancel event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const updatedStream: Entity.LockupStream = {
    ...stream,
    cancelable: false,
    canceled: true,
    canceledAction_id: Id.action(event),
    canceledTime: BigInt(event.block.timestamp),
    depleted: event.params.recipientAmount === 0n,
    intactAmount: event.params.recipientAmount,
  };
  context.LockupStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  LockupAction.create(context, event, ensuredWatcher, {
    addressA: event.params.sender,
    addressB: event.params.recipient,
    amountA: event.params.senderAmount,
    amountB: event.params.recipientAmount,
    category: "Cancel",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Watcher.incrementLockupActionCounter(context, ensuredWatcher);
};

export const cancelStream = { handler };
