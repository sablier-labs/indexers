import type { Context, Entity } from "../bindings";

/**
 * The entity is not set here because it will be set later in the `update` function.
 */
export function create(chainId: number): Entity.Watcher {
  const watcher: Entity.Watcher = {
    actionCounter: 1n,
    campaignCounter: 1n,
    chainId: BigInt(chainId),
    id: chainId.toString(),
  };
  return watcher;
}

export function incrementActionCounter(context: Context.Handler, watcher: Entity.Watcher): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementCounters(context: Context.Handler, watcher: Entity.Watcher): void {
  const updatedWatcher = {
    ...watcher,
    actionCounter: watcher.actionCounter + 1n,
    campaignCounter: watcher.campaignCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}
