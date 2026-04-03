import { Effect } from "effect";
import { getSources } from "./get-sources.js";

/**
 * Creates combined data sources for the merged "streams" subgraph by merging
 * flow and lockup sources with protocol-prefixed mapping file paths.
 */
export function getStreamsSources(chainId: number) {
  return Effect.gen(function* () {
    const [flowSources, lockupSources] = yield* Effect.all([
      getSources("flow", chainId, "streams"),
      getSources("lockup", chainId, "streams"),
    ]);

    // Override mapping file paths to include the protocol subdirectory.
    const prefixedFlowSources = flowSources.map((source) => ({
      ...source,
      mapping: {
        ...source.mapping,
        file: source.mapping.file.replace("../mappings/", "../mappings/flow/"),
      },
    }));

    const prefixedLockupSources = lockupSources.map((source) => ({
      ...source,
      mapping: {
        ...source.mapping,
        file: source.mapping.file.replace("../mappings/", "../mappings/lockup/"),
      },
    }));

    return [...prefixedFlowSources, ...prefixedLockupSources];
  });
}
