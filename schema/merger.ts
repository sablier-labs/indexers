import * as path from "node:path";
import { loadFilesSync } from "@graphql-tools/load-files";
import { mergeTypeDefs } from "@graphql-tools/merge";
import type { DocumentNode } from "graphql";
import { SCHEMA_DIR } from "../cli/utils/paths.js";
import type { Indexer } from "../src/index.js";
import { getAssetDefs, getWatcherDefs } from "./common/index.js";
import { getEnumDefs } from "./enums.js";
import { streamsActionDefs } from "./streams/action.graphql.js";
import { streamsBatchDefs } from "./streams/batch.graphql.js";
import { streamsStreamDefs } from "./streams/stream.graphql.js";

type TsDefsGenerator = (target: Indexer.GraphTarget) => DocumentNode;
type ProtocolSchemaConfig = {
  common: string[];
  generators: TsDefsGenerator[];
  indexerSpecific: string[];
};

/**
 * Base GraphQL definitions shared across public indexers.
 */
const BASE = {
  common: ["indexer-info"],
  generators: [getEnumDefs, getAssetDefs, getWatcherDefs],
};

/**
 * Mapping of indexers to their respective GraphQL definition files.
 */
const PROTOCOL_MAP: Record<Indexer.GraphTarget, ProtocolSchemaConfig> = {
  airdrops: {
    common: BASE.common,
    generators: BASE.generators,
    indexerSpecific: ["action", "activity", "campaign", "factory", "tranche"],
  },
  streams: {
    common: [...BASE.common, "contract", "deprecated-stream"],
    indexerSpecific: ["segment", "tranche"],
    generators: [
      ...BASE.generators,
      () => mergeTypeDefs([streamsStreamDefs, streamsActionDefs, streamsBatchDefs]),
    ],
  },
};

export function getMergedSchema(target: Indexer.GraphTarget): DocumentNode {
  const config = PROTOCOL_MAP[target];
  if (!config) {
    throw new Error(`No schema config for target: ${target}`);
  }

  const generatedDefs = config.generators.map((generator) => generator(target));
  const schemaPaths = [
    ...config.common.map((file) => getSchemaPath("common", file)),
    ...config.indexerSpecific.map((file) => getSchemaPath(target, file)),
  ];
  const fileDefs = loadFilesSync<DocumentNode>(schemaPaths);

  return mergeTypeDefs([...generatedDefs, ...fileDefs], { throwOnConflict: true });
}

function getSchemaPath(directory: string, file: string): string {
  return path.join(SCHEMA_DIR, directory, `${file}.graphql`);
}
