import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { createStream } from "../../common/create-stream";
import { preloadCreateEntities } from "../../common/preload";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v3.0/src/types/Lockup.sol#L146-L149
https://github.com/sablier-labs/lockup/blob/v3.0/src/types/Lockup.sol#L33-L43
https://github.com/sablier-labs/lockup/blob/v3.0/src/types/LockupLinear.sol#L19-L23
https://github.com/sablier-labs/lockup/blob/v3.0/src/interfaces/ISablierLockupLinear.sol#L21-L26
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
Contract.Lockup_v3_0.CreateLockupLinearStream.handler(async ({ context, event }) => {
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
