import { Command, Options } from "@effect/cli";
import { TARGET_OPTIONS } from "../../../utils/constants.js";
import { lazyHandler } from "../../../utils/lazy-command.js";

const indexerOption = Options.choice("indexer", TARGET_OPTIONS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to generate config for")
);

export const envioConfigCommand = Command.make("envio-config", { indexer: indexerOption }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler(args)
  )
);
