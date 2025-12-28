import type { Envio } from "../../common/bindings";
import { Id } from "../../common/id";
import type { Context, Entity } from "../bindings";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  sender: Envio.Address
): Entity.Batcher {
  const batcher: Entity.Batcher = {
    batchCounter: 0n,
    id: Id.batcher(event.chainId, sender),
  };
  context.Batcher.set(batcher);
  return batcher;
}

export function update(context: Context.Handler, batcher: Entity.Batcher): Entity.Batcher {
  const updatedBatcher = {
    ...batcher,
    batchCounter: batcher.batchCounter + 1n,
  };
  context.Batcher.set(updatedBatcher);
  return updatedBatcher;
}
