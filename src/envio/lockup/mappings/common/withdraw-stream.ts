import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_handler as Handler_v2_0,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, watcher } = loaderReturn;

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
  Store.Action.create(context, event, watcher, {
    addressA: event.transaction.from?.toLowerCase(),
    addressB: event.params.to,
    amountB: event.params.amount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const withdrawStream = { handler, loader: Loader.base };
