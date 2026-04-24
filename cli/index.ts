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
import { Effect } from "effect";
import { checkVendorsCommand } from "./commands/check-vendors/command.js";
import { envioConfigCommand } from "./commands/codegen/envio-config/command.js";
import { graphManifestCommand } from "./commands/codegen/graph-manifest/command.js";
import { schemaCommand } from "./commands/codegen/schema/command.js";
import { exportSchemaCommand } from "./commands/export-schema/command.js";
import { graphDeployAllCommand } from "./commands/graph/deploy/all/command.js";
import { graphDeploySingleCommand } from "./commands/graph/deploy/single/command.js";
import { graphOpenStudioCommand } from "./commands/graph/open-studio.js";
import { graphReviveCommand } from "./commands/graph/revive/command.js";
import { pricesCheckCommand } from "./commands/prices/check/command.js";
import { pricesSyncCommand } from "./commands/prices/sync/command.js";
import { printChainsCommand } from "./commands/print-chains/command.js";
import { queryActionsCommand } from "./commands/query/actions/command.js";
import { queryAssetsCommand } from "./commands/query/assets/command.js";
import { queryAverageMauCommand } from "./commands/query/average-mau/command.js";
import { queryTotalUsdFeesCommand } from "./commands/query/total-usd-fees/command.js";
import { queryUniqueTxsCommand } from "./commands/query/unique-txs/command.js";
import { recoverTokensCommand } from "./commands/recover-tokens/command.js";
import { syncTokenMetadataCommand } from "./commands/sync-token-metadata/command.js";
import { CliLive } from "./context.js";
import { CliEnv } from "./services/env.js";

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
    queryAssetsCommand,
    queryTotalUsdFeesCommand,
    queryUniqueTxsCommand,
    recoverTokensCommand,
    checkVendorsCommand,
    exportSchemaCommand,
    graphDeployAllCommand,
    graphDeploySingleCommand,
    graphOpenStudioCommand,
    graphReviveCommand,
    pricesCheckCommand,
    pricesSyncCommand,
    syncTokenMetadataCommand,
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
  const program = CliEnv.pipe(
    Effect.flatMap((env) => cli(env.argv)),
    Effect.provide(CliLive)
  );

  NodeRuntime.runMain(program);
}

main();
