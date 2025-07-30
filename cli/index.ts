/**
 * @file Main CLI entry point for Sablier Indexers utilities
 *
 * @example
 * pnpm tsx cli check-vendors --chain-id 1
 * pnpm tsx cli codegen schema --vendor graph --protocol flow
 * pnpm tsx cli fetch-assets --protocol flow --chain ethereum
 * pnpm tsx cli print-chains
 */

import { Command } from "commander";
import { checkVendorsCmd } from "./commands/check-vendors";
import { envioConfigCmd } from "./commands/codegen/envio-config";
import { graphManifestCmd } from "./commands/codegen/graph-manifest";
import { schemaCmd } from "./commands/codegen/schema";
import { deployAllGraphCmd } from "./commands/deploy-all-graph";
import { exportSchemaCmd } from "./commands/export-schema";
import { printChainsCmd } from "./commands/print-chains";

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
  program.addCommand(deployAllGraphCmd.name("deploy-all-graph"));
  program.addCommand(exportSchemaCmd.name("export-schema"));

  program.parse();
}

main().catch(console.error);
