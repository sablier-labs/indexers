import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type {
  SablierFlow_v1_0_DepositFlowStream_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_DepositFlowStream_handlerArgs as HandlerArgs_v1_1,
  SablierFlow_v1_0_DepositFlowStream_loaderArgs as LoaderArgs_v1_0,
  SablierFlow_v1_1_DepositFlowStream_loaderArgs as LoaderArgs_v1_1,
} from "../../bindings/src/Types.gen";
import { scale } from "../../helpers";
import { Loader as LoaderBase } from "./loader";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const { stream, users: baseUsers, watcher } = await LoaderBase.base({ context, event });
  const [caller, funder, sender] = await Promise.all([
    context.User.get(Id.user(event.chainId, event.transaction.from)),
    context.User.get(Id.user(event.chainId, event.params.funder)),
    baseUsers.sender,
  ]);
  return { stream, users: { caller, funder, sender }, watcher };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = HandlerArgs_v1_0<LoaderReturn> | HandlerArgs_v1_1<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
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
