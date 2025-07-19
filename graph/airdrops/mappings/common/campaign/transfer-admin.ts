import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleTransferAdmin(event: ethereum.Event, params: Params.TransferAdmin): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  // Starting with v1.3, the constructor emits a TransferAdmin event.
  if (params.oldAdmin.equals(Address.zero())) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  Store.Campaign.updateAdmin(campaign, params.newAdmin);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, { campaign: campaign.id, category: "TransferAdmin" } as Params.Action);
}
