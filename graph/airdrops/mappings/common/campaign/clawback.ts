import { ethereum } from "@graphprotocol/graph-ts";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleClawback(event: ethereum.Event, params: Params.Clawback): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  /* --------------------------------- ACTION --------------------------------- */
  const action = Store.Action.create(event, {
    campaign: campaign.id,
    category: "Clawback",
    clawbackAmount: params.amount,
    clawbackFrom: params.admin,
    clawbackTo: params.to,
  } as Params.Action);

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateClawback(event, campaign, action.id);
}
