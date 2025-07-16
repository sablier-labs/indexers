import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_Approval_handler as Handler_v1_0,
  SablierFlow_v1_1_Approval_handler as Handler_v1_1,
  SablierFlow_v1_0_Approval_loader as Loader_v1_0,
  SablierFlow_v1_1_Approval_loader as Loader_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderReturn = {
  stream: Entity.Stream;
  users: {
    approved?: Entity.User;
    owner?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T>;

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.tokenId);
  const stream = await context.Stream.getOrThrow(streamId);

  const users = {
    approved: await context.User.get(Id.user(event.chainId, event.params.approved)),
    owner: await context.User.get(Id.user(event.chainId, event.params.owner)),
  };

  const watcher = await context.Watcher.getOrThrow(event.chainId.toString());
  return {
    stream,
    users,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { users, stream, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.approved,
    category: "Approval",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, users.owner);
  CommonStore.User.createOrUpdate(context, event, users.approved, event.params.approved);
};

export const approval = { handler, loader };
