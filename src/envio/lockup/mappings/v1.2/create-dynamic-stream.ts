import { SablierV2LockupDynamic_v1_2 } from "@envio-lockup/bindings";
import { convertSegments } from "@envio-lockup/helpers/segments";
import { Loader } from "../loader";
import { Processor } from "../processor";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v1.2/src/types/DataTypes.sol
https://github.com/sablier-labs/lockup/blob/v1.2/src/interfaces/ISablierV2LockupDynamic.sol#L29-L41

──────────────────────────────────────────────────────────────

struct Timestamps {
    uint40 start; [0]
    uint40 end;   [1]
}
struct Segment {
    uint128 amount;   [0]
    UD2x18 exponent;  [1]
    uint40 timestamp; [2]
}

event CreateLockupDynamicStream(
    uint256 streamId,
    address funder,
    address indexed sender,
    address indexed recipient,
    Lockup.CreateAmounts amounts,
    IERC20 indexed asset,
    bool cancelable,
    bool transferable,
    LockupDynamic.Segment[] segments,
    LockupDynamic.Timestamps timestamps,
    address broker
);

──────────────────────────────────────────────────────────────
*/
SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.handlerWithLoader({
  loader: Loader.create["v1.2"],
  handler: async ({ context, event, loaderReturn }) => {
    await Processor.Create.dynamic({
      context,
      loaderReturn,
      event,
      params: {
        asset: event.params.asset,
        cancelable: event.params.cancelable,
        category: "LockupDynamic",
        depositAmount: event.params.amounts[0],
        endTime: event.params.timestamps[1],
        funder: event.params.funder,
        recipient: event.params.recipient,
        sender: event.params.sender,
        segments: convertSegments(event.params.segments),
        startTime: event.params.timestamps[0],
        tokenId: event.params.streamId,
        transferable: event.params.transferable,
      },
    });
  },
});
