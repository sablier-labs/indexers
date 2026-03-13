import { Effect } from "effect";
import { getEntities, getSources } from "./get-sources.js";

/**
 * Creates combined data sources for the merged "streams" subgraph by merging
 * flow and lockup sources with protocol-prefixed mapping file paths.
 */
export function getStreamsSources(chainId: number) {
  return Effect.gen(function* () {
    const [flowSources, lockupSources] = yield* Effect.all([
      getSources("flow", chainId),
      getSources("lockup", chainId),
    ]);

    const entities = getEntities("streams");

    // Override mapping file paths to include the protocol subdirectory,
    // and replace entities with the merged "streams" schema entities.
    const prefixedFlowSources = flowSources.map((source) => ({
      ...source,
      mapping: {
        ...source.mapping,
        entities,
        file: source.mapping.file.replace("../mappings/", "../mappings/flow/"),
      },
    }));

    const prefixedLockupSources = lockupSources.map((source) => ({
      ...source,
      mapping: {
        ...source.mapping,
        entities,
        file: source.mapping.file.replace("../mappings/", "../mappings/lockup/"),
      },
    }));

    return [...prefixedFlowSources, ...prefixedLockupSources];
  });
}
