import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/flow/blob/v1.1/src/interfaces/ISablierFlow.sol

──────────────────────────────────────────────────────────────

event CollectFees(
    address indexed admin,
    uint256 indexed feeAmount
);

──────────────────────────────────────────────────────────────
*/

Contract.Flow.Flow_v1_1.CollectFees.handler(async ({ context, event }) => {
  await Store.FeesCollection.create(context, event, {
    admin: event.params.admin,
    airdropContract: undefined,
    amount: event.params.feeAmount,
    contractType: "Flow",
  });
});
