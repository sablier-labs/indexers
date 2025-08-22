import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_Approval_handlerArgs as HandlerArgs_v1_0,
  SablierV2LockupLinear_v1_1_Approval_handlerArgs as HandlerArgs_v1_1,
  SablierV2LockupLinear_v1_2_Approval_handlerArgs as HandlerArgs_v1_2,
  SablierLockup_v2_0_Approval_handlerArgs as HandlerArgs_v2_0,
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
  const { stream, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.approved,
    category: "Approval",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const approval = { handler, loader: Loader.base };
