import type { Sablier } from "sablier";
import { sablier } from "sablier";
import type { Envio } from "./bindings";

/**
 * Checks if the given address is an official Lockup contract. This check is needed because the Lockup contract
 * is a user-provided parameter when deploying an airdrop campaign.
 *
 * @param logger - The logger instance for debugging
 * @param event - The event containing chain and transaction information
 * @param address - The lockup contract address to validate
 * @param options - Configuration options
 * @param options.allowAll - If true, accepts all addresses (for analytics use case)
 * @returns true if the address is an official lockup contract or allowAll is true
 */
export function isOfficialLockup(
  logger: Envio.Logger,
  event: Envio.Event,
  address: string,
  options: { allowAll?: boolean } = {},
): boolean {
  if (options.allowAll) {
    // For analytics, we want to track all lockup contracts, not just official ones
    return true;
  }

  // For airdrops, validate against official contracts
  const lowercasedAddress = address as Sablier.Address;
  const contract = sablier.contracts.get({
    chainId: event.chainId,
    contractAddress: lowercasedAddress,
    protocol: "lockup",
  });
  if (!contract) {
    logger.debug("Unknown or incorrect Lockup address used for creating airdrop campaign", {
      chainId: event.chainId,
      factory: event.srcAddress,
      lockup: address,
      txHash: event.transaction.hash,
    });
    return false;
  }
  return true;
}
