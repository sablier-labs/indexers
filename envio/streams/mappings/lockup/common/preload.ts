/**
 * @file Shared preload utilities for create stream handlers
 */
import type { Address } from "viem";
import type { Envio } from "../../../../common/bindings.js";
import { NOT_AVAILABLE } from "../../../../common/constants.js";
import { fetchTokenMetadata } from "../../../../common/effects.js";
import { Id } from "../../../../common/id.js";
import { CommonStore } from "../../../../common/store.js";
import type { RPCData } from "../../../../common/types.js";
import type { Context, Entity } from "../../../bindings.js";
import { fetchProxender } from "../../../effects/proxender.js";
import type { Params } from "../../../helpers/lockup-types.js";
import * as Watcher from "../../../store/entity-watcher.js";
import { Store } from "../../../store/lockup.js";

export type PreloadCreateResult = {
  entities: Params.CreateEntities;
  assetMetadata: RPCData.ERC20Metadata;
  proxender?: Address;
};

type PreloadInput = {
  context: Context.Handler;
  event: Envio.Event;
  params: {
    asset: Address;
    recipient: Address;
    sender: Address;
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
    context.LockupBatch.get(batchId),
    context.LockupBatcher.get(batcherId),
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

  const proxenderResult = await context.effect(fetchProxender, {
    chainId: event.chainId,
    lockupAddress: event.srcAddress,
    streamSender: params.sender,
  });
  const proxender = proxenderResult === NOT_AVAILABLE ? undefined : (proxenderResult as Address);

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
    watcher: watcher ?? Watcher.create(event.chainId),
  };

  return {
    assetMetadata,
    entities,
    proxender,
  };
}
