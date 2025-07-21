import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_WithdrawFromFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_handler as Handler_v1_1,
  SablierFlow_v1_0_WithdrawFromFlowStream_loader as Loader_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_loader as Loader_v1_1,
} from "../../bindings/src/Types.gen";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T>;

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

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { revenue, stream, users, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = event.params.withdrawAmount;
  const updatedStream = {
    ...stream,
    availableAmount: stream.availableAmount - withdrawAmount,
    withdrawnAmount: stream.withdrawnAmount + withdrawAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.caller,
    addressB: event.params.to,
    amountA: withdrawAmount,
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
