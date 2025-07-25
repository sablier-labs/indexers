/**
 * @see {@link file://./../../lib/types.ts}
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest/#data-source-context
 */
import { BigInt, dataSource } from "@graphprotocol/graph-ts";
import { shutDown } from "./logger";

export function readChainId(): BigInt {
  return readBigInt("chainId");
}

export function readContractAlias(): string {
  return readString("alias");
}

export function readContractVersion(): string {
  return readString("version");
}

export function readLockups(): string[] {
  const context = dataSource.context();
  const value = context.get("lockups");
  if (value === null) {
    shutDown("Lockups not found in data source context: {}", [dataSource.address().toHexString()]);
    return [];
  }
  return value.toArray().map<string>((value) => value.toString());
}

function readBigInt(key: string): BigInt {
  const context = dataSource.context();
  const value = context.getBigInt(key);
  return value;
}

function readString(key: string): string {
  const context = dataSource.context();
  const value = context.getString(key);
  return value;
}
