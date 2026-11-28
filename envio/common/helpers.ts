import * as linkify from "linkifyjs";
import type { Sablier } from "sablier";
import type { Version } from "sablier/evm";
import { getCompatibleLockupAddresses } from "../../contracts/compatible-lockups.js";
import type { Envio } from "./bindings.js";

/**
 * Validates the user-supplied Lockup against the official deployments compatible with the factory release.
 * Private analytics tracks all Lockup addresses.
 */
export function isOfficialLockup(
  logger: Envio.Logger,
  event: Envio.Event,
  address: string,
  options: { airdropsVersion: Version.Airdrops } | { allowAll: true }
): boolean {
  if ("allowAll" in options) {
    return options.allowAll;
  }

  const { airdropsVersion } = options;
  const addresses = getCompatibleLockupAddresses(event.chainId, airdropsVersion);
  if (addresses?.includes(address.toLowerCase() as Sablier.Address)) {
    return true;
  }

  logger.debug("Unsupported Lockup address used for creating airdrop campaign", {
    airdropsVersion,
    chainId: event.chainId,
    factory: event.srcAddress,
    lockup: address,
    txHash: event.transaction.hash,
  });
  return false;
}

/**
 * Removes all URLs from a string using linkifyjs for accurate detection.
 * Handles URLs with/without protocols, www prefixes, and all TLDs.
 * @param str The string to remove URLs from.
 * @returns The string with all URLs removed.
 */
export function removeUrls(str: string): string {
  const matches = linkify.find(str, "url");

  if (matches.length === 0) {
    return str;
  }

  // Sort matches in reverse order to maintain string indices during removal
  const sortedMatches = [...matches].sort((a, b) => b.start - a.start);

  let result = str;
  for (const match of sortedMatches) {
    result = result.slice(0, match.start) + result.slice(match.end);
  }

  // Collapse multiple consecutive spaces into single space
  return result.replace(/\s{2,}/gu, " ").trim();
}

/**
 * Remove null bytes and other control characters that might cause issues with PostgreSQL
 * @see https://github.com/enviodev/hyperindex/issues/446
 */
export function sanitizeString(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: needing to remove null bytes
  return str.replace(/[\u0000-\u001F\u007F-\u009F]/gu, "").trim();
}

export function sanitizeStringAndRemoveUrls(str: string): string {
  return sanitizeString(removeUrls(str));
}
