import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import * as _ from "lodash-es";
import type { Indexer } from "../../../../src/index.js";
import { TARGETS } from "../../../constants.js";
import { colors, createTable, displayHeader } from "../../../display.js";
import { ProcessError } from "../../../errors.js";
import * as helpers from "../../../helpers.js";
import paths from "../../../paths.js";
import { dumpYAML } from "../helpers.js";
import { createEnvioConfig } from "./index.js";

function generateConfig(target: Indexer.Target) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const config = createEnvioConfig(target);
    const yaml = dumpYAML(config);
    const configPath = paths.envio.config(target);
    yield* fs.writeFileString(configPath, yaml);

    yield* Console.log(`✅ Generated the Envio config for target ${_.capitalize(target)}`);
    yield* Console.log(`📁 Config path: ${yield* helpers.getRelative(configPath)}`);
    yield* Console.log();
  });
}

function generateConfigWithResult(target: Indexer.Target) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const config = createEnvioConfig(target);
    const yaml = dumpYAML(config);
    const configPath = paths.envio.config(target);
    yield* fs.writeFileString(configPath, yaml);
    return {
      configPath: yield* helpers.getRelative(configPath),
      target,
      status: "generated" as const,
    };
  }).pipe(
    Effect.catchAll(() => Effect.succeed({ configPath: "", status: "error" as const, target }))
  );
}

function generateAllIndexersConfigs() {
  return Effect.gen(function* () {
    yield* displayHeader("⚙️  GENERATING ENVIO CONFIGS", "cyan");

    const targets = TARGETS;
    const results = yield* Effect.forEach(targets, (target) => generateConfigWithResult(target));

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
        colors.value(_.capitalize(result.target)),
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

export const handler = (options: { readonly indexer: Indexer.Target | "all" }) =>
  Effect.gen(function* () {
    const targetArg = options.indexer;

    if (targetArg === "all") {
      return yield* generateAllIndexersConfigs();
    }

    return yield* generateConfig(targetArg);
  });
