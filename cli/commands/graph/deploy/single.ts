/**
 * @file Deploy a subgraph to a single chain (official or custom Graph node)
 *
 * @example
 * pnpm tsx cli graph-deploy-single -c arbitrum -i lockup -v v3.0.0
 * pnpm tsx cli graph-deploy-single -c denergychain -i flow -v v2.0.0 --dry-run
 *
 * @param --chain - Required: Sablier chain slug (e.g., 'arbitrum', 'denergychain')
 * @param --indexer - Required: 'airdrops', 'flow', or 'lockup'
 * @param --version-label - Required: Version label for the deployment
 * @param --dry-run - Optional: Show command without executing
 */

import path from "node:path";
import { Command, Options } from "@effect/cli";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import { Chunk, Console, Effect, Stream } from "effect";
import paths, { ROOT_DIR } from "../../../../cli/paths.js";
import { getSablierChainSlug } from "../../../../src/indexers/graph.js";
import { getIndexerGraph } from "../../../../src/indexers/index.js";
import { GraphDeployError, ValidationError } from "../../../errors.js";
import * as helpers from "../../../helpers.js";
import { CliEnv } from "../../../services/env.js";
import { finishSpinner, startSpinner } from "../../../spinner.js";
import { extractDeployFailureMessage } from "./helpers.js";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type CustomNodeConfig = {
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
  denergychain: {
    authEnvVar: "DENERGY_AUTH_TOKEN",
    authType: "access-token",
    ipfsUrl: "https://ipfs.denergychain.com",
    nodeUrl: "https://thegraph.denergychain.com/deploy",
  },
  lightlink: {
    ipfsUrl: "https://api.thegraph.com/ipfs/",
    nodeUrl: "https://graph.phoenix.lightlink.io/rpc",
  },
};

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const chainOption = Options.text("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription("Sablier chain slug (e.g., 'arbitrum', 'denergychain')")
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

/* -------------------------------------------------------------------------- */
/*                              DEPLOYMENT LOGIC                              */
/* -------------------------------------------------------------------------- */

function executeDeployment(args: readonly string[], workingDir: string, chainName: string) {
  const command = PlatformCommand.make(GRAPH_BIN, ...args).pipe(
    PlatformCommand.workingDirectory(workingDir)
  );

  return Effect.gen(function* () {
    const spinner = yield* startSpinner(`Deploying to ${chainName}...`);

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
          const errorMessage = extractDeployFailureMessage(stdout, stderr, exitCode);

          yield* finishSpinner(
            spinner,
            "fail",
            `Failed to deploy to ${chainName}: ${errorMessage}`
          );
          yield* Console.log(chalk.red(`\n${stderr || stdout}`));
          return { error: errorMessage, success: false } as const;
        }

        // Extract and display deployment ID if available
        const deploymentId = helpers.extractDeploymentId(stdout);
        if (deploymentId) {
          yield* Console.log(chalk.green(`\nDeployment ID: ${deploymentId}`));
        }

        yield* finishSpinner(spinner, "success", `Successfully deployed to ${chainName}`);
        return { deploymentId, success: true } as const;
      }).pipe(
        Effect.catchAll((error) => {
          const errorMessage = error instanceof Error ? error.message : String(error);
          return finishSpinner(
            spinner,
            "fail",
            `Failed to deploy to ${chainName}: ${errorMessage}`
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

function buildCustomArgs(
  config: CustomNodeConfig,
  versionLabel: string,
  authToken: string | undefined
): string[] {
  const args: string[] = [
    "deploy",
    "--version-label",
    versionLabel,
    "--ipfs",
    config.ipfsUrl,
    "--node",
    config.nodeUrl,
  ];

  if (config.authType === "deploy-key" && authToken) {
    args.push("--deploy-key", authToken);
  } else if (config.authType === "access-token" && authToken) {
    args.push("--access-token", authToken);
  }

  return args;
}

function buildOfficialArgs(versionLabel: string): string[] {
  return ["deploy", "--version-label", versionLabel];
}

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

type CommandOptions = {
  readonly chain: string;
  readonly indexer: "airdrops" | "flow" | "lockup";
  readonly versionLabel: string;
  readonly dryRun: boolean;
};

const graphDeploySingleLogic = (options: CommandOptions) =>
  Effect.gen(function* () {
    const env = yield* CliEnv;

    // Resolve chain from Sablier slug
    const chain = yield* helpers.getChain(options.chain);

    // Detect if this chain uses a custom Graph node
    const indexerConfig = getIndexerGraph({ chainId: chain.id, protocol: options.indexer });
    if (!indexerConfig) {
      return yield* Effect.fail(
        new ValidationError({
          field: "chain",
          message: `No Graph subgraph configured for chain '${options.chain}' and indexer '${options.indexer}'`,
        })
      );
    }

    const isCustom = indexerConfig.kind === "custom";
    const customConfig = isCustom ? CUSTOM_NODES[options.chain] : undefined;

    // Build subgraph name (different format for custom vs official)
    const sablierSlug = getSablierChainSlug(chain.id);
    const subgraphName = isCustom
      ? `${options.chain}/sablier-${options.indexer}-${options.chain}`
      : `sablier-${options.indexer}-${sablierSlug}`;

    // Resolve manifest path (uses getGraphChainSlug internally)
    const manifestPath = paths.graph.manifest(options.indexer, chain.id);
    const workingDir = path.join(ROOT_DIR, "graph", options.indexer);

    // Build command args
    let authToken: string | undefined;
    let args: string[];

    if (isCustom && customConfig) {
      // Validate auth token if required
      if (customConfig.authEnvVar) {
        authToken = (yield* env.getString(customConfig.authEnvVar))?.trim();
        if (!authToken) {
          return yield* Effect.fail(
            new ValidationError({
              field: customConfig.authEnvVar,
              message: `Environment variable ${customConfig.authEnvVar} is not set`,
            })
          );
        }
      }
      args = buildCustomArgs(customConfig, options.versionLabel, authToken);
    } else {
      args = buildOfficialArgs(options.versionLabel);
    }

    args.push(subgraphName, manifestPath);

    // Display deployment info
    yield* Console.log(
      chalk.cyan(`Deploying ${options.indexer} indexer to ${chain.name} (${options.chain})`)
    );
    yield* Console.log(chalk.dim(`  Subgraph: ${subgraphName}`));
    yield* Console.log(chalk.dim(`  Manifest: ${manifestPath}`));
    yield* Console.log(chalk.dim(`  Version:  ${options.versionLabel}`));
    if (isCustom && customConfig) {
      yield* Console.log(chalk.dim(`  Node:     ${customConfig.nodeUrl}`));
    }
    yield* Console.log("");

    // Dry-run mode
    if (options.dryRun) {
      const displayArgs = getDisplayArgs(args, authToken);
      yield* Console.log(chalk.yellow("[DRY RUN] Would execute:"));
      yield* Console.log(chalk.cyan(`  ${GRAPH_BIN} ${displayArgs.join(" ")}`));
      yield* Console.log(chalk.cyan(`  Working directory: ${workingDir}`));
      return;
    }

    // Execute deployment (no confirmation — justfile [confirm] handles it)
    const result = yield* executeDeployment(args, workingDir, chain.name);

    if (!result.success) {
      return yield* Effect.fail(
        new GraphDeployError({
          chainSlug: options.chain,
          message: result.error,
        })
      );
    }
  });

export const graphDeploySingleCommand = Command.make(
  "graph-deploy-single",
  {
    chain: chainOption,
    dryRun: dryRunOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  graphDeploySingleLogic
).pipe(Command.withDescription("Deploy a subgraph to a single chain (official or custom)"));
