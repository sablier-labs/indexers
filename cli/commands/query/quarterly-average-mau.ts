// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../display-utils.js";
import { formatTimestamp, toHasuraTimestamp } from "./date-range.js";
import { ENVIO_ANALYTICS_ENDPOINT, fetchQuarterlyAverageMau } from "./envio-client.js";
import { DEFAULT_QUARTER_NAME, getQuarterWindow } from "./quarter-utils.js";

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

function formatAverage(value: number): string {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}

// -------------------------------------------------------------------------- //
//                                   COMMAND                                  //
// -------------------------------------------------------------------------- //

const queryQuarterlyAverageMauLogic = (options: { readonly quarter: string }) =>
  Effect.gen(function* () {
    const quarterWindow = yield* getQuarterWindow(options.quarter);

    displayHeader("📊 QUARTERLY AVERAGE MAU", "cyan");

    const infoTable = createTable({
      colWidths: [20, 70],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    infoTable.push(
      [colors.value("Quarter"), colors.value(quarterWindow.name.toUpperCase())],
      [colors.value("Start (UTC)"), colors.dim(formatTimestamp(quarterWindow.start))],
      [colors.value("End (UTC)"), colors.dim(formatTimestamp(quarterWindow.end))],
      [colors.value("Indexer"), colors.dim(ENVIO_ANALYTICS_ENDPOINT)]
    );

    yield* Console.log("");
    yield* Console.log(infoTable.toString());

    const result = yield* fetchQuarterlyAverageMau({
      quarterEnd: toHasuraTimestamp(quarterWindow.end),
      quarterStart: toHasuraTimestamp(quarterWindow.start),
    });

    const summaryTable = createTable({
      colWidths: [25, 25],
      head: ["Metric", "Value"],
      theme: "green",
    });

    let averageDisplay = colors.dim("No data");
    if (result.average !== null) {
      averageDisplay = chalk.green(formatAverage(result.average));
    }

    summaryTable.push([colors.value("Average MAU"), averageDisplay]);

    yield* Console.log("");
    yield* Console.log(summaryTable.toString());
  });

export const queryQuarterlyAverageMauCommand = Command.make(
  "query-quarterly-average-mau",
  { quarter: quarterOption },
  queryQuarterlyAverageMauLogic
);
