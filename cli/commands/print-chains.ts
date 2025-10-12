import chalk from "chalk";
import type { Command } from "commander";
import _ from "lodash";
import { sablier } from "sablier";
import { indexers } from "../../src/indexers/data";
import { getGraphChainSlug } from "../../src/indexers/graph";
import * as helpers from "../helpers";
import { colors, createTable, displayHeader, formatStatus } from "../shared/display-utils";

function createPrintChainsCommand(): Command {
  const command = helpers.createBaseCmd("Print all available blockchain chains");
  command.option("--graph <boolean>", "Use The Graph chain slugs", false);

  command.action(async (options) => {
    const useGraphSlugs = Boolean(options.graph);

    // Get supported chain IDs from indexers
    const envioChainIds = new Set(indexers.envio.lockup.map((i) => i.chainId));
    const graphChainIds = new Set(indexers.graph.lockup.map((i) => i.chainId));

    displayHeader("📋 AVAILABLE CHAINS", "cyan");

    // Prepare chain data
    type ChainData = {
      chainId: number;
      chainName: string;
      hasEnvio: boolean;
      hasGraph: boolean;
      slug: string;
    };

    const chains: ChainData[] = _.sortBy(sablier.chains.getAll(), (c) => c.slug).map((c) => ({
      chainId: c.id,
      chainName: c.name,
      hasEnvio: envioChainIds.has(c.id),
      hasGraph: graphChainIds.has(c.id),
      slug: useGraphSlugs ? getGraphChainSlug(c.id) : c.slug,
    }));

    // Create main table
    const table = createTable({
      colWidths: [25, 10, 15, 15],
      head: ["Chain Name", "Chain ID", "Envio", "Graph"],
      theme: "cyan",
    });

    for (const chain of chains) {
      table.push([
        colors.value(chain.chainName),
        colors.dim(chain.chainId.toString()),
        formatStatus(chain.hasEnvio),
        formatStatus(chain.hasGraph),
      ]);
    }

    console.log(table.toString());

    // Summary statistics
    const stats = {
      both: chains.filter((c) => c.hasEnvio && c.hasGraph).length,
      envioOnly: chains.filter((c) => c.hasEnvio && !c.hasGraph).length,
      graphOnly: chains.filter((c) => !c.hasEnvio && c.hasGraph).length,
      none: chains.filter((c) => !c.hasEnvio && !c.hasGraph).length,
      total: chains.length,
    };

    console.log("");
    const summaryTable = createTable({
      colWidths: [25, 10],
      head: ["Category", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Both Vendors"), colors.value(stats.both.toString())],
      [colors.info("Envio Only"), colors.value(stats.envioOnly.toString())],
      [colors.warning("Graph Only"), colors.value(stats.graphOnly.toString())],
      [colors.dim("No Indexers"), colors.value(stats.none.toString())],
      [chalk.cyan.bold("Total Chains"), chalk.white.bold(stats.total.toString())],
    );

    console.log(summaryTable.toString());

    // Notes
    if (!useGraphSlugs) {
      console.log(
        `\n${colors.info("ℹ")} Note: These are Sablier chain slugs. Use ${colors.highlight("--graph")} flag for The Graph slugs.`,
      );
    }
  });

  return command;
}

// Export the command
export const printChainsCmd = createPrintChainsCommand();
