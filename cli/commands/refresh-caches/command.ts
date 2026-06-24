import { Command, Options } from "@effect/cli";
import { Console, Effect } from "effect";
import { INDEXER_KEYS } from "../../utils/constants.js";
import { lazyHandler } from "../../utils/lazy-command.js";

const refreshCacheIndexers = [...INDEXER_KEYS, "all"] as const;

const indexerOption = Options.choice("indexer", refreshCacheIndexers).pipe(
  Options.withAlias("i"),
  Options.withDefault("all"),
  Options.withDescription("Indexer caches to refresh")
);

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDescription("Only refresh rows for the given chain ID"),
  Options.optional
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDefault(false),
  Options.withDescription("Print the summary without writing cache TSVs")
);

export const refreshCachesCommand = Command.make(
  "refresh-caches",
  {
    chainId: chainIdOption,
    dryRun: dryRunOption,
    indexer: indexerOption,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    ).pipe(
      Effect.catchAll((error) =>
        Console.error(error instanceof Error ? error.message : String(error)).pipe(
          Effect.zipRight(Effect.sync(() => process.exit(1)))
        )
      )
    )
).pipe(Command.withDescription("Refresh Envio effect cache TSVs from live-used addresses and RPC"));
