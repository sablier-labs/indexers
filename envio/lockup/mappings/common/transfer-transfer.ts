import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_Transfer_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_Transfer_handlerArgs as HandlerArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs =
  | HandlerArgs_v1_0<Loader.BaseReturn>
  | HandlerArgs_v1_1<Loader.BaseReturn>
  | HandlerArgs_v1_2<Loader.BaseReturn>
  | HandlerArgs_v2_0<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  if (!loaderReturn) {
    return;
  }
  const { stream, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const currentRecipient = event.params.from.toLowerCase();
  const newRecipient = event.params.to.toLowerCase();
  const updatedStream = {
    ...stream,
    recipient: newRecipient,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: currentRecipient,
    addressB: newRecipient,
    category: "Transfer",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transfer = { handler, loader: Loader.base };
