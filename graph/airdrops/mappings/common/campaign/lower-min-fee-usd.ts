import { ethereum } from "@graphprotocol/graph-ts";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleLowerMinFeeUSD(event: ethereum.Event, params: Params.LowerMinFeeUSD): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (params.previousMinFeeUSD.equals(params.newMinFeeUSD)) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateFee(campaign, params.newMinFeeUSD);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    campaign: campaign.id,
    category: "LowerMinFeeUSD",
    fee: params.newMinFeeUSD,
  } as Params.Action);
}
