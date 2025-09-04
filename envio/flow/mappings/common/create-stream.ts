import { fetchTokenMetadata } from "../../../common/effects";
import { Id } from "../../../common/id";
import { CommonStore } from "../../../common/store";
import type { RPCData } from "../../../common/types";
import type {
  SablierFlow_v1_0_CreateFlowStream_handler as Handler_v1_0,
  SablierFlow_v1_1_CreateFlowStream_handler as Handler_v1_1,
} from "../../bindings/src/Types.gen";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   HANDLER                                  */
/* -------------------------------------------------------------------------- */

type Handler = Handler_v1_0 & Handler_v1_1;

const handler: Handler = async ({ context, event }) => {
  const assetId = Id.asset(event.chainId, event.params.token);
  const batchId = Id.batch(event, event.params.sender);
  const batcherId = Id.batcher(event.chainId, event.params.sender);
  const contractId = Id.contract(event.chainId, event.srcAddress);
  const watcherId = event.chainId.toString();

  const [asset, batch, batcher, contract, watcher] = await Promise.all([
    context.Asset.get(assetId),
    context.Batch.get(batchId),
    context.Batcher.get(batcherId),
    context.Contract.get(contractId),
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

  if (context.isPreload) {
    return;
  }

  /* -------------------------------- CONTRACT -------------------------------- */
  if (!contract) {
    CommonStore.Contract.create(context, event, "flow");
  }

  const entities = {
    asset: asset ?? CommonStore.Asset.create(context, event.chainId, event.params.token, assetMetadata),
    batch: batch ?? Store.Batch.create(event, event.params.sender),
    batcher: batcher ?? Store.Batcher.create(context, event, event.params.sender),
    watcher: watcher ?? CommonStore.Watcher.create(event.chainId),
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

export const createStream = { handler };
