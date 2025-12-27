import { CreateMerkleLT } from "../../../bindings/SablierFactoryMerkleLT_v2_0/SablierFactoryMerkleLT";
import { SablierMerkleLT_v2_0 as TemplateLT } from "../../../bindings/templates";
import { convertTranchesV2_0 } from "../../../helpers";
import { handleCreateMerkleLT } from "../../common";

export function handle_SablierFactoryMerkleLT_v2_0_CreateMerkleLT(event: CreateMerkleLT): void {
  const params = event.params;
  const baseParams = params.params;

  handleCreateMerkleLT(
    TemplateLT.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleLT,
      campaignStartTime: baseParams.campaignStartTime,
      category: "LockupTranched",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.minFeeUSD,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: baseParams.cancelable,
      lockup: baseParams.lockup,
      shape: baseParams.shape,
      startTime: baseParams.vestingStartTime,
      totalDuration: params.totalDuration,
      tranchesWithPercentages: convertTranchesV2_0(baseParams.tranchesWithPercentages),
      transferable: baseParams.transferable,
    }
  );
}
