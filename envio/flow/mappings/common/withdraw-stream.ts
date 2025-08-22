import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_WithdrawFromFlowStream_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_handlerArgs as HandlerArgs_v1_1,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = HandlerArgs_v1_0<Loader.BaseReturn> | HandlerArgs_v1_1<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  const { stream, watcher } = loaderReturn;

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
};

export const withdrawStream = { handler, loader: Loader.base };
