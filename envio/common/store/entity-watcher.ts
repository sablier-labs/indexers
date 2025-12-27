import type { Logger } from "envio";
import type { CommonEntities } from "../entities";

type WatcherContext = {
  log: Logger;
  Watcher: { set: (watcher: CommonEntities.StreamWatcher) => void };
};

/**
 * The entity is not set here because it will be set later in one of the functions below.
 */
export function create(chainId: number): CommonEntities.StreamWatcher {
  const watcher: CommonEntities.StreamWatcher = {
    actionCounter: 1n,
    chainId: BigInt(chainId),
    id: chainId.toString(),
    streamCounter: 1n,
  };
  return watcher;
}

export function incrementActionCounter(
  context: WatcherContext,
  watcher: CommonEntities.StreamWatcher
): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementCounters(
  context: WatcherContext,
  watcher: CommonEntities.StreamWatcher
): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
    streamCounter: watcher.streamCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}
