import * as path from "node:path";
import { Command as CliCommand } from "@effect/cli";
import { CommandExecutor, FileSystem, Command as PlatformCommand } from "@effect/platform";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { coinConfigs } from "../../envio/analytics/effects/coingecko";
import { FileOperationError, ValidationError } from "../errors";
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

type FileStatus = {
  destPath: string;
  name: string;
  sourceDir: string;
  status: "in-sync" | "missing" | "out-of-sync";
};

const priceDataCheckLogic = () =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const executor = yield* CommandExecutor.CommandExecutor;

    displayHeader("🔍 PRICE DATA SYNC CHECK", "cyan");

    const requiredFiles = getRequiredFiles();
    const fileStatuses: FileStatus[] = [];

    for (const { name, sourceDir } of requiredFiles) {
      const sourcePath = path.join(PRICE_DATA_DIR, sourceDir, name);
      const destPath = path.join(CACHE_DIR, name);
      const relativeDestPath = "./" + path.relative(process.cwd(), destPath);

      // Check if source file exists
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

      // Check if destination file exists
      const destExists = yield* fs.exists(destPath);
      if (!destExists) {
        fileStatuses.push({ destPath: relativeDestPath, name, sourceDir, status: "missing" });
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
          : file.status === "missing"
            ? colors.error("❌ Missing")
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
    const outOfSync = fileStatuses.filter((f) => f.status === "out-of-sync").length;
    const missing = fileStatuses.filter((f) => f.status === "missing").length;

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Status", "Count"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.success("In Sync"), colors.value(inSync.toString())],
      [colors.error("Out of Sync"), colors.value(outOfSync.toString())],
      [colors.error("Missing"), colors.value(missing.toString())],
      [chalk.cyan.bold("Total Files"), chalk.white.bold(fileStatuses.length.toString())]
    );

    yield* Console.log(summaryTable.toString());

    // Final status and exit
    const outOfSyncFiles = fileStatuses.filter((f) => f.status !== "in-sync");

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
