import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_PauseFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_PauseFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { Loader } from "./loader";

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<Loader.BaseReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, users, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */

  // Paused is actually an adjustment with the new rate set to zero.
  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const streamedAmount = stream.ratePerSecond * elapsedTime;
  const snapshotAmount = stream.snapshotAmount + streamedAmount;

  const updatedStream: Entity.Stream = {
    ...stream,
    lastAdjustmentAction_id: Id.action(event),
    lastAdjustmentTimestamp: now,
    paused: true,
    pausedAction_id: Id.action(event),
    pausedTime: now,
    ratePerSecond: 0n,
    snapshotAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */

  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.recipient,
    addressB: event.params.sender,
    amountA: event.params.totalDebt,
    category: "Pause",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: stream.sender, entity: users.sender },
  ]);
};

export const pauseStream = { handler, loader: Loader.base };
