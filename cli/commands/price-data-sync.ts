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

function priceDataSyncCommand(): Command {
  const command = helpers.createBaseCmd("Sync price data from @sablier/price-data to Envio cache");

  command.action(async () => {
    console.log("Syncing price data...");

    // Ensure cache directory exists
    fs.ensureDirSync(CACHE_DIR);

    // Remove existing TSV files
    const existingFiles = fs.readdirSync(CACHE_DIR).filter((file) => file.endsWith(".tsv"));
    for (const file of existingFiles) {
      fs.unlinkSync(path.join(CACHE_DIR, file));
    }

    // Copy required files
    const requiredFiles = getRequiredFiles();
    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);

      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
      }

      fs.copyFileSync(sourcePath, destPath);
    }

    console.log(`✅ Synced ${requiredFiles.length} price data files to cache`);
  });

  return command;
}

export const priceDataSyncCmd = priceDataSyncCommand();
