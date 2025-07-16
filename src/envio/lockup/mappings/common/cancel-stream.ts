import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_CancelLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_CancelLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_CancelLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_CancelLockupStream_handler as Handler_v2_0,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, watcher } = loaderReturn;

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
  Store.Action.create(context, event, watcher, {
    addressA: event.params.sender,
    addressB: event.params.recipient,
    amountA: event.params.senderAmount,
    amountB: event.params.recipientAmount,
    category: "Cancel",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const cancelStream = { handler, loader: Loader.base };
