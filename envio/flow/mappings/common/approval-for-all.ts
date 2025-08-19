import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_ApprovalForAll_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_ApprovalForAll_handlerArgs as HandlerArgs_v1_1,
  SablierFlow_v1_0_ApprovalForAll_loaderArgs as LoaderArgs_v1_0,
  SablierFlow_v1_1_ApprovalForAll_loaderArgs as LoaderArgs_v1_1,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const [caller, operator, owner] = await Promise.all([
    context.User.get(Id.user(event.chainId, event.transaction.from)),
    context.User.get(Id.user(event.chainId, event.params.operator)),
    context.User.get(Id.user(event.chainId, event.params.owner)),
  ]);

  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  return {
    users: { caller, operator, owner },
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = HandlerArgs_v1_0<LoaderReturn> | HandlerArgs_v1_1<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
