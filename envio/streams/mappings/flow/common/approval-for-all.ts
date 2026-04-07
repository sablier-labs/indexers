import type {
  SablierFlow_v1_0_ApprovalForAll_handler as Handler_v1_0,
  SablierFlow_v1_1_ApprovalForAll_handler as Handler_v1_1,
  SablierFlow_v2_0_ApprovalForAll_handler as Handler_v2_0,
  SablierFlow_v3_0_ApprovalForAll_handler as Handler_v3_0,
} from "../../../bindings/src/Indexer.gen.js";
import * as StreamsWatcher from "../../../store/entity-watcher.js";
import * as FlowAction from "../../../store/flow/entity-action.js";

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

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- ACTION --------------------------------- */
  FlowAction.create(context, event, ensuredWatcher, {
    addressA: event.params.owner,
    addressB: event.params.operator,
    amountA: event.params.approved ? 1n : 0n,
    category: "ApprovalForAll",
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

export const approvalForAll = { handler };
