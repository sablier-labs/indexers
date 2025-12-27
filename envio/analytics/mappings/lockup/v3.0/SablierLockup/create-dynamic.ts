import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v3.0/src/types/Lockup.sol#L146-L149
https://github.com/sablier-labs/lockup/blob/v3.0/src/types/Lockup.sol#L33-L43
https://github.com/sablier-labs/lockup/blob/v3.0/src/interfaces/ISablierLockupDynamic.sol#L19-L21
──────────────────────────────────────────────────────────────

event CreateLockupDynamicStream(
    uint256 indexed streamId,
    Lockup.CreateEventCommon commonParams,
    LockupDynamic.Segment[] segments
);

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

──────────────────────────────────────────────────────────────
*/
Contract.Lockup.Lockup_v3_0.CreateLockupDynamicStream.handler(async ({ context, event }) => {
  const commonParams = event.params.commonParams;
  const funder = commonParams[0];
  const sender = commonParams[1];
  const recipient = commonParams[2];
  await Store.User.createOrUpdate(context, event, [
    funder,
    sender,
    recipient,
    event.transaction.from,
  ]);
});
