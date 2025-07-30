import { Address } from "@graphprotocol/graph-ts";
import { readLockups } from "../../common/context";
import { logInfo } from "../../common/logger";
import * as Entity from "../bindings/schema";

/**
 * Generates a nickname by using the asset symbol and the admin address.
 * If the name is not provided, it will use the first 6 and last 4 characters of the admin address.
 * @example "USDC by 0xcafe..beef"
 */
export function getNickname(campaignAdmin: Address, campaignName: string | null, asset: Entity.Asset | null): string {
  let symbol: string;
  if (asset !== null) {
    symbol = asset.symbol;
  } else {
    symbol = "Unknown";
  }
  if (campaignName === null) {
    const prefix = campaignAdmin.toHexString().slice(0, 6);
    const suffix = campaignAdmin.toHexString().slice(-4);
    return `${symbol} by ${prefix}..${suffix}`;
  }
  return `${symbol} in ${campaignName}`;
}

/**
 * Checks if the given address is an official Lockup contract. This check is needed because the Lockup contract
 * is a user-provided parameter when deploying an airdrop campaign.
 */
export function isOfficialLockup(address: Address): boolean {
  const lockups = readLockups();
  for (let i = 0; i < lockups.length; i++) {
    if (Address.fromString(lockups[i]).equals(address)) {
      return true;
    }
  }
  logInfo("Unknown or incorrect Lockup address used in airdrop campaign: {}", [address.toHexString()]);
  return false;
}
