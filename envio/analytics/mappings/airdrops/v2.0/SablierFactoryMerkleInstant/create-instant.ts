import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.FactoryMerkleInstant_v2_0.CreateMerkleInstant.contractRegister(({ context, event }) => {
  const campaignAddress = event.params.merkleInstant;
  context.addSablierMerkleInstant_v2_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleInstant.sol
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleInstant.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;       [0]
    uint40 campaignStartTime;  [1]
    uint40 expiration;         [2]
    address initialAdmin;      [3]
    string ipfsCID;            [4]
    bytes32 merkleRoot;        [5]
    IERC20 token;              [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleInstant_v2_0.CreateMerkleInstant.handler(async ({ context, event }) => {
  const initialAdmin = event.params.params[3];
  await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
});
