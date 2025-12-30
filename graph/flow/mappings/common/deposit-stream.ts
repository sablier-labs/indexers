import { Address, ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { computeDepletionTime, computeSnapshotAmount } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleDepositFlowStream(
  event: ethereum.Event,
  params: Params.DepositFlowStream
): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this DepositFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.depositedAmount = stream.depositedAmount.plus(params.amount);
  stream.availableAmount = stream.availableAmount.plus(params.amount);

  const now = event.block.timestamp;
  const snapshotAmount = computeSnapshotAmount(stream, now);
  stream.depletionTime = computeDepletionTime(stream, now, snapshotAmount, stream.ratePerSecond);
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.funder,
    addressB: Address.fromBytes(stream.recipient),
    amountA: params.amount,
    category: "Deposit",
    streamId: stream.id,
  } as CommonParams.Action);
}
