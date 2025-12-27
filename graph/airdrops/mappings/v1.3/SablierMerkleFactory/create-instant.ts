import { DataSourceContext } from "@graphprotocol/graph-ts";
import { readChainId, readContractVersion } from "../../../../common/context";
import { CreateMerkleInstant } from "../../../bindings/SablierMerkleFactory_v1_3/SablierMerkleFactory";
import { SablierMerkleInstant_v1_3 as TemplateInstant_v1_3 } from "../../../bindings/templates";
import { Store } from "../../../store";

export function handle_SablierMerkleFactory_v1_3_CreateMerkleInstant(
  event: CreateMerkleInstant
): void {
  const params = event.params;
  const baseParams = params.baseParams;

  /* -------------------------------- TEMPLATE -------------------------------- */
  const context = new DataSourceContext();
  context.setBigInt("chainId", readChainId());
  context.setString("version", readContractVersion());
  TemplateInstant_v1_3.createWithContext(params.merkleInstant, context);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.createInstant(event, {
    admin: baseParams.initialAdmin,
    aggregateAmount: params.aggregateAmount,
    asset: baseParams.token,
    campaignAddress: params.merkleInstant,
    campaignStartTime: event.block.timestamp,
    category: "Instant",
    expiration: baseParams.expiration,
    ipfsCID: baseParams.ipfsCID,
    merkleRoot: baseParams.merkleRoot,
    minimumFee: params.fee,
    name: baseParams.campaignName,
    recipientCount: params.recipientCount,
  });
}
