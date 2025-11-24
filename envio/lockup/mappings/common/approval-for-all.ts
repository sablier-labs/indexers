import { CommonStore } from "../../../common/store";
import type {
  SablierV2LockupLinear_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_handler as Handler_v1_2,
  SablierLockup_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierLockup_v3_0_ApprovalForAll_handler as Handler_v3_0,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v1_2 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.getOrThrow(watcherId);

  if (context.isPreload) {
    return;
  }

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

export const approvalForAll = { handler };
