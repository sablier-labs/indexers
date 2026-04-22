import path from "node:path";
import { CommandExecutor, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import { Chunk, Console, Effect, Stream } from "effect";
import paths, { ROOT_DIR } from "../../../../../cli/utils/paths.js";
import { getSablierChainSlug } from "../../../../../src/indexers/graph.js";
import { getIndexerGraph } from "../../../../../src/indexers/index.js";
import { CliEnv } from "../../../../services/env.js";
import { getChain } from "../../../../utils/args.js";
import { GraphDeployError, ValidationError } from "../../../../utils/errors.js";
import { finishSpinner, startSpinner } from "../../../../utils/spinner.js";
import { extractDeploymentId } from "../../../../utils/text.js";
import { extractDeployFailureMessage } from "../helpers.js";

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
        const deploymentId = extractDeploymentId(stdout);
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
  readonly indexer: "airdrops" | "streams";
  readonly versionLabel: string;
  readonly dryRun: boolean;
};

export const handler = (options: CommandOptions) =>
  Effect.gen(function* () {
    const env = yield* CliEnv;

    // Resolve chain from Sablier slug
    const chain = yield* getChain(options.chain);

    // Detect if this chain uses a custom Graph node
    const indexerConfig = getIndexerGraph({ chainId: chain.id, indexer: options.indexer });
    if (!indexerConfig) {
      return yield* Effect.fail(
        new ValidationError({
          field: "chain",
          message: `No Graph subgraph configured for chain '${options.chain}' and indexer '${options.indexer}'`,
        })
      );
    }

    const isCustom = indexerConfig.kind === "custom";
    const sablierSlug = getSablierChainSlug(chain.id);
    const customConfig = isCustom ? CUSTOM_NODES[sablierSlug] : undefined;

    if (isCustom && !customConfig) {
      const knownNodes = Object.keys(CUSTOM_NODES).join(", ");
      return yield* Effect.fail(
        new ValidationError({
          field: "chain",
          message: `No custom Graph node configured for '${sablierSlug}'. Known custom nodes: ${knownNodes}`,
        })
      );
    }

    // Use the resolved registry name so logical indexers like "streams" can
    // continue deploying into the legacy Lockup subgraph slots.
    const subgraphName = isCustom ? `${sablierSlug}/${indexerConfig.name}` : indexerConfig.name;

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
