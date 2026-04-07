import type { Address } from "viem";
import type { Envio } from "../../../common/bindings.js";
import { Id } from "../../../common/id.js";
import type { Context, Entity } from "../../bindings.js";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  sender: Address
): Entity<"FlowBatcher"> {
  const id = Id.batcher(event.chainId, sender);
  const batcher: Entity<"FlowBatcher"> = {
    batchCounter: 0n,
    id,
  };
  context.FlowBatcher.set(batcher);
  return batcher;
}

export function update(
  context: Context.Handler,
  batcher: Entity<"FlowBatcher">
): Entity<"FlowBatcher"> {
  const updatedBatcher = {
    ...batcher,
    batchCounter: batcher.batchCounter + 1n,
  };
  context.FlowBatcher.set(updatedBatcher);
  return updatedBatcher;
}
