import path from "node:path";
import { type Command } from "commander";
import $ from "execa";
import fs from "fs-extra";
import _ from "lodash";
import ora from "ora";
import { sablier } from "sablier";
import paths, { ROOT_DIR } from "../../lib/paths";
import { getGraphChainSlug } from "../../src/indexers/graph";

import * as helpers from "../helpers";

type Deployment = {
  chainId: number;
  chainSlug: string;
  chainName: string;
};

export function createGraphDeployAllCommand(): Command {
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
    let deployments: Deployment[] = [];

    for (const c of chains) {
      const graphChainSlug = getGraphChainSlug(c.id);

      // Check if manifest file exists for this chain
      const manifestPath = paths.graph.manifest(protocol, c.id);
      if (fs.existsSync(manifestPath)) {
        deployments.push({
          chainId: c.id,
          chainName: c.name,
          chainSlug: graphChainSlug,
        });
      }
    }

    deployments = [
      {
        chainId: 11155111,
        chainName: "Ethereum Sepolia",
        chainSlug: "experimental",
      },
    ];

    console.log(`📊 Found ${deployments.length} chains to deploy to:`);
    for (const d of deployments) {
      console.log(`  • ${d.chainName} (${d.chainSlug})`);
    }
    console.log("");

    let successCount = 0;
    let failureCount = 0;

    // Deploy to each chain sequentially
    const deploymentIds: Array<{ indexerName: string; id: string }> = [];
    for (const d of deployments) {
      const spinner = ora(`Deploying to ${d.chainName} (${d.chainSlug})...`).start();

      try {
        // Construct the subgraph name and manifest path
        const indexerName = `sablier-${protocol}-${d.chainSlug}`;
        const manifestPath = paths.graph.manifest(protocol, d.chainId);

        // Run the pnpm graph deploy command
        const result = await $(
          "pnpm",
          ["graph", "deploy", "--version-label", versionLabel, indexerName, manifestPath],
          {
            cwd: path.join(ROOT_DIR, "graph", protocol),
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
        console.error(`❌ Failed to deploy to ${d.chainName}:\n`, error);
        failureCount++;
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
    }

    if (failureCount > 0) {
      process.exit(1);
    }
  });

  return command;
}

// Export the command
export const graphDeployAllCmd = createGraphDeployAllCommand();
