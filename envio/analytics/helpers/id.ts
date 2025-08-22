import { getDate } from "../../common/time";

export namespace Id {
  export function revenue(chainId: number, blockTimestamp: number): string {
    // Format date as YYYY-MM-DD for daily revenue aggregation
    return `${chainId}_${getDate(blockTimestamp)}`;
  }

  export function revenueTransaction(revenueId: string, hash: string): string {
    return `${revenueId}_${hash}`;
  }

  export function user(chainId: number, address: string): string {
    return `${chainId}_${address.toLowerCase()}`;
  }

  export function userTransaction(userId: string, hash: string): string {
    return `${userId}_${hash}`;
  }
}
