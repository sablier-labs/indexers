import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";

export function getOrCreateWatcher(): Entity.Watcher {
  const chainId = readChainId();
  const id = chainId.toString();

  let watcher = Entity.Watcher.load(id);
  if (watcher === null) {
    watcher = new Entity.Watcher(id);
    watcher.chainId = chainId;
    watcher.actionCounter = ONE;
    watcher.vaultCounter = ONE;
    watcher.save();
  }

  return watcher;
}
