import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol

──────────────────────────────────────────────────────────────

event CollectFees(
    address indexed admin,
    ISablierMerkleBase indexed merkleBase,
    uint256 feeAmount
);

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleFactory_v1_3.CollectFees.handler(async ({ context, event }) => {
  await Store.FeesCollection.create(context, event, {
    admin: event.params.admin,
    airdropContract: event.params.merkleBase,
    amount: event.params.feeAmount,
    contractType: "Airdrops",
  });
});
