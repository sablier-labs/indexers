/**
 * @file CLI for generating Envio config file
 *
 * @example
 * pnpm tsx cli codegen envio-config --indexer all
 * pnpm tsx cli codegen envio-config --indexer flow
 *
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', 'analytics', or 'all'
 */

import { Command, Options } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import _ from "lodash";
import paths from "../../../lib/paths.js";
import type { Indexer } from "../../../src/index.js";
import { INDEXERS } from "../../constants.js";
import { colors, createTable, displayHeader } from "../../display-utils.js";
import { ProcessError } from "../../errors.js";
import * as helpers from "../../helpers.js";
import { createEnvioConfig } from "./envio-config/index.js";

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const indexerOption = Options.choice("indexer", [
  "airdrops",
  "flow",
  "lockup",
  "analytics",
  "all",
] as const).pipe(Options.withAlias("i"), Options.withDescription("Indexer to generate config for"));

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

type ConfigResult = {
  configPath: string;
  indexer: Indexer.Name;
  status: "generated" | "error";
};

function generateConfig(indexer: Indexer.Name): Effect.Effect<void, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const config = createEnvioConfig(indexer);
    const yaml = helpers.dumpYAML(config);
    const configPath = paths.envio.config(indexer);
    yield* fs.writeFileString(configPath, yaml);

    yield* Console.log(`✅ Generated the Envio config for indexer ${_.capitalize(indexer)}`);
    yield* Console.log(`📁 Config path: ${helpers.getRelative(configPath)}`);
    yield* Console.log();
  }).pipe(Effect.orDie);
}

function generateConfigWithResult(
  indexer: Indexer.Name
): Effect.Effect<ConfigResult, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const config = createEnvioConfig(indexer);
    const yaml = helpers.dumpYAML(config);
    const configPath = paths.envio.config(indexer);
    yield* fs.writeFileString(configPath, yaml);
    return { configPath: helpers.getRelative(configPath), indexer, status: "generated" as const };
  }).pipe(
    Effect.catchAll(() => Effect.succeed({ configPath: "", indexer, status: "error" as const }))
  );
}

function generateAllIndexersConfigs(): Effect.Effect<void, ProcessError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    displayHeader("⚙️  GENERATING ENVIO CONFIGS", "cyan");

    // Generate configs with Effect.forEach
    const results = yield* Effect.forEach(INDEXERS, (indexer) => generateConfigWithResult(indexer));

    // Display results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [20, 50, 15],
      head: ["Indexer", "Config Path", "Status"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText =
        result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
      table.push([
        colors.value(_.capitalize(result.indexer)),
        colors.dim(result.configPath),
        statusText,
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const generated = results.filter((r) => r.status === "generated").length;
    const errors = results.filter((r) => r.status === "error").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Generated"), colors.value(generated.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.white.bold("Total Configs"), chalk.white.bold(results.length.toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (errors === 0) {
      yield* Console.log(colors.success(`✅ Successfully generated ${generated} Envio configs`));
    } else {
      yield* Console.log(colors.error(`❌ Generation completed with ${errors} errors`));
      return yield* Effect.fail(
        new ProcessError({
          command: "codegen envio-config",
          message: `Config generation completed with ${errors} errors`,
        })
      );
    }
  });
}

const envioConfigLogic = (options: { readonly indexer: Indexer.Name | "all" }) =>
  Effect.gen(function* () {
    const indexerArg = options.indexer;

    if (indexerArg === "all") {
      return yield* generateAllIndexersConfigs();
    }

    return yield* generateConfig(indexerArg);
  });

export const envioConfigCommand = Command.make(
  "envio-config",
  { indexer: indexerOption },
  envioConfigLogic
);
