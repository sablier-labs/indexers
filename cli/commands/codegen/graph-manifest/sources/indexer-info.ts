import type { Indexer } from "../../../../../src/index.js";
import type { GraphManifest } from "../manifest-types.js";

const DEVELOPMENT = "development";

/**
 * Creates a dedicated initialization source for deployment metadata.
 */
export function createIndexerInfoSource(
  target: Indexer.GraphTarget,
  sources: GraphManifest.Source[]
): GraphManifest.Source {
  const dataSources = sources.filter((source) => source._type === "data-source");
  const referenceSource = dataSources[0];
  if (!referenceSource) {
    throw new Error(`Cannot create IndexerInfo source without a data source for ${target}`);
  }

  const referenceABI = referenceSource.mapping.abis.find(
    (abi) => abi.name === referenceSource.source.abi
  );
  if (!referenceABI) {
    throw new Error(`Cannot resolve reference ABI for the ${target} IndexerInfo source`);
  }
  if (!referenceSource.context) {
    throw new Error(`Cannot resolve chain context for the ${target} IndexerInfo source`);
  }

  const startBlock = Math.min(
    ...dataSources.map((source) => {
      if (source.source.startBlock === undefined) {
        throw new Error(`Missing start block for ${source.name}`);
      }
      return source.source.startBlock;
    })
  );

  return {
    _type: "data-source",
    context: {
      chainId: referenceSource.context.chainId,
      commitHash: {
        data: DEVELOPMENT,
        type: "String",
      },
      deployedAt: {
        data: "0",
        type: "BigInt",
      },
      versionLabel: {
        data: DEVELOPMENT,
        type: "String",
      },
    },
    kind: "ethereum",
    mapping: {
      abis: [referenceABI],
      apiVersion: referenceSource.mapping.apiVersion,
      blockHandlers: [
        {
          filter: {
            kind: "once",
          },
          handler: "handleIndexerInfo",
        },
      ],
      entities: ["IndexerInfo"],
      eventHandlers: [],
      file: "../mappings/indexer-info.ts",
      kind: referenceSource.mapping.kind,
      language: referenceSource.mapping.language,
    },
    name: "IndexerInfo",
    network: referenceSource.network,
    source: {
      abi: referenceABI.name,
      startBlock,
    },
  };
}
