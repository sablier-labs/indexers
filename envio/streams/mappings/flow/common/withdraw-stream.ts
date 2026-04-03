import { isDeprecatedStream } from "../../../../common/deprecated";
import { Id } from "../../../../common/id";
import type {
  SablierFlow_v1_0_WithdrawFromFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_WithdrawFromFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_WithdrawFromFlowStream_handler as Handler_v2_0,
  SablierFlow_v3_0_WithdrawFromFlowStream_handler as Handler_v3_0,
} from "../../../bindings/src/Types.gen";
import * as StreamsWatcher from "../../../store/entity-watcher";
import * as FlowAction from "../../../store/flow/entity-action";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.FlowStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this withdraw event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = event.params.withdrawAmount;
  const updatedStream = {
    ...stream,
    availableAmount: stream.availableAmount - withdrawAmount,
    withdrawnAmount: stream.withdrawnAmount + withdrawAmount,
  };
  context.FlowStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  FlowAction.create(context, event, ensuredWatcher, {
    addressA: event.params.caller,
    addressB: event.params.to,
    amountA: withdrawAmount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

export const withdrawStream = { handler };
