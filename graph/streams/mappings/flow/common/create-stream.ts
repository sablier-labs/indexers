import { ethereum } from "@graphprotocol/graph-ts";
import { isDeprecatedContract as isDeprecatedFlowContract } from "../../../../common/deprecated";
import { CommonParams } from "../../../../common/types";
import { Params } from "../../../helpers/flow/types";
import { FlowStore, Store } from "../../../store";

export function handleCreateFlowStream(
  event: ethereum.Event,
  params: Params.CreateFlowStream
): void {
  Store.Contract.loadOrCreateFlow(event.address);
  if (isDeprecatedFlowContract(event, "flow", params.token)) {
    Store.DeprecatedStream.create(event, event.address, params.streamId);
    return;
  }

  const stream = FlowStore.Stream.create(event, {
    ratePerSecond: params.ratePerSecond,
    recipient: params.recipient,
    sender: params.sender,
    startTime: params.startTime,
    streamId: params.streamId,
    token: params.token,
    transferable: params.transferable,
  });
  FlowStore.Action.create(event, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.ratePerSecond,
    category: "Create",
    streamId: stream.id,
  } as CommonParams.Action);
}
