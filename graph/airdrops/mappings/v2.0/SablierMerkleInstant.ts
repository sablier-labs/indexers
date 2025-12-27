import {
  ClaimInstant,
  Clawback,
  LowerMinFeeUSD,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleInstant_v2_0/SablierMerkleInstant";
import {
  handleClaimInstant,
  handleClawback,
  handleLowerMinFeeUSD,
  handleTransferAdmin,
} from "../common";

export function handle_SablierMerkleInstant_v2_0_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleInstant_v2_0_ClaimInstant(event: ClaimInstant): void {
  handleClaimInstant(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleInstant_v2_0_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}

export function handle_SablierMerkleInstant_v2_0_LowerMinFeeUSD(event: LowerMinFeeUSD): void {
  handleLowerMinFeeUSD(event, {
    newMinFeeUSD: event.params.newMinFeeUSD,
    previousMinFeeUSD: event.params.previousMinFeeUSD,
  });
}
