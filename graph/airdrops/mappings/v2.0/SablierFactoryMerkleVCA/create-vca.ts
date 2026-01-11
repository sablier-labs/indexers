import { CreateMerkleVCA } from "../../../bindings/SablierFactoryMerkleVCA_v2_0/SablierFactoryMerkleVCA";
import { SablierMerkleVCA_v2_0 as TemplateVCA_v2_0 } from "../../../bindings/templates";
import { handleCreateMerkleVCA } from "../../common";

export function handle_SablierFactoryMerkleVCA_v2_0_CreateMerkleVCA(event: CreateMerkleVCA): void {
  const params = event.params;
  const baseParams = params.params;

  handleCreateMerkleVCA(
    TemplateVCA_v2_0.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleVCA,
      campaignStartTime: baseParams.campaignStartTime,
      category: "VariableClaim",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.minFeeUSD,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      unlockPercentage: baseParams.unlockPercentage,
      vestingEndTime: baseParams.vestingEndTime,
      vestingStartTime: baseParams.vestingStartTime,
    }
  );
}
