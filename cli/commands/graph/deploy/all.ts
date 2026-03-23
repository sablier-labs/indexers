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

import { join } from "node:path";
import { Command, Options } from "@effect/cli";
import { CommandExecutor, FileSystem, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import Table from "cli-table3";
import { Chunk, Clock, Console, Data, Duration, Effect, Option, Schedule, Stream } from "effect";
import _ from "lodash";
import { sablier } from "sablier";
import { Version } from "sablier/evm";
import paths, { ROOT_DIR } from "../../../../cli/paths.js";
import { getSablierChainSlug } from "../../../../src/indexers/graph.js";
import { getIndexerGraph } from "../../../../src/indexers/index.js";
import type { Indexer } from "../../../../src/types.js";
import type { FileOperationError } from "../../../errors.js";
import {
  GraphDeployError,
  ProcessError,
  UserAbortError,
  ValidationError,
} from "../../../errors.js";
import * as helpers from "../../../helpers.js";
import type { CliFileLoggerInstance } from "../../../services/logging.js";
import { CliFileLogger } from "../../../services/logging.js";
import { PromptService } from "../../../services/prompt.js";
import { finishSpinner, startSpinner } from "../../../spinner.js";
import { extractDeployFailureMessage, hasVersionLabelConflict } from "./helpers.js";

/** Absolute path to the graph-cli binary. Using this instead of `pnpm exec graph` because
 * pnpm exec resolves binaries from the cwd's nearest node_modules, which fails when cwd is
 * a subdirectory without its own node_modules (e.g. graph/airdrops). */
const GRAPH_BIN = join(ROOT_DIR, "node_modules", ".bin", "graph");

const MAX_DEPLOY_RETRIES = 3;
const DEPLOY_INITIAL_BACKOFF = "2 seconds";
const MAX_DEPLOY_ATTEMPTS = MAX_DEPLOY_RETRIES + 1;

const TRANSIENT_DEPLOY_PATTERNS = [
  /429/i,
  /rate limit/i,
  /too many requests/i,
  /ECONNRESET/i,
  /ETIMEDOUT/i,
  /ENOTFOUND/i,
  /ECONNREFUSED/i,
  /socket hang up/i,
  /network error/i,
  /timeout/i,
];

class TransientDeployError extends Data.TaggedError("TransientDeployError")<{
  chainSlug: string;
  message: string;
}> {}

export const DEPLOY_RETRY_SCHEDULE = Schedule.exponential(DEPLOY_INITIAL_BACKOFF).pipe(
  Schedule.intersect(Schedule.recurs(MAX_DEPLOY_RETRIES))
);

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

type DeployAttemptError = FileOperationError | ProcessError | TransientDeployError;

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const indexerOption = Options.choice("indexer", ["airdrops", "flow", "lockup"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Indexer to deploy")
);

const versionLabelOption = Options.text("version-label").pipe(
  Options.withAlias("v"),
  Options.withDescription("Version label for the deployment")
);

const excludeChainsOption = Options.text("exclude-chains").pipe(
  Options.withAlias("e"),
  Options.withDescription(
    "Comma-separated list of chain IDs to exclude from deployment (e.g., '1,10,137')"
  ),
  Options.optional
);

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Test deployment without actually running commands"),
  Options.withDefault(false)
);

/* -------------------------------------------------------------------------- */
/*                                 VALIDATION                                 */
/* -------------------------------------------------------------------------- */

function validateVersionLabel(
  indexer: Indexer.Protocol,
  versionLabel: string
): Effect.Effect<void, ValidationError, never> {
  const requirements: Record<Indexer.Protocol, string[]> = {
    airdrops: Object.values(Version.Airdrops),
    flow: Object.values(Version.Flow),
    lockup: Object.values(Version.Lockup),
  };

  const allowedPrefixes = requirements[indexer];
  if (!allowedPrefixes) {
    return Effect.fail(
      new ValidationError({ field: "indexer", message: `Unknown indexer: ${indexer}` })
    );
  }

  const isValid = allowedPrefixes.some((prefix) => versionLabel.startsWith(prefix));
  if (!isValid) {
    return Effect.fail(
      new ValidationError({
        field: "versionLabel",
        message: `New version label for ${indexer} indexer must start with one of: ${allowedPrefixes.join(", ")}. Got: ${versionLabel}`,
      })
    );
  }

  return Effect.void;
}

function parseExcludedChainIds(
  excludeChains: Option.Option<string>
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
          })
        );
      }
      excludedChainIds.add(chainId);
    }

    return excludedChainIds;
  });
}

/* -------------------------------------------------------------------------- */
/*                              DEPLOYMENT LOGIC                              */
/* -------------------------------------------------------------------------- */

function promptUserConfirmation(): Effect.Effect<void, UserAbortError, PromptService> {
  return Effect.gen(function* () {
    const promptService = yield* PromptService;

    yield* Console.log(chalk.yellow("⚠️  Please review the version label carefully!"));
    yield* Console.log(chalk.cyan("📚 Check the README.md for version labeling instructions"));
    yield* Console.log(chalk.cyan("🔍 Verify against the latest version in Subgraph Studio"));
    yield* Console.log("");

    const confirmed = yield* promptService.confirmOrCancel("Does the version label look correct?");
    if (!confirmed) {
      return yield* Effect.fail(new UserAbortError({}));
    }
  });
}

function buildDeploymentList(indexer: Indexer.Protocol, excludedChainIds: Set<number>) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
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
  excludedChains: Array<{ chainId: number; chainName: string }>
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

function chunksToString(chunks: Chunk.Chunk<Uint8Array>): string {
  return Buffer.concat(Chunk.toReadonlyArray(chunks)).toString("utf-8");
}

function normalizeErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function formatDeployAttemptMessage(deployment: Deployment, attempt: number): string {
  return `Deploying to ${deployment.chainName} (${deployment.chainSlug}) (attempt ${attempt}/${MAX_DEPLOY_ATTEMPTS})...`;
}

function formatRetryMessage(
  deployment: Deployment,
  retryIndex: number,
  delay: Duration.DurationInput
): string {
  return `Transient error on ${deployment.chainName} (${deployment.chainSlug}), retry ${retryIndex + 1}/${MAX_DEPLOY_RETRIES} in ${Duration.format(delay)}...`;
}

function formatFinalDeployError(error: unknown, attempts: number): string {
  if (error instanceof TransientDeployError) {
    return `${error.message} after ${attempts} attempts`;
  }

  return normalizeErrorMessage(error);
}

function toDeployProcessError(command: string, message: string, exitCode?: number): ProcessError {
  return new ProcessError({
    command,
    exitCode,
    message,
  });
}

export function isTransientDeployFailure(stdout: string, stderr: string): boolean {
  if (hasVersionLabelConflict(stdout, stderr)) {
    return false;
  }

  const combinedOutput = `${stdout}\n${stderr}`;
  return TRANSIENT_DEPLOY_PATTERNS.some((pattern) => pattern.test(combinedOutput));
}

function deployToChain(
  deployment: Deployment,
  indexer: Indexer.Protocol,
  versionLabel: string,
  logger: CliFileLoggerInstance,
  dryRun: boolean
) {
  const indexerName = `sablier-${indexer}-${deployment.chainSlug}`;
  const manifestPath = paths.graph.manifest(indexer, deployment.chainId);
  const workingDir = join(ROOT_DIR, "graph", indexer);
  const command = PlatformCommand.make(
    GRAPH_BIN,
    "deploy",
    "--version-label",
    versionLabel,
    indexerName,
    manifestPath
  ).pipe(PlatformCommand.workingDirectory(workingDir));

  return Effect.gen(function* () {
    const spinner = yield* startSpinner(formatDeployAttemptMessage(deployment, 1));
    yield* logger.log(
      `🚀 Starting deployment to ${deployment.chainName} (${deployment.chainSlug})...`
    );

    const commandStr = `${GRAPH_BIN} deploy --version-label ${versionLabel} ${indexerName} ${manifestPath}`;
    yield* logger.log(`COMMAND: ${commandStr}`);

    if (dryRun) {
      yield* logger.log(`DRY RUN: Would execute command in ${workingDir}`);
      yield* finishSpinner(spinner, "stop");
      yield* Console.log(chalk.yellow(`[DRY RUN] Would deploy to ${deployment.chainName}`));
      yield* logger.log(`[DRY RUN] Would deploy to ${deployment.chainName}`);
      return { deploymentId: undefined, indexerName, success: true } as const;
    }

    let attempts = 0;

    const executeDeploymentAttempt = (attempt: number) =>
      Effect.scoped(
        Effect.gen(function* () {
          const executor = yield* CommandExecutor.CommandExecutor;
          const process = yield* executor
            .start(command)
            .pipe(
              Effect.mapError((error) =>
                toDeployProcessError(commandStr, normalizeErrorMessage(error))
              )
            );
          const [stdoutChunks, stderrChunks, exitCode] = yield* Effect.all([
            Stream.runCollect(process.stdout),
            Stream.runCollect(process.stderr),
            process.exitCode,
          ]).pipe(
            Effect.mapError((error) =>
              toDeployProcessError(commandStr, normalizeErrorMessage(error))
            )
          );

          const stdout = chunksToString(stdoutChunks);
          const stderr = chunksToString(stderrChunks);

          yield* logger.log(`[attempt ${attempt}] STDOUT:\n${stdout}`);
          if (stderr.trim().length > 0) {
            yield* logger.log(`[attempt ${attempt}] STDERR:\n${stderr}`);
          }

          if (exitCode !== 0) {
            const errorMessage = extractDeployFailureMessage(stdout, stderr, exitCode);

            if (isTransientDeployFailure(stdout, stderr)) {
              return yield* new TransientDeployError({
                chainSlug: deployment.chainSlug,
                message: errorMessage,
              });
            }

            return yield* toDeployProcessError(commandStr, errorMessage, exitCode);
          }

          const deploymentId = helpers.extractDeploymentId(stdout);
          return { deploymentId, indexerName, success: true } as const;
        })
      );

    const retryPolicy = DEPLOY_RETRY_SCHEDULE.pipe(
      Schedule.whileInput((error: DeployAttemptError) => error instanceof TransientDeployError),
      Schedule.tapOutput(([delay, retryIndex]) => {
        const retryMessage = formatRetryMessage(deployment, retryIndex, delay);
        return Effect.all([spinner.setText(retryMessage), logger.log(`⚠️  ${retryMessage}`)]).pipe(
          Effect.orDie,
          Effect.asVoid
        );
      })
    );

    return yield* Effect.gen(function* () {
      const result = yield* Effect.gen(function* () {
        const attempt = yield* Effect.sync(() => {
          attempts += 1;
          return attempts;
        });

        yield* spinner.setText(formatDeployAttemptMessage(deployment, attempt));
        return yield* executeDeploymentAttempt(attempt);
      }).pipe(Effect.retry(retryPolicy));

      yield* finishSpinner(spinner, "success", `Successfully deployed to ${deployment.chainName}`);
      yield* logger.log(chalk.green(`✅ Successfully deployed to ${deployment.chainName}`));

      return result;
    }).pipe(
      Effect.catchAll((error) => {
        const errorMessage = formatFinalDeployError(error, attempts);
        return finishSpinner(
          spinner,
          "fail",
          `Failed to deploy to ${deployment.chainName}: ${errorMessage}`
        ).pipe(
          Effect.zipRight(
            logger
              .log(`❌ Failed to deploy to ${deployment.chainName}: ${errorMessage}`)
              .pipe(Effect.as({ error: errorMessage, success: false } as const))
          )
        );
      })
    );
  });
}

function displaySummary(
  deployments: Deployment[],
  successCount: number,
  deploymentIds: DeploymentResult[],
  failedDeployments: FailedDeployment[],
  startTimeMs: number,
  logger: CliFileLoggerInstance
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

    const successRate =
      deployments.length > 0 ? ((successCount / deployments.length) * 100).toFixed(1) : "0.0";
    const failureRate =
      deployments.length > 0 ? ((failureCount / deployments.length) * 100).toFixed(1) : "0.0";

    summaryTable.push(
      [
        chalk.green("✅ Successful"),
        chalk.white(successCount.toString()),
        chalk.green(`${successRate}%`),
      ],
      [chalk.red("❌ Failed"), chalk.white(failureCount.toString()), chalk.red(`${failureRate}%`)],
      [chalk.cyan("📊 Total"), chalk.white(deployments.length.toString()), chalk.cyan("100.0%")]
    );

    yield* Console.log(summaryTable.toString());

    // Display all deployment IDs
    if (deploymentIds.length > 0) {
      yield* Console.log("");
      yield* Console.log(chalk.green.bold("🚀 Deployment IDs:"));

      const deploymentsTable = new Table({
        colWidths: [35, 50],
        head: [chalk.green.bold("Indexer Name"), chalk.green.bold("Deployment ID")],
        wordWrap: true,
        style: {
          border: ["green"],
          head: [],
        },
      });

      for (const { indexerName, deploymentId } of deploymentIds) {
        deploymentsTable.push([
          chalk.cyan(indexerName),
          deploymentId ? chalk.yellow(deploymentId) : chalk.gray("N/A"),
        ]);
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
        wordWrap: true,
        style: {
          border: ["red"],
          head: [],
        },
      });

      for (const { chainSlug, error } of failedDeployments) {
        failedTable.push([chalk.yellow(chainSlug), chalk.white(error)]);
      }

      yield* Console.log(failedTable.toString());
    }

    // Log final statistics
    const endTimeMs = yield* Clock.currentTimeMillis;
    const durationMs = endTimeMs - startTimeMs;
    const duration = (durationMs / 1000).toFixed(2);
    yield* Console.log("");
    yield* Console.log(chalk.cyan(`⏱️  Total execution time: ${duration} seconds`));

    yield* logger.log(`⏱️  Total execution time: ${duration} seconds`);
    yield* logger.log("=== Graph Deploy All Session Ended ===");

    if (failureCount > 0) {
      return yield* Effect.fail(
        new GraphDeployError({
          chainSlug: "multiple",
          message: `Deployment completed with ${failureCount} failures`,
        })
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
    const fileLoggerFactory = yield* CliFileLogger;
    const timestampMs = yield* Clock.currentTimeMillis;
    const logFilePath = join(
      ROOT_DIR,
      ".logs",
      "graph-deploy-all",
      `${Math.trunc(timestampMs / 1000)}.log`
    );
    const logger = yield* fileLoggerFactory.make(logFilePath);
    yield* logger.createLogFile();
    yield* logger.log("=== Graph Deploy All Session Started ===");
    yield* logger.log(`Log file: ${logFilePath}`);

    const startTimeMs = yield* Clock.currentTimeMillis;

    // Log command arguments
    yield* logger.log("COMMAND ARGUMENTS:");
    yield* logger.log(`  --indexer: ${options.indexer}`);
    yield* logger.log(`  --version-label: ${options.versionLabel}`);
    yield* logger.log(
      `  --exclude-chains: ${Option.isNone(options.excludeChains) ? "none" : options.excludeChains.value}`
    );
    yield* logger.log(`  --dry-run: ${options.dryRun}`);

    // Parse excluded chain IDs
    const excludedChainIds = yield* parseExcludedChainIds(options.excludeChains);

    // Validate version label
    yield* validateVersionLabel(options.indexer, options.versionLabel);

    yield* Console.log("");
    yield* Console.log(
      chalk.cyan(
        `🚀 Deploying all official ${_.capitalize(options.indexer)} indexers to The Graph...`
      )
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
            .join(", ")}`
        )
      );
    }
    yield* Console.log("");

    yield* logger.log(
      `🚀 Deploying all official ${_.capitalize(options.indexer)} indexers to The Graph...`
    );
    yield* logger.log(`📦 Version label: ${options.versionLabel}`);
    if (excludedChainIds.size > 0) {
      yield* logger.log(
        `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
          .sort((a, b) => a - b)
          .join(", ")}`
      );
    }

    // Prompt user for confirmation
    const confirmed = yield* promptUserConfirmation().pipe(
      Effect.as(true),
      Effect.catchTag("UserAbortError", () => Effect.succeed(false))
    );

    if (!confirmed) {
      yield* Console.log(chalk.yellow("❌ Deployment canceled by user"));
      yield* logger.log("❌ Deployment canceled by user");
      yield* logger.log("=== Graph Deploy All Session Ended ===");
      return;
    }

    // Build deployment list
    const { deployments, excludedChains } = yield* buildDeploymentList(
      options.indexer,
      excludedChainIds
    );
    yield* displayDeploymentPlan(deployments, excludedChains);

    // Deploy to each chain sequentially
    const deploymentIds: DeploymentResult[] = [];
    const failedDeployments: FailedDeployment[] = [];
    let successCount = 0;

    for (const deployment of deployments) {
      const result = yield* deployToChain(
        deployment,
        options.indexer,
        options.versionLabel,
        logger,
        options.dryRun
      );

      if (result.success) {
        successCount += 1;
        if (result.deploymentId) {
          deploymentIds.push({
            deploymentId: result.deploymentId,
            indexerName: result.indexerName,
          });
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
    yield* displaySummary(
      deployments,
      successCount,
      deploymentIds,
      failedDeployments,
      startTimeMs,
      logger
    );
  });

export const graphDeployAllCommand = Command.make(
  "graph-deploy-all",
  {
    dryRun: dryRunOption,
    excludeChains: excludeChainsOption,
    indexer: indexerOption,
    versionLabel: versionLabelOption,
  },
  graphDeployAllLogic
);
