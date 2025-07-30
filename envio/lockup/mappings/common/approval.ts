import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_Approval_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_Approval_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_Approval_handler as Handler_v1_2,
  SablierLockup_v2_0_Approval_handler as Handler_v2_0,
  SablierV2LockupLinear_v1_0_Approval_loader as Loader_v1_0,
  SablierV2LockupLinear_v1_1_Approval_loader as Loader_v1_1,
  SablierV2LockupLinear_v1_2_Approval_loader as Loader_v1_2,
  SablierLockup_v2_0_Approval_loader as Loader_v2_0,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderReturn = {
  stream: Entity.Stream;
  users: {
    approved?: Entity.User;
    caller?: Entity.User;
    owner?: Entity.User;
  };
  watcher: Entity.Watcher;
};

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T> & Loader_v1_2<T> & Loader_v2_0<T>;

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.tokenId);
  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.Stream.getOrThrow(streamId),
    context.Watcher.getOrThrow(watcherId),
  ]);

  const [approved, caller, owner] = await Promise.all([
    context.User.get(Id.user(event.chainId, event.params.approved)),
    context.User.get(Id.user(event.chainId, event.transaction.from)),
    context.User.get(Id.user(event.chainId, event.params.owner)),
  ]);

  return {
    stream,
    users: { approved, caller, owner },
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, users, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.approved,
    category: "Approval",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  // See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L391-L425
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.owner, entity: users.owner },
    { address: event.params.approved, entity: users.approved },
  ]);
};

export const approval = { handler, loader: loader };
