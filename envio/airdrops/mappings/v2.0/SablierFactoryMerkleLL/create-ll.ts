import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import type { Params } from "../../../helpers/index.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleLL_v2_0.CreateMerkleLL.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.params.lockup;
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
      admin: event.params.params.initialAdmin,
      asset: event.params.params.token,
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.params;
  const params: Params.CreateCampaignLL = {
    admin: baseParams.initialAdmin,
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: event.params.merkleLL,
    campaignStartTime: baseParams.campaignStartTime,
    cancelable: baseParams.cancelable,
    category: "LockupLinear",
    cliffDuration: baseParams.cliffDuration,
    cliffPercentage: baseParams.cliffUnlockPercentage,
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    lockup: baseParams.lockup,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    shape: baseParams.shape,
    startPercentage: baseParams.startUnlockPercentage,
    startTime: baseParams.vestingStartTime,
    totalDuration: baseParams.totalDuration,
    transferable: baseParams.transferable,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLL,
    entities,
    event,
    params,
  });
});
