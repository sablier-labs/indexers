import type { Types } from "./types";

/**
 * Sanitizes the name of a contract to be used in a YAML file.
 * @param name The name of the contract.
 * @param version The version of the contract.
 * @returns The sanitized name of the contract.
 */
export function sanitizeContractName(contractName: string, version: Types.Version): string {
  return `${contractName}_${sanitizeVersion(version)}`; // e.g. SablierLockup_v2_0
}

/**
 * Remove null bytes and other control characters that might cause issues with PostgreSQL
 * @see https://github.com/enviodev/hyperindex/issues/446
 */
export function sanitizeString(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: needing to remove null bytes
  return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
}

/**
 * Converts the version from v1.2 to v1_2.
 * @param version The version to sanitize.
 * @returns The sanitized version.
 */
export function sanitizeVersion(version: Types.Version): string {
  return version.replace(".", "_");
}
