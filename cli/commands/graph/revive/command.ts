import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Skip actual queries, just show plan"),
  Options.withDefault(false)
);

const chainOption = Options.integer("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription("Filter to a single chain ID"),
  Options.optional
);

export const graphReviveCommand = Command.make(
  "revive-graphs",
  {
    chain: chainOption,
    dryRun: dryRunOption,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
).pipe(Command.withDescription("Ping all Graph endpoints to wake up dormant subgraphs"));
