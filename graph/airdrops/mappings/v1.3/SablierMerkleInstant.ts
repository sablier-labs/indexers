import {
  Claim,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleInstant_v1_3/SablierMerkleInstant";
import { Params } from "../../helpers";
import { Store } from "../../store";
import { handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleInstant_v1_3_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleInstant_v1_3_Claim(event: Claim): void {
  const campaign = Store.Campaign.get(event.address);
  if (campaign === null) {
    return;
  }

  /* -------------------------------- CAMPAIGN -------------------------------- */
  const claimAmount = event.params.amount;
  Store.Campaign.updateClaimed(campaign, claimAmount);

  /* -------------------------------- ACTIVITY -------------------------------- */
  Store.Activity.createOrUpdate(event, campaign, claimAmount);

  /* --------------------------------- ACTION --------------------------------- */
  Store.Action.create(event, {
    campaign: campaign.id,
    category: "Claim",
    claimAmount: claimAmount,
    claimIndex: event.params.index,
    claimRecipient: event.params.recipient,
    fee: event.transaction.value,
  } as Params.Action);
}

export function handle_SablierMerkleInstant_v1_3_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
