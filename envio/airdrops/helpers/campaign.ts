import type { Sablier } from "sablier";
import { sablier } from "sablier";
import type { Envio } from "../../common/bindings";
import type { Entity } from "../bindings";

/**
 * Generates a nickname by using the asset symbol and the admin address.
 * If the name is not provided, it will use the first 6 and last 4 characters of the admin address.
 * @example "USDC by 0xcafe..beef"
 */
export function getNickname(
  campaignAdmin: Envio.Address,
  campaignName: string | undefined,
  asset: Entity.Asset | undefined,
): string {
  campaignAdmin = campaignAdmin.toLowerCase();
  const symbol = asset?.symbol ?? "Unknown";
  if (!campaignName) {
    const prefix = campaignAdmin.slice(0, 6);
    const suffix = campaignAdmin.slice(-4);
    return `${symbol} by ${prefix}..${suffix}`;
  }
  return `${symbol} in ${campaignName}`;
}

/**
 * Checks if the given address is an official Lockup contract. This check is needed because the Lockup contract
 * is a user-provided parameter when deploying an airdrop campaign.
 */
export function isOfficialLockup(logger: Envio.Logger, event: Envio.Event, address: Envio.Address): boolean {
  const lowercasedAddress = address.toLowerCase() as Sablier.Address;
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
