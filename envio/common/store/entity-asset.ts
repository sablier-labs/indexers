import type { Envio } from "../bindings";
import type { CommonEntities } from "../entities";
import { Id } from "../id";
import type { RPCData } from "../types";

type AssetContext = { Asset: { set: (asset: CommonEntities.Asset) => void } };

export function create(
  context: AssetContext,
  chainId: number,
  assetAddress: Envio.Address,
  metadata: RPCData.ERC20Metadata,
): CommonEntities.Asset {
  const asset: CommonEntities.Asset = {
    address: assetAddress.toLowerCase(),
    chainId: BigInt(chainId),
    decimals: BigInt(metadata.decimals),
    id: Id.asset(chainId, assetAddress),
    name: metadata.name,
    symbol: metadata.symbol,
  };
  context.Asset.set(asset);
  return asset;
}
