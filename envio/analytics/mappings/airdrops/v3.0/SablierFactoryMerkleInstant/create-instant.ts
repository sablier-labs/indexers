import { Contract } from "../../../../bindings";
import { Store } from "../../../../store";

Contract.Airdrops.Factory.FactoryMerkleInstant_v3_0.CreateMerkleInstant.contractRegister(
  ({ context, event }) => {
    const campaignAddress = event.params.merkleInstant;
    context.addSablierMerkleInstant_v3_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleInstant.sol
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleInstant.sol
──────────────────────────────────────────────────────────────

event CreateMerkleInstant(
    ISablierMerkleInstant indexed merkleInstant,
    MerkleInstant.ConstructorParams campaignParams,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;       [0]
    uint40 campaignStartTime;  [1]
    ClaimType claimType;       [2]
    uint40 expiration;         [3]
    address initialAdmin;      [4]
    string ipfsCID;            [5]
    bytes32 merkleRoot;        [6]
    IERC20 token;              [7]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleInstant_v3_0.CreateMerkleInstant.handler(
  async ({ context, event }) => {
    const initialAdmin = event.params.campaignParams[4];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
