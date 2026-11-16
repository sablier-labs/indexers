import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "./constants";
import { readContractVersion } from "./context";
import { areStringsEqual } from "./strings";

export function isVersionWithFees(versionsWithoutFees: string[]): boolean {
  const version = readContractVersion();
  for (let i = 0; i < versionsWithoutFees.length; i += 1) {
    if (areStringsEqual(version, versionsWithoutFees[i])) {
      return false;
    }
  }
  return true;
}

/**
 * Sablier fees are paid via `msg.value`, but the event only exposes the transaction's value. That value is a fee only
 * when the transaction calls the Sablier contract directly; a wrapper contract may forward the value elsewhere.
 */
export function getDirectCallFee(event: ethereum.Event): BigInt {
  const to = event.transaction.to;
  if (to !== null && to.equals(event.address)) {
    return event.transaction.value;
  }
  return ZERO;
}
