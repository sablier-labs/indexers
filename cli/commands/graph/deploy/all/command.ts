import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../../utils/lazy-command.js";

const indexerOption = Options.choice("indexer", ["airdrops", "streams"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to deploy")
);

const versionLabelOption = Options.text("version-label").pipe(
  Options.withAlias("v"),
  Options.withDescription("Version label for the deployment")
);

const excludeChainsOption = Options.text("exclude-chains").pipe(
  Options.withAlias("e"),
  Options.withDescription(
    "Comma-separated list of chain IDs to exclude from deployment (e.g., '1,10,137')"
  ),
  Options.optional
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Test deployment without actually running commands"),
  Options.withDefault(false)
);

export const graphDeployAllCommand = Command.make(
  "graph-deploy-all",
  {
    dryRun: dryRunOption,
    excludeChains: excludeChainsOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
