import { DECIMALS_18 } from "../../common/constants";

/**
 * Scale an amount from the ERC20 token's decimals to 18 decimals.
 *
 * Sablier Flow doesn't allow tokens with > 18 decimals.
 * @see https://github.com/sablier-labs/flow/blob/v1.1/src/SablierFlow.sol#L611-L614
 *
 * @param amount The amount to scale, denominated in the ERC20 token's decimals.
 * @param decimals The number of decimals of the ERC20 token.
 * @returns The scaled token amount, denominated in 18 decimals.
 */
export function scale(from: bigint, decimals: bigint): bigint {
  const difference = DECIMALS_18 - decimals;
  const padding = 10n ** difference;

  return from * padding;
}
