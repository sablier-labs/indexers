import { Contract } from "../../../../bindings.js";
import { convertSegments } from "../../../../helpers/index.js";
import type { Params } from "../../../../helpers/lockup-types.js";
import { Store } from "../../../../store/lockup/index.js";
import { createStream } from "../../common/create-stream.js";
import { preloadCreateEntities } from "../../common/preload.js";

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
Contract.Lockup_v2_0.CreateLockupDynamicStream.handler(async ({ context, event }) => {
  const commonParams = event.params.commonParams;
  const asset = commonParams.token;
  const recipient = commonParams.recipient;
  const sender = commonParams.sender;
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      asset,
      recipient,
      sender,
    },
  });
  if (!result) {
    return;
  }
  const { entities, proxender } = result;

  const streamParams: Params.CreateStreamDynamic = {
    asset,
    cancelable: commonParams.cancelable,
    category: "LockupDynamic",
    depositAmount: commonParams.amounts.deposit,
    endTime: commonParams.timestamps.end,
    funder: commonParams.funder,
    proxender,
    recipient,
    segments: convertSegments(event.params.segments),
    sender,
    shape: commonParams.shape,
    startTime: commonParams.timestamps.start,
    tokenId: event.params.streamId,
    transferable: commonParams.transferable,
  };
  await createStream({
    context,
    createInStore: Store.Stream.createDynamic,
    entities,
    event,
    params: streamParams,
  });
});
