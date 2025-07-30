import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";

export function getOrCreateWatcher(): Entity.Watcher {
  const chainId = readChainId();
  let watcher = Entity.Watcher.load(chainId.toString());

  if (watcher === null) {
    watcher = new Entity.Watcher(chainId.toString());
    watcher.actionCounter = ONE;
    watcher.chainId = chainId;
    watcher.streamCounter = ONE;
  }

  return watcher;
}
