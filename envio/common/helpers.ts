import * as linkify from "linkifyjs";
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

/**
 * Removes all URLs from a string using linkifyjs for accurate detection.
 * Handles URLs with/without protocols, www prefixes, and all TLDs.
 * @param str The string to remove URLs from.
 * @returns The string with all URLs removed.
 */
export function removeUrls(str: string): string {
  const matches = linkify.find(str, "url");

  if (!matches || matches.length === 0) {
    return str;
  }

  // Sort matches in reverse order to maintain string indices during removal
  const sortedMatches = [...matches].sort((a, b) => b.start - a.start);

  let result = str;
  for (const match of sortedMatches) {
    result = result.slice(0, match.start) + result.slice(match.end);
  }

  // Collapse multiple consecutive spaces into single space
  return result.replace(/\s{2,}/g, " ").trim();
}

/**
 * Remove null bytes and other control characters that might cause issues with PostgreSQL
 * @see https://github.com/enviodev/hyperindex/issues/446
 */
export function sanitizeString(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: needing to remove null bytes
  return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
}

export function sanitizeStringAndRemoveUrls(str: string): string {
  return sanitizeString(removeUrls(str));
}
