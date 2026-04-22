import chalk from "chalk";
import { Console, Effect } from "effect";
import * as _ from "lodash-es";
import { sablier } from "sablier";
import { indexers } from "../../../src/indexers/data.js";
import { getGraphChainSlug } from "../../../src/indexers/graph.js";
import { colors, createTable, displayHeader, formatStatus } from "../../utils/display.js";

type ChainData = {
  chainId: number;
  chainName: string;
  nativeCurrency: string;
  hasEnvio: boolean;
  hasGraph: boolean;
  slug: string;
};

export const handler = (graph: boolean) =>
  Effect.gen(function* () {
    const useGraphSlugs = graph;

    // Get supported chain IDs from indexers
    const envioChainIds = new Set(indexers.envio.streams.map((i) => i.chainId));
    const graphChainIds = new Set(indexers.graph.streams.map((i) => i.chainId));

    yield* displayHeader("📋 AVAILABLE CHAINS", "cyan");

    // Prepare chain data
    const chains: ChainData[] = _.sortBy(sablier.chains.getAll(), (c) => c.slug)
      .map((c) => ({
        chainId: c.id,
        chainName: c.name,
        hasEnvio: envioChainIds.has(c.id),
        hasGraph: graphChainIds.has(c.id),
        nativeCurrency: c.nativeCurrency.symbol,
        slug: useGraphSlugs ? getGraphChainSlug(c.id) : c.slug,
      }))
      .filter((c) => c.hasEnvio || c.hasGraph);

    // Create main table
    const table = createTable({
      colWidths: [20, 10, 10, 15, 15],
      head: ["Chain Name", "Currency", "Chain ID", "Envio", "Graph"],
      theme: "cyan",
    });

    for (const chain of chains) {
      table.push([
        colors.value(chain.chainName),
        colors.dim(chain.nativeCurrency),
        colors.dim(chain.chainId.toString()),
        formatStatus(chain.hasEnvio),
        formatStatus(chain.hasGraph),
      ]);
    }

    yield* Console.log(table.toString());

    // Envio-only chains
    const envioOnlyChains = chains.filter((c) => c.hasEnvio && !c.hasGraph);
    if (envioOnlyChains.length > 0) {
      yield* Console.log("");
      yield* displayHeader("🟦 ENVIO-ONLY CHAINS", "yellow");
      const envioTable = createTable({
        colWidths: [20, 10, 10, 30],
        head: ["Chain Name", "Currency", "Chain ID", "Slug"],
        theme: "yellow",
      });

      for (const chain of envioOnlyChains) {
        envioTable.push([
          colors.value(chain.chainName),
          colors.dim(chain.nativeCurrency),
          colors.dim(chain.chainId.toString()),
          colors.dim(chain.slug),
        ]);
      }

      yield* Console.log(envioTable.toString());
    }

    // Graph-only chains
    const graphOnlyChains = chains.filter((c) => !c.hasEnvio && c.hasGraph);
    if (graphOnlyChains.length > 0) {
      yield* Console.log("");
      yield* displayHeader("🟪 GRAPH-ONLY CHAINS", "magenta");
      const graphTable = createTable({
        colWidths: [20, 10, 10, 30],
        head: ["Chain Name", "Currency", "Chain ID", "Slug"],
        theme: "magenta",
      });

      for (const chain of graphOnlyChains) {
        graphTable.push([
          colors.value(chain.chainName),
          colors.dim(chain.nativeCurrency),
          colors.dim(chain.chainId.toString()),
          colors.dim(chain.slug),
        ]);
      }

      yield* Console.log(graphTable.toString());
    }

    // Summary statistics
    const stats = {
      both: chains.filter((c) => c.hasEnvio && c.hasGraph).length,
      envioOnly: chains.filter((c) => c.hasEnvio && !c.hasGraph).length,
      graphOnly: chains.filter((c) => !c.hasEnvio && c.hasGraph).length,
      total: chains.length,
    };

    yield* Console.log("");
    yield* displayHeader("📊 CHAIN SUMMARY", "gray");
    const summaryTable = createTable({
      colWidths: [25, 10],
      head: ["Category", "Count"],
      theme: "gray",
    });

    summaryTable.push(
      [colors.success("Both Vendors"), colors.value(stats.both.toString())],
      [chalk.yellow("Envio Only"), colors.value(stats.envioOnly.toString())],
      [chalk.magenta("Graph Only"), colors.value(stats.graphOnly.toString())],
      [colors.value("Total Chains"), colors.value(stats.total.toString())]
    );

    yield* Console.log(summaryTable.toString());

    // Notes
    if (!useGraphSlugs) {
      yield* Console.log(
        `\n${colors.info("ℹ")} Note: These are Sablier chain slugs. Use ${colors.highlight("--graph")} flag for The Graph slugs.`
      );
    }

    yield* Console.log(
      `\n${colors.info("ℹ")} Note: Solana indexers are not included in this report. See https://github.com/sablier-labs/solana-indexers.`
    );
  });
