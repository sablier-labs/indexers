import {
  ClaimLTWithTransfer,
  ClaimLTWithVesting,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleLT_v2_0/SablierMerkleLT";
import { handleClaimInstant, handleClaimLockup, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierMerkleLT_v2_0_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleLT_v2_0_ClaimLTWithVesting(event: ClaimLTWithVesting): void {
  handleClaimLockup(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    streamId: event.params.streamId,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLT_v2_0_ClaimLTWithTransfer(event: ClaimLTWithTransfer): void {
  handleClaimInstant(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleLT_v2_0_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
