import type { Address } from "viem";
import type { CommonEntities } from "../entities.js";
import { Id } from "../id.js";
import type { RPCData } from "../types.js";

type AssetContext = { Asset: { set: (asset: CommonEntities.Asset) => void } };

export function create(
  context: AssetContext,
  chainId: number,
  assetAddress: Address,
  metadata: RPCData.ERC20Metadata
): CommonEntities.Asset {
  const asset: CommonEntities.Asset = {
    address: assetAddress,
    chainId: BigInt(chainId),
    decimals: BigInt(metadata.decimals),
    id: Id.asset(chainId, assetAddress),
    name: metadata.name,
    symbol: metadata.symbol,
  };
  context.Asset.set(asset);
  return asset;
}
