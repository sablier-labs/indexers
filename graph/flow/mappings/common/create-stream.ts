import { ethereum } from "@graphprotocol/graph-ts";
import { isDeprecatedContract as isDeprecatedFlowContract } from "../../../common/deprecated";
import { CommonParams } from "../../../common/types";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleCreateFlowStream(event: ethereum.Event, params: Params.CreateFlowStream): void {
  /* --------------------------------- STREAM --------------------------------- */
  if (isDeprecatedFlowContract(event, "flow", params.asset.toHexString())) {
    return;
  }
  const stream = Store.Stream.create(event, {
    asset: params.asset,
    ratePerSecond: params.ratePerSecond,
    recipient: params.recipient,
    sender: params.sender,
    streamId: params.streamId,
    transferable: params.transferable,
  });

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.ratePerSecond,
    category: "Create",
    streamId: stream.id,
  } as CommonParams.Action);
}
