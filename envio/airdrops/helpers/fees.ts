import { Version } from "sablier";
import { getContractVersion } from "../../common/deployments";

export function isVersionWithFees(chainId: number, address: string): boolean {
  const version = getContractVersion("airdrops", chainId, address);
  return version !== Version.Airdrops.V1_1 && version !== Version.Airdrops.V1_2;
}
