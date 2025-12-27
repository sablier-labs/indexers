/**
 * @file Deploy all official indexers to The Graph
 *
 * @example
 * pnpm tsx cli graph-deploy-all --indexer flow --version-label v1.1.0
 * pnpm tsx cli graph-deploy-all -i lockup -v v3.0.1 --exclude-chains 1,10
 * pnpm tsx cli graph-deploy-all -i airdrops -v v2.0.0 --dry-run
 *
 * @param --indexer - Required: 'airdrops', 'flow', or 'lockup'
 * @param --version-label - Required: Version label for the deployment
 * @param --exclude-chains - Optional: Comma-separated list of chain IDs to exclude
 * @param --dry-run - Optional: Test deployment without actually running commands
 */

import path from "node:path";
import { Command, Options } from "@effect/cli";
import { CommandExecutor, FileSystem, Command as PlatformCommand, Terminal } from "@effect/platform";
import chalk from "chalk";
import Table from "cli-table3";
import dayjs from "dayjs";
import { Chunk, Console, Effect, Option, Stream } from "effect";
import _ from "lodash";
import ora from "ora";
import { sablier } from "sablier";
import paths, { ROOT_DIR } from "../../lib/paths";
import { getIndexerGraph } from "../../src/indexers";
import { getSablierChainSlug } from "../../src/indexers/graph";
import type { Indexer } from "../../src/types";
import { GraphDeployError, UserAbortError, ValidationError } from "../errors";
import * as helpers from "../helpers";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type Deployment = {
  chainId: number;
  chainSlug: string;
  chainName: string;
};

type DeploymentResult = {
  indexerName: string;
  deploymentId?: string;
};

type FailedDeployment = {
  chainSlug: string;
  error: string;
};

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const indexerOption = Options.choice("indexer", ["airdrops", "flow", "lockup"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to deploy"),
);

const versionLabelOption = Options.text("version-label").pipe(
  Options.withAlias("v"),
  Options.withDescription("Version label for the deployment"),
);

const excludeChainsOption = Options.text("exclude-chains").pipe(
  Options.withAlias("e"),
  Options.withDescription("Comma-separated list of chain IDs to exclude from deployment (e.g., '1,10,137')"),
  Options.optional,
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Test deployment without actually running commands"),
  Options.withDefault(false),
);

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

function validateVersionLabel(
  indexer: Indexer.Protocol,
  versionLabel: string,
): Effect.Effect<void, ValidationError, never> {
  const requirements: Record<Indexer.Protocol, string[]> = {
    airdrops: ["v1.3", "v2.0"],
    flow: ["v1.1", "v2.0"],
    lockup: ["v2.0", "v3.0"],
  };

  const allowedPrefixes = requirements[indexer];
  if (!allowedPrefixes) {
    return Effect.fail(new ValidationError({ field: "indexer", message: `Unknown indexer: ${indexer}` }));
  }

  const isValid = allowedPrefixes.some((prefix) => versionLabel.startsWith(prefix));
  if (!isValid) {
    return Effect.fail(
      new ValidationError({
        field: "versionLabel",
        message: `New version label for ${indexer} indexer must start with one of: ${allowedPrefixes.join(", ")}. Got: ${versionLabel}`,
      }),
    );
  }

  return Effect.void;
}

function parseExcludedChainIds(
  excludeChains: Option.Option<string>,
): Effect.Effect<Set<number>, ValidationError, never> {
  return Effect.gen(function* () {
    if (Option.isNone(excludeChains)) {
      return new Set<number>();
    }

    const excludeChainsStr = excludeChains.value;
    const excludedChainIds = new Set<number>();
    const chainIdStrings = excludeChainsStr.split(",").map((id: string) => id.trim());

    for (const idStr of chainIdStrings) {
      const chainId = _.toNumber(idStr);
      if (_.isNaN(chainId) || chainId <= 0) {
        return yield* Effect.fail(
          new ValidationError({
            field: "excludeChains",
            message: `Invalid chain ID: ${idStr}. Must be positive integer.`,
          }),
        );
      }
      excludedChainIds.add(chainId);
    }

    return excludedChainIds;
  });
}

/* -------------------------------------------------------------------------- */
/*                                  LOGGING                                   */
/* -------------------------------------------------------------------------- */

function createFileLogger(logFilePath: string) {
  return {
    log: (msg: string) =>
      Effect.gen(function* () {
        const fs = yield* FileSystem.FileSystem;
        const timestamp = new Date().toISOString();
        const logEntry = `${timestamp} ${msg}\n`;
        // Read existing content, append, and write back
        const exists = yield* fs.exists(logFilePath);
        const existingContent = exists ? yield* fs.readFileString(logFilePath) : "";
        yield* fs.writeFileString(logFilePath, existingContent + logEntry);
      }),
  };
}

/* -------------------------------------------------------------------------- */
/*                              DEPLOYMENT LOGIC                              */
/* -------------------------------------------------------------------------- */

function promptUserConfirmation(): Effect.Effect<void, UserAbortError, Terminal.Terminal> {
  return Effect.gen(function* () {
    const terminal = yield* Terminal.Terminal;

    yield* Console.log(chalk.yellow("⚠️  Please review the version label carefully!"));
    yield* Console.log(chalk.cyan("📚 Check the README.md for version labeling instructions"));
    yield* Console.log(chalk.cyan("🔍 Verify against the latest version in Subgraph Studio"));
    yield* Console.log("");

    yield* terminal.display("Does the version label look correct? (y/N): ");
    const answer = yield* terminal.readLine;

    if (answer.toLowerCase() !== "y" && answer.toLowerCase() !== "yes") {
      return yield* Effect.fail(new UserAbortError({}));
    }
  }).pipe(
    // QuitException (Ctrl+C) and PlatformError should also abort
    Effect.catchAll(() => Effect.fail(new UserAbortError({}))),
  );
}

function buildDeploymentList(indexer: Indexer.Protocol, excludedChainIds: Set<number>) {
  return Effect.gen(function* () {
    const chains = _.sortBy(sablier.chains.getAll(), (c) => c.slug);
    const deployments: Deployment[] = [];
    const excludedChains: Array<{ chainId: number; chainName: string }> = [];

    for (const c of chains) {
      // Check if chain is excluded
      if (excludedChainIds.has(c.id)) {
        excludedChains.push({ chainId: c.id, chainName: c.name });
        continue;
      }

      // Filter out custom indexers
      const indexerConfig = getIndexerGraph({ chainId: c.id, protocol: indexer });
      if (indexerConfig?.kind === "custom") {
        continue;
      }

      // Check if manifest file exists for this chain
      const fs = yield* FileSystem.FileSystem;
      const manifestPath = paths.graph.manifest(indexer, c.id);
      const exists = yield* fs.exists(manifestPath);

      if (exists) {
        deployments.push({
          chainId: c.id,
          chainName: c.name,
          chainSlug: getSablierChainSlug(c.id),
        });
      }
    }

    return { deployments, excludedChains };
  });
}

function displayDeploymentPlan(
  deployments: Deployment[],
  excludedChains: Array<{ chainId: number; chainName: string }>,
) {
  return Effect.gen(function* () {
    yield* Console.log(chalk.cyan(`📊 Found ${deployments.length} chains to deploy to:`));
    for (const d of deployments) {
      yield* Console.log(chalk.white(`  • ${d.chainName} (${d.chainSlug})`));
    }
    yield* Console.log("");

    if (excludedChains.length > 0) {
      yield* Console.log(chalk.yellow.bold(`🚫 Excluded ${excludedChains.length} chains:`));

      const excludedTable = new Table({
        colWidths: [25, 12],
        head: [chalk.yellow.bold("Chain"), chalk.yellow.bold("Chain ID")],
        style: {
          border: ["yellow"],
          head: [],
        },
      });

      for (const exc of excludedChains) {
        excludedTable.push([chalk.white(exc.chainName), chalk.gray(exc.chainId.toString())]);
      }

      yield* Console.log(excludedTable.toString());
      yield* Console.log("");
    }
  });
}

function deployToChain(
  deployment: Deployment,
  indexer: Indexer.Protocol,
  versionLabel: string,
  logger: ReturnType<typeof createFileLogger>,
  dryRun: boolean,
) {
  const indexerName = `sablier-${indexer}-${deployment.chainSlug}`;
  const manifestPath = paths.graph.manifest(indexer, deployment.chainId);
  const workingDir = path.join(ROOT_DIR, "graph", indexer);
  const command = PlatformCommand.make(
    "pnpm",
    "graph",
    "deploy",
    "--version-label",
    versionLabel,
    indexerName,
    manifestPath,
  ).pipe(PlatformCommand.workingDirectory(workingDir));

  return Effect.gen(function* () {
    const spinner = ora(`Deploying to ${deployment.chainName} (${deployment.chainSlug})...`).start();
    yield* logger.log(`🚀 Starting deployment to ${deployment.chainName} (${deployment.chainSlug})...`);

    const commandStr = `pnpm graph deploy --version-label ${versionLabel} ${indexerName} ${manifestPath}`;
    yield* logger.log(`COMMAND: ${commandStr}`);

    if (dryRun) {
      yield* logger.log(`DRY RUN: Would execute command in ${workingDir}`);
      spinner.stop();
      yield* Console.log(chalk.yellow(`[DRY RUN] Would deploy to ${deployment.chainName}`));
      yield* logger.log(`[DRY RUN] Would deploy to ${deployment.chainName}`);
      return { deploymentId: undefined, indexerName, success: true } as const;
    }

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

        yield* logger.log(`STDOUT:\n${stdout}`);
        if (stderr.trim().length > 0) {
          yield* logger.log(`STDERR:\n${stderr}`);
        }

        if (exitCode !== 0) {
          return yield* Effect.fail(new Error(`Command failed with exit code ${exitCode}`));
        }

        const deploymentId = helpers.extractDeploymentId(stdout);
        spinner.stop();

        yield* Effect.all([
          Console.log(chalk.green(`✅ Successfully deployed to ${deployment.chainName}`)),
          logger.log(chalk.green(`✅ Successfully deployed to ${deployment.chainName}`)),
        ]);

        return { deploymentId, indexerName, success: true } as const;
      }).pipe(
        Effect.catchAll((error) => {
          spinner.stop();
          const errorMessage = error instanceof Error ? error.message : String(error);
          return Effect.all([
            logger.log(`❌ Failed to deploy to ${deployment.chainName}: ${errorMessage}`),
            Console.log(chalk.red(`❌ Failed to deploy to ${deployment.chainName}: ${errorMessage}`)),
          ]).pipe(Effect.map(() => ({ error: errorMessage, success: false }) as const));
        }),
      ),
    );
  });
}

function displaySummary(
  deployments: Deployment[],
  successCount: number,
  deploymentIds: DeploymentResult[],
  failedDeployments: FailedDeployment[],
  startTime: number,
  logger: ReturnType<typeof createFileLogger>,
) {
  return Effect.gen(function* () {
    const failureCount = failedDeployments.length;

    yield* Console.log("");
    yield* Console.log(chalk.blue.bold("📈 Deployments Summary:"));

    const summaryTable = new Table({
      colWidths: [15, 10, 12],
      head: [chalk.blue.bold("Status"), chalk.blue.bold("Count"), chalk.blue.bold("Percentage")],
      style: {
        border: ["blue"],
        head: [],
      },
    });

    const successRate = deployments.length > 0 ? ((successCount / deployments.length) * 100).toFixed(1) : "0.0";
    const failureRate = deployments.length > 0 ? ((failureCount / deployments.length) * 100).toFixed(1) : "0.0";

    summaryTable.push(
      [chalk.green("✅ Successful"), chalk.white(successCount.toString()), chalk.green(`${successRate}%`)],
      [chalk.red("❌ Failed"), chalk.white(failureCount.toString()), chalk.red(`${failureRate}%`)],
      [chalk.cyan("📊 Total"), chalk.white(deployments.length.toString()), chalk.cyan("100.0%")],
    );

    yield* Console.log(summaryTable.toString());

    // Display all deployment IDs
    if (deploymentIds.length > 0) {
      yield* Console.log("");
      yield* Console.log(chalk.green.bold("🚀 Deployment IDs:"));

      const deploymentsTable = new Table({
        colWidths: [35, 50],
        head: [chalk.green.bold("Indexer Name"), chalk.green.bold("Deployment ID")],
        style: {
          border: ["green"],
          head: [],
        },
        wordWrap: true,
      });

      for (const { indexerName, deploymentId } of deploymentIds) {
        deploymentsTable.push([chalk.cyan(indexerName), deploymentId ? chalk.yellow(deploymentId) : chalk.gray("N/A")]);
      }

      yield* Console.log(deploymentsTable.toString());
    }

    // Display failed deployments
    if (failedDeployments.length > 0) {
      yield* Console.log("");
      yield* Console.log(chalk.red.bold("❌ Failed Deployments:"));

      const failedTable = new Table({
        colWidths: [20, 60],
        head: [chalk.red.bold("Chain Slug"), chalk.red.bold("Error Message")],
        style: {
          border: ["red"],
          head: [],
        },
        wordWrap: true,
      });

      for (const { chainSlug, error } of failedDeployments) {
        failedTable.push([chalk.yellow(chainSlug), chalk.white(error)]);
      }

      yield* Console.log(failedTable.toString());
    }

    // Log final statistics
    const endTime = dayjs().valueOf();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    yield* Console.log("");
    yield* Console.log(chalk.cyan(`⏱️  Total execution time: ${duration} seconds`));

    yield* logger.log(`⏱️  Total execution time: ${duration} seconds`);
    yield* logger.log("=== Graph Deploy All Session Ended ===");

    if (failureCount > 0) {
      return yield* Effect.fail(
        new GraphDeployError({ chainSlug: "multiple", message: `Deployment completed with ${failureCount} failures` }),
      );
    }
  });
}

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

const graphDeployAllLogic = (options: {
  readonly indexer: "airdrops" | "flow" | "lockup";
  readonly versionLabel: string;
  readonly excludeChains: Option.Option<string>;
  readonly dryRun: boolean;
}) =>
  Effect.gen(function* () {
    // Setup file logging
    const logFilePath = path.join(ROOT_DIR, ".logs", "graph-deploy-all", `${dayjs().unix()}.log`);
    const fs = yield* FileSystem.FileSystem;
    yield* fs.makeDirectory(path.dirname(logFilePath), { recursive: true });

    const logger = createFileLogger(logFilePath);
    yield* logger.log("=== Graph Deploy All Session Started ===");
    yield* logger.log(`Log file: ${logFilePath}`);

    const startTime = dayjs().valueOf();

    // Log command arguments
    yield* logger.log("COMMAND ARGUMENTS:");
    yield* logger.log(`  --indexer: ${options.indexer}`);
    yield* logger.log(`  --version-label: ${options.versionLabel}`);
    yield* logger.log(
      `  --exclude-chains: ${Option.isNone(options.excludeChains) ? "none" : options.excludeChains.value}`,
    );
    yield* logger.log(`  --dry-run: ${options.dryRun}`);

    // Parse excluded chain IDs
    const excludedChainIds = yield* parseExcludedChainIds(options.excludeChains);

    // Validate version label
    yield* validateVersionLabel(options.indexer, options.versionLabel);

    yield* Console.log("");
    yield* Console.log(
      chalk.cyan(`🚀 Deploying all official ${_.capitalize(options.indexer)} indexers to The Graph...`),
    );
    yield* Console.log(chalk.cyan(`📦 Version label: ${options.versionLabel}`));
    if (options.dryRun) {
      yield* Console.log(chalk.yellow("🧪 DRY RUN MODE: No actual deployments will be executed"));
    }
    if (excludedChainIds.size > 0) {
      yield* Console.log(
        chalk.yellow(
          `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
            .sort((a, b) => a - b)
            .join(", ")}`,
        ),
      );
    }
    yield* Console.log("");

    yield* logger.log(`🚀 Deploying all official ${_.capitalize(options.indexer)} indexers to The Graph...`);
    yield* logger.log(`📦 Version label: ${options.versionLabel}`);
    if (excludedChainIds.size > 0) {
      yield* logger.log(
        `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
          .sort((a, b) => a - b)
          .join(", ")}`,
      );
    }

    // Prompt user for confirmation
    const confirmed = yield* promptUserConfirmation().pipe(
      Effect.as(true),
      Effect.catchTag("UserAbortError", () => Effect.succeed(false)),
    );

    if (!confirmed) {
      yield* Console.log(chalk.yellow("❌ Deployment canceled by user"));
      yield* logger.log("❌ Deployment canceled by user");
      yield* logger.log("=== Graph Deploy All Session Ended ===");
      return;
    }

    // Build deployment list
    const { deployments, excludedChains } = yield* buildDeploymentList(options.indexer, excludedChainIds);
    yield* displayDeploymentPlan(deployments, excludedChains);

    // Deploy to each chain sequentially
    const deploymentIds: DeploymentResult[] = [];
    const failedDeployments: FailedDeployment[] = [];
    let successCount = 0;

    for (const deployment of deployments) {
      const result = yield* deployToChain(deployment, options.indexer, options.versionLabel, logger, options.dryRun);

      if (result.success) {
        successCount += 1;
        if (result.deploymentId) {
          deploymentIds.push({ deploymentId: result.deploymentId, indexerName: result.indexerName });
        }
      } else {
        failedDeployments.push({ chainSlug: deployment.chainSlug, error: result.error });
      }

      // Add delay between deployments to avoid rate limiting (429 errors)
      const isLastDeployment = deployments.indexOf(deployment) === deployments.length - 1;
      if (!isLastDeployment) {
        yield* Console.log(chalk.dim("⏱️  Waiting 5 seconds before next deployment..."));
        yield* logger.log("⏱️  Waiting 5 seconds before next deployment...");
        yield* Effect.sleep("5 seconds");
      }
    }

    // Display summary
    yield* displaySummary(deployments, successCount, deploymentIds, failedDeployments, startTime, logger);
  });

export const graphDeployAllCommand = Command.make(
  "graph-deploy-all",
  {
    dryRun: dryRunOption,
    excludeChains: excludeChainsOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  graphDeployAllLogic,
);
