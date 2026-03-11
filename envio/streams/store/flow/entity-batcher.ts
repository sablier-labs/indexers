import type { Envio } from "../../../common/bindings";
import { Id } from "../../../common/id";
import type { Context, Entity } from "../../bindings";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  sender: Envio.Address
): Entity.FlowBatcher {
  const id = Id.batcher(event.chainId, sender);
  const batcher: Entity.FlowBatcher = {
    batchCounter: 0n,
    id,
  };
  context.FlowBatcher.set(batcher);
  return batcher;
}

export function update(context: Context.Handler, batcher: Entity.FlowBatcher): Entity.FlowBatcher {
  const updatedBatcher = {
    ...batcher,
    batchCounter: batcher.batchCounter + 1n,
  };
  context.FlowBatcher.set(updatedBatcher);
  return updatedBatcher;
}
