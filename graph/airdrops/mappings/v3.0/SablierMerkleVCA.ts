import {
  ClaimVCA,
  Clawback,
  LowerMinFeeUSD,
  RedistributionEnabled,
  TransferAdmin,
} from "../../bindings/templates/SablierMerkleVCA_v3_0/SablierMerkleVCA";
import {
  handleClaimVCA,
  handleClawback,
  handleLowerMinFeeUSD,
  handleRedistributionEnabled,
  handleTransferAdmin,
} from "../common";

export function handle_SablierMerkleVCA_v3_0_TransferAdmin(event: TransferAdmin): void {
  handleTransferAdmin(event, {
    newAdmin: event.params.newAdmin,
    oldAdmin: event.params.oldAdmin,
  });
}

export function handle_SablierMerkleVCA_v3_0_ClaimVCA(event: ClaimVCA): void {
  handleClaimVCA(event, {
    claimAmount: event.params.claimAmount,
    forgoneAmount: event.params.forgoneAmount,
    index: event.params.index,
    recipient: event.params.recipient,
    to: event.params.to,
  });
}

export function handle_SablierMerkleVCA_v3_0_Clawback(event: Clawback): void {
  handleClawback(event, {
    admin: event.params.admin,
    amount: event.params.amount,
    to: event.params.to,
  });
}

export function handle_SablierMerkleVCA_v3_0_LowerMinFeeUSD(event: LowerMinFeeUSD): void {
  handleLowerMinFeeUSD(event, {
    newMinFeeUSD: event.params.newMinFeeUSD,
    previousMinFeeUSD: event.params.previousMinFeeUSD,
  });
}

export function handle_SablierMerkleVCA_v3_0_RedistributionEnabled(
  event: RedistributionEnabled
): void {
  handleRedistributionEnabled(event);
}
