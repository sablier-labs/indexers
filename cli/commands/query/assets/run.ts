import { FileSystem } from "@effect/platform";
import { Console, DateTime, Effect } from "effect";
import { getEnvioDeployment } from "../../../../src/indexers/envio-deployments.js";
import type { Indexer } from "../../../../src/types.js";
import { colors, createTable, displayHeader } from "../../../display.js";
import { toFileOperationError } from "../../../errors.js";
import { getRelative, wrapText } from "../../../helpers.js";
import paths from "../../../paths.js";
import { withSpinner } from "../../../spinner.js";
import {
  buildAssetFiles,
  getQueryAssetsDateSegment,
  getQueryAssetsFilePath,
  getStaleQueryAssetFilePaths,
} from "../assets.file.js";
import { fetchAssets } from "../clients/envio.js";

/**
 * Exports the latest Envio asset catalog as one file per chain for the chosen public indexer.
 *
 * The command rewrites current chain snapshots and prunes obsolete ones so the generated
 * directory remains a faithful source of per-chain asset catalogs for CLI workflows.
 */
export const handler = (options: { readonly indexer: Indexer.IndexerKey }) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const endpoint = getEnvioDeployment(options.indexer).endpoint.url;
    const generatedAt = yield* DateTime.now.pipe(Effect.map(DateTime.formatIso));
    const dateSegment = getQueryAssetsDateSegment(generatedAt);

    yield* displayHeader("📦 QUERY INDEXER ASSETS", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Indexer"), colors.value(options.indexer)],
      [colors.value("Vendor"), colors.value("Envio")],
      [colors.value("Endpoint"), colors.dim(wrapText(endpoint, 68))]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const assets = yield* withSpinner(
      `Querying ${options.indexer} assets...`,
      fetchAssets({ endpoint })
    );

    const files = buildAssetFiles(options.indexer, assets, generatedAt);
    const outputDir = paths.generated.queryAssets.indexerDir(dateSegment, options.indexer);
    yield* fs
      .makeDirectory(outputDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(outputDir, "write")));
    const existingEntries = yield* fs.readDirectory(outputDir);

    yield* Effect.forEach(files, (file) => {
      const outputPath = getQueryAssetsFilePath(options.indexer, file.chainId, dateSegment);
      const content = `${JSON.stringify(file, null, 2)}\n`;
      return fs
        .writeFileString(outputPath, content)
        .pipe(Effect.mapError(toFileOperationError(outputPath, "write")));
    });

    const staleOutputPaths = getStaleQueryAssetFilePaths(
      options.indexer,
      existingEntries,
      files,
      dateSegment
    );
    yield* Effect.forEach(staleOutputPaths, (outputPath) =>
      fs.remove(outputPath).pipe(Effect.mapError(toFileOperationError(outputPath, "delete")))
    );

    yield* Console.log("");
    const resultsTable = createTable({
      colWidths: [22, 12, 50],
      head: ["Chain", "Assets", "Output Path"],
      theme: "green",
    });

    for (const file of files) {
      const outputPath = getQueryAssetsFilePath(options.indexer, file.chainId, dateSegment);
      resultsTable.push([
        colors.value(`${file.chainName} (${file.chainId})`),
        colors.value(file.assets.length.toString()),
        colors.dim(yield* getRelative(outputPath)),
      ]);
    }

    yield* Console.log(resultsTable.toString());

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 10],
      head: ["Metric", "Value"],
      theme: "green",
    });

    summaryTable.push(
      [colors.value("Chains"), colors.value(files.length.toString())],
      [colors.value("Assets"), colors.value(assets.length.toString())],
      [colors.value("Removed"), colors.value(staleOutputPaths.length.toString())]
    );

    yield* Console.log(summaryTable.toString());
  });
