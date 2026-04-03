import { Address } from "@graphprotocol/graph-ts";
import { ZERO } from "../../../common/constants";
import { Id } from "../../../common/id";
import * as Entity from "../../bindings/schema";

export function getOrCreateBatcher(sender: Address): Entity.LockupBatcher {
  const id = Id.batcher(sender);
  let batcher = Entity.LockupBatcher.load(id);

  if (batcher === null) {
    batcher = new Entity.LockupBatcher(id);
    batcher.batchCounter = ZERO;
    batcher.save();
  }

  return batcher;
}
