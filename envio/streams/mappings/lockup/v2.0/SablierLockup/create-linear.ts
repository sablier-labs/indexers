import { Contract } from "../../../../bindings.js";
import type { Params } from "../../../../helpers/lockup-types.js";
import { Store } from "../../../../store/lockup/index.js";
import { createStream } from "../../common/create-stream.js";
import { preloadCreateEntities } from "../../common/preload.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L147-L158
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L316-L320
https://github.com/sablier-labs/lockup/blob/v2.0/src/interfaces/ISablierLockup.sol#L28-L33

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
struct UnlockAmounts {
    uint128 start; [0]
    uint128 cliff; [1]
}

event CreateLockupLinearStream(
    uint256 indexed streamId,
    Lockup.CreateEventCommon commonParams,
    uint40 cliffTime,
    LockupLinear.UnlockAmounts unlockAmounts
);

──────────────────────────────────────────────────────────────
*/
Contract.Lockup_v2_0.CreateLockupLinearStream.handler(async ({ context, event }) => {
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

  const streamParams: Params.CreateStreamLinear = {
    asset,
    cancelable: commonParams.cancelable,
    category: "LockupLinear",
    cliffTime: event.params.cliffTime,
    depositAmount: commonParams.amounts.deposit,
    endTime: commonParams.timestamps.end,
    funder: commonParams.funder,
    proxender,
    recipient,
    sender,
    shape: commonParams.shape,
    startTime: commonParams.timestamps.start,
    tokenId: event.params.streamId,
    transferable: commonParams.transferable,
    unlockAmountCliff: event.params.unlockAmounts.cliff,
    unlockAmountStart: event.params.unlockAmounts.start,
  };
  await createStream({
    context,
    createInStore: Store.Stream.createLinear,
    entities,
    event,
    params: streamParams,
  });
});
