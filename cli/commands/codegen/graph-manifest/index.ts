import { Effect } from "effect";
import * as _ from "lodash-es";
import type { Indexer } from "../../../../src/types.js";
import { CodegenError } from "../errors.js";
import type { GraphManifest } from "./manifest-types.js";
import { createSources } from "./sources/index.js";
import { createIndexerInfoSource } from "./sources/indexer-info.js";
import { topSections } from "./top-sections.js";

/**
 * Creates a Graph manifest for a given protocol and chain.
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest
 */
export function createGraphManifest(target: Indexer.GraphTarget, chainId: number) {
  return Effect.gen(function* () {
    const topSection = topSections[target];
    const sources = yield* createSources(target, chainId);

    if (sources.length === 0) {
      return yield* Effect.fail(new CodegenError.ContractsNotFound(target, chainId));
    }

    const indexerInfoSource = createIndexerInfoSource(target, sources);
    const sourcesByType = _.groupBy([indexerInfoSource, ...sources], "_type");
    const dataSources = _.map(sourcesByType["data-source"], (source) => _.omit(source, "_type"));
    const templates = _.map(sourcesByType.template, (source) => _.omit(source, "_type"));

    return {
      ...topSection,
      dataSources: dataSources.length > 0 ? dataSources : undefined,
      templates: templates.length > 0 ? templates : undefined,
    } as GraphManifest.TopSection;
  });
}
