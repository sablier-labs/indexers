import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleWithdrawFromStream(event: ethereum.Event, params: Params.WithdrawFromStream): void {
  const tokenId = params.streamId;
  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    logError("Stream not saved before this withdraw event: {}", [tokenId.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  const withdrawAmount = params.amount;
  const totalWithdrawnAmount = stream.withdrawnAmount.plus(withdrawAmount);
  stream.withdrawnAmount = totalWithdrawnAmount;

  const canceledAction = stream.canceledAction;
  if (canceledAction) {
    stream.intactAmount = stream.intactAmount.minus(withdrawAmount); // Subtract the intact amount set in the cancel action
  } else {
    stream.intactAmount = stream.depositAmount.minus(totalWithdrawnAmount);
  }
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: event.transaction.from,
    addressB: params.to,
    amountB: withdrawAmount,
    category: "Withdraw",
    streamId: stream.id,
  } as CommonParams.Action);
}
