import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_ApprovalForAll_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_ApprovalForAll_handlerArgs as HandlerArgs_v2_0,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs =
  | HandlerArgs_v1_0<Loader.BaseReturn>
  | HandlerArgs_v1_1<Loader.BaseReturn>
  | HandlerArgs_v1_2<Loader.BaseReturn>
  | HandlerArgs_v2_0<Loader.BaseReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  const { watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const approvalForAll = { handler, loader: Loader.base };
