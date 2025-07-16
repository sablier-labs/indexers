/**
 * @file Processors are reusable logic that is used in multiple event handlers.
 */

import type { Envio } from "../../../common/bindings";
import { CommonStore } from "../../../common/store";
import { type Context, type Entity } from "../../bindings";
import { type Params } from "../../helpers/types";
import { Store } from "../../store";
import { create as createAction } from "../../store/entity-action";
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

export function createStream<P extends Params.CreateStreamCommon>(input: Input<P>): Entity.Stream {
  const { context, createInStore, event, loaderReturn, params } = input;

  /* --------------------------------- STREAM --------------------------------- */
  const entities = {
    asset:
      loaderReturn.entities.asset ??
      CommonStore.Asset.create(context, event.chainId, params.asset, loaderReturn.rpcData.assetMetadata),
    batch: loaderReturn.entities.batch ?? Store.Batch.create(event, params.sender),
    batcher: loaderReturn.entities.batcher ?? Store.Batcher.create(context, event, params.sender),
    users: loaderReturn.entities.users,
    watcher: loaderReturn.entities.watcher ?? CommonStore.Watcher.create(context, event.chainId),
  };
  const stream = createInStore(context, event, entities, params);

  /* --------------------------------- ACTION --------------------------------- */
  createAction(context, event, entities.watcher, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.depositAmount,
    category: "Create",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  CommonStore.Watcher.incrementCounters(context, entities.watcher);

  /* ---------------------------------- USER ---------------------------------- */
  CommonStore.User.createOrUpdate(context, event, entities.users.funder, stream.funder);
  CommonStore.User.createOrUpdate(context, event, entities.users.recipient, stream.recipient);
  CommonStore.User.createOrUpdate(context, event, entities.users.sender, stream.sender);

  return stream;
}
