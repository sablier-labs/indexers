import type {
  SablierV2LockupLinear_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_ApprovalForAll_handler as Handler_v1_2,
  SablierLockup_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierLockup_v3_0_ApprovalForAll_handler as Handler_v3_0,
  SablierLockup_v4_0_ApprovalForAll_handler as Handler_v4_0,
} from "../../../bindings/src/Types.gen";
import * as Watcher from "../../../store/entity-watcher";
import * as LockupAction from "../../../store/lockup/entity-action";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 &
  Handler_v1_1 &
  Handler_v1_2 &
  Handler_v2_0 &
  Handler_v3_0 &
  Handler_v4_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.get(watcherId);

  if (context.isPreload) {
    return;
  }

  const ensuredWatcher = watcher ?? Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- ACTION --------------------------------- */
  LockupAction.create(context, event, ensuredWatcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Watcher.incrementLockupActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const approvalForAll = { handler };
