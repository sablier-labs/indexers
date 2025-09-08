import { CreateMerkleLL } from "../../../bindings/SablierFactoryMerkleLL_v1_4/SablierFactoryMerkleLL";
import { SablierMerkleLL_v1_4 as TemplateLL_v1_4 } from "../../../bindings/templates";
import { handleCreateMerkleLL } from "../../common";

export function handle_SablierFactoryMerkleLL_v1_4_CreateMerkleLL(event: CreateMerkleLL): void {
  const params = event.params;
  const baseParams = params.params;

  handleCreateMerkleLL(
    TemplateLL_v1_4.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleLL,
      campaignStartTime: baseParams.campaignStartTime,
      category: "LockupLinear",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.minFeeUSD,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: baseParams.cancelable,
      cliffDuration: baseParams.cliffDuration,
      cliffPercentage: baseParams.cliffUnlockPercentage,
      lockup: baseParams.lockup,
      shape: baseParams.shape,
      startPercentage: baseParams.startUnlockPercentage,
      startTime: baseParams.vestingStartTime,
      totalDuration: baseParams.totalDuration,
      transferable: baseParams.transferable,
    },
  );
}
