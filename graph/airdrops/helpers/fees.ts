import { AIRDROPS_V1_1, AIRDROPS_V1_2 } from "../../common/constants";
import { readContractVersion } from "../../common/context";
import { areStringsEqual } from "../../common/strings";

/**
 * Only Airdrops v1.3 and above support fees.
 */
export function isVersionWithFees(): boolean {
  const version = readContractVersion();
  const notV1_1 = !areStringsEqual(version, AIRDROPS_V1_1);
  const notV1_2 = !areStringsEqual(version, AIRDROPS_V1_2);
  return notV1_1 && notV1_2;
}
