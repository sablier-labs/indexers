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
 * Converts the version from v1.2 to v1_2.
 * @param version The version to sanitize.
 * @returns The sanitized version.
 */
export function sanitizeVersion(version: Types.Version): string {
  return version.replace(".", "_");
}
