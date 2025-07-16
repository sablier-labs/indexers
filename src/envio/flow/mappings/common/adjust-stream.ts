import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_AdjustFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_AdjustFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";
import { Store } from "../../store";
import { Loader } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { caller: sender, stream, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const streamedAmount = stream.ratePerSecond * elapsedTime;
  const snapshotAmount = stream.snapshotAmount + streamedAmount;

  // The depletion time is recalculated only if the current depletion time is in the future.
  let depletionTime = stream.depletionTime;
  if (stream.depletionTime > now) {
    const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
    const notWithdrawn = snapshotAmount - withdrawnAmount;
    const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
    const extraAmount = availableAmount - notWithdrawn;
    depletionTime = now + extraAmount / event.params.newRatePerSecond;
  }

  const updatedStream = {
    ...stream,
    depletionTime,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    ratePerSecond: event.params.newRatePerSecond,
    snapshotAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    amountA: event.params.oldRatePerSecond,
    amountB: event.params.newRatePerSecond,
    category: "Adjust",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, sender);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT;                                  */
/* -------------------------------------------------------------------------- */

export const adjustStream = { handler, loader: Loader.base };
