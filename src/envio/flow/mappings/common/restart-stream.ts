import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_RestartFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_RestartFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { caller: sender, stream, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */

  // Restart is actually an adjustment
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = stream.snapshotAmount - withdrawnAmount;

  const now = BigInt(event.block.timestamp);
  let depletionTime = now;
  if (availableAmount > notWithdrawnAmount) {
    const extraAmountScaled = availableAmount - notWithdrawnAmount;

    depletionTime = now + extraAmountScaled / event.params.ratePerSecond;
  }

  const updatedStream: Entity.Stream = {
    ...stream,
    depletionTime,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    paused: false,
    pausedAction_id: undefined,
    pausedTime: undefined,
    ratePerSecond: event.params.ratePerSecond,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    addressA: event.params.sender,
    amountA: event.params.ratePerSecond,
    category: "Restart",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, sender);
};

export const restartStream = { handler, loader: Loader.base };
