import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L147-L158
https://github.com/sablier-labs/lockup/blob/v2.0/src/types/DataTypes.sol#L283-L288
https://github.com/sablier-labs/lockup/blob/v2.0/src/interfaces/ISablierLockup.sol#L18-L20

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

struct Segment {
    uint128 amount;   [0]
    UD2x18 exponent;  [1]
    uint40 timestamp; [2]
}

──────────────────────────────────────────────────────────────
*/
Contract.Lockup.Lockup_v2_0.CreateLockupDynamicStream.handler(async ({ context, event }) => {
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
