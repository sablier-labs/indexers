import { Claim, Clawback, TransferAdmin } from "../../bindings/templates/SablierMerkleLL_v1_3/SablierMerkleLL";
import { handleClaimLockup, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleLL_v1_3_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleLL_v1_3_Claim(event: Claim): void {
  handleClaimLockup(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    streamId: event.params.streamId,
  });
}

export function handle_SablierMerkleLL_v1_3_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
