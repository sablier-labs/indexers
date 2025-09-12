import {
  ClaimLLWithTransfer,
  ClaimLLWithVesting,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleLL_v1_4/SablierMerkleLL";
import { handleClaimInstant, handleClaimLockup, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleLL_v1_4_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleLL_v1_4_ClaimLLWithVesting(event: ClaimLLWithVesting): void {
  handleClaimLockup(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    streamId: event.params.streamId,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLL_v1_4_ClaimLLWithTransfer(event: ClaimLLWithTransfer): void {
  handleClaimInstant(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLL_v1_4_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
