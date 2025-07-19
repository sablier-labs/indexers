import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_handler as Handler_v2_0,
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_loader as Loader_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_loader as Loader_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_loader as Loader_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_loader as Loader_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T> & Loader_v1_2<T> & Loader_v2_0<T>;

type LoaderReturn = {
  revenue?: Entity.Revenue;
  stream: Entity.Stream;
  users: {
    caller?: Entity.User;
    to?: Entity.User;
  };
  watcher: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const { stream, users: baseUsers, watcher } = await LoaderBase.base({ context, event });

  const revenueId = Id.revenue(event.chainId, event.block.timestamp);
  const revenue = await context.Revenue.get(revenueId);

  const users = {
    caller: baseUsers.caller,
    to: await context.User.get(Id.user(event.chainId, event.params.to)),
  };

  return { revenue, stream, users, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
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
