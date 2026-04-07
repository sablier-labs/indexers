import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers.js";
import { Store } from "../../../store.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory.js";

Contract.Factory.FactoryMerkleVCA_v3_0.CreateMerkleVCA.contractRegister(({ context, event }) => {
  context.addSablierMerkleVCA_v3_0(event.params.merkleVCA);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/types/MerkleVCA.sol#L38-L52
https://github.com/sablier-labs/evm-monorepo/blob/airdrops@v3.0/airdrops/src/interfaces/ISablierFactoryMerkleVCA.sol#L18-L23
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

Contract.Factory.FactoryMerkleVCA_v3_0.CreateMerkleVCA.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      admin: event.params.campaignParams[6],
      asset: event.params.campaignParams[9],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.campaignParams;
  const params: Params.CreateCampaignVCA = {
    admin: baseParams[6],
    aggregateAmount: baseParams[0],
    asset: baseParams[9],
    campaignAddress: event.params.merkleVCA,
    campaignStartTime: baseParams[2],
    category: "VariableClaimAmount",
    expiration: baseParams[5],
    ipfsCID: baseParams[7],
    merkleRoot: baseParams[8],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[1],
    recipientCount: event.params.recipientCount,
    vcaEndTime: baseParams[11],
    vcaRedistributionEnabled: baseParams[4],
    vcaStartTime: baseParams[12],
    vcaUnlockPercentage: baseParams[10],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createVCA,
    entities,
    event,
    params,
  });
});
