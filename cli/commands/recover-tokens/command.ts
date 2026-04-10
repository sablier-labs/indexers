import { Command, Options } from "@effect/cli";
import { Console, Effect } from "effect";
import { lazyHandler } from "../../utils/lazy-command.js";

const allOption = Options.boolean("all").pipe(
  Options.withAlias("a"),
  Options.withDefault(false),
  Options.withDescription("Run for all deployed chains sequentially (ignores --chain-id)")
);

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDefault(1),
  Options.withDescription("Chain ID to query")
);

const fileOption = Options.text("file").pipe(
  Options.withAlias("f"),
  Options.withDescription("Path to a per-chain JSON token list produced by query-assets"),
  Options.optional
);

const protocolOption = Options.choice("protocol", ["flow", "lockup"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Protocol contract to query")
);

export const recoverTokensCommand = Command.make(
  "recover-tokens",
  { all: allOption, chainId: chainIdOption, file: fileOption, protocol: protocolOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => (args.all ? m.handlerAll(args) : m.handler(args))
    ).pipe(
      Effect.catchAll((error) =>
        Console.error(error instanceof Error ? error.message : String(error)).pipe(
          Effect.zipRight(Effect.sync(() => process.exit(1)))
        )
      )
    )
);
