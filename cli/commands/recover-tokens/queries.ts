import { Effect } from "effect";
import * as _ from "lodash-es";
import { createPublicClient, fallback, http, parseAbi } from "viem";
import { ProcessError } from "../../errors.js";
import type { CliRpcConfig } from "../../rpc.js";
import type { AggregateFunctionName, parseIndexedAssetFile, RecoverContract } from "./helpers.js";
import { computeRecoverTokenRows, mergeRecoverTokenResults } from "./helpers.js";

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
const VIEM_RPC_RETRY_COUNT = 3;
const VIEM_RPC_RETRY_DELAY_MS = 100;

function getAggregateAbi(functionName: AggregateFunctionName) {
  return functionName === "aggregateBalance"
    ? SABLIER_AGGREGATE_BALANCE_ABI
    : SABLIER_AGGREGATE_AMOUNT_ABI;
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

    const batches = _.chunk(assetFile.assets, MULTICALL_BATCH_SIZE);
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

export function queryRecoverTokenDeltas(opts: {
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
