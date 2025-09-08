import {
  ClaimInstant,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleInstant_v1_4/SablierMerkleInstant";
import { handleClaimInstant, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleInstant_v1_4_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleInstant_v1_4_ClaimInstant(event: ClaimInstant): void {
  handleClaimInstant(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleInstant_v1_4_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
