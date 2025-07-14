import { CreateMerkleLT } from "../../../bindings/SablierMerkleFactory_v1_3/SablierMerkleFactory";
import { SablierMerkleLT_v1_3 as TemplateLT } from "../../../bindings/templates";
import { convertTranchesV1_3 } from "../../../helpers";
import { handleCreateMerkleLT } from "../../common";

export function handle_SablierMerkleFactory_v1_3_CreateMerkleLT(event: CreateMerkleLT): void {
  const params = event.params;
  const baseParams = params.baseParams;

  handleCreateMerkleLT(
    TemplateLT.createWithContext,
    event,
    {
      admin: baseParams.initialAdmin,
      aggregateAmount: params.aggregateAmount,
      asset: baseParams.token,
      campaignAddress: params.merkleLT,
      category: "LockupTranched",
      expiration: baseParams.expiration,
      ipfsCID: baseParams.ipfsCID,
      merkleRoot: baseParams.merkleRoot,
      minimumFee: params.fee,
      name: baseParams.campaignName,
      recipientCount: params.recipientCount,
    },
    {
      cancelable: params.cancelable,
      lockup: params.lockup,
      shape: baseParams.shape,
      startTime: params.streamStartTime,
      totalDuration: params.totalDuration,
      tranchesWithPercentages: convertTranchesV1_3(params.tranchesWithPercentages),
      transferable: params.transferable,
    },
  );
}
