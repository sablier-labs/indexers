import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_Approval_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_Approval_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_Approval_handler as Handler_v1_2,
  SablierLockup_v2_0_Approval_handler as Handler_v2_0,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  await Store.Action.create(context, event, watcher, {
    addressA: event.params.owner,
    addressB: event.params.approved,
    category: "Approval",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  await CommonStore.Watcher.incrementActionCounter(context, watcher);
};

export const approval = { handler, loader: Loader.base };
