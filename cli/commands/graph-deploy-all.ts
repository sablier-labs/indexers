import path from "node:path";
import readline from "node:readline";
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

    // Validate version label based on protocol requirements
    validateVersionLabel(indexerArg, versionLabel);

    console.log(`🚀 Deploying all official ${_.capitalize(indexerArg)} indexers to The Graph...`);
    console.log(`📦 Version label: ${versionLabel}`);
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

    // Filter chains
    for (const c of chains) {
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

        console.log(`✅ Successfully deployed to ${d.chainName}`);
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
        console.log("⏱️  Waiting 10 seconds before next deployment...");
        await sleep(10_000);
      }
    }

    console.log();
    console.log(`📈 Deployments Summary:`);
    console.log(`  ✅ Successful: ${successCount}`);
    console.log(`  ❌ Failed: ${failureCount}`);
    console.log(`  📊 Total: ${deployments.length}`);
    console.log();

    // Display all deployment IDs
    if (deploymentIds.length > 0) {
      console.log(`🚀 Deployment IDs:`);
      for (const { id, indexerName } of deploymentIds) {
        console.log(`   ${indexerName}: ${id}`);
      }
      console.log();
    }

    // Display failed deployments
    if (failedDeployments.length > 0) {
      console.log(`❌ Failed Deployments:`);
      for (const { chainSlug, error } of failedDeployments) {
        console.log(`   ${chainSlug}: ${error}`);
      }
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
