import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_VoidFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_VoidFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";
import { Store } from "../../store";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { caller: sender, stream, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */

  // Void is actually an adjustment with the new rate set to zero.
  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const streamedAmount = stream.ratePerSecond * elapsedTime;
  const snapshotAmount = stream.snapshotAmount + streamedAmount;

  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);
  const maxAvailable = withdrawnAmount + availableAmount;

  const updatedStream: Entity.Stream = {
    ...stream,
    depletionTime: 0n,
    forgivenDebt: event.params.writtenOffDebt,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: BigInt(event.block.timestamp),
    paused: true,
    pausedAction_id: Id.action(event),
    pausedTime: BigInt(event.block.timestamp),
    ratePerSecond: 0n,
    snapshotAmount: maxAvailable < snapshotAmount ? maxAvailable : snapshotAmount,
    voided: true,
    voidedAction_id: Id.action(event),
    voidedTime: BigInt(event.block.timestamp),
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(context, event, watcher, {
    addressA: event.params.recipient,
    addressB: event.params.sender,
    amountA: event.params.newTotalDebt,
    amountB: event.params.writtenOffDebt,
    category: "Void",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.update(context, event, sender);
};

export const voidStream = { handler, loader: Loader.base };
