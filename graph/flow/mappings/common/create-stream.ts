import { ethereum } from "@graphprotocol/graph-ts";
import { CommonParams } from "../../../common/types";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleCreateFlowStream(event: ethereum.Event, params: Params.CreateFlowStream): void {
  const stream = Store.Stream.create(event, {
    ratePerSecond: params.ratePerSecond,
    recipient: params.recipient,
    sender: params.sender,
    streamId: params.streamId,
    token: params.token,
    transferable: params.transferable,
  });
  Store.Action.create(event, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.ratePerSecond,
    category: "Create",
    streamId: stream.id,
  } as CommonParams.Action);
}
