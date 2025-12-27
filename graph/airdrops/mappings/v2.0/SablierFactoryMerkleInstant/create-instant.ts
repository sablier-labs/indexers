import { DataSourceContext } from "@graphprotocol/graph-ts";
import { readChainId, readContractAlias, readContractVersion } from "../../../../common/context";
import { CreateMerkleInstant } from "../../../bindings/SablierFactoryMerkleInstant_v2_0/SablierFactoryMerkleInstant";
import { SablierMerkleInstant_v2_0 as TemplateInstant_v2_0 } from "../../../bindings/templates";
import { Store } from "../../../store";

export function handle_SablierFactoryMerkleInstant_v2_0_CreateMerkleInstant(
  event: CreateMerkleInstant
): void {
  const params = event.params;
  const baseParams = params.params;

  /* -------------------------------- TEMPLATE -------------------------------- */
  const context = new DataSourceContext();
  context.setBigInt("chainId", readChainId());
  context.setString("alias", readContractAlias());
  context.setString("version", readContractVersion());
  TemplateInstant_v2_0.createWithContext(params.merkleInstant, context);

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
