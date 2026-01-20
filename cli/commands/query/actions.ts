// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Console, Effect } from "effect";
import { sablier } from "sablier";
import { formatUnits } from "viem";
import { graph } from "../../../src/indexers/graph.js";
import { ValidationError } from "../../errors.js";
import { colors, createTable, displayHeader } from "../../shared/display-utils.js";
import { fetchQuarterActionStats } from "./graph-client.js";

// -------------------------------------------------------------------------- //
//                                   SETUP                                    //
// -------------------------------------------------------------------------- //

dayjs.extend(utc);

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

type QuarterNumber = 1 | 2 | 3 | 4;

type QuarterWindow = {
  end: dayjs.Dayjs;
  name: string;
  quarter: QuarterNumber;
  start: dayjs.Dayjs;
  year: number;
};

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const QUARTER_PATTERN = /^([0-9]{4})-q([1-4])$/i;

const DEFAULT_QUARTER_NAME = getMostRecentQuarterName(dayjs.utc());

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

function formatQuarterName(opts: { quarter: QuarterNumber; year: number }): string {
  return `${opts.year}-q${opts.quarter}`;
}

function getMostRecentQuarterName(referenceDate: dayjs.Dayjs): string {
  const currentQuarter = getQuarterFromDate(referenceDate);
  if (currentQuarter === 1) {
    return formatQuarterName({ quarter: 4, year: referenceDate.year() - 1 });
  }
  return formatQuarterName({
    quarter: (currentQuarter - 1) as QuarterNumber,
    year: referenceDate.year(),
  });
}

function getQuarterFromDate(referenceDate: dayjs.Dayjs): QuarterNumber {
  const quarterIndex = Math.floor(referenceDate.month() / 3) + 1;
  return quarterIndex as QuarterNumber;
}

function getQuarterWindow(quarterName: string): Effect.Effect<QuarterWindow, ValidationError> {
  const match = QUARTER_PATTERN.exec(quarterName.trim());
  if (!match) {
    return Effect.fail(
      new ValidationError({
        field: "quarter",
        message: "Quarter must be formatted as YYYY-q1, YYYY-q2, YYYY-q3, or YYYY-q4",
      })
    );
  }

  const year = Number(match[1]);
  const quarter = Number(match[2]) as QuarterNumber;
  const startMonth = (quarter - 1) * 3;
  const start = dayjs.utc().year(year).month(startMonth).startOf("month");
  const end = start.add(3, "month");
  return Effect.succeed({
    end,
    name: formatQuarterName({ quarter, year }),
    quarter,
    start,
    year,
  });
}

function resolveIndexerUrl(chainId: number): Effect.Effect<string, ValidationError> {
  const indexer = graph.lockup.find((entry) => entry.chainId === chainId);
  if (!indexer) {
    return Effect.fail(
      new ValidationError({ field: "chainId", message: "Chain ID is not supported by Graph" })
    );
  }
  return Effect.succeed(indexer.endpoint.url);
}

function toUnixSeconds(value: dayjs.Dayjs): string {
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

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Chain"), colors.value(`${chain.name} (${chain.id})`)],
      [colors.value("Quarter"), colors.value(quarterWindow.name.toUpperCase())],
      [colors.value("Start (UTC)"), colors.dim(quarterWindow.start.format("YYYY-MM-DD HH:mm"))],
      [colors.value("End (UTC)"), colors.dim(quarterWindow.end.format("YYYY-MM-DD HH:mm"))],
      [colors.value("Indexer"), colors.dim(indexerUrl)]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const stats = yield* fetchQuarterActionStats({
      end: toUnixSeconds(quarterWindow.end),
      headers,
      indexerUrl,
      start: toUnixSeconds(quarterWindow.start),
    });

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
