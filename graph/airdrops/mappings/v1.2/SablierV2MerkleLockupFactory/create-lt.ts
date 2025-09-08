import { CreateMerkleLT } from "../../../bindings/SablierV2MerkleLockupFactory_v1_2/SablierV2MerkleLockupFactory";
import { SablierV2MerkleLT_v1_2 as TemplateLT } from "../../../bindings/templates";
import { convertTranchesV1_2 } from "../../../helpers";
import { handleCreateMerkleLT } from "../../common";

export function handle_SablierV2MerkleLockupFactory_v1_2_CreateMerkleLT(event: CreateMerkleLT): void {
  const params = event.params;
  const baseParams = params.baseParams;

  handleCreateMerkleLT(
    TemplateLT.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.asset,
      campaignAddress: params.merkleLT,
      campaignStartTime: event.block.timestamp,
      category: "LockupTranched",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: null,
      name: baseParams.name,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: baseParams.cancelable,
      lockup: params.lockupTranched,
      shape: null,
      startTime: null, // all v1.2 streams use the claim time as the start time
      totalDuration: params.totalDuration,
      tranchesWithPercentages: convertTranchesV1_2(params.tranchesWithPercentages),
      transferable: baseParams.transferable,
    },
  );
}
