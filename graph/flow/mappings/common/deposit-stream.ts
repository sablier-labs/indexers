import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../common/constants";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { scale } from "../../helpers";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleDepositFlowStream(event: ethereum.Event, params: Params.DepositFlowStream): void {
  const id = params.streamId;
  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this DepositFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.depositedAmount = stream.depositedAmount.plus(params.amount);
  stream.availableAmount = stream.availableAmount.plus(params.amount);
  const availableAmount = scale(stream.availableAmount, stream.assetDecimalsValue);

  const now = event.block.timestamp;
  const elapsedTime = now.minus(stream.lastAdjustmentTimestamp);
  const snapshotAmount = stream.snapshotAmount.plus(stream.ratePerSecond.times(elapsedTime));
  const withdrawnAmount = scale(stream.withdrawnAmount, stream.assetDecimalsValue);
  const notWithdrawnAmount = snapshotAmount.minus(withdrawnAmount);

  // If the stream still has debt, mimic the contract behavior.
  if (availableAmount.gt(notWithdrawnAmount)) {
    const extraAmount = availableAmount.minus(notWithdrawnAmount);

    if (stream.ratePerSecond.gt(ZERO)) {
      stream.depletionTime = now.plus(extraAmount.div(stream.ratePerSecond));
    }
  }
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.funder,
    amountA: params.amount,
    category: "Deposit",
    streamId: stream.id,
  } as CommonParams.Action);
}
