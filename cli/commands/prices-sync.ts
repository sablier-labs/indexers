import * as path from "node:path";
import { Command as CliCommand } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { coinConfigs } from "../../envio/analytics/effects/coingecko";
import { FileOperationError, ProcessError } from "../errors";
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

type SyncResult = {
  destPath: string;
  name: string;
  sourceDir: string;
  status: "copied" | "error";
};

const priceDataSyncLogic = () =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;

    displayHeader("🔄 SYNCING PRICE DATA", "cyan");

    // Ensure cache directory exists
    yield* fs.makeDirectory(CACHE_DIR, { recursive: true });

    // Remove existing TSV files
    const entries = yield* fs.readDirectory(CACHE_DIR);
    const existingTsvFiles = entries.filter((file) => file.endsWith(".tsv"));

    if (existingTsvFiles.length > 0) {
      yield* Console.log("");
      yield* Console.log(
        colors.warning(`🗑️  Removing ${existingTsvFiles.length} existing TSV files from cache...`)
      );
      for (const file of existingTsvFiles) {
        yield* fs.remove(path.join(CACHE_DIR, file));
      }
    }

    // Copy required files
    const requiredFiles = getRequiredFiles();
    const results: SyncResult[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);

      const sourceExists = yield* fs.exists(sourcePath);
      if (!sourceExists) {
        return yield* Effect.fail(
          new FileOperationError({
            message: "Source file not found",
            operation: "read",
            path: sourcePath,
          })
        );
      }

      const copyResult = yield* fs.copy(sourcePath, destPath).pipe(
        Effect.match({
          onFailure: () => ({ destPath, name, sourceDir, status: "error" as const }),
          onSuccess: () => ({ destPath, name, sourceDir, status: "copied" as const }),
        })
      );

      results.push(copyResult);
    }

    // Display sync results table
    yield* Console.log("");
    const table = createTable({
      colWidths: [25, 15, 15, 45],
      head: ["File", "Source Dir", "Status", "Destination"],
      theme: "cyan",
    });

    for (const result of results) {
      const statusText =
        result.status === "copied" ? colors.success("✅ Copied") : colors.error("❌ Error");
      table.push([
        colors.value(result.name),
        colors.dim(result.sourceDir),
        statusText,
        colors.dim(path.relative(process.cwd(), result.destPath)),
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const copied = results.filter((r) => r.status === "copied").length;
    const errors = results.filter((r) => r.status === "error").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Copied"), colors.value(copied.toString())],
      [colors.error("Errors"), colors.value(errors.toString())],
      [chalk.cyan.bold("Total Files"), chalk.white.bold(results.length.toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (errors === 0) {
      yield* Console.log(
        colors.success(`✅ Successfully synced ${copied} price data files to cache`)
      );
    } else {
      yield* Console.log(colors.error(`❌ Sync completed with ${errors} errors`));
      return yield* Effect.fail(
        new ProcessError({
          command: "prices-sync",
          message: `Sync completed with ${errors} errors`,
        })
      );
    }
  });

export const pricesSyncCommand = CliCommand.make("prices-sync", {}, priceDataSyncLogic);
