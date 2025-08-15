import { Contract } from "../../../bindings";
import { convertTranches, isOfficialLockup } from "../../../helpers";
import type { Params } from "../../../helpers/types";
import { Store } from "../../../store";
import { createMerkle, Loader } from "../../common/factory/create-merkle";

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLT.contractRegister(({ context, event }) => {
  const lockupAddress = event.params.lockup;
  if (!isOfficialLockup(context.log, event, lockupAddress)) {
    return;
  }
  const campaignAddress = event.params.merkleLT;
  context.addSablierMerkleLT_v1_3(campaignAddress);
});

/*
──────────────────────────────────────────────────────────────
Solidity Event Reference
https://github.com/sablier-labs/airdrops/blob/v1.3/src/types/DataTypes.sol
https://github.com/sablier-labs/airdrops/blob/v1.3/src/interfaces/ISablierMerkleFactory.sol#L51-L63
──────────────────────────────────────────────────────────────

event CreateMerkleLT(
    ISablierMerkleLT indexed merkleLT,
    MerkleBase.ConstructorParams baseParams,
    ISablierLockup lockup,
    bool cancelable,
    bool transferable,
    uint40 streamStartTime,
    MerkleLT.TrancheWithPercentage[] tranchesWithPercentages,
    uint256 totalDuration,
    uint256 aggregateAmount,
    uint256 recipientCount,
    uint256 fee
);

struct ConstructorParams {
    IERC20 token;         [0]
    uint40 expiration;    [1]
    address initialAdmin; [2]
    string ipfsCID;       [3]
    bytes32 merkleRoot;   [4]
    string campaignName;  [5]
    string shape;         [6]
}

──────────────────────────────────────────────────────────────
*/

Contract.Factory.MerkleFactory_v1_3.CreateMerkleLT.handlerWithLoader({
  handler: async ({ context, event, loaderReturn }) => {
    const baseParams = event.params.baseParams;
    const params: Params.CreateCampaignLT = {
      admin: baseParams[2],
      aggregateAmount: event.params.aggregateAmount,
      asset: baseParams[0],
      campaignAddress: event.params.merkleLT,
      cancelable: event.params.cancelable,
      category: "LockupTranched",
      expiration: baseParams[1],
      ipfsCID: baseParams[3],
      lockup: event.params.lockup,
      merkleRoot: baseParams[4],
      minimumFee: event.params.fee,
      name: baseParams[5],
      recipientCount: event.params.recipientCount,
      shape: baseParams[6],
      startTime: event.params.streamStartTime,
      totalDuration: event.params.totalDuration,
      tranchesWithPercentages: convertTranches(event.params.tranchesWithPercentages),
      transferable: event.params.transferable,
    };
    await createMerkle({
      context,
      createInStore: Store.Campaign.createLT,
      event,
      loaderReturn,
      params,
    });
  },
  loader: Loader.create["v1.3"],
});
