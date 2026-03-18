import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";
import { DEFAULT_QUARTER_NAME } from "../utils/quarter.js";

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDescription("Chain ID to query")
);

const quarterOption = Options.text("quarter").pipe(
  Options.withAlias("q"),
  Options.withDefault(DEFAULT_QUARTER_NAME),
  Options.withDescription("Quarter to query in YYYY-q1 format")
);

export const queryActionsCommand = Command.make(
  "query-actions",
  { chainId: chainIdOption, quarter: quarterOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
