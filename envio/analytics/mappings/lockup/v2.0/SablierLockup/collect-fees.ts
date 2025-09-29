import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/lockup/blob/v2.0/src/interfaces/ISablierLockup.sol

──────────────────────────────────────────────────────────────

event CollectFees(
    address indexed admin,
    uint256 indexed feeAmount
);

──────────────────────────────────────────────────────────────
*/

Contract.Lockup.Lockup_v2_0.CollectFees.handler(async ({ context, event }) => {
  await Store.FeesCollection.create(context, event, {
    admin: event.params.admin,
    airdropContract: undefined,
    amount: event.params.feeAmount,
    contractType: "Lockup",
  });
});
