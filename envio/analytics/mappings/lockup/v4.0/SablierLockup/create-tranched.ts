import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/types/Lockup.sol#L146-L149
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/types/Lockup.sol#L33-L43
https://github.com/sablier-labs/evm-monorepo/blob/lockup@v4.0/lockup/src/interfaces/ISablierLockupTranched.sol#L19-L21
──────────────────────────────────────────────────────────────

event CreateLockupTranchedStream(
    uint256 indexed streamId,
    Lockup.CreateEventCommon commonParams,
    LockupTranched.Tranche[] tranches
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
Contract.Lockup.Lockup_v4_0.CreateLockupTranchedStream.handler(async ({ context, event }) => {
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
  await Store.Fees.createOrUpdate(context, event);
});
