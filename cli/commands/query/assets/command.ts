import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";
import { QUERY_ASSET_INDEXERS } from "../assets.file.js";

const indexerOption = Options.choice("indexer", QUERY_ASSET_INDEXERS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to export asset addresses for")
);

export const queryAssetsCommand = Command.make("query-assets", { indexer: indexerOption }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler(args)
  )
);
