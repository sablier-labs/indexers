import path from "node:path";
import type { Command } from "commander";
import $ from "execa";
import fs from "fs-extra";
import _ from "lodash";
import ora from "ora";
import { sablier } from "sablier";
import paths, { ROOT_DIR } from "../../lib/paths";
import { getIndexerGraph } from "../../src";
import { getSablierChainSlug } from "../../src/indexers/graph";

import * as helpers from "../helpers";

type Deployment = {
  chainId: number;
  chainSlug: string;
  chainName: string;
};
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function createGraphDeployAllCommand(): Command {
  const command = helpers.createBaseCmd("Deploy all official indexers to The Graph");

  helpers.addProtocolOpt(command);
  command.option("-v, --version-label <string>", "version label for the deployment");

  command.action(async (options) => {
    const protocol = helpers.parseProtocolOpt(options.protocol);
    if (protocol === "all") {
      throw new Error("--protocol must be a specific protocol, not 'all'");
    }

    const versionLabel = options.versionLabel;
    if (!versionLabel) {
      throw new Error("--version-label is required");
    }

    console.log(`🚀 Deploying all official ${_.capitalize(protocol)} indexers to The Graph...`);
    console.log(`📦 Version label: ${versionLabel}`);

    // Get all available chains and their Graph slugs
    const chains = _.sortBy(sablier.chains.getAll(), (c) => c.slug);
    const deployments: Deployment[] = [];

    // Filter chains
    for (const c of chains) {
      // Filter out custom indexers
      const indexer = getIndexerGraph({ chainId: c.id, protocol });
      if (indexer?.kind === "custom") {
        continue;
      }

      // Check if manifest file exists for this chain
      const manifestPath = paths.graph.manifest(protocol, c.id);
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
        const indexerName = `sablier-${protocol}-${d.chainSlug}`;
        const buildPath = paths.graph.build(protocol);
        const manifestPath = paths.graph.manifest(protocol, d.chainId);
        const options = ["--output-dir", buildPath, "--version-label", versionLabel];

        // Run the pnpm graph deploy command
        const result = await $("pnpm", ["graph", "deploy", indexerName, manifestPath, ...options], {
          cwd: path.join(ROOT_DIR, "graph", protocol),
        });
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

// Export the command
export const graphDeployAllCmd = createGraphDeployAllCommand();
