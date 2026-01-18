import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers";
import { Store } from "../../../store";
import { preloadCreateEntities } from "../../common/factory";
import { createMerkle } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleVCA_v2_0.CreateMerkleVCA.contractRegister(({ context, event }) => {
  context.addSablierMerkleVCA_v2_0(event.params.merkleVCA);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol#L141-L152
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleVCA.sol#L17-L24
──────────────────────────────────────────────────────────────

event CreateMerkleVCA(
    ISablierMerkleVCA indexed merkleVCA,
    MerkleVCA.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;           [0]
    uint40 campaignStartTime;      [1]
    uint40 expiration;             [2]
    address initialAdmin;          [3]
    string ipfsCID;                [4]
    bytes32 merkleRoot;            [5]
    IERC20 token;                  [6]
    UD60x18 unlockPercentage;      [7]
    uint40 vestingEndTime;         [8]
    uint40 vestingStartTime;       [9]
}
──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleVCA_v2_0.CreateMerkleVCA.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      admin: event.params.params[3],
      asset: event.params.params[6],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.params;
  const params: Params.CreateCampaignVCA = {
    admin: baseParams[3],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[6],
    campaignAddress: event.params.merkleVCA,
    campaignStartTime: baseParams[1],
    category: "VariableClaimAmount",
    expiration: baseParams[2],
    ipfsCID: baseParams[4],
    merkleRoot: baseParams[5],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    unlockPercentage: baseParams[7],
    vestingEndTime: baseParams[8],
    vestingStartTime: baseParams[9],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createVCA,
    entities,
    event,
    params,
  });
});
