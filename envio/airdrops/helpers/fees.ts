import { isEvmReleasePayable } from "sablier";
import type { Address } from "viem";
import { getContractVersion } from "../../common/deployments.js";

export function isVersionWithFees(chainId: number, address: string): boolean {
  const version = getContractVersion("airdrops", chainId, address as Address);
  return isEvmReleasePayable({ protocol: "airdrops", version });
}
