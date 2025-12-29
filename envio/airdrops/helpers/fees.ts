import { isReleasePayable } from "sablier";
import { getContractVersion } from "../../common/deployments";

export function isVersionWithFees(chainId: number, address: string): boolean {
  const version = getContractVersion("airdrops", chainId, address);
  return isReleasePayable("airdrops", version);
}
