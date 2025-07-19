import { Address, ethereum } from "@graphprotocol/graph-ts";
import { Id } from "../../../../common/id";
import { logError } from "../../../../common/logger";
import { isVersionWithFees } from "../../../helpers";
import { Params } from "../../../helpers/types";
import { Store } from "../../../store";

export function handleClaimLockup(event: ethereum.Event, params: Params.ClaimLockup): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }
  const lockup = campaign.lockup;
  if (lockup === null) {
    logError("Campaign has no Lockup address: {}", [event.address.toHexString()]);
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  const claimAmount = params.amount;
  Store.Campaign.updateClaimed(campaign, claimAmount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.createOrUpdate(event, campaign, claimAmount);

  /* --------------------------------- ACTION --------------------------------- */
  const tokenId = params.streamId;
  const streamId = Id.stream(Address.fromBytes(lockup), tokenId);
  Store.Action.create(event, {
    campaign: campaign.id,
    category: "Claim",
    claimAmount: claimAmount,
    claimIndex: params.index,
    claimRecipient: params.recipient,
    claimStreamId: streamId,
    claimTokenId: tokenId,
    fee: isVersionWithFees() ? event.transaction.value : null,
  } as Params.Action);
}
