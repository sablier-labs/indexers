import { Address } from "@graphprotocol/graph-ts";
import { fetchAssetDecimals, fetchAssetName, fetchAssetSymbol } from "../../common/bindings/fetch";
import { readChainId } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

export function getOrCreateAsset(address: Address): Entity.Asset {
  const id = Id.asset(address);
  let asset = Entity.Asset.load(id);

  if (asset === null) {
    asset = new Entity.Asset(id);

    asset.address = address;
    asset.chainId = readChainId();
    asset.decimals = fetchAssetDecimals(address);
    asset.name = fetchAssetName(address);
    asset.symbol = fetchAssetSymbol(address);

    asset.save();
  }

  return asset;
}
