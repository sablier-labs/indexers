// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { formatUnits } from "viem";
import { colors, createTable, displayHeader } from "../../display.js";
import { withSpinner } from "../../spinner.js";
import { ENVIO_ANALYTICS_PLAYGROUND_URL, fetchTotalUsdFees } from "./clients/envio-client.js";
import { formatTimestamp, toHasuraTimestamp } from "./utils/date-range.js";
import { DEFAULT_QUARTER_NAME, getQuarterWindow } from "./utils/quarter.js";

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const quarterOption = Options.text("quarter").pipe(
  Options.withAlias("q"),
  Options.withDefault(DEFAULT_QUARTER_NAME),
  Options.withDescription("Quarter to query in YYYY-q1 format")
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

const queryTotalUsdFeesLogic = (options: { readonly quarter: string }) =>
  Effect.gen(function* () {
    const quarterWindow = yield* getQuarterWindow(options.quarter);

    displayHeader("💵 TOTAL USD FEES", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Quarter"), colors.value(quarterWindow.name.toUpperCase())],
      [colors.value("Start (UTC)"), colors.dim(formatTimestamp(quarterWindow.start))],
      [colors.value("End (UTC)"), colors.dim(formatTimestamp(quarterWindow.end))],
      [colors.value("Envio"), colors.dim(ENVIO_ANALYTICS_PLAYGROUND_URL)]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const result = yield* withSpinner(
      "Querying analytics...",
      fetchTotalUsdFees({
        dateEnd: toHasuraTimestamp(quarterWindow.end),
        dateStart: toHasuraTimestamp(quarterWindow.start),
      })
    );

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
  { quarter: quarterOption },
  queryTotalUsdFeesLogic
);
