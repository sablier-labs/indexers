import { zeroAddress } from "viem";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_Transfer_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_Transfer_handlerArgs as HandlerArgs_v1_1,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = HandlerArgs_v1_0<Loader.BaseReturn> | HandlerArgs_v1_1<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  if (!loaderReturn) {
    return;
  }
  const { stream, watcher } = loaderReturn;

  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === zeroAddress) {
    return;
  }
  const currentRecipient = event.params.from.toLowerCase();
  const newRecipient = event.params.to.toLowerCase();

  /* --------------------------------- STREAM --------------------------------- */
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
