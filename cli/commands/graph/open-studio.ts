/**
 * @file Open Subgraph Studio dashboard URLs in the browser for all official Graph indexers.
 *
 * @example
 * pnpm tsx cli open-studio
 * pnpm tsx cli open-studio --indexer streams
 * pnpm tsx cli open-studio --chain 1
 * pnpm tsx cli open-studio --dry-run
 */

import { Command, Options } from "@effect/cli";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import { Console, Effect, Option } from "effect";
import { sablier } from "sablier";
import { indexers } from "../../../src/indexers/data.js";
import { graphChains } from "../../../src/indexers/graph.js";
import type { Indexer } from "../../../src/types.js";
import { INDEXER_KEYS } from "../../utils/constants.js";
import { colors, createTable, displayHeader } from "../../utils/display.js";

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

const indexerOption = Options.choice("indexer", INDEXER_KEYS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Filter to a single indexer"),
  Options.optional
);

export type StudioEntry = {
  chainId: number;
  chainName: string;
  indexer: Indexer.IndexerKey;
  name: string;
  url: string;
};

const PUBLIC_INDEXER_KEYS = new Set<Indexer.IndexerKey>(INDEXER_KEYS);

export function getSelectedIndexers(indexer?: Indexer.IndexerKey): Indexer.IndexerKey[] {
  if (!indexer) {
    return [...INDEXER_KEYS];
  }

  return PUBLIC_INDEXER_KEYS.has(indexer) ? [indexer] : [];
}

export function getStudioEntries(opts: {
  chainId?: number;
  indexer?: Indexer.IndexerKey;
}): StudioEntry[] {
  const selectedIndexers = getSelectedIndexers(opts.indexer);
  let officialIndexers = selectedIndexers.flatMap((indexer) =>
    (indexers.graph[indexer] ?? []).filter((entry) => entry.kind === "official")
  );

  if (opts.chainId !== undefined) {
    officialIndexers = officialIndexers.filter((entry) => entry.chainId === opts.chainId);
  }

  const uniqueOfficialIndexers = Array.from(
    new Map(officialIndexers.map((entry) => [entry.name, entry])).values()
  );

  return uniqueOfficialIndexers.map((entry) => ({
    chainId: entry.chainId,
    chainName: sablier.chains.getOrThrow(entry.chainId).name,
    indexer: entry.indexer,
    name: entry.name,
    url: `${STUDIO_BASE_URL}/${entry.name}/`,
  }));
}

/* -------------------------------------------------------------------------- */
/*                                   LOGIC                                    */
/* -------------------------------------------------------------------------- */

const graphOpenStudioLogic = (options: {
  readonly chain: Option.Option<number>;
  readonly dryRun: boolean;
  readonly indexer: Option.Option<Indexer.IndexerKey>;
}) =>
  Effect.gen(function* () {
    yield* displayHeader("🌐 GRAPH STUDIO - OPEN DASHBOARDS", "cyan");

    // Validate chain filter
    if (Option.isSome(options.chain) && !graphChains.includes(options.chain.value)) {
      yield* Console.log(colors.error(`Chain ${options.chain.value} not found in Graph indexers`));
      return;
    }

    const entries = getStudioEntries({
      chainId: Option.isSome(options.chain) ? options.chain.value : undefined,
      indexer: Option.isSome(options.indexer) ? options.indexer.value : undefined,
    });

    // Display table
    const table = createTable({
      colWidths: [18, 12, 65],
      head: ["Chain", "Indexer", "URL"],
      theme: "cyan",
    });

    for (const entry of entries) {
      table.push([
        colors.value(entry.chainName),
        colors.dim(entry.indexer),
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
    indexer: indexerOption,
  },
  graphOpenStudioLogic
).pipe(Command.withDescription("Open Subgraph Studio dashboards in the browser"));
