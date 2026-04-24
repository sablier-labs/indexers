import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store/index.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol

──────────────────────────────────────────────────────────────

event SetCustomFee(
    address indexed admin,
    address indexed campaignCreator,
    uint256 customFee
);

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleFactory_v1_3.SetCustomFee.handler(async ({ context, event }) => {
  await Store.CustomFee.upsertMerkleFactoryV13Fee(context, event, {
    campaignCreator: event.params.campaignCreator,
    customFee: event.params.customFee,
  });
});
