import { Contract } from "../../../bindings";
import { convertTranches, isOfficialLockup, type Params } from "../../../helpers";
import { createMerkleLT } from "../../common";
import { Loader } from "../../common/loader";

Contract.Factory.MerkleLockupFactory_v1_2.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockupTranched;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLT;
  context.addSablierV2MerkleLT_v1_2(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/v2-periphery/blob/v1.2.0/src/types/DataTypes.sol
https://github.com/sablier-labs/v2-periphery/blob/v1.2.0/src/interfaces/ISablierV2MerkleLockupFactory.sol#L30-L38
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierV2MerkleLT indexed merkleLT,
    MerkleLockup.ConstructorParams baseParams,
    ISablierV2LockupTranched lockupTranched,
    MerkleLT.TrancheWithPercentage[] tranchesWithPercentages,
    uint256 totalDuration,
    uint256 aggregateAmount,
    uint256 recipientCount
);


struct ConstructorParams {
    IERC20 asset;         [0]
    bool cancelable;      [1]
    uint40 expiration;    [2]
    address initialAdmin; [3]
    string ipfsCID;       [4]
    bytes32 merkleRoot;   [5]
    string name;          [6]
    bool transferable;    [7]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleLockupFactory_v1_2.CreateMerkleLT.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const baseParams = event.params.baseParams;
    const params: Params.CreateCampaignLT = {
      admin: baseParams[3],
      aggregateAmount: event.params.aggregateAmount,
      asset: baseParams[0],
      campaignAddress: event.params.merkleLT,
      cancelable: baseParams[1],
      category: "LockupTranched",
      expiration: baseParams[2],
      ipfsCID: baseParams[4],
      lockup: event.params.lockupTranched,
      merkleRoot: baseParams[5],
      minimumFee: undefined,
      name: baseParams[6],
      recipientCount: event.params.recipientCount,
      shape: undefined,
      startTime: undefined, // all v1.2 streams use the claim time as the start time
      totalDuration: event.params.totalDuration,
      tranchesWithPercentages: convertTranches(event.params.tranchesWithPercentages),
      transferable: baseParams[7],
    };
    createMerkleLT({
      context,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.2"],
});
