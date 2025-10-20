import { sablier } from "sablier";
import { getDate, getMonth } from "../../common/time";

export namespace Id {
  export function dailyFiatFees(blockTimestamp: number): string {
    return getDate(blockTimestamp);
  }

  export function dailyCryptoFees(chainId: number, blockTimestamp: number): string {
    const chain = sablier.chains.getOrThrow(chainId);
    return `${getDate(blockTimestamp)}_${chain.nativeCurrency.symbol}`;
  }

  export function feeTransaction(chainId: number, hash: string): string {
    return `${chainId}_${hash}`;
  }

  export function feeCollection(chainId: number, hash: string, logIndex: number): string {
    return `${chainId}_${hash}_${logIndex}`;
  }

  export function feeCollectionDaily(timestamp: number, currency: string): string {
    const date = getDate(timestamp);
    return `${date}_${currency}`;
  }

  export function user(chainId: number, address: string): string {
    return `${chainId}_${address.toLowerCase()}`;
  }

  export function userTransaction(userId: string, hash: string): string {
    return `${userId}_${hash}`;
  }

  export function usersActiveMonthly(blockTimestamp: number): string {
    return getMonth(blockTimestamp);
  }

  export function userActivityMonth(userAddress: string, blockTimestamp: number): string {
    return `${userAddress.toLowerCase()}_${getMonth(blockTimestamp)}`;
  }
}
