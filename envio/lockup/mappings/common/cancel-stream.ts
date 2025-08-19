import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_CancelLockupStream_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_CancelLockupStream_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_CancelLockupStream_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_CancelLockupStream_handlerArgs as HandlerArgs_v2_0,
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
    canceled: true,
    canceledAction_id: Id.action(event),
    canceledTime: BigInt(event.block.timestamp),
    intactAmount: event.params.recipientAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.sender,
    addressB: event.params.recipient,
    amountA: event.params.senderAmount,
    amountB: event.params.recipientAmount,
    category: "Cancel",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.sender, entity: users.sender },
  ]);
};

export const cancelStream = { handler, loader: Loader.base };
