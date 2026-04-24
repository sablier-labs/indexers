import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store/index.js";

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol

──────────────────────────────────────────────────────────────

event ResetCustomFee(
    address indexed admin,
    address indexed campaignCreator
);

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleFactory_v1_3.ResetCustomFee.handler(async ({ context, event }) => {
  await Store.CustomFee.resetMerkleFactoryV13Fee(context, event, {
    campaignCreator: event.params.campaignCreator,
  });
});
