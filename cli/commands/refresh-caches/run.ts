import { dirname, join } from "node:path";
import { FileSystem } from "@effect/platform";
import { Console, Effect, Option } from "effect";
import * as linkify from "linkifyjs";
import type { Address, Hex, PublicClient } from "viem";
import {
  createPublicClient,
  erc20Abi,
  erc20Abi_bytes32,
  fallback,
  hexToString,
  http,
  isAddress,
  isHex,
  parseAbi,
  trim,
  zeroAddress,
} from "viem";
import { getEnvioDeployment } from "../../../src/indexers/envio-deployments.js";
import type { Indexer } from "../../../src/types.js";
import { CliEnv } from "../../services/env.js";
import { colors, createTable, displayHeader } from "../../utils/display.js";
import { toFileOperationError } from "../../utils/errors.js";
import paths, { getRelative, ROOT_DIR } from "../../utils/paths.js";
import type { CliRpcConfig } from "../../utils/rpc.js";
import { resolveCliRpcConfig } from "../../utils/rpc.js";
import { withSpinner } from "../../utils/spinner.js";
import { wrapText } from "../../utils/text.js";
import { fetchAssets, fetchLockupStreamProxenderCandidates } from "../query/clients/envio.js";
import type { EffectCacheRows, ProxenderCandidate, TokenCandidate } from "./helpers.js";
import {
  buildProxenderCacheKey,
  buildProxenderCandidates,
  buildTokenCacheKey,
  buildTokenCandidates,
  chooseTokenOutput,
  compareProxenderCacheKeys,
  compareTokenCacheKeys,
  NOT_AVAILABLE,
  normalizeAddress,
  parseEffectCacheTsv,
  serializeEffectCacheTsv,
  serializeProxenderOutput,
  serializeTokenMetadataOutput,
  UNKNOWN_ALIAS,
} from "./helpers.js";

const DEFAULT_CONCURRENCY = 8;
const SHARD_SIZE = 500;
const DECIMALS_DEFAULT = 0;
const PRB_PROXY_REGISTRY_v4_0_0: Address = "0xd42a2bb59775694c9df4c7822bffab150e6c699d";
const PRB_PROXY_REGISTRY_v4_0_1: Address = "0x584009e9ede26e212182c9745f5c000191296a78";

const PRB_PROXY_ABI = parseAbi(["function owner() view returns (address)"]);
const PRB_PROXY_REGISTRY_ABI = parseAbi([
  "function getProxy(address owner) view returns (address)",
]);

type RefreshCacheType = "proxender" | "tokenMetadata";

type HandlerOptions = {
  readonly cacheTypes?: readonly RefreshCacheType[];
  readonly chainId: Option.Option<number>;
  readonly dryRun: boolean;
  readonly indexer: Indexer.IndexerKey | "all";
};

type ChainClientBundle = {
  client: PublicClient;
};

type TokenLookupResult = {
  attempts: string[];
  failuresConfirmed: boolean;
  noCode: boolean;
  output: string;
  source: string;
};

type TokenRefreshReport = {
  address: string;
  attempts: string[];
  chainId: number;
  live: boolean;
  nextOutput: string;
  previousOutput: string | undefined;
  protectedPrevious: boolean;
  source: string;
  suspiciousReasons: string[];
};

type ProxenderRefreshReport = {
  chainId: number;
  live: boolean;
  lockupAddress: string;
  ownerOrAlias: string;
  previousOutput: string | undefined;
  streamSender: string;
  verification: string;
};

type CacheRefreshAuditReport = {
  failures: string[];
  finishedAt?: string;
  options: {
    cacheTypes: readonly RefreshCacheType[];
    chainId: number | undefined;
    dryRun: boolean;
    indexer: Indexer.IndexerKey | "all";
  };
  proxenders: ProxenderRefreshReport[];
  startedAt: string;
  tokens: TokenRefreshReport[];
};

type TokenShard = {
  candidates: TokenCandidate[];
  chainId: number;
  id: string;
  indexer: Indexer.IndexerKey;
};

type ProxenderShard = {
  candidates: ProxenderCandidate[];
  chainId: number;
  id: string;
};

type StandardMetadataCalls = {
  decimals: number;
  name: string | undefined;
  nameResolved: boolean;
  symbol: string | undefined;
  symbolResolved: boolean;
};

type Bytes32MetadataCalls = {
  decimals: number;
  name: string | undefined;
  nameResolved: boolean;
  symbol: string | undefined;
  symbolResolved: boolean;
};

function removeUrls(str: string): string {
  const matches = linkify.find(str, "url");
  if (!matches || matches.length === 0) {
    return str;
  }

  const sortedMatches = [...matches].sort((left, right) => right.start - left.start);
  let result = str;
  for (const match of sortedMatches) {
    result = result.slice(0, match.start) + result.slice(match.end);
  }

  return result.replace(/\s{2,}/g, " ").trim();
}

function sanitizeString(str: string): string {
  // biome-ignore lint/suspicious/noControlCharactersInRegex: keep parity with Envio cache sanitization.
  return str.replace(/[\u0000-\u001F\u007F-\u009F]/g, "").trim();
}

function sanitizeTokenString(str: string): string {
  return sanitizeString(removeUrls(str));
}

function isSuccessResult<T>(result: PromiseSettledResult<T>): result is PromiseFulfilledResult<T> {
  return result.status === "fulfilled";
}

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function createRefreshClient(config: CliRpcConfig): PublicClient {
  return createPublicClient({
    chain: config.chain,
    transport: fallback(
      config.rpcUrls.map((url) =>
        http(url, {
          batch: true,
        })
      ),
      {
        rank: false,
        retryCount: 2,
      }
    ),
    batch: {
      multicall: true,
    },
  });
}

async function mapConcurrent<T, R>(
  values: readonly T[],
  concurrency: number,
  fn: (value: T, index: number) => Promise<R>
): Promise<R[]> {
  const results: R[] = [];
  let nextIndex = 0;

  async function worker() {
    while (nextIndex < values.length) {
      const index = nextIndex;
      nextIndex++;
      results[index] = await fn(values[index], index);
    }
  }

  await Promise.all(Array.from({ length: Math.min(concurrency, values.length) }, () => worker()));

  return results;
}

function groupByChain<T extends { chainId: number }>(values: readonly T[]): Map<number, T[]> {
  const groups = new Map<number, T[]>();
  for (const value of values) {
    const group = groups.get(value.chainId);
    if (group) {
      group.push(value);
    } else {
      groups.set(value.chainId, [value]);
    }
  }
  return groups;
}

function buildTokenShards(indexer: Indexer.IndexerKey, candidates: readonly TokenCandidate[]) {
  const shards: TokenShard[] = [];
  for (const [chainId, chainCandidates] of groupByChain(candidates)) {
    if (chainCandidates.length <= SHARD_SIZE) {
      shards.push({
        candidates: chainCandidates,
        chainId,
        id: `${indexer}-${chainId}`,
        indexer,
      });
      continue;
    }

    const prefixGroups = new Map<string, TokenCandidate[]>();
    for (const candidate of chainCandidates) {
      const prefix = candidate.address.slice(2, 4);
      const group = prefixGroups.get(prefix);
      if (group) {
        group.push(candidate);
      } else {
        prefixGroups.set(prefix, [candidate]);
      }
    }

    for (const [prefix, prefixCandidates] of [...prefixGroups.entries()].sort()) {
      shards.push({
        candidates: prefixCandidates,
        chainId,
        id: `${indexer}-${chainId}-${prefix}`,
        indexer,
      });
    }
  }

  return shards.sort(
    (left, right) => left.chainId - right.chainId || left.id.localeCompare(right.id)
  );
}

function buildProxenderShards(candidates: readonly ProxenderCandidate[]): ProxenderShard[] {
  return [...groupByChain(candidates)]
    .map(([chainId, chainCandidates]) => ({
      candidates: chainCandidates,
      chainId,
      id: `proxender-${chainId}`,
    }))
    .sort((left, right) => left.chainId - right.chainId);
}

async function readStandardMetadata(
  client: PublicClient,
  address: Address
): Promise<StandardMetadataCalls> {
  const token = { abi: erc20Abi, address };
  const [decimalsResult, nameResult, symbolResult] = await Promise.allSettled([
    client.readContract({ ...token, functionName: "decimals" }),
    client.readContract({ ...token, functionName: "name" }),
    client.readContract({ ...token, functionName: "symbol" }),
  ]);

  return {
    decimals:
      isSuccessResult(decimalsResult) && typeof decimalsResult.value === "number"
        ? decimalsResult.value
        : DECIMALS_DEFAULT,
    name:
      isSuccessResult(nameResult) && typeof nameResult.value === "string"
        ? sanitizeTokenString(nameResult.value)
        : undefined,
    nameResolved: isSuccessResult(nameResult) && typeof nameResult.value === "string",
    symbol:
      isSuccessResult(symbolResult) && typeof symbolResult.value === "string"
        ? sanitizeTokenString(symbolResult.value)
        : undefined,
    symbolResolved: isSuccessResult(symbolResult) && typeof symbolResult.value === "string",
  };
}

function isHexString(value: unknown): value is Hex {
  return typeof value === "string" && isHex(value);
}

function decodeBytes32String(value: Hex): string {
  return sanitizeTokenString(hexToString(trim(value, { dir: "right" })));
}

async function readBytes32Metadata(
  client: PublicClient,
  address: Address
): Promise<Bytes32MetadataCalls> {
  const token = { abi: erc20Abi_bytes32, address };
  const [decimalsResult, nameResult, symbolResult] = await Promise.allSettled([
    client.readContract({ ...token, functionName: "decimals" }),
    client.readContract({ ...token, functionName: "name" }),
    client.readContract({ ...token, functionName: "symbol" }),
  ]);

  return {
    decimals:
      isSuccessResult(decimalsResult) && typeof decimalsResult.value === "number"
        ? decimalsResult.value
        : DECIMALS_DEFAULT,
    name:
      isSuccessResult(nameResult) && isHexString(nameResult.value)
        ? decodeBytes32String(nameResult.value)
        : undefined,
    nameResolved: isSuccessResult(nameResult) && isHexString(nameResult.value),
    symbol:
      isSuccessResult(symbolResult) && isHexString(symbolResult.value)
        ? decodeBytes32String(symbolResult.value)
        : undefined,
    symbolResolved: isSuccessResult(symbolResult) && isHexString(symbolResult.value),
  };
}

async function hasNoCode(
  client: PublicClient,
  address: Address,
  attempts: string[]
): Promise<boolean> {
  try {
    const code = await client.getCode({ address });
    attempts.push(`eth_getCode:${code && code !== "0x" ? "non-empty" : "empty"}`);
    return !code || code === "0x";
  } catch (error) {
    attempts.push(`eth_getCode:error:${getErrorMessage(error)}`);
    return false;
  }
}

export async function lookupTokenMetadata(
  client: PublicClient,
  candidate: TokenCandidate
): Promise<TokenLookupResult> {
  const attempts: string[] = [];
  const address = candidate.address as Address;

  try {
    const standard = await readStandardMetadata(client, address);
    attempts.push("standard-erc20");
    if (standard.nameResolved && standard.symbolResolved) {
      return {
        attempts,
        failuresConfirmed: false,
        noCode: false,
        output: serializeTokenMetadataOutput({
          decimals: standard.decimals,
          name: standard.name ?? "Unknown",
          symbol: standard.symbol ?? "UNKNOWN",
        }),
        source: "standard-erc20",
      };
    }

    const bytes32 = await readBytes32Metadata(client, address);
    attempts.push("bytes32-erc20");
    if (bytes32.nameResolved || bytes32.symbolResolved) {
      return {
        attempts,
        failuresConfirmed: false,
        noCode: false,
        output: serializeTokenMetadataOutput({
          decimals: bytes32.decimals,
          name: bytes32.name ?? "Unknown",
          symbol: bytes32.symbol ?? "UNKNOWN",
        }),
        source: "bytes32-erc20",
      };
    }
  } catch (error) {
    attempts.push(`erc20:error:${getErrorMessage(error)}`);
  }

  const noCode = await hasNoCode(client, address, attempts);
  return {
    attempts,
    failuresConfirmed: false,
    noCode,
    output: UNKNOWN_ALIAS,
    source: noCode ? "no-code" : "unknown-alias",
  };
}

async function refreshTokenCandidate(
  candidate: TokenCandidate,
  bundle: ChainClientBundle | undefined,
  chainError: string | undefined
): Promise<TokenRefreshReport> {
  const lookup = bundle
    ? await lookupTokenMetadata(bundle.client, candidate)
    : {
        attempts: [`chain-unavailable:${chainError ?? "unknown"}`],
        failuresConfirmed: false,
        noCode: false,
        output: UNKNOWN_ALIAS,
        source: "chain-unavailable",
      };
  const decision = chooseTokenOutput(candidate.previousOutput, lookup);

  return {
    address: candidate.address,
    attempts: lookup.attempts,
    chainId: candidate.chainId,
    live: candidate.live,
    nextOutput: decision.output,
    previousOutput: candidate.previousOutput,
    protectedPrevious: decision.protectedPrevious,
    source: decision.protectedPrevious ? "protected-known" : lookup.source,
    suspiciousReasons: candidate.suspiciousReasons,
  };
}

async function fetchReverseProxy(
  client: PublicClient,
  registry: Address,
  owner: Address
): Promise<Address | undefined> {
  const reverse = await client.readContract({
    abi: PRB_PROXY_REGISTRY_ABI,
    address: registry,
    args: [owner],
    functionName: "getProxy",
  });

  if (typeof reverse !== "string") {
    return undefined;
  }

  return normalizeAddress(reverse) as Address;
}

export async function lookupProxender(
  client: PublicClient,
  candidate: ProxenderCandidate
): Promise<{ ownerOrAlias: string; verification: string }> {
  const proxy = candidate.streamSender as Address;

  try {
    const ownerResult = await client.readContract({
      abi: PRB_PROXY_ABI,
      address: proxy,
      functionName: "owner",
    });

    if (typeof ownerResult !== "string") {
      return { ownerOrAlias: NOT_AVAILABLE, verification: "owner-call-invalid" };
    }
    if (!isAddress(ownerResult)) {
      return { ownerOrAlias: NOT_AVAILABLE, verification: "owner-call-invalid" };
    }

    const owner = normalizeAddress(ownerResult) as Address;
    const reverseV401 = await fetchReverseProxy(client, PRB_PROXY_REGISTRY_v4_0_1, owner).catch(
      () => undefined
    );
    if (reverseV401 && reverseV401 !== zeroAddress && reverseV401 === proxy) {
      return { ownerOrAlias: owner, verification: "registry-v4.0.1" };
    }

    const reverseV400 = await fetchReverseProxy(client, PRB_PROXY_REGISTRY_v4_0_0, owner).catch(
      () => undefined
    );
    if (reverseV400 && reverseV400 !== zeroAddress && reverseV400 === proxy) {
      return { ownerOrAlias: owner, verification: "registry-v4.0.0" };
    }

    return {
      ownerOrAlias: NOT_AVAILABLE,
      verification: `reverse-unverified:${reverseV401 ?? "none"}:${reverseV400 ?? "none"}`,
    };
  } catch {
    return { ownerOrAlias: NOT_AVAILABLE, verification: "owner-call-failed" };
  }
}

async function refreshProxenderCandidate(
  candidate: ProxenderCandidate,
  bundle: ChainClientBundle | undefined,
  chainError: string | undefined
): Promise<ProxenderRefreshReport> {
  const lookup = bundle
    ? await lookupProxender(bundle.client, candidate)
    : {
        ownerOrAlias: NOT_AVAILABLE,
        verification: `chain-unavailable:${chainError ?? "unknown"}`,
      };

  return {
    chainId: candidate.chainId,
    live: candidate.live,
    lockupAddress: candidate.lockupAddress,
    ownerOrAlias: serializeProxenderOutput(lookup.ownerOrAlias),
    previousOutput: candidate.previousOutput,
    streamSender: candidate.streamSender,
    verification: lookup.verification,
  };
}

function applyTokenReports(
  existingRows: EffectCacheRows,
  reports: readonly TokenRefreshReport[]
): EffectCacheRows {
  const rows = new Map(existingRows);
  for (const report of reports) {
    rows.set(buildTokenCacheKey(report.chainId, report.address), report.nextOutput);
  }
  return rows;
}

function applyProxenderReports(
  existingRows: EffectCacheRows,
  reports: readonly ProxenderRefreshReport[]
): EffectCacheRows {
  const rows = new Map(existingRows);
  for (const report of reports) {
    rows.set(
      buildProxenderCacheKey(report.chainId, report.lockupAddress, report.streamSender),
      report.ownerOrAlias
    );
  }
  return rows;
}

function getRefreshIndexers(indexer: Indexer.IndexerKey | "all"): Indexer.IndexerKey[] {
  return indexer === "all" ? ["airdrops", "streams"] : [indexer];
}

function getRefreshCacheTypes(options: HandlerOptions): readonly RefreshCacheType[] {
  return options.cacheTypes ?? ["tokenMetadata", "proxender"];
}

function getAuditDirectoryName(startedAt: string): string {
  return startedAt.replaceAll(":", "-").replaceAll(".", "-");
}

function getUniqueChainIds(
  tokenShards: readonly TokenShard[],
  proxenderShards: readonly ProxenderShard[]
): number[] {
  return [...new Set([...tokenShards, ...proxenderShards].map((shard) => shard.chainId))].sort(
    (left, right) => left - right
  );
}

function resolveShardClients(chainIds: readonly number[]) {
  return Effect.gen(function* () {
    const chainClients = new Map<number, ChainClientBundle>();
    const chainErrors = new Map<number, string>();

    for (const chainId of chainIds) {
      const configResult = yield* Effect.either(resolveCliRpcConfig(chainId));
      if (configResult._tag === "Left") {
        chainErrors.set(chainId, configResult.left.message);
        continue;
      }

      const client = createRefreshClient(configResult.right);
      const verifiedChainId = yield* Effect.either(
        Effect.tryPromise({
          catch: (error) => new Error(getErrorMessage(error)),
          try: () => client.getChainId(),
        })
      );
      if (verifiedChainId._tag === "Left") {
        chainErrors.set(chainId, verifiedChainId.left.message);
        continue;
      }
      if (verifiedChainId.right !== chainId) {
        chainErrors.set(
          chainId,
          `RPC chain mismatch: expected ${chainId}, got ${verifiedChainId.right}`
        );
        continue;
      }

      chainClients.set(chainId, { client });
    }

    return { chainClients, chainErrors };
  });
}

export const handler = (options: HandlerOptions) =>
  Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem;
    const env = yield* CliEnv;
    const startedAt = new Date().toISOString();
    const chainIdFilter = Option.getOrUndefined(options.chainId);
    const cacheTypes = getRefreshCacheTypes(options);
    const refreshIndexers = getRefreshIndexers(options.indexer);
    const auditDir = join(ROOT_DIR, ".ai", "cache-refresh", getAuditDirectoryName(startedAt));
    const auditPath = join(auditDir, "report.json");
    const audit: CacheRefreshAuditReport = {
      failures: [],
      proxenders: [],
      options: {
        cacheTypes,
        chainId: chainIdFilter,
        dryRun: options.dryRun,
        indexer: options.indexer,
      },
      startedAt,
      tokens: [],
    };

    yield* displayHeader("REFRESH ENVIO CACHES", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Indexers"), colors.value(refreshIndexers.join(", "))],
      [colors.value("Caches"), colors.value(cacheTypes.join(", "))],
      [
        colors.value("Chain Filter"),
        colors.dim(chainIdFilter === undefined ? "all" : String(chainIdFilter)),
      ],
      [colors.value("Mode"), options.dryRun ? colors.warning("dry-run") : colors.success("write")],
      [colors.value("Audit"), colors.dim(wrapText(yield* getRelative(auditPath), 68))]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    for (const indexer of refreshIndexers) {
      const endpoint = getEnvioDeployment(indexer).endpoint.url;

      if (cacheTypes.includes("tokenMetadata")) {
        const cachePath = paths.envio.cache.tokenMetadata(indexer);
        const cacheExists = yield* fs.exists(cachePath);
        const existingRows = cacheExists
          ? yield* fs
              .readFileString(cachePath)
              .pipe(
                Effect.mapError(toFileOperationError(cachePath, "read")),
                Effect.map(parseEffectCacheTsv)
              )
          : new Map<string, string>();

        const assets = yield* withSpinner(
          `Querying ${indexer} Asset rows...`,
          fetchAssets({ endpoint })
        );
        const tokenCandidates = buildTokenCandidates(existingRows, assets, chainIdFilter);
        const tokenShards = buildTokenShards(indexer, tokenCandidates);
        const { chainClients, chainErrors } = yield* resolveShardClients(
          getUniqueChainIds(tokenShards, [])
        );

        const reports = yield* withSpinner(
          `Refreshing ${indexer} token metadata (${tokenCandidates.length} candidates, ${tokenShards.length} shards)...`,
          Effect.tryPromise(() =>
            mapConcurrent(tokenShards, DEFAULT_CONCURRENCY, (shard) => {
              const bundle = chainClients.get(shard.chainId);
              const chainError = chainErrors.get(shard.chainId);
              return mapConcurrent(shard.candidates, DEFAULT_CONCURRENCY, (candidate) =>
                refreshTokenCandidate(candidate, bundle, chainError)
              );
            }).then((nestedReports) => nestedReports.flat())
          )
        );

        audit.tokens.push(...reports);
        for (const [chainId, message] of chainErrors) {
          audit.failures.push(`tokenMetadata:${indexer}:${chainId}:${message}`);
        }

        if (!options.dryRun) {
          const rows = applyTokenReports(existingRows, reports);
          const cacheDir = dirname(cachePath);
          yield* fs
            .makeDirectory(cacheDir, { recursive: true })
            .pipe(Effect.mapError(toFileOperationError(cacheDir, "write")));
          yield* fs
            .writeFileString(cachePath, serializeEffectCacheTsv(rows, compareTokenCacheKeys))
            .pipe(Effect.mapError(toFileOperationError(cachePath, "write")));
        }
      }

      if (indexer === "streams" && cacheTypes.includes("proxender")) {
        const cachePath = paths.envio.cache.proxender();
        const cacheExists = yield* fs.exists(cachePath);
        const existingRows = cacheExists
          ? yield* fs
              .readFileString(cachePath)
              .pipe(
                Effect.mapError(toFileOperationError(cachePath, "read")),
                Effect.map(parseEffectCacheTsv)
              )
          : new Map<string, string>();

        const streams = yield* withSpinner(
          "Querying streams LockupStream v1.0 rows...",
          fetchLockupStreamProxenderCandidates({ endpoint })
        );
        const proxenderCandidates = buildProxenderCandidates(existingRows, streams, chainIdFilter);
        const proxenderShards = buildProxenderShards(proxenderCandidates);
        const { chainClients, chainErrors } = yield* resolveShardClients(
          getUniqueChainIds([], proxenderShards)
        );

        const reports = yield* withSpinner(
          `Refreshing streams proxenders (${proxenderCandidates.length} candidates, ${proxenderShards.length} shards)...`,
          Effect.tryPromise(() =>
            mapConcurrent(proxenderShards, DEFAULT_CONCURRENCY, (shard) => {
              const bundle = chainClients.get(shard.chainId);
              const chainError = chainErrors.get(shard.chainId);
              return mapConcurrent(shard.candidates, DEFAULT_CONCURRENCY, (candidate) =>
                refreshProxenderCandidate(candidate, bundle, chainError)
              );
            }).then((nestedReports) => nestedReports.flat())
          )
        );

        audit.proxenders.push(...reports);
        for (const [chainId, message] of chainErrors) {
          audit.failures.push(`proxender:streams:${chainId}:${message}`);
        }

        if (!options.dryRun && reports.length > 0) {
          const rows = applyProxenderReports(existingRows, reports);
          const cacheDir = dirname(cachePath);
          yield* fs
            .makeDirectory(cacheDir, { recursive: true })
            .pipe(Effect.mapError(toFileOperationError(cacheDir, "write")));
          yield* fs
            .writeFileString(cachePath, serializeEffectCacheTsv(rows, compareProxenderCacheKeys))
            .pipe(Effect.mapError(toFileOperationError(cachePath, "write")));
        }
      }
    }

    audit.finishedAt = new Date().toISOString();
    yield* fs
      .makeDirectory(auditDir, { recursive: true })
      .pipe(Effect.mapError(toFileOperationError(auditDir, "write")));
    yield* fs
      .writeFileString(auditPath, `${JSON.stringify(audit, null, 2)}\n`)
      .pipe(Effect.mapError(toFileOperationError(auditPath, "write")));

    const summaryTable = createTable({
      colWidths: [26, 14],
      head: ["Metric", "Value"],
      theme: "green",
    });

    summaryTable.push(
      [colors.value("Token Reports"), colors.value(audit.tokens.length.toString())],
      [colors.value("Proxender Reports"), colors.value(audit.proxenders.length.toString())],
      [
        colors.value("Protected Known Tokens"),
        colors.value(audit.tokens.filter((token) => token.protectedPrevious).length.toString()),
      ],
      [colors.value("Failures"), colors.value(audit.failures.length.toString())]
    );

    yield* Console.log("");
    yield* Console.log(summaryTable.toString());
    yield* Console.log("");

    if (options.dryRun) {
      yield* Console.log(colors.warning("Dry run complete; cache TSVs were not modified."));
    } else {
      yield* Console.log(colors.success("Cache TSVs refreshed."));
    }

    yield* Console.log(colors.dim(`Audit report: ${env.relativeToCwd(auditPath)}`));
  });
