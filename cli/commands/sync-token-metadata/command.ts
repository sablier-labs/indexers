import { Command, Options } from "@effect/cli";
import { Console, Effect } from "effect";
import { INDEXER_KEYS } from "../../utils/constants.js";
import { lazyHandler } from "../../utils/lazy-command.js";

const indexerOption = Options.choice("indexer", INDEXER_KEYS).pipe(
  Options.withAlias("i"),
  Options.withDefault("streams"),
  Options.withDescription("Indexer cache to refresh")
);

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDescription("Only sync rows for the given chain ID"),
  Options.optional
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDefault(false),
  Options.withDescription("Print the summary without writing the cache file")
);

export const syncTokenMetadataCommand = Command.make(
  "sync-token-metadata",
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
).pipe(
  Command.withDescription(
    "Refresh an Envio indexer's tokenMetadata.tsv cache from the production deployment"
  )
);
