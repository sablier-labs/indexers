import type { Logger } from "envio";
import type { Common } from "../bindings";

type WatcherContext = {
  log: Logger;
  Watcher: { set: (watcher: Common.StreamWatcher) => void };
};

/**
 * The entity is not set here because it will be set later in one of the functions below.
 */
export function create(context: WatcherContext, chainId: number): Common.StreamWatcher {
  const watcher: Common.StreamWatcher = {
    actionCounter: 1n,
    chainId: BigInt(chainId),
    id: chainId.toString(),
    streamCounter: 1n,
  };
  context.Watcher.set(watcher);
  return watcher;
}

export function incrementActionCounter(context: WatcherContext, watcher: Common.StreamWatcher): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementCounters(context: WatcherContext, watcher: Common.StreamWatcher): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
    streamCounter: watcher.streamCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}
