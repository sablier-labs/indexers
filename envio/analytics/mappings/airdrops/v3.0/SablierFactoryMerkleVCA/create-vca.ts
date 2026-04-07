import { Contract } from "../../../../bindings.js";
import { Store } from "../../../../store/index.js";

Contract.Airdrops.Factory.FactoryMerkleVCA_v3_0.CreateMerkleVCA.contractRegister(
  ({ context, event }) => {
    const campaignAddress = event.params.merkleVCA;
    context.addSablierMerkleVCA_v3_0(campaignAddress);
  }
);

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleVCA.sol
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleVCA.sol
──────────────────────────────────────────────────────────────

event CreateMerkleVCA(
    ISablierMerkleVCA indexed merkleVCA,
    MerkleVCA.ConstructorParams campaignParams,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    uint128 aggregateAmount;   [0]
    string campaignName;       [1]
    uint40 campaignStartTime;  [2]
    uint8 claimType;           [3]
    bool enableRedistribution; [4]
    uint40 expiration;         [5]
    address initialAdmin;      [6]
    string ipfsCID;            [7]
    bytes32 merkleRoot;        [8]
    IERC20 token;              [9]
    UD60x18 unlockPercentage;  [10]
    uint40 vestingEndTime;     [11]
    uint40 vestingStartTime;   [12]
}

──────────────────────────────────────────────────────────────
*/

Contract.Airdrops.Factory.FactoryMerkleVCA_v3_0.CreateMerkleVCA.handler(
  async ({ context, event }) => {
    const initialAdmin = event.params.campaignParams[6];
    await Store.User.createOrUpdate(context, event, [initialAdmin, event.transaction.from]);
  }
);
