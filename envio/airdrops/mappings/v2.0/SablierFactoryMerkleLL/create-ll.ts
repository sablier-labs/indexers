import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import type { Params } from "../../../helpers";
import { Store } from "../../../store";
import { preloadCreateEntities } from "../../common/factory";
import { createMerkle } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.params[8];
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLL;
  context.addSablierMerkleLL_v2_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol#L22-L30
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleLL.sol#L17-L24
──────────────────────────────────────────────────────────────

event CreateMerkleLL(
    ISablierMerkleLL indexed merkleLL,
    MerkleLL.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;           [0]
    uint40 campaignStartTime;      [1]
    bool cancelable;               [2]
    uint40 cliffDuration;          [3]
    UD60x18 cliffUnlockPercentage; [4]
    uint40 expiration;             [5]
    address initialAdmin;          [6]
    string ipfsCID;                [7]
    ISablierLockup lockup;         [8]
    bytes32 merkleRoot;            [9]
    string shape;                  [10]
    UD60x18 startUnlockPercentage; [11]
    IERC20 token;                  [12]
    uint40 totalDuration;          [13]
    bool transferable;             [14]
    uint40 vestingStartTime;       [15]
}
──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.handler(async ({ context, event }) => {
  const result = await preloadCreateEntities({
    context,
    event,
    params: {
      admin: event.params.params[6],
      asset: event.params.params[12],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.params;
  const params: Params.CreateCampaignLL = {
    admin: baseParams[6],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[12],
    campaignAddress: event.params.merkleLL,
    campaignStartTime: baseParams[1],
    cancelable: baseParams[2],
    category: "LockupLinear",
    cliffDuration: baseParams[3],
    cliffPercentage: baseParams[4],
    expiration: baseParams[5],
    ipfsCID: baseParams[7],
    lockup: baseParams[8],
    merkleRoot: baseParams[9],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    shape: baseParams[10],
    startPercentage: baseParams[11],
    startTime: baseParams[15],
    totalDuration: baseParams[13],
    transferable: baseParams[14],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
