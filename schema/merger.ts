import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import type { DocumentNode } from "graphql";
import { SCHEMA_DIR } from "../cli/paths.js";
import type { Indexer } from "../src/index.js";
import {
  getAssetDefs,
  getSponsorDefs,
  getSponsorshipDefs,
  getWatcherDefs,
} from "./common/index.js";
import { getEnumDefs } from "./enums.js";
import { streamsActionDefs } from "./streams/action.graphql.js";
import { streamsBatchDefs } from "./streams/batch.graphql.js";
import { streamsStreamDefs } from "./streams/stream.graphql.js";

type TsDefsGenerator = (target: Indexer.Target) => DocumentNode;
type VendorConfig<T> = Record<Indexer.Vendor, T[]>;
type ProtocolSchemaConfig = {
  /** Filenames (without extension) from `schema/common/` shared across indexers (e.g. `"contract"`). */
  common?: string[];
  /** TypeScript functions that programmatically produce GraphQL `DocumentNode` defs at merge time. */
  generators?: TsDefsGenerator[];
  /** Filenames (without extension) from the protocol's own `schema/{target}/` directory, included for every vendor. */
  indexerSpecific?: string[];
  /** Per-vendor TypeScript generators included only when building that vendor's schema. */
  vendorGenerators?: Record<Indexer.Vendor, TsDefsGenerator[]>;
  /** Per-vendor filenames from `schema/{target}/` included only when building that vendor's schema. */
  vendorSpecific?: Record<Indexer.Vendor, string[]>;
};
/**
 * Base GraphQL definition files shared across all indexers.
 */
const BASE = {
  generators: [getEnumDefs, getAssetDefs, getWatcherDefs],
};

/**
 * Mapping of indexers to their respective GraphQL definition files.
 */
const PROTOCOL_MAP: Record<string, ProtocolSchemaConfig> = {
  analytics: {},
  airdrops: {
    generators: BASE.generators,
    indexerSpecific: ["action", "activity", "campaign", "factory", "tranche"],
    vendorGenerators: { envio: [getSponsorDefs, getSponsorshipDefs], graph: [] },
  },
  streams: {
    common: ["contract", "deprecated-stream"],
    generators: [...BASE.generators, getStreamDefs],
    indexerSpecific: ["segment", "tranche"],
    vendorGenerators: { envio: [getSponsorDefs, getSponsorshipDefs], graph: [] },
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

  const generatedDefs = getGeneratedDefs(target, config, vendor);
  const schemaPaths = getSchemaPaths(target, config, vendor);
  const fileDefs = loadFilesSync<DocumentNode>(schemaPaths);

  return mergeTypeDefs([...generatedDefs, ...fileDefs], { throwOnConflict: true });
}

function getGeneratedDefs(
  target: Indexer.Target,
  config: ProtocolSchemaConfig,
  vendor?: Indexer.Vendor
): DocumentNode[] {
  return [
    ...(config.generators?.map((generator) => generator(target)) ?? []),
    ...getVendorGeneratorDefs(target, config.vendorGenerators, vendor),
  ];
}

function getSchemaPaths(
  target: Indexer.Target,
  config: ProtocolSchemaConfig,
  vendor?: Indexer.Vendor
): string[] {
  const getCommonSchemaPath = (file: string) => getSchemaPath("common", file);
  const getTargetSchemaPath = (file: string) => getSchemaPath(target, file);

  return [
    ...mapSchemaPaths(config.common, getCommonSchemaPath),
    ...mapSchemaPaths(config.indexerSpecific, getTargetSchemaPath),
    ...mapSchemaPaths(getVendorEntries(config.vendorSpecific, vendor), getTargetSchemaPath),
  ];
}

function getSchemaPath(directory: string, file: string): string {
  return path.join(SCHEMA_DIR, directory, `${file}.graphql`);
}

function mapSchemaPaths(files: string[] | undefined, getPath: (file: string) => string): string[] {
  return files?.map(getPath) ?? [];
}

function getVendorGeneratorDefs(
  target: Indexer.Target,
  vendorGenerators: ProtocolSchemaConfig["vendorGenerators"],
  vendor?: Indexer.Vendor
): DocumentNode[] {
  return getVendorEntries(vendorGenerators, vendor).map((generator) => generator(target));
}

function getVendorEntries<T>(config: VendorConfig<T> | undefined, vendor?: Indexer.Vendor): T[] {
  if (!config) {
    return [];
  }

  if (vendor) {
    return config[vendor] ?? [];
  }

  return Object.values(config).flat();
}

function getStreamDefs(target: Indexer.Target): DocumentNode {
  switch (target) {
    case "streams":
      return mergeTypeDefs([streamsStreamDefs, streamsActionDefs, streamsBatchDefs]);
    default:
      throw new Error(`Unsupported target: ${target}`);
  }
}
