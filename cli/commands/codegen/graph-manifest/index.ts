import { Effect } from "effect";
import _ from "lodash";
import type { Indexer } from "../../../../src/types.js";
import { CodegenError } from "../errors.js";
import type { GraphManifest } from "./manifest-types.js";
import { createSources } from "./sources/index.js";
import { topSections } from "./top-sections.js";

/**
 * Creates a Graph manifest for a given protocol and chain.
 * @see https://thegraph.com/docs/en/subgraphs/developing/creating/subgraph-manifest
 */
export function createGraphManifest(protocol: Indexer.Protocol, chainId: number) {
  return Effect.gen(function* () {
    const topSection = topSections[protocol];
    const sources = yield* createSources(protocol, chainId);

    if (sources.length === 0) {
      return yield* Effect.fail(new CodegenError.ContractsNotFound(protocol, chainId));
    }

    const sourcesByType = _.groupBy(sources, "_type");
    const dataSources = _.map(sourcesByType["data-source"], (source) => _.omit(source, "_type"));
    const templates = _.map(sourcesByType.template, (source) => _.omit(source, "_type"));

    return {
      ...topSection,
      dataSources: dataSources.length > 0 ? dataSources : undefined,
      templates: templates.length > 0 ? templates : undefined,
    } as GraphManifest.TopSection;
  });
}
