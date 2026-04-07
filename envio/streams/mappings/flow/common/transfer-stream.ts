import { zeroAddress } from "viem";
import { isDeprecatedStream } from "../../../../common/deprecated.js";
import { Id } from "../../../../common/id.js";
import type {
  SablierFlow_v1_0_Transfer_handler as Handler_v1_0,
  SablierFlow_v1_1_Transfer_handler as Handler_v1_1,
  SablierFlow_v2_0_Transfer_handler as Handler_v2_0,
  SablierFlow_v3_0_Transfer_handler as Handler_v3_0,
} from "../../../bindings/src/Indexer.gen.js";
import * as StreamsWatcher from "../../../store/entity-watcher.js";
import * as FlowAction from "../../../store/flow/entity-action.js";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0 & Handler_v3_0;

const handler: Handler = async ({ context, event }) => {
  // Exclude `Transfer` events emitted by the initial mint transaction.
  // See https://github.com/sablier-labs/indexers/issues/18
  if (event.params.from === zeroAddress) {
    return;
  }

  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.tokenId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.FlowStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (!stream) {
    context.log.error("Stream not saved before this transfer event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  const currentRecipient = event.params.from;
  const newRecipient = event.params.to;

  /* --------------------------------- STREAM --------------------------------- */
  const updatedStream = {
    ...stream,
    recipient: newRecipient,
  };
  context.FlowStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  FlowAction.create(context, event, ensuredWatcher, {
    addressA: currentRecipient,
    addressB: newRecipient,
    category: "Transfer",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transfer = { handler };
