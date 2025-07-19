import {
  Claim,
  Clawback,
  TransferAdmin,
} from "../../bindings/templates/SablierV2MerkleStreamerLL_v1_1/SablierV2MerkleStreamerLL";
import { handleClaimLockup, handleClawback, handleTransferAdmin } from "../common";

export function handle_SablierV2MerkleStreamerLL_v1_1_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierV2MerkleStreamerLL_v1_1_Claim(event: Claim): void {
  handleClaimLockup(event, {
    amount: event.params.amount,
    index: event.params.index,
    recipient: event.params.recipient,
    streamId: event.params.streamId,
  });
}

export function handle_SablierV2MerkleStreamerLL_v1_1_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}
