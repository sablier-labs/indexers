import * as path from "node:path";
import { Command as CliCommand } from "@effect/cli";
import { CommandExecutor, FileSystem, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../display.js";
import { ValidationError } from "../../errors.js";
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

type FileStatus = {
  destPath: string;
  name: string;
  sourceDir: PriceDataFile["sourceDir"];
  status: "in-sync" | "missing-cache" | "out-of-sync";
};

const priceDataCheckLogic = () =>
  Effect.gen(function* () {
    const env = yield* CliEnv;
    const fs = yield* FileSystem.FileSystem;
    const executor = yield* CommandExecutor.CommandExecutor;
    const { cacheDir, priceDataDir } = getPriceDataPaths(env.cwd);

    yield* displayHeader("🔍 PRICE DATA SYNC CHECK", "cyan");

    const requiredFiles = getRequiredFiles();
    const fileStatuses: FileStatus[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(priceDataDir, sourceDir, name);
      const destPath = path.join(cacheDir, name);
      const relativeDestPath = path.relative(env.cwd, destPath);

      // Check if source file exists
      const sourceExists = yield* fs.exists(sourcePath);
      if (!sourceExists) {
        continue;
      }

      // Check if destination file exists
      const destExists = yield* fs.exists(destPath);
      if (!destExists) {
        fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: "missing-cache" });
        continue;
      }

      // Compare files using diff
      const diffResult = yield* executor
        .string(PlatformCommand.make("diff", "-q", sourcePath, destPath))
        .pipe(
          Effect.match({
            onFailure: () => "out-of-sync" as const,
            onSuccess: () => "in-sync" as const,
          })
        );

      fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: diffResult });
    }

    // Display file status table
    yield* Console.log("");
    const table = createTable({
      colWidths: [25, 15, 15, 45],
      head: ["File", "Source Dir", "Status", "Destination Path"],
      theme: "cyan",
    });

    for (const file of fileStatuses) {
      const statusText =
        file.status === "in-sync"
          ? colors.success("✅ In Sync")
          : file.status === "missing-cache"
            ? colors.error("❌ Missing Cache")
            : colors.error("❌ Out of Sync");

      table.push([
        colors.value(file.name),
        colors.dim(file.sourceDir),
        statusText,
        colors.dim(file.destPath),
      ]);
    }

    yield* Console.log(table.toString());

    // Summary statistics
    const inSync = fileStatuses.filter((f) => f.status === "in-sync").length;
    const missingCache = fileStatuses.filter((f) => f.status === "missing-cache").length;
    const outOfSync = fileStatuses.filter((f) => f.status === "out-of-sync").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("In Sync"), colors.value(inSync.toString())],
      [colors.error("Missing Cache"), colors.value(missingCache.toString())],
      [colors.error("Out of Sync"), colors.value(outOfSync.toString())],
      [chalk.cyan.bold("Total Files"), chalk.white.bold(fileStatuses.length.toString())]
    );

    yield* Console.log(summaryTable.toString());

    // Final status and exit
    const outOfSyncFiles = fileStatuses.filter(
      (f) => f.status === "missing-cache" || f.status === "out-of-sync"
    );

    if (outOfSyncFiles.length > 0) {
      yield* Console.log("");
      const errorTable = createTable({
        colWidths: [80],
        theme: "red",
      });

      errorTable.push(
        [colors.error("❌ Price data is out of sync!")],
        [colors.value(`Run ${colors.highlight("just price-data-sync")} to fix and commit changes.`)]
      );

      yield* Console.log(errorTable.toString());
      return yield* Effect.fail(
        new ValidationError({ field: "priceData", message: "Price data is out of sync" })
      );
    }

    yield* Console.log("");
    yield* Console.log(colors.success("✅ All price data files are in sync"));
  });

export const pricesCheckCommand = CliCommand.make("prices-check", {}, priceDataCheckLogic);
