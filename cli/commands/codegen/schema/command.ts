import { Command, Options } from "@effect/cli";
import { TARGET_OPTIONS } from "../../../utils/constants.js";
import { lazyHandler } from "../../../utils/lazy-command.js";

const vendorOption = Options.choice("vendor", ["graph", "envio", "all"] as const).pipe(
  Options.withAlias("v"),
  Options.withDescription("Vendor to generate schemas for")
);

const indexerOption = Options.choice("indexer", TARGET_OPTIONS).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to generate schema for")
);

export const schemaCommand = Command.make(
  "schema",
  { indexer: indexerOption, vendor: vendorOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
