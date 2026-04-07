import { Contract } from "../../../../bindings.js";
import type { Params } from "../../../../helpers/lockup-types.js";
import { Store } from "../../../../store/lockup/index.js";
import { createStream } from "../../common/create-stream.js";
import { preloadCreateEntities } from "../../common/preload.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/types/Lockup.sol#L146-L149
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/types/Lockup.sol#L33-L43
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/types/LockupLinear.sol#L19-L23
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/interfaces/ISablierLockupLinear.sol#L21-L26
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
    uint40 granularity,
    LockupLinear.UnlockAmounts unlockAmounts
);

──────────────────────────────────────────────────────────────
*/
Contract.Lockup_v4_0.CreateLockupLinearStream.handler(async ({ context, event }) => {
  const commonParams = event.params.commonParams;
  const asset = commonParams[4];
  const recipient = commonParams[2];
  const sender = commonParams[1];
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
  const params: Params.CreateStreamLinear = {
    asset: commonParams[4],
    cancelable: commonParams[5],
    category: "LockupLinear",
    cliffTime: event.params.cliffTime,
    depositAmount: commonParams[3],
    endTime: commonParams[7][1],
    funder: commonParams[0],
    granularity: event.params.granularity,
    proxender,
    recipient: commonParams[2],
    sender: commonParams[1],
    shape: commonParams[8],
    startTime: commonParams[7][0],
    tokenId: event.params.streamId,
    transferable: commonParams[6],
    unlockAmountCliff: event.params.unlockAmounts[1],
    unlockAmountStart: event.params.unlockAmounts[0],
  };
  await createStream({
    context,
    createInStore: Store.Stream.createLinear,
    entities,
    event,
    params,
  });
});
