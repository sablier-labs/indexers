import { isEvmReleasePayable } from "sablier";
import type { Address } from "viem";
import type { Indexer } from "../../src/types.js";
import { getContractVersion } from "./deployments.js";

export function isVersionWithFees(
  protocol: Indexer.Protocol,
  chainId: number,
  address: string
): boolean {
  const version = getContractVersion(protocol, chainId, address as Address);
  return isEvmReleasePayable({ protocol, version });
}
