/**
 * @file Main CLI entry point for Sablier Indexers utilities
 *
 * @example
 * pnpm tsx cli check-vendors --chain-id 1
 * pnpm tsx cli codegen schema --vendor graph --indexer flow
 * pnpm tsx cli fetch-assets --indexer   flow --chain ethereum
 * pnpm tsx cli fetch-prices --currency ETH --year 2024 --month 01
 * pnpm tsx cli print-chains
 */

import { Command } from "commander";
import dotenv from "dotenv";
import { checkVendorsCmd } from "./commands/check-vendors";
import { envioConfigCmd } from "./commands/codegen/envio-config";
import { graphManifestCmd } from "./commands/codegen/graph-manifest";
import { schemaCmd } from "./commands/codegen/schema";
import { exportSchemaCmd } from "./commands/export-schema";
import { fetchPricesCmd } from "./commands/fetch-prices";
import { graphDeployAllCmd } from "./commands/graph-deploy-all";
import { printChainsCmd } from "./commands/print-chains";

dotenv.config({ quiet: true });

export async function main() {
  const program = new Command();
  program.name("indexers-cli").description("CLI for Sablier Indexers utilities");

  /* -------------------------------------------------------------------------- */
  /*                                CODEGEN GROUP                               */
  /* -------------------------------------------------------------------------- */
  const codegen = program.command("codegen").description("Code generation commands");

  codegen.addCommand(envioConfigCmd.name("envio-config"));
  codegen.addCommand(graphManifestCmd.name("graph-manifest"));
  codegen.addCommand(schemaCmd.name("schema"));

  /* -------------------------------------------------------------------------- */
  /*                                 PRINT GROUP                                */
  /* -------------------------------------------------------------------------- */
  const print = program.command("print").description("Print information commands");

  print.addCommand(printChainsCmd.name("chains"));

  /* -------------------------------------------------------------------------- */
  /*                                   OTHERS                                   */
  /* -------------------------------------------------------------------------- */

  program.addCommand(checkVendorsCmd.name("check-vendors"));
  program.addCommand(exportSchemaCmd.name("export-schema"));
  program.addCommand(fetchPricesCmd.name("fetch-prices"));
  program.addCommand(graphDeployAllCmd.name("graph-deploy-all"));

  program.parse();
}

main().catch(console.error);
