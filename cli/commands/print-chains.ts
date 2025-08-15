import type { Command } from "commander";
import _ from "lodash";
import { sablier } from "sablier";
import { indexers } from "../../src/indexers/data";
import { getGraphChainSlug } from "../../src/indexers/graph";
import * as helpers from "../helpers";

export function createPrintChainsCommand(): Command {
  const command = helpers.createBaseCmd("Print all available blockchain chains");
  command.option("--graph <boolean>", "Use The Graph chain slugs", false);

  command.action(async (options) => {
    const useGraphSlugs = Boolean(options.graph);

    // Get supported chain IDs from indexers
    const envioChainIds = new Set(indexers.envio.lockup.map((i) => i.chainId));
    const graphChainIds = new Set(indexers.graph.lockup.map((i) => i.chainId));

    console.log("✨ Available chain slugs to use in the CLI:");

    const chainsByIndexer: Record<string, string[]> = {
      Both: [],
      Envio: [],
      Graph: [],
      "No indexers": [],
    };

    _.sortBy(sablier.chains.getAll(), (c) => c.slug).forEach((c) => {
      const slug = useGraphSlugs ? getGraphChainSlug(c.id) : c.slug;
      const hasEnvio = envioChainIds.has(c.id);
      const hasGraph = graphChainIds.has(c.id);

      if (hasEnvio && hasGraph) {
        chainsByIndexer.Both.push(slug);
      } else if (hasEnvio) {
        chainsByIndexer.Envio.push(slug);
      } else if (hasGraph) {
        chainsByIndexer.Graph.push(slug);
      } else {
        chainsByIndexer["No indexers"].push(slug);
      }
    });

    // Display grouped results
    Object.entries(chainsByIndexer).forEach(([category, chains]) => {
      if (chains.length > 0) {
        console.log(`\n${category}:`);
        chains.forEach((chain) => console.log(`  • ${chain}`));
      }
    });

    if (!useGraphSlugs) {
      console.log("\nℹ Note: these are not the slugs used by The Graph. Pass the --graph flag if you want those.");
    }

    console.log("\nℹ Indexer availability:");
    console.log("  • Both: Available on both Envio and The Graph");
    console.log("  • Envio: Official Sablier indexers on Envio only");
    console.log("  • Graph: Official Sablier subgraphs on The Graph only");
  });

  return command;
}

// Export the command
export const printChainsCmd = createPrintChainsCommand();
