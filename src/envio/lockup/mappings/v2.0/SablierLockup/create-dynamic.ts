import { Contract } from "../../../bindings";
import { convertSegments } from "../../../helpers";
import { type Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { createStream } from "../../common/create-stream";
import { Loader } from "../../common/loader";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L147-L158
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L283-L288
https://github.com/sablier-labs/lockup/blob/v2.0/src/interfaces/ISablierLockup.sol#L18-L20

──────────────────────────────────────────────────────────────

struct Timestamps {
    uint40 start; [0]
    uint40 end;   [1]
}
struct CreateEventCommon {
    address funder;               [0]
    address sender;               [1]
    address recipient;            [2]
    Lockup.CreateAmounts amounts; [3]
    IERC20 token;                 [4]
    bool cancelable;              [5]
    bool transferable;            [6]
    Lockup.Timestamps timestamps; [7]
    string shape;                 [8]
    address broker;               [9]
}
struct Segment {
    uint128 amount;   [0]
    UD2x18 exponent;  [1]
    uint40 timestamp; [2]
}

event CreateLockupDynamicStream(
    uint256 indexed streamId,
    Lockup.CreateEventCommon commonParams,
    LockupDynamic.Segment[] segments
);

──────────────────────────────────────────────────────────────
*/
Contract.Lockup_v2_0.CreateLockupDynamicStream.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const commonParams = event.params.commonParams;
    const params: Params.CreateStreamDynamic = {
      asset: commonParams[4],
      cancelable: commonParams[5],
      category: "LockupDynamic",
      depositAmount: commonParams[3][0],
      endTime: commonParams[7][1],
      funder: commonParams[0],
      recipient: commonParams[2],
      segments: convertSegments(event.params.segments),
      sender: commonParams[1],
      shape: commonParams[8],
      startTime: commonParams[7][0],
      tokenId: event.params.streamId,
      transferable: commonParams[6],
    };
    createStream({
      context,
      createInStore: Store.Stream.createDynamic,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v2.0"],
});
