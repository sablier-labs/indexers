import { isOfficialLockup } from "../../../../common/helpers";
import { Contract } from "../../../bindings";
import { convertTranches } from "../../../helpers";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { preloadCreateEntities } from "../../common/factory";
import { createMerkle } from "../../common/factory/create-merkle";

Contract.Factory.FactoryMerkleLT_v2_0.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.params[6];
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
      admin: event.params.params[4],
      asset: event.params.params[9],
    },
  });
  if (!result) {
    return;
  }

  const { entities } = result;
  const baseParams = event.params.params;
  const params: Params.CreateCampaignLT = {
    admin: baseParams[4],
    aggregateAmount: event.params.aggregateAmount,
    asset: baseParams[9],
    campaignAddress: event.params.merkleLT,
    campaignStartTime: baseParams[1],
    cancelable: baseParams[2],
    category: "LockupTranched",
    expiration: baseParams[3],
    ipfsCID: baseParams[5],
    lockup: baseParams[6],
    merkleRoot: baseParams[7],
    minimumFee: event.params.minFeeUSD,
    name: baseParams[0],
    recipientCount: event.params.recipientCount,
    shape: baseParams[8],
    startTime: baseParams[12],
    totalDuration: event.params.totalDuration,
    tranchesWithPercentages: convertTranches(baseParams[10]),
    transferable: baseParams[11],
  };
  await createMerkle({
    context,
    createInStore: Store.Campaign.createLT,
    entities,
    event,
    params,
  });
});
