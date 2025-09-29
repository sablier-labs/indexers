import path from "node:path";
import readline from "node:readline";
import baseX from "base-x";
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
import { getIndexerGraph } from "../../src";
import { getSablierChainSlug, graph } from "../../src/indexers/graph";

import * as helpers from "../helpers";

type Publication = {
  chainId: number;
  chainSlug: string;
  chainName: string;
  subgraphId: string;
};

// Base58 decoder for The Graph IDs
const base58 = baseX("123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz");

function createGraphPublishAllCommand(): Command {
  const command = helpers.createBaseCmd("Publish all official indexers to The Graph decentralized network");

  helpers.addIndexerOpt(command);
  command.option("-d, --deployment-id-file <path>", "path to file containing the base58 deployment ID");
  command.option(
    "-m, --version-metadata <bytes32>",
    "version metadata as bytes32 hex string (with or without 0x prefix)",
  );
  command.option(
    "-e, --exclude-chains <chain-ids>",
    "comma-separated list of chain IDs to exclude from publication (e.g., '1,10,137')",
  );

  command.action(async (options) => {
    // Setup file logging
    const logFilePath = path.join(ROOT_DIR, ".logs", "graph-publish-all", `${dayjs().unix()}.log`);
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
    logger.info("=== Graph Publish All Session Started ===");
    logger.info(`Log file: ${logFilePath}`);

    const startTime = dayjs().valueOf();

    try {
      const indexerArg = helpers.parseIndexerOpt(options.indexer);
      if (indexerArg === "all") {
        throw new Error("--indexer must be a specific indexer, not 'all'");
      } else if (indexerArg === "analytics") {
        throw new Error("'analytics' indexer is not supported for this command");
      }

      const deploymentIdFile = options.deploymentIdFile;
      if (!deploymentIdFile) {
        throw new Error("--deployment-id-file is required");
      }

      const versionMetadata = options.versionMetadata;
      if (!versionMetadata) {
        throw new Error("--version-metadata is required");
      }

      // Validate private key environment variable
      const privateKey = process.env.SUBGRAPH_DEPLOYER_PRIVATE_KEY;
      if (!privateKey) {
        throw new Error("SUBGRAPH_DEPLOYER_PRIVATE_KEY environment variable is required");
      }

      // Validate deployment ID file exists
      if (!fs.existsSync(deploymentIdFile)) {
        throw new Error(`Deployment ID file not found: ${deploymentIdFile}`);
      }

      // Read and validate deployment ID
      const deploymentIdBase58 = fs.readFileSync(deploymentIdFile, "utf8").trim();
      if (!deploymentIdBase58) {
        throw new Error("Deployment ID file is empty");
      }

      // Normalize version metadata (ensure 0x prefix and 32 bytes)
      const normalizedVersionMetadata = versionMetadata.startsWith("0x") ? versionMetadata : `0x${versionMetadata}`;
      if (normalizedVersionMetadata.length !== 66) {
        // 0x + 64 hex chars = 66 total
        throw new Error("Version metadata must be exactly 32 bytes (64 hex characters)");
      }

      // Convert deployment ID from base58 to hex
      const deploymentIdHex = `0x${Buffer.from(base58.decode(deploymentIdBase58)).toString("hex")}`;

      // Log command arguments
      logger.info("COMMAND ARGUMENTS:");
      logger.info(`  --indexer: ${indexerArg}`);
      logger.info(`  --deployment-id-file: ${deploymentIdFile}`);
      logger.info(`  --version-metadata: ${normalizedVersionMetadata}`);
      logger.info(`  --exclude-chains: ${options.excludeChains || "none"}`);
      logger.info(`  Deployment ID (base58): ${deploymentIdBase58}`);
      logger.info(`  Deployment ID (hex): ${deploymentIdHex}`);

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

      logger.info(
        `🚀 Publishing all official ${_.capitalize(indexerArg)} indexers to The Graph decentralized network...`,
      );
      logger.info(`📦 Deployment ID: ${deploymentIdBase58}`);
      logger.info(`🏷️  Version metadata: ${normalizedVersionMetadata}`);
      if (excludedChainIds.size > 0) {
        logger.info(
          `🚫 Excluding chain IDs: ${Array.from(excludedChainIds)
            .sort((a, b) => a - b)
            .join(", ")}`,
        );
      }

      // Prompt user for confirmation
      logger.info("⚠️  Please review the parameters carefully!");
      logger.info("🔍 Verify the deployment ID and version metadata are correct");
      logger.info("💰 This will send transactions on Arbitrum mainnet");

      const confirmation = await promptUser("Does everything look correct? (y/N): ");
      if (confirmation.toLowerCase() !== "y" && confirmation.toLowerCase() !== "yes") {
        logger.info("❌ Publication canceled by user");
        logger.info("=== Graph Publish All Session Ended ===");
        logger.remove(fileTransport);
        process.exit(0);
      }

      // Get all available chains and their Graph slugs
      const chains = _.sortBy(sablier.chains.getAll(), (c) => c.slug);
      const publications: Publication[] = [];
      const excludedChains: Array<{ chainId: number; chainName: string }> = [];

      // Filter chains and get subgraph IDs
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
          // Get the subgraph ID for this chain/protocol
          const graphIndexers = graph[indexerArg];
          const chainIndexer = graphIndexers.find((idx) => idx.chainId === c.id);

          if (chainIndexer?.kind === "official" && chainIndexer.endpoint.id) {
            publications.push({
              chainId: c.id,
              chainName: c.name,
              chainSlug: getSablierChainSlug(c.id),
              subgraphId: chainIndexer.endpoint.id,
            });
          }
        }
      }

      logger.info(`📊 Found ${publications.length} chains to publish to:`);
      for (const p of publications) {
        logger.info(`  • ${p.chainName} (${p.chainSlug}) - Subgraph ID: ${p.subgraphId}`);
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

      // Publish to each chain sequentially
      const transactionHashes: Array<{ chainSlug: string; txHash: string }> = [];
      const failedPublications: Array<{ chainSlug: string; error: string }> = [];

      for (const p of publications) {
        const spinner = ora(`Publishing to ${p.chainName} (${p.chainSlug})...`).start();
        logger.info(`🚀 Starting publication to ${p.chainName} (${p.chainSlug})...`);
        logger.info(`   Subgraph ID: ${p.subgraphId}`);

        try {
          // Convert subgraph ID from base58 to hex
          const subgraphIdHex = `0x${Buffer.from(base58.decode(p.subgraphId)).toString("hex")}`;
          logger.info(`   Subgraph ID (hex): ${subgraphIdHex}`);

          // Run the cast send command
          const result = await $("cast", [
            "send",
            "0xec9A7fb6CbC2E41926127929c2dcE6e9c5D33Bec",
            "publishNewVersion(uint256,bytes32,bytes32)",
            subgraphIdHex,
            deploymentIdHex,
            normalizedVersionMetadata,
            "--rpc-url",
            "https://arbitrum-one-rpc.publicnode.com",
            "--private-key",
            privateKey,
            "--chain",
            "42161",
          ]);
          spinner.stop();

          // Log command execution
          logger.info(
            `COMMAND: cast send 0xec9A7fb6CbC2E41926127929c2dcE6e9c5D33Bec "publishNewVersion(uint256,bytes32,bytes32)" ${subgraphIdHex} ${deploymentIdHex} ${normalizedVersionMetadata} --rpc-url https://arbitrum-one-rpc.publicnode.com --private-key [REDACTED] --chain 42161`,
          );
          logger.info(`STDOUT:\n${result.stdout}`);
          if (result.stderr) {
            logger.info(`STDERR:\n${result.stderr}`);
          }

          // Extract transaction hash from output
          const txHash = result.stdout.trim();
          if (txHash?.startsWith("0x")) {
            transactionHashes.push({ chainSlug: p.chainSlug, txHash });
            logger.info(chalk.green(`✅ Successfully published to ${p.chainName} - TX: ${txHash}`));
          } else {
            logger.info(chalk.green(`✅ Successfully published to ${p.chainName}`));
          }

          successCount++;
        } catch (error) {
          spinner.stop();
          const errorMessage = error instanceof Error ? error.message : String(error);
          logger.error(`❌ Failed to publish to ${p.chainName}: ${errorMessage}`);

          // Log command execution failure
          if (error && typeof error === "object" && "stdout" in error && "stderr" in error) {
            logger.info(
              `COMMAND: cast send 0xec9A7fb6CbC2E41926127929c2dcE6e9c5D33Bec "publishNewVersion(uint256,bytes32,bytes32)" [params] --rpc-url https://arbitrum-one-rpc.publicnode.com --private-key [REDACTED] --chain 42161`,
            );
            logger.info(`STDOUT:\n${error.stdout as string}`);
            logger.info(`STDERR:\n${error.stderr as string}`);
          }

          failedPublications.push({
            chainSlug: p.chainSlug,
            error: errorMessage,
          });
          failureCount++;
        }
      }

      logger.info(chalk.blue.bold("📈 Publications Summary:"));

      const summaryTable = new Table({
        colWidths: [15, 10, 12],
        head: [chalk.blue.bold("Status"), chalk.blue.bold("Count"), chalk.blue.bold("Percentage")],
        style: {
          border: ["blue"],
          head: [],
        },
      });

      const successRate = publications.length > 0 ? ((successCount / publications.length) * 100).toFixed(1) : "0.0";
      const failureRate = publications.length > 0 ? ((failureCount / publications.length) * 100).toFixed(1) : "0.0";

      summaryTable.push(
        [chalk.green("✅ Successful"), chalk.white(successCount.toString()), chalk.green(`${successRate}%`)],
        [chalk.red("❌ Failed"), chalk.white(failureCount.toString()), chalk.red(`${failureRate}%`)],
        [chalk.cyan("📊 Total"), chalk.white(publications.length.toString()), chalk.cyan("100.0%")],
      );

      logger.info(summaryTable.toString());

      // Display all transaction hashes
      if (transactionHashes.length > 0) {
        logger.info(chalk.green.bold("🔗 Transaction Hashes:"));

        const txTable = new Table({
          colWidths: [20, 70],
          head: [chalk.green.bold("Chain Slug"), chalk.green.bold("Transaction Hash")],
          style: {
            border: ["green"],
            head: [],
          },
          wordWrap: true,
        });

        for (const { chainSlug, txHash } of transactionHashes) {
          txTable.push([chalk.cyan(chainSlug), chalk.yellow(txHash)]);
        }

        logger.info(txTable.toString());
      }

      // Display failed publications
      if (failedPublications.length > 0) {
        logger.error(chalk.red.bold("❌ Failed Publications:"));

        const failedTable = new Table({
          colWidths: [20, 60],
          head: [chalk.red.bold("Chain Slug"), chalk.red.bold("Error Message")],
          style: {
            border: ["red"],
            head: [],
          },
          wordWrap: true,
        });

        for (const { chainSlug, error } of failedPublications) {
          failedTable.push([chalk.yellow(chainSlug), chalk.white(error)]);
        }

        logger.info(failedTable.toString());
      }

      // Log final statistics
      const endTime = dayjs().valueOf();
      const duration = ((endTime - startTime) / 1000).toFixed(2);
      logger.info(`⏱️  Total execution time: ${duration} seconds`);

      logger.info("=== Graph Publish All Session Ended ===");
      logger.remove(fileTransport);

      if (failureCount > 0) {
        process.exit(1);
      }
    } catch (error) {
      logger.error(`❌ Publication failed: ${error instanceof Error ? error.message : String(error)}`);
      logger.info("=== Graph Publish All Session Ended ===");
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

// Export the command
export const graphPublishAllCmd = createGraphPublishAllCommand();
