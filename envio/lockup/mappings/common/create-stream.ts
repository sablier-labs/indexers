/**
 * @file Processors are reusable logic that is used in multiple event handlers.
 */

import type { Envio } from "../../../common/bindings";
import { CommonStore } from "../../../common/store";
import type { Context, Entity } from "../../bindings";
import type { Params } from "../../helpers/types";

type Input<P extends Params.CreateStreamCommon> = {
  context: Context.Handler;
  createInStore: (
    context: Context.Handler,
    event: Envio.Event,
    entities: Params.CreateEntities,
    params: P,
  ) => Entity.Stream;
  event: Envio.Event;
  entities: Params.CreateEntities;
  params: P;
};

export async function createStream<P extends Params.CreateStreamCommon>(input: Input<P>): Promise<Entity.Stream> {
  const { context, createInStore, event, entities, params } = input;

  /* --------------------------------- STREAM --------------------------------- */
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

  return stream;
}
