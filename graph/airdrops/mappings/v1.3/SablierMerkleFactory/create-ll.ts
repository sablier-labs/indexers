import { CreateMerkleLL } from "../../../bindings/SablierMerkleFactory_v1_3/SablierMerkleFactory";
import { SablierMerkleLL_v1_3 as TemplateLL_v1_3 } from "../../../bindings/templates";
import { handleCreateMerkleLL } from "../../common";

export function handle_SablierMerkleFactory_v1_3_CreateMerkleLL(event: CreateMerkleLL): void {
  const params = event.params;
  const baseParams = params.baseParams;

  handleCreateMerkleLL(
    TemplateLL_v1_3.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleLL,
      campaignStartTime: event.block.timestamp,
      category: "LockupLinear",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.fee,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: params.cancelable,
      cliffDuration: params.schedule.cliffDuration,
      cliffPercentage: params.schedule.cliffPercentage,
      lockup: params.lockup,
      shape: baseParams.shape,
      startPercentage: params.schedule.startPercentage,
      startTime: params.schedule.startTime,
      totalDuration: params.schedule.totalDuration,
      transferable: params.transferable,
    },
  );
}
