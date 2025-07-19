import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_handler as Handler_v1_2,
  SablierLockup_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierV2LockupLinear_v1_0_ApprovalForAll_loader as Loader_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_loader as Loader_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_loader as Loader_v1_2,
  SablierLockup_v2_0_ApprovalForAll_loader as Loader_v2_0,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T> & Loader_v1_2<T> & Loader_v2_0<T>;

type LoaderReturn = {
  users: {
    caller?: Entity.User;
    operator?: Entity.User;
    owner?: Entity.User;
  };
  watcher: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const users = {
    caller: await context.User.get(Id.user(event.chainId, event.transaction.from)),
    operator: await context.User.get(Id.user(event.chainId, event.params.operator)),
    owner: await context.User.get(Id.user(event.chainId, event.params.owner)),
  };

  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  return {
    users,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { users, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  // See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L427-L441
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.owner, entity: users.owner },
    { address: event.params.operator, entity: users.operator },
  ]);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const approvalForAll = { handler, loader };
