import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";

const indexerOption = Options.choice("indexer", ["airdrops", "streams", "all"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to generate manifest for")
);

const chainOption = Options.text("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription('Chain slug (use "all" for all chains)')
);

export const graphManifestCommand = Command.make(
  "graph-manifest",
  { chain: chainOption, indexer: indexerOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
