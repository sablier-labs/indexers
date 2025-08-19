import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_WithdrawFromFlowStream_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_handlerArgs as HandlerArgs_v1_1,
  SablierFlow_v1_0_WithdrawFromFlowStream_loaderArgs as LoaderArgs_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_loaderArgs as LoaderArgs_v1_1,
} from "../../bindings/src/Types.gen";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1;
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

type HandlerArgs = HandlerArgs_v1_0<LoaderReturn> | HandlerArgs_v1_1<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
