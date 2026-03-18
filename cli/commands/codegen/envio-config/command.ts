import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";

const indexerOption = Options.choice("indexer", [
  "airdrops",
  "analytics",
  "streams",
  "all",
] as const).pipe(Options.withAlias("i"), Options.withDescription("Indexer to generate config for"));

export const envioConfigCommand = Command.make("envio-config", { indexer: indexerOption }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler(args)
  )
);
