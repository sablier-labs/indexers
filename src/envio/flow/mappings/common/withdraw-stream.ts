import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_WithdrawFromFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { caller, stream, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = event.params.withdrawAmount;
  const updatedStream = {
    ...stream,
    availableAmount: stream.availableAmount - withdrawAmount,
    withdrawnAmount: stream.withdrawnAmount + withdrawAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    addressA: event.params.caller,
    addressB: event.params.to,
    amountA: withdrawAmount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.createOrUpdate(context, event, caller, event.transaction.from);
};

export const withdrawStream = { handler, loader: Loader.base };
