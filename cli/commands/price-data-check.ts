import { execSync } from "node:child_process";
import * as path from "node:path";
import type { Command } from "commander";
import * as fs from "fs-extra";
import { coinConfigs } from "../../envio/analytics/effects/coingecko";
import * as helpers from "../helpers";

const CACHE_DIR = path.join(process.cwd(), "envio/analytics/.envio/cache");
const PRICE_DATA_DIR = path.join(process.cwd(), "node_modules/@sablier/price-data");

/**
 * Get list of required TSV files based on coinConfigs and forex rates
 */
function getRequiredFiles(): Array<{ name: string; sourceDir: "crypto" | "forex" }> {
  const files: Array<{ name: string; sourceDir: "crypto" | "forex" }> = [];

  // Add all crypto currencies from coinConfigs
  for (const currency of Object.keys(coinConfigs)) {
    files.push({
      name: `${currency}_USD.tsv`,
      sourceDir: "crypto",
    });
  }

  // Add forex rate (GBP_USD used in forex.ts)
  files.push({
    name: "GBP_USD.tsv",
    sourceDir: "forex",
  });

  return files;
}

function priceDataCheckCommand(): Command {
  const command = helpers.createBaseCmd("Verify price data in cache matches node_modules version");

  command.action(async () => {
    console.log("Checking price data sync...");

    const requiredFiles = getRequiredFiles();
    const outOfSyncFiles: string[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);

      // Check if both files exist
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
      }

      if (!fs.existsSync(destPath)) {
        outOfSyncFiles.push(name);
        continue;
      }

      // Compare files using diff
      try {
        execSync(`diff -q "${sourcePath}" "${destPath}"`, { stdio: "pipe" });
      } catch (_error) {
        // diff returns non-zero exit code if files differ
        outOfSyncFiles.push(name);
      }
    }

    if (outOfSyncFiles.length > 0) {
      console.error(`❌ Price data out of sync: ${outOfSyncFiles.join(", ")}`);
      console.error("Run 'just price-data-sync' and commit changes.");
      process.exit(1);
    }

    console.log("✅ Price data is in sync");
  });

  return command;
}

export const priceDataCheckCmd = priceDataCheckCommand();
