import { ethereum } from "@graphprotocol/graph-ts";
import { AIRDROPS_NON_PAYABLE_VERSIONS } from "../../../../common/constants";
import { isVersionWithFees } from "../../../../common/fees";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleClaimInstant(event: ethereum.Event, params: Params.ClaimInstant): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  const claimAmount = params.amount;
  Store.Campaign.updateClaimed(campaign, claimAmount);

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
    fee: isVersionWithFees(AIRDROPS_NON_PAYABLE_VERSIONS) ? event.transaction.value : null,
  } as Params.Action);
}
