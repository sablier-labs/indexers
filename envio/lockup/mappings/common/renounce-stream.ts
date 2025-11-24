import { isDeprecatedStream } from "../../../common/deprecated";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_RenounceLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_RenounceLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_RenounceLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_RenounceLockupStream_handler as Handler_v2_0,
  SablierLockup_v3_0_RenounceLockupStream_handler as Handler_v3_0,
} from "../../bindings/src/Types.gen";

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v1_2 & Handler_v2_0 & Handler_v3_0;

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
  const updatedStream: Entity.Stream = {
    ...stream,
    cancelable: false,
    renounceAction_id: Id.action(event),
    renounceTime: BigInt(event.block.timestamp),
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    category: "Renounce",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const renounceStream = { handler };
