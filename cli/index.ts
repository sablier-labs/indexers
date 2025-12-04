/**
 * @file Main CLI entry point for Sablier Indexers utilities
 *
 * @example
 * pnpm tsx cli print chains
 * pnpm tsx cli print chains --graph
 * pnpm tsx cli codegen (placeholder)
 */

import { Command } from "@effect/cli";
import { NodeRuntime } from "@effect/platform-node";
import dotenv from "dotenv";
import { Effect } from "effect";
import { checkVendorsCommand } from "./commands/check-vendors";
import { envioConfigCommand } from "./commands/codegen/envio-config";
import { graphManifestCommand } from "./commands/codegen/graph-manifest";
import { schemaCommand } from "./commands/codegen/schema";
import { exportSchemaCommand } from "./commands/export-schema";
import { graphDeployAllCommand } from "./commands/graph-deploy-all";
import { pricesCheckCommand } from "./commands/prices-check";
import { pricesSyncCommand } from "./commands/prices-sync";
import { printChainsCommand } from "./commands/print-chains";
import { CliLive } from "./context";

/* -------------------------------------------------------------------------- */
/*                                PRINT GROUP                                 */
/* -------------------------------------------------------------------------- */

const printCommand = Command.make("print", {}).pipe(
  Command.withDescription("Print information commands"),
  Command.withSubcommands([printChainsCommand]),
);

/* -------------------------------------------------------------------------- */
/*                                CODEGEN GROUP                               */
/* -------------------------------------------------------------------------- */

const codegenCommand = Command.make("codegen", {}).pipe(
  Command.withDescription("Code generation commands"),
  Command.withSubcommands([schemaCommand, envioConfigCommand, graphManifestCommand]),
);

/* -------------------------------------------------------------------------- */
/*                                ROOT COMMAND                                */
/* -------------------------------------------------------------------------- */

const rootCommand = Command.make("indexers-cli").pipe(
  Command.withDescription("CLI for Sablier Indexers utilities"),
  Command.withSubcommands([
    printCommand,
    codegenCommand,
    checkVendorsCommand,
    exportSchemaCommand,
    graphDeployAllCommand,
    pricesCheckCommand,
    pricesSyncCommand,
  ]),
);

const cli = Command.run(rootCommand, {
  name: "Indexers CLI",
  version: "1.0.0",
});

/* -------------------------------------------------------------------------- */
/*                                   MAIN                                     */
/* -------------------------------------------------------------------------- */

export function main() {
  dotenv.config({ quiet: true });

  cli(process.argv).pipe(Effect.provide(CliLive), NodeRuntime.runMain);
}

main();
