import path from "node:path";
import readline from "node:readline";
import chalk from "chalk";
import Table from "cli-table3";
import type { Command } from "commander";
import $ from "execa";
import fs from "fs-extra";
import _ from "lodash";
import ora from "ora";
import { sablier } from "sablier";
import paths, { ROOT_DIR } from "../../lib/paths";
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

    console.log(`🚀 Deploying all official ${_.capitalize(indexerArg)} indexers to The Graph...`);
    console.log(`📦 Version label: ${versionLabel}`);
    if (excludedChainIds.size > 0) {
      console.log(
        `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
          .sort((a, b) => a - b)
          .join(", ")}`,
      );
    }
    console.log();

    // Prompt user for confirmation
    console.log("⚠️  Please review the version label carefully!");
    console.log("📚 Check the README.md for version labeling instructions");
    console.log("🔍 Verify against the latest version in Subgraph Studio");
    console.log();

    const confirmation = await promptUser("Does the version label look correct? (y/N): ");
    if (confirmation.toLowerCase() !== "y" && confirmation.toLowerCase() !== "yes") {
      console.log("❌ Deployment canceled by user");
      process.exit(0);
    }
    console.log();

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

    console.log(`📊 Found ${deployments.length} chains to deploy to:`);
    for (const d of deployments) {
      console.log(`  • ${d.chainName} (${d.chainSlug})`);
    }

    if (excludedChains.length > 0) {
      console.log("");
      console.log(chalk.yellow.bold(`🚫 Excluded ${excludedChains.length} chains:`));

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

      console.log(excludedTable.toString());
    }
    console.log("");

    let successCount = 0;
    let failureCount = 0;

    // Deploy to each chain sequentially
    const deploymentIds: Array<{ indexerName: string; id: string }> = [];
    const failedDeployments: Array<{ chainSlug: string; error: string }> = [];
    for (const d of deployments) {
      const spinner = ora(`Deploying to ${d.chainName} (${d.chainSlug})...`).start();

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

        // Extract deployment ID from output
        const deploymentId = helpers.extractDeploymentId(result.stdout);
        if (deploymentId) {
          deploymentIds.push({ id: deploymentId, indexerName });
        }

        console.log(chalk.green(`✅ Successfully deployed to ${d.chainName}`));
        successCount++;
      } catch (error) {
        spinner.stop();
        const errorMessage = error instanceof Error ? error.message : String(error);
        failedDeployments.push({
          chainSlug: d.chainSlug,
          error: errorMessage,
        });
        failureCount++;
      }

      // Add delay between deployments to avoid rate limiting (429 errors)
      const isLastDeployment = deployments.indexOf(d) === deployments.length - 1;
      if (!isLastDeployment) {
        console.log(chalk.dim("⏱️  Waiting 5 seconds before next deployment..."));
        await sleep(5000);
      }
    }

    console.log();
    console.log(chalk.blue.bold("📈 Deployments Summary:"));

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

    console.log(summaryTable.toString());
    console.log();

    // Display all deployment IDs
    if (deploymentIds.length > 0) {
      console.log(chalk.green.bold("🚀 Deployment IDs:"));

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

      console.log(deploymentsTable.toString());
      console.log();
    }

    // Display failed deployments
    if (failedDeployments.length > 0) {
      console.log(chalk.red.bold("❌ Failed Deployments:"));

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

      console.log(failedTable.toString());
      console.log();
    }

    if (failureCount > 0) {
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
    airdrops: ["v1.3", "v1.4"],
    analytics: [],
    flow: ["v1.1", "v1.2"],
    lockup: ["v2.0", "v2.1"],
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
