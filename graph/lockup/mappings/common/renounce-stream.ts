import { ethereum } from "@graphprotocol/graph-ts";
import { CommonParams } from "../../../common/types";
import { Params } from "../../helpers/types";
import { Store } from "../../store";

export function handleRenounceLockupStream(
  event: ethereum.Event,
  params: Params.RenounceStream
): void {
  const tokenId = params.streamId;
  if (Store.DeprecatedStream.exists(event.address, tokenId)) {
    return;
  }

  const stream = Store.Stream.get(tokenId);
  if (stream === null) {
    return;
  }

  /* --------------------------------- STREAM --------------------------------- */
  stream.cancelable = false;
  stream.renounceTime = event.block.timestamp;

  /* --------------------------------- ACTION --------------------------------- */
  const action = Store.Action.create(event, {
    category: "Renounce",
    streamId: stream.id,
  } as CommonParams.Action);
  stream.renounceAction = action.id;
  stream.save();
}
