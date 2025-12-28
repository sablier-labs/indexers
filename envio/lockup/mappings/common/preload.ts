/**
 * @file Shared preload utilities for create stream handlers
 */
import type { Envio } from "../../../common/bindings";
import { fetchTokenMetadata } from "../../../common/effects";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { RPCData } from "../../../common/types";
import type { Context, Entity } from "../../bindings";
import { fetchProxender } from "../../effects/proxender";
import type { Params } from "../../helpers/types";
import { Store } from "../../store";

export type PreloadCreateResult = {
  entities: Params.CreateEntities;
  assetMetadata: RPCData.ERC20Metadata;
  proxender?: Envio.Address;
};

type PreloadInput = {
  context: Context.Handler;
  event: Envio.Event;
  params: {
    asset: Envio.Address;
    recipient: Envio.Address;
    sender: Envio.Address;
  };
};

export async function preloadCreateEntities({
  context,
  event,
  params,
}: PreloadInput): Promise<PreloadCreateResult | null> {
  const assetId = Id.asset(event.chainId, params.asset);
  const batchId = Id.batch(event, params.sender);
  const batcherId = Id.batcher(event.chainId, params.sender);
  const watcherId = event.chainId.toString();

  const [asset, batch, batcher, watcher] = await Promise.all([
    context.Asset.get(assetId),
    context.Batch.get(batchId),
    context.Batcher.get(batcherId),
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

  const proxender = await context.effect(fetchProxender, {
    chainId: event.chainId,
    lockupAddress: event.srcAddress,
    streamSender: params.sender,
  });

  const entities: Params.CreateEntities = {
    asset:
      asset ??
      (CommonStore.Asset.create(
        context,
        event.chainId,
        params.asset,
        assetMetadata
      ) as Entity.Asset),
    batch: batch ?? Store.Batch.create(event, params.sender),
    batcher: batcher ?? Store.Batcher.create(context, event, params.sender),
    watcher: watcher ?? (CommonStore.Watcher.create(event.chainId) as Entity.Watcher),
  };

  return {
    assetMetadata,
    entities,
    proxender,
  };
}
