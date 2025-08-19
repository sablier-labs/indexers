import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v2_0,
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loaderArgs as LoaderArgs_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loaderArgs as LoaderArgs_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_loaderArgs as LoaderArgs_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_loaderArgs as LoaderArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1 | LoaderArgs_v1_2 | LoaderArgs_v2_0;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const revenueId = Id.revenue(event.chainId, event.block.timestamp);
  const [revenue, to, { stream, users: baseUsers, watcher }] = await Promise.all([
    context.Revenue.get(revenueId),
    context.User.get(Id.user(event.chainId, event.params.to)),
    LoaderBase.base({ context, event }),
  ]);

  return { revenue, stream, users: { caller: baseUsers.caller, to }, watcher };
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
  const { revenue, stream, users, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = event.params.amount;
  const totalWithdrawnAmount = stream.withdrawnAmount + withdrawAmount;

  let intactAmount: bigint = 0n;
  if (stream.canceledAction_id) {
    intactAmount = stream.intactAmount - withdrawAmount; // Subtract the intact amount set in the cancel action
  } else {
    intactAmount = stream.depositAmount - totalWithdrawnAmount;
  }
  const updatedStream = {
    ...stream,
    intactAmount,
    withdrawnAmount: totalWithdrawnAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.transaction.from,
    addressB: event.params.to,
    amountB: event.params.amount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.to, entity: users.to },
  ]);

  /* -------------------------------- REVENUE --------------------------------- */
  await CommonStore.Revenue.createOrUpdate(context, event, revenue);
};

export const withdrawStream = { handler, loader };
