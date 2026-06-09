import { isOfficialLockup } from "../../../../common/helpers.js";
import { Contract } from "../../../bindings.js";
import { convertTranches } from "../../../helpers/index.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store/index.js";
import { createMerkle } from "../../common/factory/create-merkle.js";
import { preloadCreateEntities } from "../../common/factory/index.js";

Contract.Factory.FactoryMerkleLT_v2_0.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLT;
  context.addSablierMerkleLT_v2_0(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v2.0/src/types/DataTypes.sol#L22-L29
https://github.com/sablier-labs/airdrops/blob/v2.0/src/interfaces/ISablierFactoryMerkleLT.sol#L17-L24
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleLT.ConstructorParams params,
    uint256 aggregateAmount,
    uint256 totalDuration,
    uint256 recipientCount,
    address comptroller,
    uint256 minFeeUSD
);

struct ConstructorParams {
    string campaignName;                                      [0]
    uint40 campaignStartTime;                                 [1]
    bool cancelable;                                          [2]
    uint40 expiration;                                        [3]
    address initialAdmin;                                     [4]
    string ipfsCID;                                           [5]
    ISablierLockup lockup;                                    [6]
    bytes32 merkleRoot;                                       [7]
    string shape;                                             [8]
    IERC20 token;                                             [9]
    MerkleLT.TrancheWithPercentage[] tranchesWithPercentages; [10]
    bool transferable;                                        [11]
    uint40 vestingStartTime;                                  [12]
}

struct TrancheWithPercentage {
    UD2x18 unlockPercentage;
    uint40 duration;
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.FactoryMerkleLT_v2_0.CreateMerkleLT.handler(async ({ context, event }) => {
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
  const params: Params.CreateCampaignLT = {
    admin: baseParams.initialAdmin,
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: event.params.merkleLT,
    campaignStartTime: baseParams.campaignStartTime,
    cancelable: baseParams.cancelable,
    category: "LockupTranched",
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    lockup: baseParams.lockup,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: event.params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: event.params.recipientCount,
    shape: baseParams.shape,
    startTime: baseParams.vestingStartTime,
    totalDuration: event.params.totalDuration,
    tranchesWithPercentages: convertTranches(baseParams.tranchesWithPercentages),
    transferable: baseParams.transferable,
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLT,
    entities,
    event,
    params,
  });
});
