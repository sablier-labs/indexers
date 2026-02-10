import { TREASURY } from "../../helpers";
import type { TransferEvent, ValidationResult } from "../../store/types";

export function validateTransfer(event: TransferEvent): ValidationResult {
  if (event.params.to !== TREASURY) {
    return { isValid: false, reason: "Not treasury" };
  }

  if (!event.transaction.from) {
    return { isValid: false, reason: "No sender" };
  }

  if (event.params.value === 0n) {
    return { isValid: false, reason: "Zero amount" };
  }

  return { isValid: true };
}
