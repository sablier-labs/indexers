import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleWithdrawFromFlowStream(event: ethereum.Event, params: Params.WithdrawFromFlowStream): void {
  const id = params.streamId;
  const stream = Store.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this WithdrawFromFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.availableAmount = stream.availableAmount.minus(params.withdrawAmount);
  stream.withdrawnAmount = stream.withdrawnAmount.plus(params.withdrawAmount);
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.caller,
    addressB: params.to,
    amountA: params.withdrawAmount,
    category: "Withdraw",
    streamId: stream.id,
  } as CommonParams.Action);
}
