/**
 * @file Processors are reusable logic that is used in multiple event handlers.
 */

import type { Envio } from "../../../common/bindings";
import { CommonStore } from "../../../common/store";
import { type Context, type Entity } from "../../bindings";
import { type Params } from "../../helpers/types";
import { Store } from "../../store";
import { type Loader } from "./loader";

type Input<P extends Params.CreateStreamCommon> = {
  context: Context.Handler;
  createInStore: (
    context: Context.Handler,
    event: Envio.Event,
    entities: Params.CreateEntities,
    params: P,
  ) => Entity.Stream;
  event: Envio.Event;
  loaderReturn: Loader.CreateReturn;
  params: P;
};

export async function createStream<P extends Params.CreateStreamCommon>(input: Input<P>): Promise<Entity.Stream> {
  const { context, createInStore, event, loaderReturn, params } = input;

  /* --------------------------------- STREAM --------------------------------- */
  const entities = getOrCreateEntities(context, event, loaderReturn, params);
  const stream = createInStore(context, event, entities, params);

  /* --------------------------------- ACTION --------------------------------- */
  CommonStore.Action.create(context, event, entities.watcher, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.depositAmount,
    category: "Create",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementCounters(context, entities.watcher);

  /* ---------------------------------- USER ---------------------------------- */
  await CommonStore.User.createOrUpdate(context, event, [
    { address: event.transaction.from, entity: entities.users.caller },
    { address: stream.funder, entity: entities.users.funder },
    { address: stream.recipient, entity: entities.users.recipient },
    { address: stream.sender, entity: entities.users.sender },
  ]);

  return stream;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function getOrCreateEntities(
  context: Context.Handler,
  event: Envio.Event,
  loaderReturn: Loader.CreateReturn,
  params: Params.CreateStreamCommon,
): Params.CreateEntities {
  const { entities, rpcData } = loaderReturn;
  return {
    asset: entities.asset ?? CommonStore.Asset.create(context, event.chainId, params.asset, rpcData.assetMetadata),
    batch: entities.batch ?? Store.Batch.create(event, params.sender),
    batcher: entities.batcher ?? Store.Batcher.create(context, event, params.sender),
    users: entities.users,
    watcher: entities.watcher ?? CommonStore.Watcher.create(event.chainId),
  };
}
