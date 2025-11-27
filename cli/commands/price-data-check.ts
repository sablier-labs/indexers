import { execSync } from "node:child_process";
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

function priceDataCheckCommand(): Command {
  const command = helpers.createBaseCmd("Verify price data in cache matches node_modules version");

  command.action(async () => {
    displayHeader("🔍 PRICE DATA SYNC CHECK", "cyan");

    const requiredFiles = getRequiredFiles();
    type FileStatus = {
      destPath: string;
      name: string;
      sourceDir: string;
      status: "in-sync" | "missing" | "out-of-sync";
    };

    const fileStatuses: FileStatus[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);
      const relativeDestPath = "./" + path.relative(process.cwd(), destPath);

      // Check if both files exist
      if (!fs.existsSync(sourcePath)) {
        throw new Error(`Source file not found: ${sourcePath}`);
      }

      if (!fs.existsSync(destPath)) {
        fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: "missing" });
        continue;
      }

      // Compare files using diff
      try {
        execSync(`diff -q "${sourcePath}" "${destPath}"`, { stdio: "pipe" });
        fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: "in-sync" });
      } catch (_error) {
        // diff returns non-zero exit code if files differ
        fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: "out-of-sync" });
      }
    }

    // Display file status table
    console.log("");
    const table = createTable({
      colWidths: [25, 15, 15, 45],
      head: ["File", "Source Dir", "Status", "Destination Path"],
      theme: "cyan",
    });

    for (const file of fileStatuses) {
      const statusText =
        file.status === "in-sync"
          ? colors.success("✅ In Sync")
          : file.status === "missing"
            ? colors.error("❌ Missing")
            : colors.error("❌ Out of Sync");

      table.push([colors.value(file.name), colors.dim(file.sourceDir), statusText, colors.dim(file.destPath)]);
    }

    console.log(table.toString());

    // Summary statistics
    const inSync = fileStatuses.filter((f) => f.status === "in-sync").length;
    const outOfSync = fileStatuses.filter((f) => f.status === "out-of-sync").length;
    const missing = fileStatuses.filter((f) => f.status === "missing").length;

    console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("In Sync"), colors.value(inSync.toString())],
      [colors.error("Out of Sync"), colors.value(outOfSync.toString())],
      [colors.error("Missing"), colors.value(missing.toString())],
      [chalk.cyan.bold("Total Files"), chalk.white.bold(fileStatuses.length.toString())],
    );

    console.log(summaryTable.toString());

    // Final status and exit
    const outOfSyncFiles = fileStatuses.filter((f) => f.status !== "in-sync");

    if (outOfSyncFiles.length > 0) {
      console.log("");
      const errorTable = createTable({
        colWidths: [80],
        theme: "red",
      });

      errorTable.push(
        [colors.error("❌ Price data is out of sync!")],
        [colors.value(`Run ${colors.highlight("just price-data-sync")} to fix and commit changes.`)],
      );

      console.log(errorTable.toString());
      process.exit(1);
    }

    console.log("");
    console.log(colors.success("✅ All price data files are in sync"));
  });

  return command;
}

export const priceDataCheckCmd = priceDataCheckCommand();
