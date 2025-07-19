import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import { type DocumentNode } from "graphql";
import { Protocol } from "sablier";
import { SCHEMA_DIR } from "../lib/paths";
import { type Types } from "../lib/types";
import { getAssetDefs, getWatcherDefs } from "./common";
import { getEnumDefs } from "./enums";
import { flowStreamDefs } from "./flow/stream.graphql";
import { lockupStreamDefs } from "./lockup/stream.graphql";

const ENVIO_ONLY = ["revenue", "user"];

type TsDefsGenerator = (protocol: Types.Protocol) => DocumentNode;
/**
 * Base GraphQL definition files shared across all protocols.
 */
const BASE = {
  generators: [getEnumDefs, getAssetDefs, getWatcherDefs],
  gql: ["revenue", "user"],
};

/**
 * Mapping of protocols to their respective GraphQL definition files.
 */
const PROTOCOL_MAP: Record<
  Types.Protocol,
  {
    bespoke?: string[];
    common?: string[];
    generators?: Array<TsDefsGenerator>;
  }
> = {
  [Protocol.Airdrops]: {
    bespoke: ["action", "activity", "campaign", "factory", "tranche"],
  },
  [Protocol.Flow]: {
    common: ["action", "batch"],
    generators: [getStreamDefs],
  },
  [Protocol.Lockup]: {
    bespoke: ["segment", "tranche"],
    common: ["action", "batch"],
    generators: [getStreamDefs],
  },
};

/**
 * Generates a merged schema for a given protocol.
 *
 * @param vendor - The vendor to generate a schema for.
 * @param protocol - The protocol to generate a schema for.
 * @returns A merged schema for the given protocol.
 */
export function getMergedSchema(vendor: Types.Vendor, protocol: Types.Protocol): DocumentNode {
  // Generate TypeScript definitions
  const baseTsDefs = BASE.generators.map((generator) => generator(protocol));
  const protocolTsDefs = PROTOCOL_MAP[protocol].generators?.map((generator) => generator(protocol));
  const allTsDefs = [...baseTsDefs, ...(protocolTsDefs || [])];

  // Build paths for all GraphQL files
  const baseGqlPaths = BASE.gql
    .filter((file) => !ENVIO_ONLY.includes(file) || vendor === "envio")
    .map((file) => getCommonDefs(file));
  const protocolGqlPaths = {
    bespoke: PROTOCOL_MAP[protocol].bespoke?.map((file) => getProtocolDefs(protocol, file)) || [],
    common: PROTOCOL_MAP[protocol].common?.map((file) => getCommonDefs(file)) || [],
  };

  // Load all GraphQL files
  const allGqlPaths = [...baseGqlPaths, ...protocolGqlPaths.common, ...protocolGqlPaths.bespoke];
  const loadedGqlDefs = loadFilesSync<DocumentNode>(allGqlPaths);
  const allDefs = [...allTsDefs, ...loadedGqlDefs];

  const mergedSchema = mergeTypeDefs(allDefs, { throwOnConflict: true });
  return mergedSchema;
}

function getProtocolDefs(protocol: Types.Protocol, file: string): string {
  return path.join(SCHEMA_DIR, protocol, `${file}.graphql`);
}

function getCommonDefs(file: string): string {
  return path.join(SCHEMA_DIR, "common", `${file}.graphql`);
}

function getStreamDefs(protocol: Types.Protocol): DocumentNode {
  switch (protocol) {
    case Protocol.Lockup:
      return lockupStreamDefs;
    case Protocol.Flow:
      return flowStreamDefs;
    default:
      throw new Error(`Unsupported protocol: ${protocol}`);
  }
}
