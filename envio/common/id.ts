import type { Envio } from "./bindings";

export namespace Id {
  /* -------------------------------------------------------------------------- */
  /*                                   SIMPLE                                   */
  /* -------------------------------------------------------------------------- */

  /**
   * The ID starts with the address due to historical reasons.
   * @see https://github.com/sablier-labs/indexers/discussions/118
   *
   * @example
   * 0xf50760d8ead9ff322631a1f3ebf26cc7891b3708-137
   */
  export function campaign(campaignAddress: Envio.Address, chainId: number): string {
    return `${campaignAddress.toLowerCase()}-${chainId}`;
  }

  /**
   * The ID starts with the address due to historical reasons.
   * @see https://github.com/sablier-labs/indexers/discussions/118
   *
   * @example
   * 0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42
   */
  export function stream(contractAddress: Envio.Address, chainId: number, tokenId: bigint | string): string {
    return `${contractAddress.toLowerCase()}-${chainId}-${tokenId}`;
  }

  /**
   * @example
   * LK-137-42
   */
  export function streamAlias(contractAlias: Envio.Address, chainId: number, tokenId: bigint): string {
    return `${contractAlias}-${chainId}-${tokenId}`;
  }

  /* -------------------------------------------------------------------------- */
  /*                                  PREFIXED                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Note that the `logIndex` is the index of the log in the block, not in the transaction.
   * @see https://ethereum.stackexchange.com/q/168867/24693
   *
   * @example
   * action-137-0xe43d1bc5e868da0bd1d80c404ca7f41e823bbea03488f8e3878327375b3aac35-3
   */
  export function action(event: Envio.Event): string {
    return `action-${event.chainId}-${event.transaction.hash}-${event.logIndex}`;
  }

  /**
   * We source all data from the `event` because all activities are created within
   * the context of a campaign.
   *
   * @example
   * activity-137-0x5ce95bff1297dadbdcf9929a10bd02bdfab0dcc6-20300
   */
  export function activity(event: Envio.Event): string {
    const campaignId = campaign(event.srcAddress, event.chainId);
    const timestamp = event.block.timestamp;
    const day = BigInt(timestamp) / (60n * 60n * 24n); // 60 seconds * 60 minutes * 24 hours
    return `activity-${campaignId}-${day}`;
  }

  /**
   * @example
   * asset-137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174
   */
  export function asset(chainId: number, assetAddress: string): string {
    return `asset-${chainId}-${assetAddress.toLowerCase()}`;
  }

  /**
   * @example
   * batch-137-0x5ce95bff1297dadbdcf9929a10bd02bdfab0dcc6-0xe43d1bc5e868da0bd1d80c404ca7f41e823bbea03488f8e3878327375b3aac35
   */
  export function batch(event: Envio.Event, sender: Envio.Address): string {
    return `batch-${event.chainId}-${sender.toLowerCase()}-${event.transaction.hash}`;
  }

  /**
   * @example
   * batcher-137-0x5ce95bff1297dadbdcf9929a10bd02bdfab0dcc6
   */
  export function batcher(chainId: number, sender: Envio.Address): string {
    return `batcher-${chainId}-${sender.toLowerCase()}`;
  }

  /**
   * @example
   * contract-137-0xe0bfe071da104e571298f8b6e0fce44c512c1ff4
   */
  export function contract(chainId: number, contractAddress: string): string {
    return `contract-${chainId}-${contractAddress.toLowerCase()}`;
  }

  /**
   * @example
   * factory-137-0xf0d61b42311c810dfde191d58427d81e87c5d5f6
   */
  export function factory(chainId: number, factoryAddress: string): string {
    return `factory-${chainId}-${factoryAddress.toLowerCase()}`;
  }

  /**
   * @example
   * segment-0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42-0
   */
  export function segment(streamId: string, position: bigint | number): string {
    return `segment-${streamId}-${position}`;
  }

  /**
   * For lockup streams.
   * @example
   * tranche-0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42-0
   */
  export function tranche(streamId: string, position: bigint | number): string {
    return `tranche-${streamId}-${position}`;
  }

  /**
   * For airdrop campaigns.
   * @example
   * tranche-0xf50760d8ead9ff322631a1f3ebf26cc7891b3708-137-0
   */
  export function trancheCampaign(campaignId: string, position: bigint | number): string {
    return `tranche-${campaignId}-${position}`;
  }
}
