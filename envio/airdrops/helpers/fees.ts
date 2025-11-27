import { isVersionAfter } from "sablier";
import { Version } from "sablier/evm";
import { getContractVersion } from "../../common/deployments";

export function isVersionWithFees(chainId: number, address: string): boolean {
  const version = getContractVersion("airdrops", chainId, address);
  return isVersionAfter(version, Version.Airdrops.V1_2);
}
