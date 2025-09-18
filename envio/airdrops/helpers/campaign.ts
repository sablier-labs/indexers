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
