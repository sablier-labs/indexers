// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import type { Dayjs } from "dayjs";
import { Console, Effect } from "effect";
import { sablier } from "sablier";
import { formatUnits } from "viem";
import { graph } from "../../../src/indexers/graph.js";
import { colors, createTable, displayHeader } from "../../display.js";
import { ValidationError } from "../../errors.js";
import { wrapText } from "../../helpers.js";
import { withSpinner } from "../../spinner.js";
import { fetchQuarterActionStats } from "./clients/graph.js";
import { DEFAULT_QUARTER_NAME, getQuarterWindow } from "./utils/quarter.js";

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withAlias("c"),
  Options.withDescription("Chain ID to query")
);

const quarterOption = Options.text("quarter").pipe(
  Options.withAlias("q"),
  Options.withDefault(DEFAULT_QUARTER_NAME),
  Options.withDescription("Quarter to query in YYYY-q1 format")
);

// -------------------------------------------------------------------------- //
//                                  HELPERS                                   //
// -------------------------------------------------------------------------- //

function resolveIndexerUrl(chainId: number): Effect.Effect<string, ValidationError> {
  const indexer = graph.lockup.find((entry) => entry.chainId === chainId);
  if (!indexer) {
    return Effect.fail(
      new ValidationError({ field: "chainId", message: "Chain ID is not supported by Graph" })
    );
  }
  return Effect.succeed(indexer.endpoint.url);
}

function toUnixSeconds(value: Dayjs): string {
  return value.unix().toString();
}

function resolveGraphHeaders(
  indexerUrl: string
): Effect.Effect<Record<string, string>, ValidationError> {
  const graphQueryKey = process.env.GRAPH_QUERY_KEY;
  if (!graphQueryKey) {
    if (indexerUrl.includes("gateway.thegraph.com")) {
      return Effect.fail(
        new ValidationError({
          field: "graphQueryKey",
          message: "GRAPH_QUERY_KEY is required for The Graph gateway endpoints",
        })
      );
    }
    return Effect.succeed({});
  }

  return Effect.succeed({ Authorization: `Bearer ${graphQueryKey}` });
}

// -------------------------------------------------------------------------- //
//                                   COMMAND                                  //
// -------------------------------------------------------------------------- //

const queryActionsLogic = (options: { readonly chainId: number; readonly quarter: string }) =>
  Effect.gen(function* () {
    const chainId = options.chainId;
    const quarterWindow = yield* getQuarterWindow(options.quarter);

    if (chainId <= 0) {
      return yield* Effect.fail(
        new ValidationError({ field: "chainId", message: "Chain ID must be positive" })
      );
    }

    const chain = sablier.chains.get(chainId);
    if (!chain) {
      return yield* Effect.fail(
        new ValidationError({ field: "chainId", message: "Unknown chain ID" })
      );
    }

    const indexerUrl = yield* resolveIndexerUrl(chainId);
    const headers = yield* resolveGraphHeaders(indexerUrl);

    displayHeader("📈 QUARTERLY ACTION FEES", "cyan");

    const valueColumnWidth = 70;
    const infoTable = createTable({
      colWidths: [20, valueColumnWidth],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    const indexerDisplay = wrapText(indexerUrl, valueColumnWidth - 2);

    infoTable.push(
      [colors.value("Chain"), colors.value(`${chain.name} (${chain.id})`)],
      [colors.value("Quarter"), colors.value(quarterWindow.name.toUpperCase())],
      [colors.value("Start (UTC)"), colors.dim(quarterWindow.start.format("YYYY-MM-DD HH:mm"))],
      [colors.value("End (UTC)"), colors.dim(quarterWindow.end.format("YYYY-MM-DD HH:mm"))],
      [colors.value("Indexer"), colors.dim(indexerDisplay)]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const stats = yield* withSpinner(
      "Querying Envio...",
      fetchQuarterActionStats({
        end: toUnixSeconds(quarterWindow.end),
        headers,
        indexerUrl,
        start: toUnixSeconds(quarterWindow.start),
      })
    );

    const formattedFees = formatUnits(stats.totalFees, chain.nativeCurrency.decimals);
    const feeDisplay = `${formattedFees} ${chain.nativeCurrency.symbol}`;

    const summaryTable = createTable({
      colWidths: [25, 25],
      head: ["Metric", "Value"],
      theme: "green",
    });

    summaryTable.push(
      [colors.value("Total Actions"), colors.value(stats.count.toString())],
      [colors.value("Total Fees"), chalk.green(feeDisplay)]
    );

    yield* Console.log("");
    yield* Console.log(summaryTable.toString());
  });

export const queryActionsCommand = Command.make(
  "query-actions",
  { chainId: chainIdOption, quarter: quarterOption },
  queryActionsLogic
);
