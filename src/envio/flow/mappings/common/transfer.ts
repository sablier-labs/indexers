import { ADDRESS_ZERO } from "../../../common/constants";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_Transfer_handler as Handler_v1_0,
  SablierFlow_v1_1_Transfer_handler as Handler_v1_1,
  SablierFlow_v1_0_Transfer_loader as Loader_v1_0,
  SablierFlow_v1_1_Transfer_loader as Loader_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T>;

type LoaderReturn = {
  stream?: Entity.Stream;
  users: {
    caller?: Entity.User;
    currentRecipient?: Entity.User;
    newRecipient?: Entity.User;
  };
  watcher?: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === ADDRESS_ZERO) {
    return {
      stream: undefined,
      users: {
        caller: undefined,
        currentRecipient: undefined,
        newRecipient: undefined,
      },
      watcher: undefined,
    };
  }
  const { caller, stream, watcher } = await LoaderBase.base({ context, event });
  const users = {
    caller,
    currentRecipient: await context.User.get(Id.user(event.chainId, event.params.from)),
    newRecipient: await context.User.get(Id.user(event.chainId, event.params.to)),
  };
  return { stream, users, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

export const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, users, watcher } = loaderReturn;
  if (!stream || !watcher) {
    return;
  }

  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === ADDRESS_ZERO) {
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
  Store.Action.create(context, event, watcher, {
    addressA: currentRecipient,
    addressB: newRecipient,
    category: "Transfer",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, users.caller);
  CommonStore.User.update(context, event, users.currentRecipient);
  if (currentRecipient !== newRecipient) {
    CommonStore.User.createOrUpdate(context, event, users.newRecipient, event.params.to);
  }
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transfer = { handler, loader };
