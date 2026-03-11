import { isDeprecatedStream } from "../../../../common/deprecated";
import { Id } from "../../../../common/id";
import type {
  SablierFlow_v1_0_DepositFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_DepositFlowStream_handler as Handler_v1_1,
  SablierFlow_v2_0_DepositFlowStream_handler as Handler_v2_0,
} from "../../../bindings/src/Types.gen";
import { scale } from "../../../helpers";
import * as StreamsWatcher from "../../../store/entity-watcher";
import * as FlowAction from "../../../store/flow/entity-action";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1 & Handler_v2_0;

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
    context.log.error("Stream not saved before this deposit event", { event, streamId });
    return;
  }

  const ensuredWatcher = watcher ?? StreamsWatcher.create(event.chainId);
  if (!watcher) {
    context.Watcher.set(ensuredWatcher);
  }

  /* --------------------------------- STREAM --------------------------------- */
  const depositedAmount = stream.depositedAmount + event.params.amount;
  const availableAmount = stream.availableAmount + event.params.amount;
  const scaledAvailableAmount = scale(availableAmount, stream.assetDecimalsValue);

  const now = BigInt(event.block.timestamp);
  let snapshotAmount = stream.snapshotAmount;
  // If the stream has not started yet, the snapshot amount is not updated.
  if (now > stream.startTime) {
    const actualAdjustmentTime =
      stream.lastAdjustmentTimestamp > stream.startTime
        ? stream.lastAdjustmentTimestamp
        : stream.startTime;
    const elapsedTime = now - actualAdjustmentTime;
    const streamedAmount = stream.ratePerSecond * elapsedTime;
    snapshotAmount = stream.snapshotAmount + streamedAmount;
  }
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount - withdrawnAmount;

  // If the stream still has debt, mimic the contract behavior.
  let depletionTime = stream.depletionTime;
  if (scaledAvailableAmount > notWithdrawnAmount) {
    const extraAmount = scaledAvailableAmount - notWithdrawnAmount;

    if (stream.ratePerSecond > 0) {
      const actualStartTime = now > stream.startTime ? now : stream.startTime;
      depletionTime = actualStartTime + extraAmount / stream.ratePerSecond;
    }
  }

  const updatedStream = {
    ...stream,
    availableAmount,
    depletionTime,
    depositedAmount,
  };
  context.FlowStream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  FlowAction.create(context, event, ensuredWatcher, {
    addressA: event.params.funder,
    addressB: stream.recipient,
    amountA: event.params.amount,
    category: "Deposit",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  StreamsWatcher.incrementFlowActionCounter(context, ensuredWatcher);
};

export const depositStream = { handler };
