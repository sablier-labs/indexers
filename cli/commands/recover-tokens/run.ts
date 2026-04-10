import { dirname } from "node:path";
import { FileSystem } from "@effect/platform";
import { Console, DateTime, Effect, Option } from "effect";
import { sablier } from "sablier";
import { createPublicClient, fallback, formatUnits, http, parseAbi } from "viem";
import { colors, createTable, displayHeader } from "../../display.js";
import { FileOperationError, ProcessError, ValidationError } from "../../errors.js";
import { getRelative, resolveFromCliCwd, wrapText } from "../../helpers.js";
import type { CliRpcConfig } from "../../rpc.js";
import { resolveCliRpcConfig } from "../../rpc.js";
import { withSpinner } from "../../spinner.js";
import { getQueryAssetsDateSegment } from "../query/assets.file.js";
import type { AggregateFunctionName, RecoverContract, RecoverTokensProtocol } from "./helpers.js";
import {
  absBigInt,
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

  const compactFraction = trimmedFraction.slice(0, 2);
  const suffix = trimmedFraction.length > 2 ? "…" : "";
  return `${sign}${integerPart}.${compactFraction}${suffix}`;
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

const ASSETS_DIR_PREFIX = "assets-";

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
    const generatedDir = dirname(dirname(dirname(todayPath)));
    if (!(yield* fs.exists(generatedDir))) {
      return yield* failMissingAssetFile(chainId, todayPath);
    }

    const entries = yield* fs.readDirectory(generatedDir);
    const dateDirs = entries
      .filter((entry) => entry.startsWith(ASSETS_DIR_PREFIX))
      .sort()
      .reverse();

    for (const dir of dateDirs) {
      const candidateDate = dir.slice(ASSETS_DIR_PREFIX.length);
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
  options: { chainId: number; protocol: RecoverTokensProtocol }
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

    const expectedIndexer = "streams";
    if (assetFile.indexer !== expectedIndexer) {
      return yield* Effect.fail(
        new ValidationError({
          field: "file",
          message: `Asset file indexer ${assetFile.indexer} does not match --protocol ${options.protocol}. Expected ${expectedIndexer}`,
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
    const dateSegment = yield* DateTime.now.pipe(
      Effect.map(DateTime.formatIso),
      Effect.map(getQueryAssetsDateSegment)
    );
    const { chain, displayRpcUrls, rpcUrls } = yield* resolveCliRpcConfig(options.chainId);
    const contracts = yield* resolveSablierContracts(options.protocol, options.chainId);
    const sourcePath = yield* resolveSourcePath(fs, options.file, options.chainId, dateSegment);
    const assetFile = yield* readIndexedAssetFile(fs, sourcePath, {
      chainId: options.chainId,
      protocol: options.protocol,
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
      return;
    }

    yield* Console.log("");
    const resultsTable = createTable({
      colWidths: [14, 14, 42, 20, 20, 20],
      head: ["Contract", "Symbol", "Address", "Balance", "Aggregate", "Delta"],
      theme: "yellow",
      wrapOnWordBoundary: false,
    });

    for (const row of result.rows) {
      const deltaColor = row.delta > 0n ? colors.warning : colors.error;

      resultsTable.push([
        colors.dim(row.contractLabel),
        row.symbol,
        colors.dim(row.address),
        formatTokenAmount(row.balance, row.decimals),
        formatTokenAmount(row.aggregateAmount, row.decimals),
        deltaColor(formatTokenAmount(row.delta, row.decimals)),
      ]);
    }

    yield* Console.log(resultsTable.toString());
  });
