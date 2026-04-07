import type { Address } from "viem";
import type { Envio } from "../../../../common/bindings.js";
import { fetchTokenMetadata } from "../../../../common/effects.js";
import { Id } from "../../../../common/id.js";
import { CommonStore } from "../../../../common/store.js";
import type { RPCData } from "../../../../common/types.js";
import type { Context, Entity } from "../../../bindings.js";
import type { Params } from "../../../helpers/types.js";
import { Store } from "../../../store.js";

export type PreloadCreateResult = {
  entities: Params.CreateEntities;
  assetMetadata: RPCData.ERC20Metadata;
};

type PreloadInput = {
  context: Context.Handler;
  event: Envio.Event;
  params: {
    admin: Address;
    asset: Address;
  };
};

export async function preloadCreateEntities({
  context,
  event,
  params,
}: PreloadInput): Promise<PreloadCreateResult | null> {
  const assetId = Id.asset(event.chainId, params.asset);
  const factoryId = Id.factory(event.chainId, event.srcAddress);
  const watcherId = event.chainId.toString();

  const [asset, factory, watcher] = await Promise.all([
    context.Asset.get(assetId),
    context.Factory.get(factoryId),
    context.Watcher.get(watcherId),
  ]);
  if (context.isPreload) {
    return null;
  }

  let assetMetadata: RPCData.ERC20Metadata;
  if (asset) {
    assetMetadata = {
      decimals: Number(asset.decimals),
      name: asset.name,
      symbol: asset.symbol,
    };
  } else {
    assetMetadata = await context.effect(fetchTokenMetadata, {
      address: params.asset,
      chainId: event.chainId,
    });
  }

  const entities: Params.CreateEntities = {
    asset:
      asset ??
      (CommonStore.Asset.create(
        context,
        event.chainId,
        params.asset,
        assetMetadata
      ) as Entity.Asset),
    factory: factory ?? Store.Factory.create(context, event.chainId, event.srcAddress),
    watcher: watcher ?? (Store.Watcher.create(event.chainId) as Entity.Watcher),
  };

  return {
    assetMetadata,
    entities,
  };
}
