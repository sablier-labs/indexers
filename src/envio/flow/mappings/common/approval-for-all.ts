import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierFlow_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierFlow_v1_0_ApprovalForAll_loader as Loader_v1_0,
  SablierFlow_v1_1_ApprovalForAll_loader as Loader_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderReturn = {
  users: {
    owner?: Entity.User;
    operator?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T>;

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const users = {
    operator: await context.User.get(Id.user(event.chainId, event.params.operator)),
    owner: await context.User.get(Id.user(event.chainId, event.params.owner)),
  };
  const watcher = await context.Watcher.getOrThrow(event.chainId.toString());
  return {
    users,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { users, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, users.owner);
  CommonStore.User.createOrUpdate(context, event, users.operator, event.params.operator);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const approvalForAll = { handler, loader };
