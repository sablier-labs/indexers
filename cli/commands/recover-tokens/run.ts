import { dirname } from "node:path";
import { FileSystem } from "@effect/platform";
import { Console, DateTime, Effect, Option } from "effect";
import * as _ from "lodash-es";
import { sablier } from "sablier";
import { createPublicClient, fallback, formatUnits, http, parseAbi } from "viem";
import { colors, createTable, displayHeader } from "../../display.js";
import {
  FileOperationError,
  ProcessError,
  toFileOperationError,
  ValidationError,
} from "../../errors.js";
import { getRelative, resolveFromCliCwd, wrapText } from "../../helpers.js";
import paths, { getQueryAssetsDirectoryName } from "../../paths.js";
import type { CliRpcConfig } from "../../rpc.js";
import { resolveCliRpcConfig } from "../../rpc.js";
import { withSpinner } from "../../spinner.js";
import { getQueryAssetsDateSegment } from "../query/assets.file.js";
import type { AggregateFunctionName, RecoverContract, RecoverTokensProtocol } from "./helpers.js";
import {
  absBigInt,
  buildRecoverTokenOutputFile,
  computeRecoverTokenRows,
  getAggregateFunctionName,
  getRecoverTokensContractName,
  getRecoverTokensDefaultFilePath,
  isRecoverVersion,
  mergeRecoverTokenResults,
  parseIndexedAssetFile,
} from "./helpers.js";

const ERC20_ABI = parseAbi(["function balanceOf(address account) view returns (uint256)"]);
// Lockup v3.0+, Flow v2.0+
const SABLIER_AGGREGATE_AMOUNT_ABI = parseAbi([
  "function aggregateAmount(address token) view returns (uint256)",
]);
// Flow v1.0–v1.1 (legacy name, same semantics)
const SABLIER_AGGREGATE_BALANCE_ABI = parseAbi([
  "function aggregateBalance(address token) view returns (uint256)",
]);
const MULTICALL_BATCH_SIZE = 100;
const TRAILING_ZEROES_REGEX = /0+$/;
const VIEM_RPC_RETRY_COUNT = 3;
const VIEM_RPC_RETRY_DELAY_MS = 100;

function getAggregateAbi(functionName: AggregateFunctionName) {
  return functionName === "aggregateBalance"
    ? SABLIER_AGGREGATE_BALANCE_ABI
    : SABLIER_AGGREGATE_AMOUNT_ABI;
}

/**
 * Compacts token amounts for terminal tables without losing sign information.
 *
 * The value is truncated to two fractional digits after trimming trailing zeroes so
 * high-decimal assets stay readable in a fixed-width layout.
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

function resolveSablierContracts(protocol: RecoverTokensProtocol, chainId: number) {
  const contractName = getRecoverTokensContractName(protocol);
  const contracts: RecoverContract[] = [];

  for (const release of sablier.releases.getAll({ protocol })) {
    if (!isRecoverVersion(protocol, release.version)) {
      continue;
    }

    const contract = sablier.contracts.get({ chainId, contractName, release });
    if (!contract) {
      continue;
    }

    contracts.push({
      address: contract.address as `0x${string}`,
      aggregateFunctionName: getAggregateFunctionName(protocol, release.version),
      contractName,
      version: release.version,
    });
  }

  if (contracts.length === 0) {
    return Effect.fail(
      new ValidationError({
        field: "protocol",
        message: `No ${contractName} deployments with recover support found for chain ${chainId}`,
      })
    );
  }

  return Effect.succeed(contracts);
}

function resolveSourcePath(
  fs: FileSystem.FileSystem,
  file: Option.Option<string>,
  chainId: number,
  dateSegment: string
) {
  if (Option.isSome(file)) {
    return resolveFromCliCwd(file.value);
  }

  return Effect.gen(function* () {
    const todayPath = getRecoverTokensDefaultFilePath(chainId, dateSegment);
    if (yield* fs.exists(todayPath)) {
      return todayPath;
    }

    // Fall back to the most recent generated asset file
    const generatedDir = dirname(paths.generated.queryAssets.dir(dateSegment));
    if (!(yield* fs.exists(generatedDir))) {
      return yield* failMissingAssetFile(chainId, todayPath);
    }

    const entries = yield* fs.readDirectory(generatedDir);
    const assetDirPrefix = getQueryAssetsDirectoryName("");
    const dateDirs = entries
      .filter((entry) => entry.startsWith(assetDirPrefix))
      .sort()
      .reverse();

    for (const dir of dateDirs) {
      const candidateDate = dir.slice(assetDirPrefix.length);
      const candidatePath = getRecoverTokensDefaultFilePath(chainId, candidateDate);
      if (yield* fs.exists(candidatePath)) {
        return candidatePath;
      }
    }

    return yield* failMissingAssetFile(chainId, todayPath);
  });
}

function failMissingAssetFile(chainId: number, searchedPath: string) {
  return Effect.fail(
    new FileOperationError({
      message: `No asset file found for chain ${chainId}. Run 'just query::assets --indexer streams' to generate it`,
      operation: "read",
      path: searchedPath,
    })
  );
}

function readIndexedAssetFile(
  fs: FileSystem.FileSystem,
  filePath: string,
  options: { chainId: number }
) {
  return Effect.gen(function* () {
    const exists = yield* fs.exists(filePath);
    if (!exists) {
      return yield* Effect.fail(
        new FileOperationError({
          message: `Asset file does not exist: ${filePath}`,
          operation: "read",
          path: filePath,
        })
      );
    }

    const content = yield* fs.readFileString(filePath).pipe(
      Effect.mapError(
        (error) =>
          new FileOperationError({
            message: error instanceof Error ? error.message : String(error),
            operation: "read",
            path: filePath,
          })
      )
    );

    const assetFile = yield* Effect.try({
      catch: (error) =>
        new ValidationError({
          field: "file",
          message: error instanceof Error ? error.message : "Invalid asset file",
        }),
      try: () => parseIndexedAssetFile(content),
    });

    if (assetFile.indexer !== "streams") {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file indexer "${assetFile.indexer}" does not match expected indexer "streams"`,
        })
      );
    }

    if (assetFile.chainId !== options.chainId) {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file chain ID ${assetFile.chainId} does not match --chain-id ${options.chainId}`,
        })
      );
    }

    return assetFile;
  });
}

function chunkArray<T>(values: readonly T[], chunkSize: number): T[][] {
  const chunks: T[][] = [];

  for (let index = 0; index < values.length; index += chunkSize) {
    chunks.push(values.slice(index, index + chunkSize));
  }

  return chunks;
}

function normalizeError(error: unknown): Error {
  return error instanceof Error ? error : new Error(String(error));
}

function toRecoverTokensProcessError(error: Error): ProcessError {
  return new ProcessError({
    command: "recover-tokens",
    message: error.message,
  });
}

/**
 * Queries ERC-20 balances and Sablier aggregate amounts for a single contract in lockstep batches.
 *
 * Running both multicalls over the same chunk preserves positional alignment between results while
 * keeping each request under typical provider limits for large asset lists. Batches stay sequential
 * so we don't stampede the RPC, but each pair of multicalls executes concurrently while viem owns
 * the explicit transport retry policy.
 */
function queryOneContract(
  client: ReturnType<typeof createPublicClient>,
  assetFile: ReturnType<typeof parseIndexedAssetFile>,
  contract: RecoverContract
) {
  return Effect.gen(function* () {
    const aggregateAbi = getAggregateAbi(contract.aggregateFunctionName);
    const contractLabel = `${contract.contractName.replace("Sablier", "")} ${contract.version}`;

    const batches = chunkArray(assetFile.assets, MULTICALL_BATCH_SIZE);
    const batchResults = yield* Effect.forEach(batches, (batch) =>
      Effect.all(
        [
          Effect.tryPromise({
            catch: normalizeError,
            try: () =>
              client.multicall({
                allowFailure: true,
                contracts: batch.map((asset) => ({
                  abi: ERC20_ABI,
                  address: asset.address as `0x${string}`,
                  args: [contract.address],
                  functionName: "balanceOf" as const,
                })),
              }),
          }),
          Effect.tryPromise({
            catch: normalizeError,
            try: () =>
              client.multicall({
                allowFailure: true,
                contracts: batch.map((asset) => ({
                  abi: aggregateAbi,
                  address: contract.address,
                  args: [asset.address as `0x${string}`],
                  functionName: contract.aggregateFunctionName,
                })),
              }),
          }),
        ],
        { concurrency: "unbounded" }
      ).pipe(Effect.mapError(toRecoverTokensProcessError))
    );

    const balanceResults: Array<bigint | null> = [];
    const aggregateAmountResults: Array<bigint | null> = [];

    for (const [balances, aggregateAmounts] of batchResults) {
      for (const balance of balances) {
        balanceResults.push(balance.status === "success" ? balance.result : null);
      }

      for (const aggregateAmount of aggregateAmounts) {
        aggregateAmountResults.push(
          aggregateAmount.status === "success" ? aggregateAmount.result : null
        );
      }
    }

    return yield* Effect.try({
      catch: (error) => toRecoverTokensProcessError(normalizeError(error)),
      try: () =>
        computeRecoverTokenRows({
          aggregateAmountResults,
          assets: assetFile.assets,
          balanceResults,
          contractLabel,
        }),
    });
  });
}

function queryRecoverTokenDeltas(opts: {
  assetFile: ReturnType<typeof parseIndexedAssetFile>;
  chain: CliRpcConfig["chain"];
  contracts: RecoverContract[];
  rpcUrls: readonly string[];
}) {
  return Effect.gen(function* () {
    if (opts.rpcUrls.length === 0) {
      return yield* Effect.fail(
        new ProcessError({
          command: "recover-tokens",
          message: "No RPC transports configured",
        })
      );
    }

    const transports = opts.rpcUrls.map((url) =>
      http(url, {
        retryCount: VIEM_RPC_RETRY_COUNT,
        retryDelay: VIEM_RPC_RETRY_DELAY_MS,
      })
    );

    const client = createPublicClient({
      chain: opts.chain,
      transport: fallback(transports, { rank: false }),
    });

    const perContractResults = yield* Effect.forEach(opts.contracts, (contract) =>
      queryOneContract(client, opts.assetFile, contract)
    );

    return mergeRecoverTokenResults(perContractResults);
  });
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

    const outputFile = buildRecoverTokenOutputFile({
      chainId: options.chainId,
      chainName: chain.name,
      chainSlug: chain.slug,
      contracts,
      generatedAt,
      protocol: options.protocol,
      result,
    });

    const outputDir = paths.generated.recoverTokens.dir(dateSegment);
    const outputPath = paths.generated.recoverTokens.file(
      dateSegment,
      epochMs,
      options.protocol,
      chain.slug
    );

    yield* fs
      .makeDirectory(outputDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(outputDir, "write")));
    yield* fs
      .writeFileString(outputPath, `${JSON.stringify(outputFile, null, 2)}\n`)
      .pipe(Effect.mapError(toFileOperationError(outputPath, "write")));

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

    const outputFile = buildRecoverTokenOutputFile({
      chainId,
      chainName: chain.name,
      chainSlug: chain.slug,
      contracts,
      generatedAt,
      protocol,
      result,
    });

    const outputDir = paths.generated.recoverTokens.dir(dateSegment);
    const outputPath = paths.generated.recoverTokens.file(
      dateSegment,
      epochMs,
      protocol,
      chain.slug
    );

    yield* fs
      .makeDirectory(outputDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(outputDir, "write")));
    yield* fs
      .writeFileString(outputPath, `${JSON.stringify(outputFile, null, 2)}\n`)
      .pipe(Effect.mapError(toFileOperationError(outputPath, "write")));

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
          message: "--file cannot be used with --all (asset files are resolved per chain)",
        })
      );
    }

    const now = yield* DateTime.now;
    const generatedAt = DateTime.formatIso(now);
    const dateSegment = getQueryAssetsDateSegment(generatedAt);
    const epochMs = DateTime.toEpochMillis(now);
    const chains = _.sortBy(sablier.chains.getAll(), (c) => c.slug);

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
        case "success":
          yield* Console.log(
            colors.success(
              `  → Done: ${outcome.nonZeroCount} non-zero delta${outcome.nonZeroCount === 1 ? "" : "s"} from ${outcome.scannedCount} assets`
            )
          );
          break;
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
