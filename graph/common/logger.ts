/**
 * @file Logging abstractions to include a Sablier prefix in all logs.
 * @example
 * ```ts
 * logInfo("My value is: {}", [myValue]);
 * ```
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/graph-ts/api/#logging-api
 */
import { log } from "@graphprotocol/graph-ts";
import { LOG_PREFIX } from "./constants";

export function logDebug(message: string, dependencies: string[] = []): void {
  log.debug(LOG_PREFIX.concat(message), dependencies);
}

export function logError(message: string, dependencies: string[] = []): void {
  log.error(LOG_PREFIX.concat(message), dependencies);
}

export function logInfo(message: string, dependencies: string[] = []): void {
  log.info(LOG_PREFIX.concat(message), dependencies);
}

export function logWarning(message: string, dependencies: string[] = []): void {
  log.warning(LOG_PREFIX.concat(message), dependencies);
}

/**
 * Log a critical message and shuts down the subgraph.
 * @see https://github.com/graphprotocol/graph-tooling/discussions/2014
 */
export function shutDown(message: string, dependencies: string[] = []): void {
  log.critical(LOG_PREFIX.concat(message), dependencies);
}
