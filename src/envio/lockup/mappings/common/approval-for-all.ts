import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierV2LockupLinear_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_handler as Handler_v1_2,
  SablierLockup_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierV2LockupLinear_v1_0_ApprovalForAll_loader as Loader_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_loader as Loader_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_loader as Loader_v1_2,
  SablierLockup_v2_0_ApprovalForAll_loader as Loader_v2_0,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T> & Loader_v1_2<T> & Loader_v2_0<T>;

type LoaderReturn = {
  watcher: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const watcher = await context.Watcher.getOrThrow(event.chainId.toString());
  return {
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T> & Handler_v1_2<T> & Handler_v2_0<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { watcher } = loaderReturn;

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
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

export const approvalForAll = { handler, loader };
