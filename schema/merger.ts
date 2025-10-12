import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import type { DocumentNode } from "graphql";
import { SCHEMA_DIR } from "../lib/paths";
import type { Indexer } from "../src";
import { getAssetDefs, getWatcherDefs } from "./common";
import { getEnumDefs } from "./enums";
import { flowStreamDefs } from "./flow/stream.graphql";
import { lockupStreamDefs } from "./lockup/stream.graphql";

type TsDefsGenerator = (indexer: Indexer.Name) => DocumentNode;
/**
 * Base GraphQL definition files shared across all protocols.
 */
const BASE = {
  generators: [getEnumDefs, getAssetDefs, getWatcherDefs],
};

/**
 * Mapping of protocols to their respective GraphQL definition files.
 */
const PROTOCOL_MAP: Record<
  Indexer.Name,
  {
    bespoke?: string[];
    common?: string[];
    generators?: Array<TsDefsGenerator>;
  }
> = {
  airdrops: {
    bespoke: ["action", "activity", "campaign", "factory", "tranche"],
    generators: BASE.generators,
  },
  analytics: {},
  flow: {
    common: ["action", "batch", "contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
  },
  lockup: {
    bespoke: ["segment", "tranche"],
    common: ["action", "batch", "contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
  },
};

/**
 * Generates a merged schema for a given protocol.
 *
 * @param vendor - The vendor to generate a schema for.
 * @param protocol - The protocol to generate a schema for.
 * @returns A merged schema for the given protocol.
 */
export function getMergedSchema(indexer: Indexer.Name): DocumentNode {
  // Generate TypeScript definitions
  const tsDefs = PROTOCOL_MAP[indexer].generators?.map((generator) => generator(indexer)) || [];

  // Build paths for all GraphQL files
  const protocolGqlPaths = {
    bespoke: PROTOCOL_MAP[indexer].bespoke?.map((file) => getProtocolDefs(indexer, file)) || [],
    common: PROTOCOL_MAP[indexer].common?.map((file) => getCommonDefs(file)) || [],
  };

  // Load all GraphQL files
  const allGqlPaths = [...protocolGqlPaths.common, ...protocolGqlPaths.bespoke];
  const loadedGqlDefs = loadFilesSync<DocumentNode>(allGqlPaths);
  const allDefs = [...tsDefs, ...loadedGqlDefs];

  const mergedSchema = mergeTypeDefs(allDefs, { throwOnConflict: true });
  return mergedSchema;
}

function getProtocolDefs(indexer: Indexer.Name, file: string): string {
  return path.join(SCHEMA_DIR, indexer, `${file}.graphql`);
}

function getCommonDefs(file: string): string {
  return path.join(SCHEMA_DIR, "common", `${file}.graphql`);
}

function getStreamDefs(indexer: Indexer.Name): DocumentNode {
  switch (indexer) {
    case "lockup":
      return lockupStreamDefs;
    case "flow":
      return flowStreamDefs;
    default:
      throw new Error(`Unsupported indexer: ${indexer}`);
  }
}
