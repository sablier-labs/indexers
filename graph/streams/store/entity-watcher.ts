import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";

export function getOrCreateWatcher(): Entity.Watcher {
  const chainId = readChainId();
  let watcher = Entity.Watcher.load(chainId.toString());

  if (watcher === null) {
    watcher = new Entity.Watcher(chainId.toString());
    watcher.chainId = chainId;
    watcher.flowActionCounter = ONE;
    watcher.flowStreamCounter = ONE;
    watcher.lockupActionCounter = ONE;
    watcher.lockupStreamCounter = ONE;
  }

  return watcher;
}

/* -------------------------------------------------------------------------- */
/*                                    FLOW                                    */
/* -------------------------------------------------------------------------- */

export function incrementFlowActionCounter(watcher: Entity.Watcher): void {
  watcher.flowActionCounter = watcher.flowActionCounter.plus(ONE);
  watcher.save();
}

export function incrementFlowCounters(watcher: Entity.Watcher): void {
  watcher.flowActionCounter = watcher.flowActionCounter.plus(ONE);
  watcher.flowStreamCounter = watcher.flowStreamCounter.plus(ONE);
  watcher.save();
}

/* -------------------------------------------------------------------------- */
/*                                   LOCKUP                                   */
/* -------------------------------------------------------------------------- */

export function incrementLockupActionCounter(watcher: Entity.Watcher): void {
  watcher.lockupActionCounter = watcher.lockupActionCounter.plus(ONE);
  watcher.save();
}

export function incrementLockupCounters(watcher: Entity.Watcher): void {
  watcher.lockupActionCounter = watcher.lockupActionCounter.plus(ONE);
  watcher.lockupStreamCounter = watcher.lockupStreamCounter.plus(ONE);
  watcher.save();
}
