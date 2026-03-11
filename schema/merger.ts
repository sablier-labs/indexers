import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import type { DocumentNode } from "graphql";
import { SCHEMA_DIR } from "../cli/paths.js";
import type { Indexer } from "../src/index.js";
import { getAssetDefs, getWatcherDefs } from "./common/index.js";
import { getEnumDefs } from "./enums.js";
import { flowStreamDefs } from "./flow/stream.graphql.js";
import { lockupStreamDefs } from "./lockup/stream.graphql.js";
import { streamsActionDefs } from "./streams/action.graphql.js";
import { streamsBatchDefs } from "./streams/batch.graphql.js";
import { streamsStreamDefs } from "./streams/stream.graphql.js";

type TsDefsGenerator = (indexer: Indexer.Name) => DocumentNode;
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
const PROTOCOL_MAP: Record<Indexer.Name, ProtocolSchemaConfig> = {
  analytics: {},
  airdrops: {
    generators: BASE.generators,
    indexerSpecific: ["action", "activity", "campaign", "factory", "tranche"],
  },
  flow: {
    common: ["action", "batch", "contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
  },
  lockup: {
    common: ["action", "batch", "contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
    indexerSpecific: ["segment", "tranche"],
    vendorSpecific: { envio: ["sponsor", "sponsorship"], graph: [] },
  },
  streams: {
    bespoke: ["segment", "sponsor", "sponsorship", "tranche"],
    common: ["contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
  },
};

/**
 * Generates a merged schema for a given indexer.
 *
 * @param indexer - The indexer to generate a schema for.
 * @param vendor - Optional vendor filter. When provided, only that vendor's vendor-specific files are included.
 *                 When omitted, all vendor-specific files are included (complete schema).
 * @returns A merged schema for the given indexer.
 */
export function getMergedSchema(indexer: Indexer.Name, vendor?: Indexer.Vendor): DocumentNode {
  const config = PROTOCOL_MAP[indexer];
  const tsDefs = config.generators?.map((generator) => generator(indexer)) ?? [];
  const gqlPaths = [
    ...getCommonDefsPaths(config.common),
    ...getProtocolDefsPaths(indexer, config.indexerSpecific),
    ...getVendorSpecificDefsPaths(indexer, config.vendorSpecific, vendor),
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

function getProtocolDefs(indexer: Indexer.Name, file: string): string {
  return path.join(SCHEMA_DIR, indexer, `${file}.graphql`);
}

function getProtocolDefsPaths(indexer: Indexer.Name, files?: string[]): string[] {
  return files?.map((file) => getProtocolDefs(indexer, file)) ?? [];
}

function getVendorSpecificDefsPaths(
  indexer: Indexer.Name,
  vendorSpecific: ProtocolSchemaConfig["vendorSpecific"],
  vendor?: Indexer.Vendor
): string[] {
  return getProtocolDefsPaths(indexer, getVendorSpecificFiles(vendorSpecific, vendor));
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

function getStreamDefs(indexer: Indexer.Name): DocumentNode {
  switch (indexer) {
    case "lockup":
      return lockupStreamDefs;
    case "flow":
      return flowStreamDefs;
    case "streams":
      // Merge all streams-specific definitions (prefixed entities)
      return mergeTypeDefs([streamsStreamDefs, streamsActionDefs, streamsBatchDefs]);
    default:
      throw new Error(`Unsupported indexer: ${indexer}`);
  }
}
