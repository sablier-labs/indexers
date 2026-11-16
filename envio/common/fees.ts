import { isEvmReleasePayable } from "sablier";
import type { Address } from "viem";
import type { Indexer } from "../../src/types.js";
import type { Envio } from "./bindings.js";
import { getContractVersion } from "./deployments.js";

export function isVersionWithFees(
  protocol: Indexer.Protocol,
  chainId: number,
  address: string
): boolean {
  const version = getContractVersion(protocol, chainId, address as Address);
  return isEvmReleasePayable({ protocol, version });
}

/**
 * Sablier fees are paid via `msg.value`, but the event only exposes the transaction's value. That value is a fee only
 * when the transaction calls the Sablier contract directly; a wrapper contract may forward the value elsewhere.
 */
export function getDirectCallFee(event: Envio.Event): bigint {
  const to = event.transaction.to?.toLowerCase();
  return to === event.srcAddress.toLowerCase() ? event.transaction.value : 0n;
}
