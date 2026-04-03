/**
 * @file Processors are reusable logic that is used in multiple event handlers.
 */

import type { Envio } from "../../../../common/bindings";
import { isDeprecatedContract as isDeprecatedLockupContract } from "../../../../common/deprecated";
import { Id } from "../../../../common/id";
import { CommonStore } from "../../../../common/store";
import type { Context, Entity } from "../../../bindings";
import type { Params } from "../../../helpers/lockup-types";
import * as Watcher from "../../../store/entity-watcher";
import * as LockupAction from "../../../store/lockup/entity-action";

type Input<P extends Params.CreateStreamCommon> = {
  context: Context.Handler;
  createInStore: (
    context: Context.Handler,
    event: Envio.Event,
    entities: Params.CreateEntities,
    params: P
  ) => Entity.LockupStream;
  event: Envio.Event;
  entities: Params.CreateEntities;
  params: P;
};

export async function createStream<P extends Params.CreateStreamCommon>(
  input: Input<P>
): Promise<Entity.LockupStream | null> {
  const { context, createInStore, event, entities, params } = input;

  /* -------------------------------- CONTRACT -------------------------------- */
  const contractId = Id.contract(event.chainId, event.srcAddress);
  const contract = await context.Contract.get(contractId);

  if (!contract) {
    CommonStore.Contract.create(context, event, "lockup");
  }

  /* --------------------------------- STREAM --------------------------------- */
  if (isDeprecatedLockupContract({ asset: params.asset, event, protocol: "lockup" })) {
    CommonStore.DeprecatedStream.create(context, event, params.tokenId);
    return null;
  }

  /* --------------------------------- STREAM --------------------------------- */
  const stream = createInStore(context, event, entities, params);

  /* --------------------------------- ACTION --------------------------------- */
  LockupAction.create(context, event, entities.watcher, {
    addressA: params.sender,
    addressB: params.recipient,
    amountA: params.depositAmount,
    category: "Create",
    streamId: stream.id,
  });

  /* --------------------------------- WATCHER -------------------------------- */
  Watcher.incrementLockupCounters(context, entities.watcher);

  return stream;
}
