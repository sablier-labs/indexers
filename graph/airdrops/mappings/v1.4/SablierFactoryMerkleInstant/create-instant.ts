import { DataSourceContext } from "@graphprotocol/graph-ts";
import { readChainId } from "../../../../common/context";
import { CreateMerkleInstant } from "../../../bindings/SablierFactoryMerkleInstant_v1_4/SablierFactoryMerkleInstant";
import { SablierMerkleInstant_v1_4 as TemplateInstant_v1_4 } from "../../../bindings/templates";
import { Store } from "../../../store";

export function handle_SablierFactoryMerkleInstant_v1_4_CreateMerkleInstant(event: CreateMerkleInstant): void {
  const params = event.params;
  const baseParams = params.params;

  /* -------------------------------- TEMPLATE -------------------------------- */
  const context = new DataSourceContext();
  context.setBigInt("chainId", readChainId());
  TemplateInstant_v1_4.createWithContext(params.merkleInstant, context);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.createInstant(event, {
    admin: baseParams.initialAdmin,
    aggregateAmount: params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: params.merkleInstant,
    campaignStartTime: baseParams.campaignStartTime,
    category: "Instant",
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: params.minFeeUSD,
    name: baseParams.campaignName,
    recipientCount: params.recipientCount,
  });
}
