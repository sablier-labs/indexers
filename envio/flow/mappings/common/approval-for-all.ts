import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierFlow_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierFlow_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierFlow_v3_0_ApprovalForAll_handler as Handler_v3_0,
} from "../../bindings/src/Types.gen";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const watcherId = event.chainId.toString();
  const watcher = await context.Watcher.get(watcherId);

  if (context.isPreload) {
    return;
  }

  const ensuredWatcher = watcher ?? CommonStore.Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, ensuredWatcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, ensuredWatcher);
};

export const approvalForAll = { handler };
