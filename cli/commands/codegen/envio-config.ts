/**
 * @file CLI for generating Envio config file
 *
 * @example
 * pnpm tsx cli codegen envio-config --indexer all
 * pnpm tsx cli codegen envio-config --indexer flow
 *
 * @param --indexer - Required: 'airdrops', 'flow', 'lockup', or 'all'
 */

import type { Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import { createEnvioConfig } from "../../../codegen/envio-config";
import paths from "../../../lib/paths";
import type { Indexer } from "../../../src";
import { INDEXERS } from "../../constants";
import * as helpers from "../../helpers";

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
  for (const indexer of INDEXERS) {
    generateConfig(indexer);
  }

  console.log("🎉 Generated all Envio configs!\n");
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
