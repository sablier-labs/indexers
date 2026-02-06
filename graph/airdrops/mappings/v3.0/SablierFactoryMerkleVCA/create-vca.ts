import { CreateMerkleVCA } from "../../../bindings/SablierFactoryMerkleVCA_v3_0/SablierFactoryMerkleVCA";
import { SablierMerkleVCA_v3_0 as TemplateVCA_v3_0 } from "../../../bindings/templates";
import { handleCreateMerkleVCA } from "../../common";

export function handle_SablierFactoryMerkleVCA_v2_0_CreateMerkleVCA(event: CreateMerkleVCA): void {
  const params = event.params;
  const baseParams = params.campaignParams;

  handleCreateMerkleVCA(
    TemplateVCA_v3_0.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: baseParams.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleVCA,
      campaignStartTime: baseParams.campaignStartTime,
      category: "VariableClaimAmount",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.minFeeUSD,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      enableRedistribution: baseParams.enableRedistribution,
      unlockPercentage: baseParams.unlockPercentage,
      vestingEndTime: baseParams.vestingEndTime,
      vestingStartTime: baseParams.vestingStartTime,
    }
  );
}
