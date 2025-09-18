import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.MerkleFactory_v1_3.CreateMerkleInstant.contractRegister(({ context, event }) => {
  const campaignAddress = event.params.merkleInstant;
  context.addSablierMerkleInstant_v1_3(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L29-L35
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleBase.ConstructorParams baseParams,
    uint256 aggregateAmount,
    uint256 recipientCount,
    uint256 fee
);

struct ConstructorParams {
    IERC20 token;         [0]
    uint40 expiration;    [1]
    address initialAdmin; [2]
    string ipfsCID;       [3]
    bytes32 merkleRoot;   [4]
    string campaignName;  [5]
    string shape;         [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.MerkleFactory_v1_3.CreateMerkleInstant.handler(async ({ context, event }) => {
  const initialAdmin = event.params.baseParams[2];
  await Store.User.createOrUpdate(context, event, [initialAdmin, initialAdmin]);
});
