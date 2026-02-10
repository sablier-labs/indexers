export namespace Id {
  export function user(chainId: number, address: string): string {
    return `${chainId}_${address.toLowerCase()}`;
  }

  export function action(chainId: number, txHash: string, logIndex: number): string {
    return `${chainId}_${txHash}_${logIndex}`;
  }
}
