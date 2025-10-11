import {
  ClaimLLWithTransfer,
  ClaimLLWithVesting,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleLL_v2_0/SablierMerkleLL";
import { handleClaimInstant, handleClaimLockup, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleLL_v2_0_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleLL_v2_0_ClaimLLWithVesting(event: ClaimLLWithVesting): void {
  handleClaimLockup(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    streamId: event.params.streamId,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLL_v2_0_ClaimLLWithTransfer(event: ClaimLLWithTransfer): void {
  handleClaimInstant(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLL_v2_0_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
