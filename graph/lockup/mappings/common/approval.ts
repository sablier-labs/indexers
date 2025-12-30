import { ethereum } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import { CommonParams } from "../../../common/types";
import { Store } from "../../store";

export function handleApproval(event: ethereum.Event, params: CommonParams.Approval): void {
  const tokenId = params.tokenId;
  if (Store.DeprecatedStream.exists(event.address, tokenId)) {
    return;
  }

  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    logError("Stream not saved before this Approval event: {}", [tokenId.toHexString()]);
    return;
  }

  Store.Action.create(event, {
    addressA: params.owner,
    addressB: params.approved,
    category: "Approval",
    streamId: stream.id,
  } as CommonParams.Action);
}
