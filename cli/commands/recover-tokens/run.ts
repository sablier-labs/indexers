import { FileSystem } from "@effect/platform";
import { Console, DateTime, Effect, Option } from "effect";
import { sablier } from "sablier";
import { formatUnits } from "viem";
import { colors, createTable, displayHeader } from "../../utils/display.js";
import { toFileOperationError, ValidationError } from "../../utils/errors.js";
import paths, { getRelative } from "../../utils/paths.js";
import { resolveCliRpcConfig } from "../../utils/rpc.js";
import { withSpinner } from "../../utils/spinner.js";
import { wrapText } from "../../utils/text.js";
import { getQueryAssetsDateSegment } from "../query/assets.file.js";
import type { RecoverTokensProtocol } from "./helpers.js";
import { absBigInt, buildRecoverTokenOutputFile } from "./helpers.js";
import { queryRecoverTokenDeltas } from "./queries.js";
import { readIndexedAssetFile, resolveSablierContracts, resolveSourcePath } from "./resolve.js";

const TRAILING_ZEROES_REGEX = /0+$/;

function writeOutputFile(
  fs: FileSystem.FileSystem,
  opts: {
    chainId: number;
    chainName: string;
    chainSlug: string;
    contracts: Parameters<typeof buildRecoverTokenOutputFile>[0]["contracts"];
    dateSegment: string;
    epochMs: number;
    generatedAt: string;
    protocol: RecoverTokensProtocol;
    result: Parameters<typeof buildRecoverTokenOutputFile>[0]["result"];
  }
) {
  return Effect.gen(function* () {
    const outputFile = buildRecoverTokenOutputFile(opts);
    const outputDir = paths.generated.recoverTokens.dir(opts.dateSegment);
    const outputPath = paths.generated.recoverTokens.file(
      opts.dateSegment,
      opts.epochMs,
      opts.protocol,
      opts.chainSlug
    );

    yield* fs
      .makeDirectory(outputDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(outputDir, "write")));
    yield* fs
      .writeFileString(outputPath, `${JSON.stringify(outputFile, null, 2)}\n`)
      .pipe(Effect.mapError(toFileOperationError(outputPath, "write")));

    return outputPath;
  });
}

/**
 * Compacts token amounts for terminal tables without losing sign information.
 *
 * Trailing zeroes are stripped from the fractional part so high-decimal assets
 * stay readable in a fixed-width layout.
 */
function formatTokenAmount(value: bigint, decimals: number): string {
  const sign = value < 0n ? "-" : "";
  const absoluteValue = absBigInt(value);
  const formatted = formatUnits(absoluteValue, decimals);
  const [integerPart, fractionalPart] = formatted.split(".");

  if (!fractionalPart) {
    return `${sign}${integerPart}`;
  }

  const trimmedFraction = fractionalPart.replace(TRAILING_ZEROES_REGEX, "");
  if (trimmedFraction.length === 0) {
    return `${sign}${integerPart}`;
  }

  return `${sign}${integerPart}.${trimmedFraction}`;
}

export const handler = (options: {
  readonly chainId: number;
  readonly file: Option.Option<string>;
  readonly protocol: RecoverTokensProtocol;
}) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const now = yield* DateTime.now;
    const generatedAt = DateTime.formatIso(now);
    const dateSegment = getQueryAssetsDateSegment(generatedAt);
    const epochMs = DateTime.toEpochMillis(now);
    const { chain, displayRpcUrls, rpcUrls } = yield* resolveCliRpcConfig(options.chainId);
    const contracts = yield* resolveSablierContracts(options.protocol, options.chainId);
    const sourcePath = yield* resolveSourcePath(fs, options.file, options.chainId, dateSegment);
    const assetFile = yield* readIndexedAssetFile(fs, sourcePath, {
      chainId: options.chainId,
    });

    yield* displayHeader("🪙 RECOVER TOKENS", "yellow");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "yellow",
    });

    infoTable.push(
      [colors.value("Protocol"), colors.value(options.protocol)],
      [colors.value("Chain"), colors.value(`${chain.name} (${chain.id})`)],
      [
        colors.value("Contracts"),
        colors.dim(
          contracts.map((c) => `${c.contractName} ${c.version} (${c.address})`).join("\n")
        ),
      ],
      [colors.value("Source"), colors.dim(wrapText(yield* getRelative(sourcePath), 68))],
      [colors.value("RPC"), colors.dim(displayRpcUrls.map((url) => wrapText(url, 68)).join("\n"))],
      [colors.value("Assets"), colors.value(assetFile.assets.length.toString())]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const result = yield* withSpinner(
      `Querying onchain balances across ${contracts.length} contract${contracts.length > 1 ? "s" : ""}...`,
      queryRecoverTokenDeltas({
        assetFile,
        chain,
        contracts,
        rpcUrls,
      })
    );

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 12],
      head: ["Metric", "Value"],
      theme: result.nonZeroCount > 0 ? "yellow" : "green",
    });

    summaryTable.push(
      [colors.value("Contracts"), colors.value(contracts.length.toString())],
      [colors.value("Scanned"), colors.value(result.scannedCount.toString())],
      [colors.value("Skipped"), colors.value(result.skippedCount.toString())],
      [colors.value("Non-zero"), colors.value(result.nonZeroCount.toString())]
    );

    yield* Console.log(summaryTable.toString());

    if (result.rows.length === 0) {
      yield* Console.log("");
      yield* Console.log(colors.success("No recoverable token deltas found."));
    } else {
      yield* Console.log("");
      const resultsTable = createTable({
        colWidths: [18, 10, 46, 22],
        head: ["Contract", "Symbol", "Token Address", "Delta"],
        theme: "yellow",
        wordWrap: false,
      });

      for (const row of result.rows) {
        const deltaColor = row.delta > 0n ? colors.warning : colors.error;

        resultsTable.push([
          colors.dim(row.contractLabel),
          row.symbol,
          colors.dim(row.address),
          deltaColor(formatTokenAmount(row.delta, row.decimals)),
        ]);
      }

      yield* Console.log(resultsTable.toString());
    }

    const outputPath = yield* writeOutputFile(fs, {
      chainId: options.chainId,
      chainName: chain.name,
      chainSlug: chain.slug,
      contracts,
      dateSegment,
      epochMs,
      generatedAt,
      protocol: options.protocol,
      result,
    });

    yield* Console.log("");
    yield* Console.log(colors.dim(`Saved → ${yield* getRelative(outputPath)}`));
  });

// ---------------------------------------------------------------------------
// All-chains mode
// ---------------------------------------------------------------------------

type ChainOutcomeBase = { chainSlug: string; chainName: string; chainId: number };
type ChainOutcome =
  | (ChainOutcomeBase & { status: "success"; nonZeroCount: number; scannedCount: number })
  | (ChainOutcomeBase & { status: "skipped"; reason: string })
  | (ChainOutcomeBase & { status: "failed"; error: string });

class ChainSkipped {
  readonly _tag = "ChainSkipped";
  readonly reason: string;
  constructor(reason: string) {
    this.reason = reason;
  }
}

function processOneChain(options: {
  chainId: number;
  dateSegment: string;
  epochMs: number;
  generatedAt: string;
  protocol: RecoverTokensProtocol;
}) {
  const { chainId, dateSegment, epochMs, generatedAt, protocol } = options;

  const chain = sablier.chains.get(chainId);
  if (!chain) {
    return Effect.succeed<ChainOutcome>({
      chainName: String(chainId),
      chainSlug: String(chainId),
      status: "skipped",
      chainId,
      reason: "Unknown chain",
    });
  }

  const base: ChainOutcomeBase = { chainName: chain.name, chainSlug: chain.slug, chainId };

  const execute = Effect.gen(function* () {
    const contracts = yield* Effect.catchAll(resolveSablierContracts(protocol, chainId), () =>
      Effect.fail(new ChainSkipped("No protocol deployments"))
    );
    const { chain: rpcChain, rpcUrls } = yield* Effect.catchAll(resolveCliRpcConfig(chainId), () =>
      Effect.fail(new ChainSkipped("No RPC config"))
    );

    const fs = yield* FileSystem.FileSystem;
    const sourcePath = yield* Effect.catchAll(
      resolveSourcePath(fs, Option.none(), chainId, dateSegment),
      () => Effect.fail(new ChainSkipped("No asset file"))
    );

    const assetFile = yield* readIndexedAssetFile(fs, sourcePath, { chainId });
    const result = yield* queryRecoverTokenDeltas({
      assetFile,
      chain: rpcChain,
      contracts,
      rpcUrls,
    });

    yield* writeOutputFile(fs, {
      chainId,
      chainName: chain.name,
      chainSlug: chain.slug,
      contracts,
      dateSegment,
      epochMs,
      generatedAt,
      protocol,
      result,
    });

    return {
      ...base,
      nonZeroCount: result.nonZeroCount,
      scannedCount: result.scannedCount,
      status: "success" as const,
    };
  });

  return Effect.catchAll(execute, (error): Effect.Effect<ChainOutcome> => {
    if (error instanceof ChainSkipped) {
      return Effect.succeed({ ...base, reason: error.reason, status: "skipped" });
    }
    return Effect.succeed({
      ...base,
      error: "message" in error ? error.message : String(error),
      status: "failed",
    });
  });
}

export const handlerAll = (options: {
  readonly chainId: number;
  readonly file: Option.Option<string>;
  readonly protocol: RecoverTokensProtocol;
}) =>
  Effect.gen(function* () {
    if (Option.isSome(options.file)) {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: "--file cannot be used with --all-chains (asset files are resolved per chain)",
        })
      );
    }

    const now = yield* DateTime.now;
    const generatedAt = DateTime.formatIso(now);
    const dateSegment = getQueryAssetsDateSegment(generatedAt);
    const epochMs = DateTime.toEpochMillis(now);
    const chains = sablier.chains.getMainnets().toSorted((a, b) => a.slug.localeCompare(b.slug));

    yield* displayHeader("RECOVER TOKENS (ALL CHAINS)", "yellow");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "yellow",
    });

    infoTable.push(
      [colors.value("Protocol"), colors.value(options.protocol)],
      [colors.value("Total Chains"), colors.value(chains.length.toString())]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());
    yield* Console.log("");

    const outcomes: ChainOutcome[] = [];

    for (const [index, chain] of chains.entries()) {
      yield* Console.log(
        colors.dim(`[${index + 1}/${chains.length}] ${chain.name} (${chain.id})...`)
      );

      const outcome = yield* processOneChain({
        chainId: chain.id,
        dateSegment,
        epochMs,
        generatedAt,
        protocol: options.protocol,
      });

      outcomes.push(outcome);

      switch (outcome.status) {
        case "skipped":
          yield* Console.log(colors.dim(`  → Skipped: ${outcome.reason}`));
          break;
        case "failed":
          yield* Console.log(colors.error(`  → Failed: ${outcome.error}`));
          break;
        case "success": {
          const doneColor = outcome.nonZeroCount === 0 ? colors.warning : colors.success;
          yield* Console.log(
            doneColor(
              `  → Done: ${outcome.nonZeroCount} non-zero delta${outcome.nonZeroCount === 1 ? "" : "s"} from ${outcome.scannedCount} assets`
            )
          );
          break;
        }
      }

      if (index < chains.length - 1) {
        yield* Console.log("");
      }
    }

    // Aggregate summary
    const successOutcomes = outcomes.filter(
      (o): o is Extract<ChainOutcome, { status: "success" }> => o.status === "success"
    );
    const skippedCount = outcomes.filter((o) => o.status === "skipped").length;
    const failedOutcomes = outcomes.filter(
      (o): o is Extract<ChainOutcome, { status: "failed" }> => o.status === "failed"
    );
    const totalNonZero = successOutcomes.reduce((sum, o) => sum + o.nonZeroCount, 0);

    yield* Console.log("");
    const summaryTable = createTable({
      colWidths: [20, 12],
      head: ["Metric", "Value"],
      theme: failedOutcomes.length > 0 ? "yellow" : "green",
    });

    summaryTable.push(
      [colors.value("Processed"), colors.value(successOutcomes.length.toString())],
      [colors.value("Skipped"), colors.value(skippedCount.toString())],
      [colors.value("Failed"), colors.value(failedOutcomes.length.toString())],
      [colors.value("Non-zero"), colors.value(totalNonZero.toString())]
    );

    yield* Console.log(summaryTable.toString());

    if (failedOutcomes.length > 0) {
      yield* Console.log("");
      const failedTable = createTable({
        colWidths: [30, 60],
        head: ["Chain", "Error"],
        theme: "yellow",
      });

      for (const outcome of failedOutcomes) {
        failedTable.push([
          colors.value(`${outcome.chainName} (${outcome.chainId})`),
          colors.error(outcome.error),
        ]);
      }

      yield* Console.log(failedTable.toString());
    }
  });
