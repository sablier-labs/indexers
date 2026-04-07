import type { Logger } from "envio";
import type { Entity } from "../bindings.js";

type WatcherContext = {
  log: Logger;
  Watcher: { set: (watcher: Entity<"Watcher">) => void };
};

export function create(chainId: number): Entity<"Watcher"> {
  const watcher: Entity<"Watcher"> = {
    chainId: BigInt(chainId),
    flowActionCounter: 1n,
    flowStreamCounter: 1n,
    id: chainId.toString(),
    lockupActionCounter: 1n,
    lockupStreamCounter: 1n,
  };
  return watcher;
}

/* -------------------------------------------------------------------------- */
/*                                    FLOW                                    */
/* -------------------------------------------------------------------------- */

export function incrementFlowActionCounter(
  context: WatcherContext,
  watcher: Entity<"Watcher">
): void {
  const updatedWatcher = {
    ...watcher,
    flowActionCounter: watcher.flowActionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementFlowCounters(context: WatcherContext, watcher: Entity<"Watcher">): void {
  const updatedWatcher = {
    ...watcher,
    flowActionCounter: watcher.flowActionCounter + 1n,
    flowStreamCounter: watcher.flowStreamCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

/* -------------------------------------------------------------------------- */
/*                                   LOCKUP                                   */
/* -------------------------------------------------------------------------- */

export function incrementLockupActionCounter(
  context: WatcherContext,
  watcher: Entity<"Watcher">
): void {
  const updatedWatcher = {
    ...watcher,
    lockupActionCounter: watcher.lockupActionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementLockupCounters(context: WatcherContext, watcher: Entity<"Watcher">): void {
  const updatedWatcher = {
    ...watcher,
    lockupActionCounter: watcher.lockupActionCounter + 1n,
    lockupStreamCounter: watcher.lockupStreamCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}
