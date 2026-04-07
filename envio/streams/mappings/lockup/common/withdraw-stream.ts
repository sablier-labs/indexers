import { isDeprecatedStream } from "../../../../common/deprecated.js";
import { Id } from "../../../../common/id.js";
import type {
  SablierV2LockupLinear_v1_0_WithdrawFromLockupStream_handler as Handler_v1_0,
  SablierV2LockupLinear_v1_1_WithdrawFromLockupStream_handler as Handler_v1_1,
  SablierV2LockupLinear_v1_2_WithdrawFromLockupStream_handler as Handler_v1_2,
  SablierLockup_v2_0_WithdrawFromLockupStream_handler as Handler_v2_0,
  SablierLockup_v3_0_WithdrawFromLockupStream_handler as Handler_v3_0,
  SablierLockup_v4_0_WithdrawFromLockupStream_handler as Handler_v4_0,
} from "../../../bindings/src/Indexer.gen.js";
import * as Watcher from "../../../store/entity-watcher.js";
import * as LockupAction from "../../../store/lockup/entity-action.js";

type Handler = Handler_v1_0 &
  Handler_v1_1 &
  Handler_v1_2 &
  Handler_v2_0 &
  Handler_v3_0 &
  Handler_v4_0;

const handler: Handler = async ({ context, event }) => {
  /* -------------------------------- ENTITIES -------------------------------- */
  const streamId = Id.stream(event.srcAddress, event.chainId, event.params.streamId);
  const isDeprecated = await isDeprecatedStream(context, streamId);
  if (isDeprecated) {
    return;
  }

  const watcherId = event.chainId.toString();

  const [stream, watcher] = await Promise.all([
    context.LockupStream.get(streamId),
    context.Watcher.get(watcherId),
  ]);

  if (!stream) {
    context.log.error("Stream not saved before this withdraw event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? Watcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = event.params.amount;
  const totalWithdrawnAmount = stream.withdrawnAmount + withdrawAmount;

  let intactAmount = 0n;
  if (stream.canceledAction_id) {
    intactAmount = BigInt(stream.intactAmount) - BigInt(withdrawAmount); // Subtract the intact amount set in the cancel action
  } else {
    intactAmount = BigInt(stream.depositAmount) - BigInt(totalWithdrawnAmount);
  }
  const updatedStream = {
    ...stream,
    depleted: intactAmount === 0n,
    intactAmount,
    withdrawnAmount: totalWithdrawnAmount,
  };
  context.LockupStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  LockupAction.create(context, event, ensuredWatcher, {
    addressA: event.transaction.from,
    addressB: event.params.to,
    amountB: event.params.amount,
    category: "Withdraw",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Watcher.incrementLockupActionCounter(context, ensuredWatcher);
};

export const withdrawStream = { handler };
