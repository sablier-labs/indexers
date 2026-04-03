import { zeroAddress } from "viem";
import { isDeprecatedStream } from "../../../../common/deprecated";
import { Id } from "../../../../common/id";
import type {
  SablierV2LockupLinear_v1_0_Transfer_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_Transfer_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_Transfer_handler as Handler_v1_2,
  SablierLockup_v2_0_Transfer_handler as Handler_v2_0,
  SablierLockup_v3_0_Transfer_handler as Handler_v3_0,
  SablierLockup_v4_0_Transfer_handler as Handler_v4_0,
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
    context.LockupStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (context.isPreload) {
    return;
  }

  if (!stream) {
    context.log.error("Stream not saved before this transfer event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const currentRecipient = event.params.from;
  const newRecipient = event.params.to;
  const updatedStream = {
    ...stream,
    recipient: newRecipient,
  };
  context.LockupStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  LockupAction.create(context, event, ensuredWatcher, {
    addressA: currentRecipient,
    addressB: newRecipient,
    category: "Transfer",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Watcher.incrementLockupActionCounter(context, ensuredWatcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const transfer = { handler };
