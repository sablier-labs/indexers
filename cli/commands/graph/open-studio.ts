/**
 * @file Open Subgraph Studio dashboard URLs in the browser for all official Graph indexers.
 *
 * @example
 * pnpm tsx cli open-studio
 * pnpm tsx cli open-studio --protocol flow
 * pnpm tsx cli open-studio --chain 1
 * pnpm tsx cli open-studio --dry-run
 */

import { Command, Options } from "@effect/cli";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import { Console, Effect, Option } from "effect";
import { sablier } from "sablier";
import { Protocol } from "sablier/evm";
import { indexers } from "../../../src/indexers/data.js";
import { graphChains } from "../../../src/indexers/graph.js";
import type { Indexer } from "../../../src/types.js";
import { colors, createTable, displayHeader } from "../../display.js";

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

const STUDIO_BASE_URL = "https://thegraph.com/studio/subgraph";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("List URLs without opening them"),
  Options.withDefault(false)
);

const chainOption = Options.integer("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription("Filter to a single chain ID"),
  Options.optional
);

const protocolOption = Options.choice("protocol", [
  Protocol.Airdrops,
  Protocol.Flow,
  Protocol.Lockup,
]).pipe(
  Options.withAlias("p"),
  Options.withDescription("Filter to a single protocol"),
  Options.optional
);

/* -------------------------------------------------------------------------- */
/*                                   LOGIC                                    */
/* -------------------------------------------------------------------------- */

const graphOpenStudioLogic = (options: {
  readonly chain: Option.Option<number>;
  readonly dryRun: boolean;
  readonly protocol: Option.Option<Indexer.Protocol>;
}) =>
  Effect.gen(function* () {
    yield* displayHeader("🌐 GRAPH STUDIO - OPEN DASHBOARDS", "cyan");

    // Validate chain filter
    if (Option.isSome(options.chain) && !graphChains.includes(options.chain.value)) {
      yield* Console.log(colors.error(`Chain ${options.chain.value} not found in Graph indexers`));
      return;
    }

    // Determine which protocols to process
    const protocols: Indexer.Protocol[] = Option.isSome(options.protocol)
      ? [options.protocol.value]
      : [Protocol.Airdrops, Protocol.Flow, Protocol.Lockup];

    // Collect official indexers across selected protocols, optionally filtered by chain
    let officialIndexers = protocols.flatMap((protocol) =>
      indexers.graph[protocol].filter((i) => i.kind === "official")
    );

    if (Option.isSome(options.chain)) {
      const chainId = options.chain.value;
      officialIndexers = officialIndexers.filter((i) => i.chainId === chainId);
    }

    // Build URLs
    const entries = officialIndexers.map((indexer) => ({
      chainName: sablier.chains.getOrThrow(indexer.chainId).name,
      name: indexer.name,
      protocol: indexer.protocol,
      url: `${STUDIO_BASE_URL}/${indexer.name}/`,
    }));

    // Display table
    const table = createTable({
      colWidths: [18, 12, 65],
      head: ["Chain", "Protocol", "URL"],
      theme: "cyan",
    });

    for (const entry of entries) {
      table.push([
        colors.value(entry.chainName),
        colors.dim(entry.protocol),
        colors.info(entry.url),
      ]);
    }

    yield* Console.log(table.toString());
    yield* Console.log(`\n${colors.info("ℹ")} Total: ${entries.length} subgraphs`);

    if (options.dryRun) {
      yield* Console.log(colors.warning("\n🧪 DRY RUN - URLs not opened"));
      return;
    }

    // Open all URLs
    const executor = yield* CommandExecutor.CommandExecutor;
    yield* Effect.forEach(
      entries,
      (entry) =>
        Effect.scoped(
          executor
            .start(PlatformCommand.make("open", entry.url))
            .pipe(Effect.flatMap((process) => process.exitCode))
        ),
      { discard: true }
    );

    yield* Console.log(colors.success(`\n✅ Opened ${entries.length} URLs in browser`));
  });

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

export const graphOpenStudioCommand = Command.make(
  "open-studio",
  {
    chain: chainOption,
    dryRun: dryRunOption,
    protocol: protocolOption,
  },
  graphOpenStudioLogic
).pipe(Command.withDescription("Open Subgraph Studio dashboards in the browser"));
