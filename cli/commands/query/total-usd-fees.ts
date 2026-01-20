// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { formatUnits } from "viem";
import { colors, createTable, displayHeader } from "../../display-utils.js";
import { formatTimestamp, getDateRange, toHasuraTimestamp } from "./date-range.js";
import { ENVIO_ANALYTICS_ENDPOINT, fetchTotalUsdFees } from "./envio-client.js";

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const endOption = Options.text("end").pipe(
  Options.withAlias("e"),
  Options.withDescription("End date in YYYY-MM-DD or ISO 8601 format")
);

const startOption = Options.text("start").pipe(
  Options.withAlias("s"),
  Options.withDescription("Start date in YYYY-MM-DD or ISO 8601 format")
);

// -------------------------------------------------------------------------- //
//                                  HELPERS                                   //
// -------------------------------------------------------------------------- //

function formatUsd(value: bigint): string {
  const normalized = formatUnits(value, 2);
  const isNegative = normalized.startsWith("-");
  const amount = isNegative ? normalized.slice(1) : normalized;
  const [integerPart, fractionalPart] = amount.split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const paddedFractional = (fractionalPart ?? "").padEnd(2, "0").slice(0, 2);
  const prefix = isNegative ? "-" : "";
  return `${prefix}$${formattedInteger}.${paddedFractional}`;
}

// -------------------------------------------------------------------------- //
//                                   COMMAND                                  //
// -------------------------------------------------------------------------- //

const queryTotalUsdFeesLogic = (options: { readonly end: string; readonly start: string }) =>
  Effect.gen(function* () {
    const range = yield* getDateRange({ end: options.end, start: options.start });

    displayHeader("💵 TOTAL USD FEES", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Start (UTC)"), colors.dim(formatTimestamp(range.start))],
      [colors.value("End (UTC)"), colors.dim(formatTimestamp(range.end))],
      [colors.value("Indexer"), colors.dim(ENVIO_ANALYTICS_ENDPOINT)]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const result = yield* fetchTotalUsdFees({
      dateEnd: toHasuraTimestamp(range.end),
      dateStart: toHasuraTimestamp(range.start),
    });

    const summaryTable = createTable({
      colWidths: [25, 25],
      head: ["Metric", "Value"],
      theme: "green",
    });

    let totalDisplay = colors.dim("No data");
    if (result.totalUsd !== null) {
      totalDisplay = chalk.green(formatUsd(result.totalUsd));
    }

    summaryTable.push([colors.value("Total USD Fees"), totalDisplay]);

    yield* Console.log("");
    yield* Console.log(summaryTable.toString());
  });

export const queryTotalUsdFeesCommand = Command.make(
  "query-total-usd-fees",
  { end: endOption, start: startOption },
  queryTotalUsdFeesLogic
);
