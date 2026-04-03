import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../../common/logger";
import { CommonParams } from "../../../../common/types";
import { Params } from "../../../helpers/flow/types";
import { FlowStore, Store } from "../../../store";

export function handleWithdrawFromFlowStream(
  event: ethereum.Event,
  params: Params.WithdrawFromFlowStream
): void {
  const id = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, id)) {
    return;
  }

  const stream = FlowStore.Stream.get(id);
  if (stream === null) {
    logError("Stream not saved before this WithdrawFromFlowStream event: {}", [id.toHexString()]);
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.availableAmount = stream.availableAmount.minus(params.withdrawAmount);
  stream.withdrawnAmount = stream.withdrawnAmount.plus(params.withdrawAmount);
  stream.save();

  /* --------------------------------- ACTION --------------------------------- */
  FlowStore.Action.create(event, {
    addressA: params.caller,
    addressB: params.to,
    amountA: params.withdrawAmount,
    category: "Withdraw",
    streamId: stream.id,
  } as CommonParams.Action);
}
