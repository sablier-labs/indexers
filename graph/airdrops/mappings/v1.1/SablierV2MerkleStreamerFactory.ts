import { CreateMerkleStreamerLL } from "../../bindings/SablierV2MerkleStreamerFactory_v1_1/SablierV2MerkleStreamerFactory";
import { SablierV2MerkleStreamerLL_v1_1 as TemplateLL } from "../../bindings/templates";
import { handleCreateMerkleLL } from "../common";

export function handle_SablierV2MerkleStreamerFactory_v1_1_CreateMerkleStreamerLL(event: CreateMerkleStreamerLL): void {
  const params = event.params;

  handleCreateMerkleLL(
    TemplateLL.createWithContext,
    event,
    {
      admin: params.admin,
      aggregateAmount: params.aggregateAmount,
      asset: params.asset,
      campaignAddress: params.merkleStreamer,
      category: "LockupLinear",
      expiration: params.expiration,
      ipfsCID: params.ipfsCID,
      merkleRoot: params.merkleRoot,
      minimumFee: null,
      name: null,
      recipientCount: params.recipientsCount,
    },
    {
      cancelable: params.cancelable,
      cliffDuration: params.streamDurations.cliff,
      cliffPercentage: null,
      lockup: params.lockupLinear,
      shape: null,
      startPercentage: null,
      startTime: null, // all v1.1 streams use the claim time as the start time
      totalDuration: params.streamDurations.total,
      transferable: params.transferable,
    },
  );
}
