import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../utils/lazy-command.js";

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
  { chainId: chainIdOption, file: fileOption, protocol: protocolOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
