import * as path from "node:path";
import chalk from "chalk";
import type { Command } from "commander";
import * as fs from "fs-extra";
import { coinConfigs } from "../../envio/analytics/effects/coingecko";
import * as helpers from "../helpers";
import { colors, createTable, displayHeader } from "../shared/display-utils";

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
    displayHeader("🔄 SYNCING PRICE DATA", "cyan");

    // Ensure cache directory exists
    fs.ensureDirSync(CACHE_DIR);

    // Remove existing TSV files
    const existingFiles = fs.readdirSync(CACHE_DIR).filter((file) => file.endsWith(".tsv"));
    if (existingFiles.length > 0) {
      console.log("");
      console.log(colors.warning(`🗑️  Removing ${existingFiles.length} existing TSV files from cache...`));
      for (const file of existingFiles) {
        fs.unlinkSync(path.join(CACHE_DIR, file));
      }
    }

    // Copy required files
    const requiredFiles = getRequiredFiles();
    type SyncResult = {
      destPath: string;
      name: string;
      sourceDir: string;
      status: "copied" | "error";
    };

    const results: SyncResult[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);

      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
      }

      try {
        fs.copyFileSync(sourcePath, destPath);
        results.push({ destPath, name, sourceDir, status: "copied" });
      } catch {
        results.push({ destPath, name, sourceDir, status: "error" });
      }
    }

    // Display sync results table
    console.log("");
    const table = createTable({
      colWidths: [25, 15, 15, 45],
      head: ["File", "Source Dir", "Status", "Destination"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText = result.status === "copied" ? colors.success("✅ Copied") : colors.error("❌ Error");
      table.push([colors.value(result.name), colors.dim(result.sourceDir), statusText, colors.dim(result.destPath)]);
    }

    console.log(table.toString());

    // Summary statistics
    const copied = results.filter((r) => r.status === "copied").length;
    const errors = results.filter((r) => r.status === "error").length;

    console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Copied"), colors.value(copied.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Files"), chalk.white.bold(results.length.toString())],
    );

    console.log(summaryTable.toString());

    console.log("");
    if (errors === 0) {
      console.log(colors.success(`✅ Successfully synced ${copied} price data files to cache`));
    } else {
      console.log(colors.error(`❌ Sync completed with ${errors} errors`));
      process.exit(1);
    }
  });

  return command;
}

export const priceDataSyncCmd = priceDataSyncCommand();
