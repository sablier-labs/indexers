import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import { type Entity } from "../../bindings";
import type {
  SablierFlow_v1_0_DepositFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_DepositFlowStream_handler as Handler_v1_1,
  SablierFlow_v1_0_DepositFlowStream_loader as Loader_v1_0,
  SablierFlow_v1_1_DepositFlowStream_loader as Loader_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type Loader<T> = Loader_v1_0<T> & Loader_v1_1<T>;

type LoaderReturn = {
  stream: Entity.Stream;
  users: {
    caller?: Entity.User;
    funder?: Entity.User;
    sender?: Entity.User;
  };
  watcher: Entity.Watcher;
};

const loader: Loader<LoaderReturn> = async ({ context, event }) => {
  const { stream, users: baseUsers, watcher } = await LoaderBase.base({ context, event });
  const users = {
    caller: baseUsers.caller,
    funder: await context.User.get(Id.user(event.chainId, event.params.funder)),
    sender: baseUsers.sender,
  };
  return { stream, users, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler<T> = Handler_v1_0<T> & Handler_v1_1<T>;

const handler: Handler<LoaderReturn> = async ({ context, event, loaderReturn }) => {
  const { stream, users, watcher } = loaderReturn;

  /* --------------------------------- STREAM --------------------------------- */
  const depositedAmount = stream.depositedAmount + event.params.amount;
  const availableAmount = stream.availableAmount + event.params.amount;
  const scaledAvailableAmount = scale(availableAmount, stream.assetDecimalsValue);

  const now = BigInt(event.block.timestamp);
  const elapsedTime = now - stream.lastAdjustmentTimestamp;
  const snapshotAmount = stream.snapshotAmount + stream.ratePerSecond * elapsedTime;
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount - withdrawnAmount;

  // If the stream still has debt, mimic the contract behavior.
  let depletionTime = stream.depletionTime;
  if (scaledAvailableAmount > notWithdrawnAmount) {
    const extraAmount = scaledAvailableAmount - notWithdrawnAmount;

    if (stream.ratePerSecond > 0) {
      depletionTime = now + extraAmount / stream.ratePerSecond;
    }
  }

  const updatedStream = {
    ...stream,
    availableAmount,
    depletionTime,
    depositedAmount,
  };
  context.Stream.set(updatedStream);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, watcher, {
    addressA: event.params.funder,
    amountA: event.params.amount,
    category: "Deposit",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementActionCounter(context, watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: users.caller },
    { address: event.params.funder, entity: users.funder },
    { address: stream.sender, entity: users.sender },
  ]);
};

export const depositStream = { handler, loader };
