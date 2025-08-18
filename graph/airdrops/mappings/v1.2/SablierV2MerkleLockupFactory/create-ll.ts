import { CreateMerkleLL } from "../../../bindings/SablierV2MerkleLockupFactory_v1_2/SablierV2MerkleLockupFactory";
import { SablierV2MerkleLL_v1_2 as TemplateLL } from "../../../bindings/templates";
import { handleCreateMerkleLL } from "../../common";

export function handle_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLL(event: CreateMerkleLL): void {
  const params = event.params;
  const baseParams = params.baseParams;

  handleCreateMerkleLL(
    TemplateLL.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.asset,
      campaignAddress: params.merkleLL,
      category: "LockupLinear",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: null,
      name: baseParams.name,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: baseParams.cancelable,
      cliffDuration: params.streamDurations.cliff,
      cliffPercentage: null,
      lockup: params.lockupLinear,
      shape: null,
      startPercentage: null,
      startTime: null, // all v1.2 streams use the claim time as the start time
      totalDuration: params.streamDurations.total,
      transferable: baseParams.transferable,
    },
  );
}
