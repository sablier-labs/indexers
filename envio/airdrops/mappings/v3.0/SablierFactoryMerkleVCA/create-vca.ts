import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/index.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

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
      admin: event.params.campaignParams.initialAdmin,
      asset: event.params.campaignParams.token,
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.campaignParams;
  const params: Params.CreateCampaignVCA = {
    admin: baseParams.initialAdmin,
    aggregateAmount: baseParams.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: event.params.merkleVCA,
    campaignStartTime: baseParams.campaignStartTime,
    category: "VariableClaimAmount",
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    vcaEndTime: baseParams.vestingEndTime,
    vcaRedistributionEnabled: baseParams.enableRedistribution,
    vcaStartTime: baseParams.vestingStartTime,
    vcaUnlockPercentage: baseParams.unlockPercentage,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createVCA,
    entities,
    event,
    params,
  });
});
