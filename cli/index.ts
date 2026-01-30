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
import { checkVendorsCommand } from "./commands/check-vendors.js";
import { envioConfigCommand } from "./commands/codegen/envio-config.js";
import { graphManifestCommand } from "./commands/codegen/graph-manifest.js";
import { schemaCommand } from "./commands/codegen/schema.js";
import { exportSchemaCommand } from "./commands/export-schema.js";
import { graphDeployAllCommand } from "./commands/graph/deploy/all.js";
import { graphDeployCustomCommand } from "./commands/graph/deploy/custom.js";
import { graphReviveCommand } from "./commands/graph/revive.js";
import { pricesCheckCommand } from "./commands/prices/check.js";
import { pricesSyncCommand } from "./commands/prices/sync.js";
import { printChainsCommand } from "./commands/print-chains.js";
import { queryActionsCommand } from "./commands/query/actions.js";
import { queryAverageMauCommand } from "./commands/query/average-mau.js";
import { queryTotalUsdFeesCommand } from "./commands/query/total-usd-fees.js";
import { queryUniqueTxsCommand } from "./commands/query/unique-txs.js";
import { CliLive } from "./context.js";

/* -------------------------------------------------------------------------- */
/*                                PRINT GROUP                                 */
/* -------------------------------------------------------------------------- */

const printCommand = Command.make("print", {}).pipe(
  Command.withDescription("Print information commands"),
  Command.withSubcommands([printChainsCommand])
);

/* -------------------------------------------------------------------------- */
/*                                CODEGEN GROUP                               */
/* -------------------------------------------------------------------------- */

const codegenCommand = Command.make("codegen", {}).pipe(
  Command.withDescription("Code generation commands"),
  Command.withSubcommands([schemaCommand, envioConfigCommand, graphManifestCommand])
);

/* -------------------------------------------------------------------------- */
/*                                ROOT COMMAND                                */
/* -------------------------------------------------------------------------- */

const rootCommand = Command.make("indexers-cli").pipe(
  Command.withDescription("CLI for Sablier Indexers utilities"),
  Command.withSubcommands([
    printCommand,
    codegenCommand,
    queryActionsCommand,
    queryAverageMauCommand,
    queryTotalUsdFeesCommand,
    queryUniqueTxsCommand,
    checkVendorsCommand,
    exportSchemaCommand,
    graphDeployAllCommand,
    graphDeployCustomCommand,
    graphReviveCommand,
    pricesCheckCommand,
    pricesSyncCommand,
  ])
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
