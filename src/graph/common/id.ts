import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { readChainId, readContractAlias } from "./context";

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
  export function campaign(campaignAddress: Address): string {
    const chainId = readChainId().toString();
    const address = campaignAddress.toHexString();
    return `${address}-${chainId}`;
  }

  /**
   * The ID starts with the address due to historical reasons.
   * @see https://github.com/sablier-labs/indexers/discussions/118
   *
   * @example
   * 0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42
   */
  export function stream(contractAddress: Address, tokenId: BigInt): string {
    const address = contractAddress.toHexString();
    const chainId = readChainId().toString();
    const streamId = `${address}-${chainId}-${tokenId.toString()}`;
    return streamId;
  }

  /**
   * @example
   * LK-137-42
   */
  export function streamAlias(chainId: BigInt, tokenId: BigInt): string {
    const alias = readContractAlias();
    return `${alias}-${chainId.toString()}-${tokenId.toString()}`;
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
  export function action(event: ethereum.Event): string {
    const chainId = readChainId().toString();
    const hash = event.transaction.hash.toHexString();
    const logIndex = event.logIndex.toString();
    return `action-${chainId}-${hash}-${logIndex}`;
  }

  /**
   * We source all data from the `event` because all activities are created within
   * the context of a campaign.
   *
   * @example
   * activity-137-0x5ce95bff1297dadbdcf9929a10bd02bdfab0dcc6-20300
   */
  export function activity(event: ethereum.Event): string {
    const campaignId = campaign(event.address);
    const timestamp = event.block.timestamp;
    const day = timestamp.div(BigInt.fromI32(60 * 60 * 24)); // 60 seconds * 60 minutes * 24 hours
    return `activity-${campaignId}-${day.toString()}`;
  }

  /**
   * @example
   * asset-137-0x2791bca1f2de4661ed88a30c99a7a9449aa84174
   */
  export function asset(assetAddress: Address): string {
    const chainId = readChainId().toString();
    const address = assetAddress.toHexString();
    return `asset-${chainId}-${address}`;
  }

  /**
   * @example
   * batch-137-0xf50760d8ead9ff322631a1f3ebf26cc7891b3708-0xe43d1bc5e868da0bd1d80c404ca7f41e823bbea03488f8e3878327375b3aac35
   */
  export function batch(event: ethereum.Event, sender: Address): string {
    const chainId = readChainId().toString();
    const address = sender.toHexString();
    const hash = event.transaction.hash.toHexString();
    return `batch-${chainId}-${address}-${hash}`;
  }

  /**
   * @example
   * batcher-137-0x5ce95bff1297dadbdcf9929a10bd02bdfab0dcc6
   */
  export function batcher(sender: Address): string {
    const chainId = readChainId().toString();
    const address = sender.toHexString();
    return `batcher-${chainId}-${address}`;
  }

  /**
   * @example
   * factory-137-0xf0d61b42311c810dfde191d58427d81e87c5d5f6
   */
  export function factory(factoryAddress: Address): string {
    const chainId = readChainId().toString();
    const address = factoryAddress.toHexString();
    return `factory-${chainId}-${address}`;
  }

  /**
   * @example
   * segment-0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42-0
   */
  export function segment(streamId: string, position: u32): string {
    return `segment-${streamId}-${position.toString()}`;
  }

  /**
   * For lockup streams.
   * @example
   * tranche-0xe0bfe071da104e571298f8b6e0fce44c512c1ff4-137-42-0
   */
  export function tranche(streamId: string, position: u32): string {
    return `tranche-${streamId}-${position.toString()}`;
  }

  /**
   * For airdrop campaigns.
   * @example
   * tranche-0xf50760d8ead9ff322631a1f3ebf26cc7891b3708-137-0
   */
  export function trancheCampaign(campaignId: string, position: u32): string {
    return `tranche-${campaignId}-${position.toString()}`;
  }
}
