import * as path from "node:path";
import { Command as CliCommand } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../display.js";
import { ProcessError } from "../../errors.js";
import type { PriceDataFile } from "../../price-data.js";
import { getRequiredPriceDataFiles } from "../../price-data.js";
import { CliEnv } from "../../services/env.js";

/**
 * Get list of required TSV files based on Sablier chain data and forex rates.
 */
function getRequiredFiles(): PriceDataFile[] {
  return getRequiredPriceDataFiles();
}

function getPriceDataPaths(cwd: string) {
  return {
    cacheDir: path.join(cwd, "envio/analytics/.envio/cache"),
    priceDataDir: path.join(cwd, "node_modules/@sablier/price-data"),
  };
}

type SyncResult = {
  destPath: string;
  name: string;
  sourceDir: PriceDataFile["sourceDir"];
  status: "copied" | "error" | "missing";
};

const priceDataSyncLogic = () =>
  Effect.gen(function* () {
    const env = yield* CliEnv;
    const fs = yield* FileSystem.FileSystem;
    const { cacheDir, priceDataDir } = getPriceDataPaths(env.cwd);

    yield* displayHeader("🔄 SYNCING PRICE DATA", "cyan");

    // Ensure cache directory exists
    yield* fs.makeDirectory(cacheDir, { recursive: true });

    // Remove existing TSV files
    const entries = yield* fs.readDirectory(cacheDir);
    const existingTsvFiles = entries.filter((file) => file.endsWith(".tsv"));

    if (existingTsvFiles.length > 0) {
      yield* Console.log("");
      yield* Console.log(
        colors.warning(`🗑️  Removing ${existingTsvFiles.length} existing TSV files from cache...`)
      );
      for (const file of existingTsvFiles) {
        yield* fs.remove(path.join(cacheDir, file));
      }
    }

    // Copy required files
    const requiredFiles = getRequiredFiles();
    const results: SyncResult[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(priceDataDir, sourceDir, name);
      const destPath = path.join(cacheDir, name);

      const sourceExists = yield* fs.exists(sourcePath);
      if (!sourceExists) {
        results.push({
          destPath,
          name,
          sourceDir,
          status: "missing",
        });
        continue;
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
        result.status === "copied"
          ? colors.success("✅ Copied")
          : result.status === "missing"
            ? colors.warning("⚠️ Missing")
            : colors.error("❌ Error");
      table.push([
        colors.value(result.name),
        colors.dim(result.sourceDir),
        statusText,
        colors.dim(path.relative(env.cwd, result.destPath)),
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const copied = results.filter((r) => r.status === "copied").length;
    const errors = results.filter((r) => r.status === "error").length;
    const missing = results.filter((r) => r.status === "missing").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("Copied"), colors.value(copied.toString())],
      [colors.warning("Missing"), colors.value(missing.toString())],
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
