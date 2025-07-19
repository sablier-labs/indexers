import { ethereum } from "@graphprotocol/graph-ts";
import { logInfo } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { Store } from "../../store";

export function handleApproval(event: ethereum.Event, params: CommonParams.Approval): void {
  const tokenId = params.tokenId;
  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    logInfo("Stream not saved before this Approval event: {}", [tokenId.toHexString()]);
    return;
  }

  Store.Action.create(event, {
    addressA: params.owner,
    addressB: params.approved,
    category: "Approval",
    streamId: stream.id,
  } as CommonParams.Action);
}
