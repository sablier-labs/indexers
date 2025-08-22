import { fetchTokenMetadata } from "../../../common/effects";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { RPCData } from "../../../common/types";
import type {
  SablierFlow_v1_0_CreateFlowStream_handlerArgs as HandlerArgs_v1_0,
  SablierFlow_v1_1_CreateFlowStream_handlerArgs as HandlerArgs_v1_1,
  SablierFlow_v1_0_CreateFlowStream_loaderArgs as LoaderArgs_v1_0,
  SablierFlow_v1_1_CreateFlowStream_loaderArgs as LoaderArgs_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   LOADER                                   */
/* -------------------------------------------------------------------------- */

type LoaderArgs = LoaderArgs_v1_0 | LoaderArgs_v1_1;
type LoaderReturn = Awaited<ReturnType<typeof loader>>;

const loader = async ({ context, event }: LoaderArgs) => {
  const assetId = Id.asset(event.chainId, event.params.token);
  const batchId = Id.batch(event, event.params.sender);
  const batcherId = Id.batcher(event.chainId, event.params.sender);
  const watcherId = event.chainId.toString();

  const [asset, batch, batcher, watcher] = await Promise.all([
    context.Asset.get(assetId),
    context.Batch.get(batchId),
    context.Batcher.get(batcherId),
    context.Watcher.get(watcherId),
  ]);

  let assetMetadata: RPCData.ERC20Metadata;
  if (asset) {
    assetMetadata = {
      decimals: Number(asset.decimals),
      name: asset.name,
      symbol: asset.symbol,
    };
  } else {
    assetMetadata = await context.effect(fetchTokenMetadata, {
      address: event.params.token,
      chainId: event.chainId,
    });
  }

  return {
    asset,
    assetMetadata,
    batch,
    batcher,
    watcher,
  };
};

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type HandlerArgs = HandlerArgs_v1_0<LoaderReturn> | HandlerArgs_v1_1<LoaderReturn>;

const handler = async ({ context, event, loaderReturn }: HandlerArgs) => {
  const { assetMetadata } = loaderReturn;
  const entities = {
    asset: loaderReturn.asset ?? CommonStore.Asset.create(context, event.chainId, event.params.token, assetMetadata),
    batch: loaderReturn.batch ?? Store.Batch.create(event, event.params.sender),
    batcher: loaderReturn.batcher ?? Store.Batcher.create(context, event, event.params.sender),
    watcher: loaderReturn.watcher ?? CommonStore.Watcher.create(event.chainId),
  };

  /* --------------------------------- STREAM --------------------------------- */
  const stream = Store.Stream.create(context, event, entities, {
    ratePerSecond: event.params.ratePerSecond,
    recipient: event.params.recipient,
    sender: event.params.sender,
    tokenId: event.params.streamId,
    transferable: event.params.transferable,
  });

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, entities.watcher, {
    addressA: event.params.sender,
    addressB: event.params.recipient,
    amountA: event.params.ratePerSecond,
    category: "Create",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementCounters(context, entities.watcher);
};

/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */

export const createStream = { handler, loader };
