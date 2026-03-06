import { Command, Options } from "@effect/cli";
import { FileSystem } from "@effect/platform";
import { Console, DateTime, Effect, Option } from "effect";
import { sablier } from "sablier";
import { createPublicClient, fallback, formatUnits, http, parseAbi } from "viem";
import { colors, createTable, displayHeader } from "../display.js";
import { FileOperationError, ProcessError, ValidationError } from "../errors.js";
import { getRelative, resolveFromCliCwd, wrapText } from "../helpers.js";
import type { CliRpcConfig } from "../rpc.js";
import { resolveCliRpcConfig } from "../rpc.js";
import { withSpinner } from "../spinner.js";
import { getQueryAssetsDateSegment } from "./query/assets.file.js";
import type { RecoverTokensProtocol } from "./recover-tokens.helpers.js";
import {
  computeRecoverTokenRows,
  getRecoverTokensContractName,
  getRecoverTokensDefaultFilePath,
  parseIndexedAssetFile,
} from "./recover-tokens.helpers.js";

const ERC20_ABI = parseAbi(["function balanceOf(address account) view returns (uint256)"]);
const SABLIER_AGGREGATE_ABI = parseAbi([
  "function aggregateAmount(address token) view returns (uint256)",
]);
const MULTICALL_BATCH_SIZE = 100;
const TRAILING_ZEROES_REGEX = /0+$/;
const VIEM_RPC_RETRY_COUNT = 3;
const VIEM_RPC_RETRY_DELAY_MS = 100;

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDefault(1),
  Options.withDescription("Chain ID to query")
);

const fileOption = Options.text("file").pipe(
  Options.withAlias("f"),
  Options.withDescription("Path to a per-chain JSON token list produced by query-assets"),
  Options.optional
);

const indexerOption = Options.choice("indexer", ["flow", "lockup"] as const).pipe(
  Options.withAlias("i"),
  Options.withDescription("Protocol contract to query")
);

function absBigInt(value: bigint): bigint {
  return value < 0n ? -value : value;
}

/**
 * Compacts token amounts for terminal tables without losing sign information.
 *
 * The value is truncated to eight fractional digits after trimming trailing zeroes so
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

  const compactFraction = trimmedFraction.slice(0, 2);
  const suffix = trimmedFraction.length > 2 ? "…" : "";
  return `${sign}${integerPart}.${compactFraction}${suffix}`;
}

const resolveRpcConfig = resolveCliRpcConfig;

function resolveSablierContract(indexer: RecoverTokensProtocol, chainId: number) {
  const contractName = getRecoverTokensContractName(indexer);
  const release = sablier.releases.getLatest({ protocol: indexer });
  const contract = sablier.contracts.get({
    chainId,
    contractName,
    release,
  });

  if (!contract) {
    return Effect.fail(
      new ValidationError({
        field: "indexer",
        message: `No ${contractName} deployment found for chain ${chainId}`,
      })
    );
  }

  return Effect.succeed(contract);
}

function resolveSourcePath(
  file: Option.Option<string>,
  indexer: RecoverTokensProtocol,
  chainId: number,
  dateSegment: string
) {
  if (Option.isSome(file)) {
    return resolveFromCliCwd(file.value);
  }

  return Effect.succeed(getRecoverTokensDefaultFilePath(indexer, chainId, dateSegment));
}

function readIndexedAssetFile(
  fs: FileSystem.FileSystem,
  filePath: string,
  options: { chainId: number; indexer: RecoverTokensProtocol }
) {
  return Effect.gen(function* () {
    const exists = yield* fs.exists(filePath);
    if (!exists) {
      return yield* Effect.fail(
        new FileOperationError({
          message: "Asset file does not exist",
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

    if (assetFile.indexer !== options.indexer) {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file indexer ${assetFile.indexer} does not match --indexer ${options.indexer}`,
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
 * Queries ERC-20 balances and Sablier aggregate amounts in lockstep batches.
 *
 * Running both multicalls over the same chunk preserves positional alignment between results while
 * keeping each request under typical provider limits for large asset lists. Batches stay sequential
 * so we don't stampede the RPC, but each pair of multicalls executes concurrently while viem owns
 * the explicit transport retry policy.
 */
function queryRecoverTokenDeltas(opts: {
  assetFile: ReturnType<typeof parseIndexedAssetFile>;
  chain: CliRpcConfig["chain"];
  contractAddress: `0x${string}`;
  rpcUrls: readonly string[];
}) {
  return Effect.gen(function* () {
    const transports = opts.rpcUrls.map((url) =>
      http(url, {
        retryCount: VIEM_RPC_RETRY_COUNT,
        retryDelay: VIEM_RPC_RETRY_DELAY_MS,
      })
    );
    const primaryTransport = transports[0];

    if (!primaryTransport) {
      return yield* Effect.fail(
        new ProcessError({
          command: "recover-tokens",
          message: "No RPC transports configured",
        })
      );
    }

    const client = createPublicClient({
      chain: opts.chain,
      transport: fallback([primaryTransport, ...transports.slice(1)], { rank: false }),
    });

    const batches = chunkArray(opts.assetFile.assets, MULTICALL_BATCH_SIZE);
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
                  args: [opts.contractAddress],
                  functionName: "balanceOf",
                })),
              }),
          }),
          Effect.tryPromise({
            catch: normalizeError,
            try: () =>
              client.multicall({
                allowFailure: true,
                contracts: batch.map((asset) => ({
                  abi: SABLIER_AGGREGATE_ABI,
                  address: opts.contractAddress,
                  args: [asset.address as `0x${string}`],
                  functionName: "aggregateAmount",
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
          assets: opts.assetFile.assets,
          balanceResults,
        }),
    });
  });
}

const recoverTokensLogic = (options: {
  readonly chainId: number;
  readonly file: Option.Option<string>;
  readonly indexer: RecoverTokensProtocol;
}) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const dateSegment = yield* DateTime.now.pipe(
      Effect.map(DateTime.formatIso),
      Effect.map(getQueryAssetsDateSegment)
    );
    const { chain, displayRpcUrls, rpcUrls } = yield* resolveRpcConfig(options.chainId);
    const contract = yield* resolveSablierContract(options.indexer, options.chainId);
    const sourcePath = yield* resolveSourcePath(
      options.file,
      options.indexer,
      options.chainId,
      dateSegment
    );
    const assetFile = yield* readIndexedAssetFile(fs, sourcePath, {
      chainId: options.chainId,
      indexer: options.indexer,
    });

    yield* displayHeader("🪙 RECOVER TOKENS", "yellow");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "yellow",
    });

    infoTable.push(
      [colors.value("Indexer"), colors.value(options.indexer)],
      [colors.value("Chain"), colors.value(`${chain.name} (${chain.id})`)],
      [colors.value("Contract"), colors.value(getRecoverTokensContractName(options.indexer))],
      [colors.value("Address"), colors.dim(contract.address)],
      [colors.value("Source"), colors.dim(wrapText(yield* getRelative(sourcePath), 68))],
      [colors.value("RPC"), colors.dim(displayRpcUrls.map((url) => wrapText(url, 68)).join("\n"))],
      [colors.value("Assets"), colors.value(assetFile.assets.length.toString())]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const result = yield* withSpinner(
      "Querying onchain balances...",
      queryRecoverTokenDeltas({
        assetFile,
        chain,
        contractAddress: contract.address as `0x${string}`,
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
      [colors.value("Scanned"), colors.value(result.scannedCount.toString())],
      [colors.value("Skipped"), colors.value(result.skippedCount.toString())],
      [colors.value("Non-zero"), colors.value(result.nonZeroCount.toString())]
    );

    yield* Console.log(summaryTable.toString());

    if (result.rows.length === 0) {
      yield* Console.log("");
      yield* Console.log(colors.success("No recoverable token deltas found."));
      return;
    }

    yield* Console.log("");
    const resultsTable = createTable({
      colWidths: [14, 44, 22, 22, 22],
      head: ["Symbol", "Address", "Balance", "Aggregate", "Delta"],
      theme: "yellow",
      wrapOnWordBoundary: false,
    });

    for (const row of result.rows) {
      const deltaColor = row.delta > 0n ? colors.warning : colors.error;

      resultsTable.push([
        row.symbol,
        colors.dim(row.address),
        formatTokenAmount(row.balance, row.decimals),
        formatTokenAmount(row.aggregateAmount, row.decimals),
        deltaColor(formatTokenAmount(row.delta, row.decimals)),
      ]);
    }

    yield* Console.log(resultsTable.toString());
  });

export const recoverTokensCommand = Command.make(
  "recover-tokens",
  { chainId: chainIdOption, file: fileOption, indexer: indexerOption },
  recoverTokensLogic
);
