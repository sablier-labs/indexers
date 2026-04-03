import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import type { DocumentNode } from "graphql";
import { SCHEMA_DIR } from "../cli/paths.js";
import type { Indexer } from "../src/index.js";
import { getAssetDefs, getWatcherDefs } from "./common/index.js";
import { getEnumDefs } from "./enums.js";
import { streamsActionDefs } from "./streams/action.graphql.js";
import { streamsBatchDefs } from "./streams/batch.graphql.js";
import { streamsStreamDefs } from "./streams/stream.graphql.js";

type TsDefsGenerator = (target: Indexer.Target) => DocumentNode;
type ProtocolSchemaConfig = {
  common?: string[];
  generators?: TsDefsGenerator[];
  indexerSpecific?: string[];
  vendorSpecific?: Record<Indexer.Vendor, string[]>;
};
/**
 * Base GraphQL definition files shared across all protocols.
 */
const BASE = {
  generators: [getEnumDefs, getAssetDefs, getWatcherDefs],
};

/**
 * Mapping of protocols to their respective GraphQL definition files.
 */
const PROTOCOL_MAP: Record<string, ProtocolSchemaConfig> = {
  analytics: {},
  airdrops: {
    generators: BASE.generators,
    indexerSpecific: ["action", "activity", "campaign", "factory", "tranche"],
    vendorSpecific: { envio: ["sponsor", "sponsorship"], graph: [] },
  },
  streams: {
    common: ["contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
    indexerSpecific: ["segment", "sponsor", "sponsorship", "tranche"],
  },
};

/**
 * Generates a merged schema for a given target.
 *
 * @param target - The target to generate a schema for.
 * @param vendor - Optional vendor filter. When provided, only that vendor's vendor-specific files are included.
 *                 When omitted, all vendor-specific files are included (complete schema).
 * @returns A merged schema for the given target.
 */
export function getMergedSchema(target: Indexer.Target, vendor?: Indexer.Vendor): DocumentNode {
  const config = PROTOCOL_MAP[target];
  if (!config) {
    throw new Error(`No schema config for target: ${target}`);
  }
  const tsDefs = config.generators?.map((generator) => generator(target)) ?? [];
  const gqlPaths = [
    ...getCommonDefsPaths(config.common),
    ...getProtocolDefsPaths(target, config.indexerSpecific),
    ...getVendorSpecificDefsPaths(target, config.vendorSpecific, vendor),
  ];
  const gqlDefs = loadFilesSync<DocumentNode>(gqlPaths);

  return mergeTypeDefs([...tsDefs, ...gqlDefs], { throwOnConflict: true });
}

function getCommonDefs(file: string): string {
  return path.join(SCHEMA_DIR, "common", `${file}.graphql`);
}

function getCommonDefsPaths(files?: string[]): string[] {
  return files?.map((file) => getCommonDefs(file)) ?? [];
}

function getProtocolDefs(target: Indexer.Target, file: string): string {
  return path.join(SCHEMA_DIR, target, `${file}.graphql`);
}

function getProtocolDefsPaths(target: Indexer.Target, files?: string[]): string[] {
  return files?.map((file) => getProtocolDefs(target, file)) ?? [];
}

function getVendorSpecificDefsPaths(
  target: Indexer.Target,
  vendorSpecific: ProtocolSchemaConfig["vendorSpecific"],
  vendor?: Indexer.Vendor
): string[] {
  return getProtocolDefsPaths(target, getVendorSpecificFiles(vendorSpecific, vendor));
}

function getVendorSpecificFiles(
  vendorSpecific: ProtocolSchemaConfig["vendorSpecific"],
  vendor?: Indexer.Vendor
): string[] {
  if (!vendorSpecific) {
    return [];
  }

  if (vendor) {
    return vendorSpecific[vendor] ?? [];
  }

  return Object.values(vendorSpecific).flat();
}

function getStreamDefs(target: Indexer.Target): DocumentNode {
  switch (target) {
    case "streams":
      return mergeTypeDefs([streamsStreamDefs, streamsActionDefs, streamsBatchDefs]);
    default:
      throw new Error(`Unsupported target: ${target}`);
  }
}
