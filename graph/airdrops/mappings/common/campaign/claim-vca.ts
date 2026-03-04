import { ethereum } from "@graphprotocol/graph-ts";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleClaimVCA(event: ethereum.Event, params: Params.ClaimVCA): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  const claimAmount = params.claimAmount;
  Store.Campaign.updateClaimed(campaign, claimAmount);
  Store.Campaign.updateForgoneAmount(campaign, params.vcaForgoneAmount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.createOrUpdate(event, campaign, claimAmount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    campaign: campaign.id,
    category: "Claim",
    claimAmount,
    claimIndex: params.index,
    claimRecipient: params.recipient,
    claimTo: params.to,
    fee: event.transaction.value,
    vcaForgoneAmount: params.vcaForgoneAmount,
  } as Params.Action);
}
