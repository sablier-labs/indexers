import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_RenounceLockupStream_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_RenounceLockupStream_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_RenounceLockupStream_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_RenounceLockupStream_handlerArgs as HandlerArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

type HandlerArgs =
  | HandlerArgs_v1_0<Loader.BaseReturn>
  | HandlerArgs_v1_1<Loader.BaseReturn>
  | HandlerArgs_v1_2<Loader.BaseReturn>
  | HandlerArgs_v2_0<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  const { stream, users, watcher } = loaderReturn;

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

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: stream.sender, entity: users.sender },
  ]);
};

export const renounceStream = { handler, loader: Loader.base };
