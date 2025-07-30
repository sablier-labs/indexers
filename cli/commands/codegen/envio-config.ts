/**
 * @file CLI for generating Envio config file
 *
 * @example
 * pnpm tsx cli codegen envio-config --protocol all
 * pnpm tsx cli codegen envio-config --protocol flow
 *
 * @param --protocol - Required: 'airdrops', 'flow', 'lockup', or 'all'
 */

import { type Command } from "commander";
import * as fs from "fs-extra";
import _ from "lodash";
import { createEnvioConfig } from "../../../codegen/envio-config";
import paths from "../../../lib/paths";
import type { Types } from "../../../lib/types";
import { PROTOCOLS } from "../../constants";
import * as helpers from "../../helpers";

/* -------------------------------------------------------------------------- */
/*                                  COMMAND                                   */
/* -------------------------------------------------------------------------- */

export function createEnvioConfigCommand(): Command {
  const command = helpers.createBaseCmd("Generate Envio config file");

  helpers.addProtocolOpt(command);

  command.action(async (options) => {
    const protocolArg = helpers.parseProtocolOpt(options.protocol);

    if (protocolArg === "all") {
      generateAllProtocolConfigs();
      return;
    }

    generateConfig(protocolArg);
  });

  return command;
}

export const envioConfigCmd = createEnvioConfigCommand();

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

function generateAllProtocolConfigs(): void {
  for (const p of PROTOCOLS) {
    generateConfig(p);
  }

  console.log("🎉 Generated all Envio configs!\n");
}

function generateConfig(protocol: Types.Protocol): void {
  const config = createEnvioConfig(protocol);
  const yaml = helpers.dumpYAML(config);
  const configPath = paths.envio.config(protocol);
  fs.writeFileSync(configPath, yaml);

  console.log(`✅ Generated the Envio config for protocol ${_.capitalize(protocol)}`);
  console.log(`📁 Config path: ${helpers.getRelative(configPath)}`);
  console.log();
}
