import { sablier } from "sablier";
import { getDate } from "../../common/time";

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

  export function feeCollectionTransaction(chainId: number, hash: string, logIndex: number): string {
    return `${chainId}_${hash}_${logIndex}`;
  }

  export function user(chainId: number, address: string): string {
    return `${chainId}_${address.toLowerCase()}`;
  }

  export function userTransaction(userId: string, hash: string): string {
    return `${userId}_${hash}`;
  }
}
