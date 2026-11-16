import type { Logger } from "envio";
import type { Envio } from "../../common/bindings.js";
import { getDirectCallFee } from "../../common/fees.js";
import type { Entity } from "../bindings.js";

type WatcherContext = {
  log: Logger;
  Watcher: { set: (watcher: Entity<"Watcher">) => void };
};

type FeeAction = { fee?: bigint; hash: string };

export function create(chainId: number): Entity<"Watcher"> {
  const watcher: Entity<"Watcher"> = {
    chainId: BigInt(chainId),
    flowActionCounter: 1n,
    flowStreamCounter: 1n,
    id: chainId.toString(),
    lastFeeHash: undefined,
    lockupActionCounter: 1n,
    lockupStreamCounter: 1n,
  };
  return watcher;
}

/**
 * Batched calls share one `msg.value`, so the fee is attributed only to the first action in the transaction.
 */
export function getFee(watcher: Entity<"Watcher">, event: Envio.Event): bigint {
  if (watcher.lastFeeHash === event.transaction.hash) {
    return 0n;
  }
  return getDirectCallFee(event);
}

function withLastFeeHash(watcher: Entity<"Watcher">, action: FeeAction): Entity<"Watcher"> {
  return action.fee ? { ...watcher, lastFeeHash: action.hash } : watcher;
}

/* -------------------------------------------------------------------------- */
/*                                    FLOW                                    */
/* -------------------------------------------------------------------------- */

export function incrementFlowActionCounter(
  context: WatcherContext,
  watcher: Entity<"Watcher">,
  action: FeeAction
): void {
  const updatedWatcher = {
    ...withLastFeeHash(watcher, action),
    flowActionCounter: watcher.flowActionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementFlowCounters(
  context: WatcherContext,
  watcher: Entity<"Watcher">,
  action: FeeAction
): void {
  const updatedWatcher = {
    ...withLastFeeHash(watcher, action),
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
  watcher: Entity<"Watcher">,
  action: FeeAction
): void {
  const updatedWatcher = {
    ...withLastFeeHash(watcher, action),
    lockupActionCounter: watcher.lockupActionCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}

export function incrementLockupCounters(
  context: WatcherContext,
  watcher: Entity<"Watcher">,
  action: FeeAction
): void {
  const updatedWatcher = {
    ...withLastFeeHash(watcher, action),
    lockupActionCounter: watcher.lockupActionCounter + 1n,
    lockupStreamCounter: watcher.lockupStreamCounter + 1n,
  };
  context.Watcher.set(updatedWatcher);
}
