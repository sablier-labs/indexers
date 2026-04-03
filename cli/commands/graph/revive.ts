/**
 * @file Ping all The Graph endpoints to wake up dormant subgraphs
 *
 * @example
 * pnpm tsx cli revive-graphs
 * pnpm tsx cli revive-graphs --dry-run
 * pnpm tsx cli revive-graphs --chain 1
 */

import { Command, Options } from "@effect/cli";
import { HttpBody, HttpClient } from "@effect/platform";
import chalk from "chalk";
import { Clock, Console, Effect, Either, Option } from "effect";
import { sablier } from "sablier";
import { Protocol } from "sablier/evm";
import { getProtocolGraphIndexer, graphChains } from "../../../src/indexers/graph.js";
import type { Indexer } from "../../../src/types.js";
import { colors, createTable, displayHeader } from "../../display.js";
import { getOptionalGraphHeaders } from "../../graph-auth.js";
import { CliEnv } from "../../services/env.js";

/* -------------------------------------------------------------------------- */
/*                                   TYPES                                    */
/* -------------------------------------------------------------------------- */

type QueryResult = {
  chainId: number;
  protocol: Indexer.Protocol;
  success: boolean;
  error?: string;
  latencyMs: number;
};

/* -------------------------------------------------------------------------- */
/*                                   OPTIONS                                  */
/* -------------------------------------------------------------------------- */

const dryRunOption = Options.boolean("dry-run").pipe(
  Options.withDescription("Skip actual queries, just show plan"),
  Options.withDefault(false)
);

const chainOption = Options.integer("chain").pipe(
  Options.withAlias("c"),
  Options.withDescription("Filter to a single chain ID"),
  Options.optional
);

/* -------------------------------------------------------------------------- */
/*                                  QUERIES                                   */
/* -------------------------------------------------------------------------- */

const STREAMS_QUERY = /* GraphQL */ `
  query GetLastStream {
    streams(first: 1, orderBy: subgraphId, orderDirection: desc) {
      id
      subgraphId
      timestamp
    }
  }
`;

const CAMPAIGNS_QUERY = /* GraphQL */ `
  query GetLastCampaign {
    campaigns(first: 1, orderBy: subgraphId, orderDirection: desc) {
      id
      subgraphId
      timestamp
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                                   HELPERS                                  */
/* -------------------------------------------------------------------------- */

const TIMEOUT_MS = 10_000;

function getQueryForProtocol(protocol: Indexer.Protocol): string {
  return protocol === Protocol.Airdrops ? CAMPAIGNS_QUERY : STREAMS_QUERY;
}

function pingEndpoint(endpoint: string, protocol: Indexer.Protocol) {
  return Effect.gen(function* () {
    const headers = yield* getOptionalGraphHeaders(endpoint);
    const startedAt = yield* Clock.currentTimeMillis;

    const result = yield* Effect.either(
      HttpClient.post(endpoint, {
        accept: "application/json",
        body: HttpBody.unsafeJson({
          query: getQueryForProtocol(protocol),
          variables: {},
        }),
        headers: {
          "content-type": "application/json",
          ...headers,
        },
      }).pipe(
        Effect.flatMap((response) => {
          if (response.status < 200 || response.status >= 300) {
            return Effect.fail(new Error(`status ${response.status}`));
          }

          return response.text;
        }),
        Effect.timeoutOption(`${TIMEOUT_MS} millis`)
      )
    );

    const finishedAt = yield* Clock.currentTimeMillis;
    const latencyMs = finishedAt - startedAt;

    if (Either.isRight(result)) {
      if (Option.isNone(result.right)) {
        return { error: `timeout after ${TIMEOUT_MS}ms`, latencyMs, success: false };
      }

      return { latencyMs, success: true };
    }

    const error = result.left;
    const errorMsg = error instanceof Error ? error.message : String(error);
    const truncated = errorMsg.length > 80 ? `${errorMsg.slice(0, 77)}...` : errorMsg;

    return { error: truncated, latencyMs, success: false };
  });
}

function formatResult(result: QueryResult): string {
  const protocolName = result.protocol.charAt(0).toUpperCase() + result.protocol.slice(1);
  if (result.success) {
    return `${protocolName}: ${colors.success("OK")} (${result.latencyMs}ms)`;
  }
  return `${protocolName}: ${colors.error("FAIL")} (${result.error})`;
}

/* -------------------------------------------------------------------------- */
/*                                   LOGIC                                    */
/* -------------------------------------------------------------------------- */

const graphReviveLogic = (options: {
  readonly dryRun: boolean;
  readonly chain: Option.Option<number>;
}) =>
  Effect.gen(function* () {
    const env = yield* CliEnv;
    const graphQueryKey = (yield* env.getString("GRAPH_QUERY_KEY"))?.trim();

    yield* displayHeader("🔄 GRAPH REVIVE - ENDPOINT PING-PONG", "cyan");

    // Filter chains if --chain option provided
    let chainIds = graphChains;
    if (Option.isSome(options.chain)) {
      const targetChain = options.chain.value;
      if (!chainIds.includes(targetChain)) {
        yield* Console.log(colors.error(`Chain ${targetChain} not found in Graph indexers`));
        return;
      }
      chainIds = [targetChain];
    }

    yield* Console.log("");
    yield* Console.log(colors.info(`Checking ${chainIds.length} chains × 3 protocols`));
    yield* Console.log(colors.info(`Timeout: ${TIMEOUT_MS / 1000}s per request`));

    if (!graphQueryKey) {
      yield* Console.log(
        colors.warning("⚠️  GRAPH_QUERY_KEY not set - official endpoints may fail")
      );
    }

    if (options.dryRun) {
      yield* Console.log(colors.warning("\n🧪 DRY RUN MODE - No queries will be executed\n"));
      for (let i = 0; i < chainIds.length; i++) {
        const chainId = chainIds[i];
        const chain = sablier.chains.get(chainId);
        const chainName = chain?.name ?? `Chain ${chainId}`;
        yield* Console.log(
          `[${i + 1}/${chainIds.length}] ${chainName}-${chainId}: Would ping airdrops, flow, lockup`
        );
      }
      return;
    }

    yield* Console.log("");

    const allResults: QueryResult[] = [];
    const protocols: Indexer.Protocol[] = [Protocol.Airdrops, Protocol.Flow, Protocol.Lockup];

    // Process chains sequentially
    for (let i = 0; i < chainIds.length; i++) {
      const chainId = chainIds[i];
      const chain = sablier.chains.get(chainId);
      const chainName = chain?.name ?? `Chain ${chainId}`;

      // Query all 3 protocols in parallel for this chain
      const protocolResults = yield* Effect.forEach(
        protocols,
        (protocol) =>
          Effect.gen(function* () {
            const indexer = getProtocolGraphIndexer({ chainId, protocol });
            if (!indexer) {
              return {
                chainId,
                error: "No indexer configured",
                latencyMs: 0,
                protocol,
                success: false,
              } satisfies QueryResult;
            }

            const result = yield* pingEndpoint(indexer.endpoint.url, protocol);
            return {
              chainId,
              protocol,
              ...result,
            } satisfies QueryResult;
          }),
        { concurrency: "unbounded" }
      );

      allResults.push(...protocolResults);

      // Format and display results for this chain
      const resultStrings = protocolResults.map(formatResult).join(", ");
      yield* Console.log(`[${i + 1}/${chainIds.length}] ${chainName}-${chainId}: ${resultStrings}`);
    }

    // Display results table
    yield* Console.log("");
    yield* displayHeader("📋 RESULTS", "cyan");

    const resultsTable = createTable({
      colWidths: [16, 10, 14, 14, 14],
      head: ["Chain", "Id", "Airdrops", "Flow", "Lockup"],
      theme: "cyan",
    });

    // Group results by chainId
    const resultsByChain = new Map<number, Map<Indexer.Protocol, QueryResult>>();
    for (const result of allResults) {
      if (!resultsByChain.has(result.chainId)) {
        resultsByChain.set(result.chainId, new Map());
      }
      resultsByChain.get(result.chainId)?.set(result.protocol, result);
    }

    // Build table rows
    for (const chainId of chainIds) {
      const chain = sablier.chains.get(chainId);
      const chainName = chain?.name ?? `Chain ${chainId}`;
      const chainResults = resultsByChain.get(chainId);

      const formatCell = (protocol: Indexer.Protocol): string => {
        const result = chainResults?.get(protocol);
        if (!result) {
          return colors.dim("N/A");
        }
        if (result.success) {
          return colors.success(`✅ ${result.latencyMs}ms`);
        }
        const errorText = result.error?.includes("timeout") ? "timeout" : "error";
        return colors.error(`❌ ${errorText}`);
      };

      resultsTable.push([
        colors.value(chainName),
        colors.dim(chainId.toString()),
        formatCell(Protocol.Airdrops),
        formatCell(Protocol.Flow),
        formatCell(Protocol.Lockup),
      ]);
    }

    yield* Console.log(resultsTable.toString());

    // Display summary
    yield* Console.log("");
    yield* displayHeader("📊 SUMMARY", "cyan");

    const successCount = allResults.filter((r) => r.success).length;
    const failCount = allResults.filter((r) => !r.success).length;
    const totalCount = allResults.length;

    const summaryTable = createTable({
      colWidths: [25, 15],
      head: ["Metric", "Value"],
      theme: "cyan",
    });

    summaryTable.push(
      [colors.value("Total endpoints checked"), colors.value(totalCount.toString())],
      [colors.value("Successful"), colors.success(successCount.toString())],
      [
        colors.value("Failed"),
        failCount > 0 ? colors.error(failCount.toString()) : colors.value("0"),
      ]
    );

    yield* Console.log(summaryTable.toString());

    // List failed endpoints
    const failures = allResults.filter((r) => !r.success);
    if (failures.length > 0) {
      yield* Console.log("");
      yield* Console.log(chalk.red.bold("❌ Failed Endpoints:"));

      const failedTable = createTable({
        colWidths: [30, 30, 50],
        head: ["Chain", "Protocol", "Error"],
        theme: "red",
        wrapOnWordBoundary: false,
      });

      for (const f of failures) {
        const chain = sablier.chains.get(f.chainId);
        const chainName = chain?.name ?? `Chain ${f.chainId}`;
        failedTable.push([
          colors.value(chainName),
          colors.value(f.protocol),
          colors.dim(f.error ?? "Unknown error"),
        ]);
      }

      yield* Console.log(failedTable.toString());
    }

    // Final status
    yield* Console.log("");
    if (failCount === 0) {
      yield* Console.log(colors.success("✅ All endpoints are healthy"));
    } else {
      yield* Console.log(colors.warning(`⚠️  ${failCount} endpoint(s) failed - see table above`));
    }
  });

/* -------------------------------------------------------------------------- */
/*                                   COMMAND                                  */
/* -------------------------------------------------------------------------- */

export const graphReviveCommand = Command.make(
  "revive-graphs",
  {
    chain: chainOption,
    dryRun: dryRunOption,
  },
  graphReviveLogic
).pipe(Command.withDescription("Ping all Graph endpoints to wake up dormant subgraphs"));
