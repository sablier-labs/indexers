import { dirname } from "node:path";
import { FileSystem } from "@effect/platform";
import { Console, Effect, Option } from "effect";
import { getEnvioDeployment } from "../../../src/indexers/envio-deployments.js";
import type { Indexer } from "../../../src/types.js";
import { colors, createTable, displayHeader } from "../../utils/display.js";
import { toFileOperationError } from "../../utils/errors.js";
import paths, { getRelative } from "../../utils/paths.js";
import { withSpinner } from "../../utils/spinner.js";
import { wrapText } from "../../utils/text.js";
import type { EnvioIndexerAsset } from "../query/clients/envio.js";
import { fetchAssets } from "../query/clients/envio.js";

const HEADER_LINE = "id\toutput";
const UNKNOWN_ALIAS = "0";

function isUnknown(asset: Pick<EnvioIndexerAsset, "name" | "symbol">): boolean {
  return asset.name === "Unknown" && asset.symbol === "UNKNOWN";
}

function buildKey(chainId: number, address: string): string {
  return JSON.stringify([chainId, address.toLowerCase()]);
}

function buildOutput(asset: EnvioIndexerAsset): string {
  if (isUnknown(asset)) {
    return UNKNOWN_ALIAS;
  }
  return JSON.stringify({
    decimals: asset.decimals,
    name: asset.name,
    symbol: asset.symbol,
  });
}

function parseTsv(content: string): Map<string, string> {
  const rows = new Map<string, string>();
  const lines = content.split("\n");

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (line === undefined || line.length === 0) {
      continue;
    }
    // Skip the header row.
    if (index === 0 && line === HEADER_LINE) {
      continue;
    }
    const tabIndex = line.indexOf("\t");
    if (tabIndex === -1) {
      continue;
    }
    const key = line.slice(0, tabIndex);
    const output = line.slice(tabIndex + 1);
    rows.set(key, output);
  }

  return rows;
}

function serializeTsv(rows: ReadonlyMap<string, string>): string {
  const lines: string[] = [HEADER_LINE];
  for (const [key, output] of rows) {
    lines.push(`${key}\t${output}`);
  }
  return `${lines.join("\n")}\n`;
}

export const handler = (options: {
  readonly chainId: Option.Option<number>;
  readonly dryRun: boolean;
  readonly indexer: Indexer.IndexerKey;
}) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const endpoint = getEnvioDeployment(options.indexer).endpoint.url;
    const cachePath = paths.envio.cache.tokenMetadata(options.indexer);
    const chainIdFilter = Option.getOrUndefined(options.chainId);

    yield* displayHeader("🪪 SYNC TOKEN METADATA", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Indexer"), colors.value(options.indexer)],
      [colors.value("Vendor"), colors.value("Envio")],
      [colors.value("Endpoint"), colors.dim(wrapText(endpoint, 68))],
      [
        colors.value("Chain Filter"),
        colors.dim(chainIdFilter === undefined ? "all" : String(chainIdFilter)),
      ],
      [colors.value("Cache"), colors.dim(wrapText(yield* getRelative(cachePath), 68))],
      [colors.value("Mode"), options.dryRun ? colors.warning("dry-run") : colors.success("write")]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const fetched = yield* withSpinner(
      `Querying ${options.indexer} Asset rows...`,
      fetchAssets({ endpoint })
    );

    const assets =
      chainIdFilter === undefined
        ? fetched
        : fetched.filter((asset) => asset.chainId === chainIdFilter);

    const cacheExists = yield* fs.exists(cachePath);
    const existingRows = cacheExists
      ? yield* fs
          .readFileString(cachePath)
          .pipe(Effect.mapError(toFileOperationError(cachePath, "read")), Effect.map(parseTsv))
      : new Map<string, string>();

    const rows = new Map(existingRows);

    let newCount = 0;
    let overwrittenCount = 0;
    let unchangedCount = 0;
    let unknownAliasCount = 0;

    for (const asset of assets) {
      const key = buildKey(asset.chainId, asset.address);
      const output = buildOutput(asset);
      const previous = rows.get(key);

      if (previous === undefined) {
        newCount++;
      } else if (previous === output) {
        unchangedCount++;
      } else {
        overwrittenCount++;
      }

      if (output === UNKNOWN_ALIAS) {
        unknownAliasCount++;
      }

      rows.set(key, output);
    }

    const content = serializeTsv(rows);

    if (!options.dryRun) {
      const cacheDir = dirname(cachePath);
      yield* fs
        .makeDirectory(cacheDir, { recursive: true })
        .pipe(Effect.mapError(toFileOperationError(cacheDir, "write")));
      yield* fs
        .writeFileString(cachePath, content)
        .pipe(Effect.mapError(toFileOperationError(cachePath, "write")));
    }

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [24, 14],
      head: ["Metric", "Value"],
      theme: "green",
    });

    summaryTable.push(
      [colors.value("Fetched"), colors.value(assets.length.toString())],
      [colors.value("New Rows"), colors.value(newCount.toString())],
      [colors.value("Overwritten"), colors.value(overwrittenCount.toString())],
      [colors.value("Unchanged"), colors.value(unchangedCount.toString())],
      [colors.value("Unknown Alias"), colors.value(unknownAliasCount.toString())],
      [colors.value("Existing Rows"), colors.value(existingRows.size.toString())],
      [colors.value("Total Rows"), colors.value(rows.size.toString())]
    );

    yield* Console.log(summaryTable.toString());

    yield* Console.log("");
    if (options.dryRun) {
      yield* Console.log(
        colors.warning(`🧪 DRY RUN - ${yield* getRelative(cachePath)} not modified`)
      );
    } else {
      yield* Console.log(colors.success(`✅ Wrote → ${yield* getRelative(cachePath)}`));
    }
  });
