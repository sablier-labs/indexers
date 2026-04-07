import type { Address } from "viem";
import type { Envio } from "../../../common/bindings.js";
import { Id } from "../../../common/id.js";
import type { Context, Entity } from "../../bindings.js";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  sender: Address
): Entity.LockupBatcher {
  const batcher: Entity.LockupBatcher = {
    batchCounter: 0n,
    id: Id.batcher(event.chainId, sender),
  };
  context.LockupBatcher.set(batcher);
  return batcher;
}

export function update(
  context: Context.Handler,
  batcher: Entity.LockupBatcher
): Entity.LockupBatcher {
  const updatedBatcher = {
    ...batcher,
    batchCounter: batcher.batchCounter + 1n,
  };
  context.LockupBatcher.set(updatedBatcher);
  return updatedBatcher;
}
