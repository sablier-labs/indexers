/**
 * @file Deploy subgraphs to custom Graph nodes
 *
 * @example
 * pnpm tsx cli graph-deploy-custom --chain core --indexer lockup --version-label v1.0.0
 * pnpm tsx cli graph-deploy-custom -c denergychain -i flow -v v2.0.0 --dry-run
 *
 * @param --chain - Required: 'core', 'denergychain', or 'lightlink'
 * @param --indexer - Required: 'airdrops', 'flow', or 'lockup'
 * @param --version-label - Required: Version label for the deployment
 * @param --dry-run - Optional: Show command without executing
 */

import path from "node:path";
import { Command, Options } from "@effect/cli";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import { Chunk, Console, Effect, Stream } from "effect";
import { chains } from "sablier/evm";
import paths, { ROOT_DIR } from "../../../../cli/paths.js";
import { GraphDeployError, ValidationError } from "../../../errors.js";
import * as helpers from "../../../helpers.js";
import { CliEnv } from "../../../services/env.js";
import { finishSpinner, startSpinner } from "../../../spinner.js";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type CustomNodeConfig = {
  chainId: number;
  nodeUrl: string;
  ipfsUrl: string;
  authType?: "deploy-key" | "access-token";
  authEnvVar?: string;
};

/* -------------------------------------------------------------------------- */
/*                                  CONSTANTS                                 */
/* -------------------------------------------------------------------------- */

/** Absolute path to the graph-cli binary. Using this instead of `pnpm exec graph` because
 * pnpm exec resolves binaries from the cwd's nearest node_modules, which fails when cwd is
 * a subdirectory without its own node_modules (e.g. graph/airdrops). */
const GRAPH_BIN = path.join(ROOT_DIR, "node_modules", ".bin", "graph");

const CUSTOM_NODES: Record<string, CustomNodeConfig> = {
  core: {
    authEnvVar: "COREDAO_AUTH_TOKEN",
    authType: "deploy-key",
    chainId: chains.coreDao.id,
    ipfsUrl: "https://thegraph.coredao.org/ipfs/",
    nodeUrl: "https://thegraph.coredao.org/deploy/",
  },
  denergychain: {
    authEnvVar: "DENERGY_AUTH_TOKEN",
    authType: "access-token",
    chainId: chains.denergy.id,
    ipfsUrl: "https://ipfs.denergychain.com",
    nodeUrl: "https://thegraph.denergychain.com/deploy",
  },
  lightlink: {
    chainId: chains.lightlink.id,
    ipfsUrl: "https://api.thegraph.com/ipfs/",
    nodeUrl: "https://graph.phoenix.lightlink.io/rpc",
  },
};

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const chainOption = Options.choice("chain", ["core", "denergychain", "lightlink"] as const).pipe(
  Options.withAlias("c"),
  Options.withDescription("Target chain for custom node deployment")
);

const indexerOption = Options.choice("indexer", ["airdrops", "flow", "lockup"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to deploy")
);

const versionLabelOption = Options.text("version-label").pipe(
  Options.withAlias("v"),
  Options.withDescription("Version label for the deployment")
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Show command without executing"),
  Options.withDefault(false)
);

function executeDeployment(args: readonly string[], workingDir: string, chainSlug: string) {
  const command = PlatformCommand.make(GRAPH_BIN, ...args).pipe(
    PlatformCommand.workingDirectory(workingDir)
  );

  return Effect.gen(function* () {
    const spinner = yield* startSpinner(`Deploying to ${chainSlug}...`);

    return yield* Effect.scoped(
      Effect.gen(function* () {
        const executor = yield* CommandExecutor.CommandExecutor;
        const process = yield* executor.start(command);
        const [stdoutChunks, stderrChunks, exitCode] = yield* Effect.all([
          Stream.runCollect(process.stdout),
          Stream.runCollect(process.stderr),
          process.exitCode,
        ]);

        const stdout = Buffer.concat(Chunk.toReadonlyArray(stdoutChunks)).toString("utf-8");
        const stderr = Buffer.concat(Chunk.toReadonlyArray(stderrChunks)).toString("utf-8");

        if (exitCode !== 0) {
          yield* finishSpinner(
            spinner,
            "fail",
            `Failed to deploy to ${chainSlug}: exit code ${exitCode}`
          );
          yield* Console.log(chalk.red(`\n${stderr || stdout}`));
          return { error: `Command failed with exit code ${exitCode}`, success: false } as const;
        }

        // Extract and display deployment ID if available
        const deploymentId = helpers.extractDeploymentId(stdout);
        if (deploymentId) {
          yield* Console.log(chalk.green(`\nDeployment ID: ${deploymentId}`));
        }

        yield* finishSpinner(spinner, "success", `Successfully deployed to ${chainSlug}`);
        return { deploymentId, success: true } as const;
      }).pipe(
        Effect.catchAll((error) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return finishSpinner(
            spinner,
            "fail",
            `Failed to deploy to ${chainSlug}: ${errorMessage}`
          ).pipe(
            Effect.zipRight(
              Effect.succeed({
                error: errorMessage,
                success: false,
              } as const)
            )
          );
        })
      )
    );
  });
}

function getDisplayArgs(args: readonly string[], authToken?: string): readonly string[] {
  if (!authToken) {
    return args;
  }

  return args.map((arg) => (arg === authToken ? "[redacted]" : arg));
}

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

type CommandOptions = {
  readonly chain: "core" | "denergychain" | "lightlink";
  readonly indexer: "airdrops" | "flow" | "lockup";
  readonly versionLabel: string;
  readonly dryRun: boolean;
};

const graphDeployCustomLogic = (options: CommandOptions) =>
  Effect.gen(function* () {
    const env = yield* CliEnv;
    const config = CUSTOM_NODES[options.chain];

    // Validate auth token if required
    let authToken: string | undefined;
    if (config.authEnvVar) {
      authToken = (yield* env.getString(config.authEnvVar))?.trim();
      if (!authToken) {
        return yield* Effect.fail(
          new ValidationError({
            field: config.authEnvVar,
            message: `Environment variable ${config.authEnvVar} is not set`,
          })
        );
      }
    }

    // Build subgraph name and manifest path
    const subgraphName = `${options.chain}/sablier-${options.indexer}-${options.chain}`;
    const manifestPath = paths.graph.manifest(options.indexer, config.chainId);
    const workingDir = path.join(ROOT_DIR, "graph", options.indexer);

    // Build command args
    const args: string[] = [
      "deploy",
      "--version-label",
      options.versionLabel,
      "--ipfs",
      config.ipfsUrl,
      "--node",
      config.nodeUrl,
    ];

    // Add auth args based on type
    if (config.authType === "deploy-key" && authToken) {
      args.push("--deploy-key", authToken);
    } else if (config.authType === "access-token" && authToken) {
      args.push("--access-token", authToken);
    }

    args.push(subgraphName, manifestPath);

    // Display deployment info
    yield* Console.log(chalk.cyan(`Deploying ${options.indexer} indexer to ${options.chain}`));
    yield* Console.log(chalk.dim(`  Subgraph: ${subgraphName}`));
    yield* Console.log(chalk.dim(`  Version:  ${options.versionLabel}`));
    yield* Console.log(chalk.dim(`  Node:     ${config.nodeUrl}`));
    yield* Console.log("");

    // Dry-run mode
    if (options.dryRun) {
      const displayArgs = getDisplayArgs(args, authToken);
      yield* Console.log(chalk.yellow("[DRY RUN] Would execute:"));
      yield* Console.log(chalk.cyan(`  ${GRAPH_BIN} ${displayArgs.join(" ")}`));
      yield* Console.log(chalk.cyan(`  Working directory: ${workingDir}`));
      return;
    }

    // Execute deployment (no confirmation - justfile [confirm] handles it)
    const result = yield* executeDeployment(args, workingDir, options.chain);

    if (!result.success) {
      return yield* Effect.fail(
        new GraphDeployError({
          chainSlug: options.chain,
          message: result.error,
        })
      );
    }
  });

export const graphDeployCustomCommand = Command.make(
  "graph-deploy-custom",
  {
    chain: chainOption,
    dryRun: dryRunOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  graphDeployCustomLogic
).pipe(Command.withDescription("Deploy a subgraph to a custom Graph node"));
