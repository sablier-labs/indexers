import { zeroAddress } from "viem";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_Transfer_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_Transfer_handlerArgs as HandlerArgs_v2_0,
  SablierV2LockupLinear_v1_0_Transfer_loaderArgs as LoaderArgs_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_loaderArgs as LoaderArgs_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_loaderArgs as LoaderArgs_v1_2,
  SablierLockup_v2_0_Transfer_loaderArgs as LoaderArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1 | LoaderArgs_v1_2 | LoaderArgs_v2_0;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === zeroAddress) {
    return undefined;
  }
  const { stream, users: baseUsers, watcher } = await LoaderBase.base({ context, event });
  const [currentRecipient, newRecipient] = await Promise.all([
    context.User.get(Id.user(event.chainId, event.params.from)),
    context.User.get(Id.user(event.chainId, event.params.to)),
  ]);
  return { stream, users: { caller: baseUsers.caller, currentRecipient, newRecipient }, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs =
  | HandlerArgs_v1_0<LoaderReturn>
  | HandlerArgs_v1_1<LoaderReturn>
  | HandlerArgs_v1_2<LoaderReturn>
  | HandlerArgs_v2_0<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  if (!loaderReturn) {
    return;
  }
  const { stream, users, watcher } = loaderReturn;

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

  /* ---------------------------------- USER ---------------------------------- */
  // See https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L115-L129
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: currentRecipient, entity: users.currentRecipient },
    { address: newRecipient, entity: users.newRecipient },
  ]);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transfer = { handler, loader };
