import { Address } from "@graphprotocol/graph-ts";
import { fetchAssetDecimals, fetchAssetName, fetchAssetSymbol } from "../../common/bindings/fetch";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";

function getId(chainId: string, address: string): string {
  return `asset-${chainId}-${address}`;
}

export function getOrCreateAsset(address: Address): Entity.Asset {
  const chainId = readChainId();
  const id = getId(chainId.toString(), address.toHexString());

  let asset = Entity.Asset.load(id);
  if (asset === null) {
    asset = new Entity.Asset(id);
    asset.address = address;
    asset.chainId = chainId;
    asset.decimals = fetchAssetDecimals(address);
    asset.name = fetchAssetName(address);
    asset.symbol = fetchAssetSymbol(address);
    asset.save();
  }

  return asset;
}
