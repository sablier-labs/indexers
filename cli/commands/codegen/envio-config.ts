/**
 * @file CLI for generating Envio config file
 *
 * @example
 * pnpm tsx cli codegen envio-config --indexer all
 * pnpm tsx cli codegen envio-config --indexer flow
 *
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', or 'all'
 */

import chalk from "chalk";
import type { Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import paths from "../../../lib/paths";
import type { Indexer } from "../../../src";
import { INDEXERS } from "../../constants";
import * as helpers from "../../helpers";
import { colors, createTable, displayHeader } from "../../shared/display-utils";
import { createEnvioConfig } from "./envio-config/index";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

function createEnvioConfigCommand(): Command {
  const command = helpers.createBaseCmd("Generate Envio config file");

  helpers.addIndexerOpt(command);

  command.action(async (options) => {
    const indexerArg = helpers.parseIndexerOpt(options.indexer);

    if (indexerArg === "all") {
      generateAllIndexersConfigs();
      return;
    }

    generateConfig(indexerArg);
  });

  return command;
}

export const envioConfigCmd = createEnvioConfigCommand();

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function generateAllIndexersConfigs(): void {
  displayHeader("⚙️  GENERATING ENVIO CONFIGS", "cyan");

  type ConfigResult = {
    configPath: string;
    indexer: Indexer.Name;
    status: "generated" | "error";
  };

  const results: ConfigResult[] = [];

  for (const indexer of INDEXERS) {
    try {
      const config = createEnvioConfig(indexer);
      const yaml = helpers.dumpYAML(config);
      const configPath = paths.envio.config(indexer);
      fs.writeFileSync(configPath, yaml);
      results.push({ configPath: helpers.getRelative(configPath), indexer, status: "generated" });
    } catch {
      results.push({ configPath: "", indexer, status: "error" });
    }
  }

  // Display results table
  console.log("");
  const table = createTable({
    colWidths: [20, 50, 15],
    head: ["Indexer", "Config Path", "Status"],
    theme: "cyan",
  });

  for (const result of results) {
    const statusText = result.status === "generated" ? colors.success("✅ Generated") : colors.error("❌ Error");
    table.push([colors.value(_.capitalize(result.indexer)), colors.dim(result.configPath), statusText]);
  }

  console.log(table.toString());

  // Summary statistics
  const generated = results.filter((r) => r.status === "generated").length;
  const errors = results.filter((r) => r.status === "error").length;

  console.log("");
  const summaryTable = createTable({
    colWidths: [20, 10],
    head: ["Status", "Count"],
    theme: "cyan",
  });

  summaryTable.push(
    [colors.success("Generated"), colors.value(generated.toString())],
    [colors.error("Errors"), colors.value(errors.toString())],
    [chalk.cyan.bold("Total Configs"), chalk.white.bold(results.length.toString())],
  );

  console.log(summaryTable.toString());

  console.log("");
  if (errors === 0) {
    console.log(colors.success(`✅ Successfully generated ${generated} Envio configs`));
  } else {
    console.log(colors.error(`❌ Generation completed with ${errors} errors`));
    process.exit(1);
  }
}

function generateConfig(indexer: Indexer.Name): void {
  const config = createEnvioConfig(indexer);
  const yaml = helpers.dumpYAML(config);
  const configPath = paths.envio.config(indexer);
  fs.writeFileSync(configPath, yaml);

  console.log(`✅ Generated the Envio config for indexer ${_.capitalize(indexer)}`);
  console.log(`📁 Config path: ${helpers.getRelative(configPath)}`);
  console.log();
}
