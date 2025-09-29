import path from "node:path";
import readline from "node:readline";
import chalk from "chalk";
import Table from "cli-table3";
import type { Command } from "commander";
import dayjs from "dayjs";
import $ from "execa";
import fs from "fs-extra";
import _ from "lodash";
import ora from "ora";
import { sablier } from "sablier";
import winston from "winston";
import paths, { ROOT_DIR } from "../../lib/paths";
import { logger } from "../../lib/winston";
import type { Indexer } from "../../src";
import { getIndexerGraph } from "../../src";
import { getSablierChainSlug } from "../../src/indexers/graph";

import * as helpers from "../helpers";

type Deployment = {
  chainId: number;
  chainSlug: string;
  chainName: string;
};

function createGraphDeployAllCommand(): Command {
  const command = helpers.createBaseCmd("Deploy all official indexers to The Graph");

  helpers.addIndexerOpt(command);
  command.option("-v, --version-label <string>", "version label for the deployment");
  command.option(
    "-e, --exclude-chains <chain-ids>",
    "comma-separated list of chain IDs to exclude from deployment (e.g., '1,10,137')",
  );

  command.action(async (options) => {
    // Setup file logging
    const logFilePath = path.join(ROOT_DIR, ".logs", "graph-deploy-all", `${dayjs().unix()}.log`);
    fs.ensureDirSync(path.dirname(logFilePath));

    const fileTransport = new winston.transports.File({
      filename: logFilePath,
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.uncolorize(),
        winston.format.printf(({ timestamp, level, message }) => {
          return `${timestamp} ${level}: ${message}`;
        }),
      ),
    });

    logger.add(fileTransport);
    logger.info(`=== Graph Deploy All Session Started ===`);
    logger.info(`Log file: ${logFilePath}`);

    const startTime = dayjs().valueOf();

    try {
      const indexerArg = helpers.parseIndexerOpt(options.indexer);
      if (indexerArg === "all") {
        throw new Error("--indexer must be a specific indexer, not 'all'");
      } else if (indexerArg === "analytics") {
        throw new Error("'analytics' indexer is not supported for this command");
      }

      const versionLabel = options.versionLabel;
      if (!versionLabel) {
        throw new Error("--version-label is required");
      }

      // Log command arguments
      logger.info(`COMMAND ARGUMENTS:`);
      logger.info(`  --indexer: ${indexerArg}`);
      logger.info(`  --version-label: ${versionLabel}`);
      logger.info(`  --exclude-chains: ${options.excludeChains || "none"}`);

      // Parse excluded chain IDs
      const excludedChainIds = new Set<number>();
      if (options.excludeChains) {
        const chainIdStrings = options.excludeChains.split(",").map((id: string) => id.trim());
        for (const idStr of chainIdStrings) {
          const chainId = _.toNumber(idStr);
          if (_.isNaN(chainId) || chainId <= 0) {
            throw new Error(`Invalid chain ID: ${idStr}. Chain IDs must be positive integers.`);
          }
          excludedChainIds.add(chainId);
        }
      }

      // Validate version label based on protocol requirements
      validateVersionLabel(indexerArg, versionLabel);

      logger.info(`🚀 Deploying all official ${_.capitalize(indexerArg)} indexers to The Graph...`);
      logger.info(`📦 Version label: ${versionLabel}`);
      if (excludedChainIds.size > 0) {
        logger.info(
          `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
            .sort((a, b) => a - b)
            .join(", ")}`,
        );
      }

      // Prompt user for confirmation
      logger.info("⚠️  Please review the version label carefully!");
      logger.info("📚 Check the README.md for version labeling instructions");
      logger.info("🔍 Verify against the latest version in Subgraph Studio");

      const confirmation = await promptUser("Does the version label look correct? (y/N): ");
      if (confirmation.toLowerCase() !== "y" && confirmation.toLowerCase() !== "yes") {
        logger.info("❌ Deployment canceled by user");
        logger.info("=== Graph Deploy All Session Ended ===");
        logger.remove(fileTransport);
        process.exit(0);
      }

      // Get all available chains and their Graph slugs
      const chains = _.sortBy(sablier.chains.getAll(), (c) => c.slug);
      const deployments: Deployment[] = [];
      const excludedChains: Array<{ chainId: number; chainName: string }> = [];

      // Filter chains
      for (const c of chains) {
        // Check if chain is excluded
        if (excludedChainIds.has(c.id)) {
          excludedChains.push({ chainId: c.id, chainName: c.name });
          continue;
        }

        // Filter out custom indexers
        const indexer = getIndexerGraph({ chainId: c.id, protocol: indexerArg });
        if (indexer?.kind === "custom") {
          continue;
        }

        // Check if manifest file exists for this chain
        const manifestPath = paths.graph.manifest(indexerArg, c.id);
        if (fs.existsSync(manifestPath)) {
          deployments.push({
            chainId: c.id,
            chainName: c.name,
            chainSlug: getSablierChainSlug(c.id),
          });
        }
      }

      logger.info(`📊 Found ${deployments.length} chains to deploy to:`);
      for (const d of deployments) {
        logger.info(`  • ${d.chainName} (${d.chainSlug})`);
      }

      if (excludedChains.length > 0) {
        logger.info(chalk.yellow.bold(`🚫 Excluded ${excludedChains.length} chains:`));

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

        logger.info(excludedTable.toString());
      }

      let successCount = 0;
      let failureCount = 0;

      // Deploy to each chain sequentially
      const deploymentIds: Array<{ indexerName: string; id: string }> = [];
      const failedDeployments: Array<{ chainSlug: string; error: string }> = [];
      for (const d of deployments) {
        const spinner = ora(`Deploying to ${d.chainName} (${d.chainSlug})...`).start();
        logger.info(`🚀 Starting deployment to ${d.chainName} (${d.chainSlug})...`);

        try {
          // Construct the subgraph name and manifest path
          const indexerName = `sablier-${indexerArg}-${d.chainSlug}`;
          const manifestPath = paths.graph.manifest(indexerArg, d.chainId);

          // Run the pnpm graph deploy command
          const result = await $(
            "pnpm",
            ["graph", "deploy", "--version-label", versionLabel, indexerName, manifestPath],
            {
              cwd: path.join(ROOT_DIR, "graph", indexerArg),
            },
          );
          spinner.stop();

          // Log command execution
          logger.info(`COMMAND: pnpm graph deploy --version-label ${versionLabel} ${indexerName} ${manifestPath}`);
          logger.info(`STDOUT:\n${result.stdout}`);
          if (result.stderr) {
            logger.info(`STDERR:\n${result.stderr}`);
          }

          // Extract deployment ID from output
          const deploymentId = helpers.extractDeploymentId(result.stdout);
          if (deploymentId) {
            deploymentIds.push({ id: deploymentId, indexerName });
          }

          logger.info(chalk.green(`✅ Successfully deployed to ${d.chainName}`));
          successCount++;
        } catch (error) {
          spinner.stop();
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger.error(`❌ Failed to deploy to ${d.chainName}: ${errorMessage}`);

          // Log command execution failure
          if (error && typeof error === "object" && "stdout" in error && "stderr" in error) {
            logger.info(
              `COMMAND: pnpm graph deploy --version-label ${versionLabel} sablier-${indexerArg}-${d.chainSlug} ${paths.graph.manifest(indexerArg, d.chainId)}`,
            );
            logger.info(`STDOUT:\n${error.stdout as string}`);
            logger.info(`STDERR:\n${error.stderr as string}`);
          }

          failedDeployments.push({
            chainSlug: d.chainSlug,
            error: errorMessage,
          });
          failureCount++;
        }

        // Add delay between deployments to avoid rate limiting (429 errors)
        const isLastDeployment = deployments.indexOf(d) === deployments.length - 1;
        if (!isLastDeployment) {
          logger.info(chalk.dim("⏱️  Waiting 5 seconds before next deployment..."));
          await sleep(5000);
        }
      }

      logger.info(chalk.blue.bold("📈 Deployments Summary:"));

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

      logger.info(summaryTable.toString());

      // Display all deployment IDs
      if (deploymentIds.length > 0) {
        logger.info(chalk.green.bold("🚀 Deployment IDs:"));

        const deploymentsTable = new Table({
          colWidths: [35, 50],
          head: [chalk.green.bold("Indexer Name"), chalk.green.bold("Deployment ID")],
          style: {
            border: ["green"],
            head: [],
          },
          wordWrap: true,
        });

        for (const { id, indexerName } of deploymentIds) {
          deploymentsTable.push([chalk.cyan(indexerName), chalk.yellow(id)]);
        }

        logger.info(deploymentsTable.toString());
      }

      // Display failed deployments
      if (failedDeployments.length > 0) {
        logger.error(chalk.red.bold("❌ Failed Deployments:"));

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

        logger.info(failedTable.toString());
      }

      // Log final statistics
      const endTime = dayjs().valueOf();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      logger.info(`⏱️  Total execution time: ${duration} seconds`);

      logger.info("=== Graph Deploy All Session Ended ===");
      logger.remove(fileTransport);

      if (failureCount > 0) {
        process.exit(1);
      }
    } catch (error) {
      logger.error(`❌ Deployment failed: ${error instanceof Error ? error.message : String(error)}`);
      logger.info("=== Graph Deploy All Session Ended ===");
      logger.remove(fileTransport);
      process.exit(1);
    }
  });

  return command;
}

function promptUser(question: string): Promise<string> {
  return new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function validateVersionLabel(indexer: Indexer.Name, versionLabel: string): void {
  const requirements: Record<Indexer.Name, string[]> = {
    airdrops: ["v1.3", "v2.0"],
    analytics: [],
    flow: ["v1.1", "v2.0"],
    lockup: ["v2.0", "v3.0"],
  };

  const allowedPrefixes = requirements[indexer];
  if (!allowedPrefixes) {
    throw new Error(`Unknown indexer: ${indexer}`);
  }

  const isValid = allowedPrefixes.some((prefix) => versionLabel.startsWith(prefix));
  if (!isValid) {
    throw new Error(
      `New version label for ${indexer} indexer must start with one of: ${allowedPrefixes.join(", ")}. Got: ${versionLabel}`,
    );
  }
}

// Export the command
export const graphDeployAllCmd = createGraphDeployAllCommand();
