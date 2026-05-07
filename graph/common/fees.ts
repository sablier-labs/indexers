import { readContractVersion } from "./context";
import { areStringsEqual } from "./strings";

export function isVersionWithFees(versionsWithoutFees: string[]): boolean {
  const version = readContractVersion();
  for (let i = 0; i < versionsWithoutFees.length; i++) {
    if (areStringsEqual(version, versionsWithoutFees[i])) {
      return false;
    }
  }
  return true;
}
