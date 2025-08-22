import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_handlerArgs as HandlerArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

type HandlerArgs =
  | HandlerArgs_v1_0<Loader.BaseReturn>
  | HandlerArgs_v1_1<Loader.BaseReturn>
  | HandlerArgs_v1_2<Loader.BaseReturn>
  | HandlerArgs_v2_0<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.transaction.from,
    addressB: event.params.to,
    amountB: event.params.amount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const withdrawStream = { handler, loader: Loader.base };
