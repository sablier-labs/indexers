import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../../utils/lazy-command.js";

const chainOption = Options.text("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription("Sablier chain slug (e.g., 'arbitrum', 'denergychain')")
);

const indexerOption = Options.choice("indexer", ["airdrops", "streams"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to deploy")
);

const versionLabelOption = Options.text("version-label").pipe(
  Options.withAlias("v"),
  Options.withDescription("Version label for the deployment")
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Show command without executing"),
  Options.withDefault(false)
);

export const graphDeploySingleCommand = Command.make(
  "graph-deploy-single",
  {
    chain: chainOption,
    dryRun: dryRunOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
).pipe(Command.withDescription("Deploy a subgraph to a single chain (official or custom)"));
