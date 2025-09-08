import { CreateMerkleLT } from "../../../bindings/SablierFactoryMerkleLT_v1_4/SablierFactoryMerkleLT";
import { SablierMerkleLT_v1_4 as TemplateLT } from "../../../bindings/templates";
import { convertTranchesV1_4 } from "../../../helpers";
import { handleCreateMerkleLT } from "../../common";

export function handle_SablierFactoryMerkleLT_v1_4_CreateMerkleLT(event: CreateMerkleLT): void {
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
      tranchesWithPercentages: convertTranchesV1_4(baseParams.tranchesWithPercentages),
      transferable: baseParams.transferable,
    },
  );
}
