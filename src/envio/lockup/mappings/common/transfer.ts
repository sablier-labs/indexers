import { ADDRESS_ZERO } from "../../../common/constants";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_Transfer_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_handler as Handler_v1_2,
  SablierLockup_v2_0_Transfer_handler as Handler_v2_0,
  SablierV2LockupLinear_v1_0_Transfer_loader as Loader_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_loader as Loader_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_loader as Loader_v1_2,
  SablierLockup_v2_0_Transfer_loader as Loader_v2_0,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T> & Loader_v1_2<T> & Loader_v2_0<T>;

type LoaderReturn = {
  stream?: Entity.Stream;
  watcher?: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === ADDRESS_ZERO) {
    return {
      stream: undefined,
      watcher: undefined,
    };
  }
  const { stream, watcher } = await LoaderBase.base({ context, event });
  return { stream, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */
type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, watcher } = loaderReturn;
  if (!stream || !watcher) {
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  const currentRecipient = event.params.from.toLowerCase();
  const newRecipient = event.params.to.toLowerCase();
  const updatedStream = {
    ...stream,
    recipient: newRecipient,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
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

export const transfer = { handler, loader };
