// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { Command, Options } from "@effect/cli";
import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../display-utils.js";
import { formatTimestamp, getDateRange, toHasuraTimestamp } from "./date-range.js";
import { ENVIO_ANALYTICS_ENDPOINT, fetchUniqueTransactions } from "./envio-client.js";

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

const THOUSANDS_PATTERN = /\B(?=(\d{3})+(?!\d))/g;

function formatCount(value: bigint): string {
  const raw = value.toString();
  const isNegative = raw.startsWith("-");
  const digits = isNegative ? raw.slice(1) : raw;
  const formatted = digits.replace(THOUSANDS_PATTERN, ",");
  return isNegative ? `-${formatted}` : formatted;
}

// -------------------------------------------------------------------------- //
//                                   COMMAND                                  //
// -------------------------------------------------------------------------- //

const queryUniqueTransactionsLogic = (options: { readonly end: string; readonly start: string }) =>
  Effect.gen(function* () {
    const range = yield* getDateRange({ end: options.end, start: options.start });

    displayHeader("🧾 UNIQUE TRANSACTIONS", "cyan");

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

    const result = yield* fetchUniqueTransactions({
      dateEnd: toHasuraTimestamp(range.end),
      dateStart: toHasuraTimestamp(range.start),
    });

    const summaryTable = createTable({
      colWidths: [25, 25],
      head: ["Metric", "Value"],
      theme: "green",
    });

    summaryTable.push([
      colors.value("Unique Transactions"),
      chalk.green(formatCount(result.count)),
    ]);

    yield* Console.log("");
    yield* Console.log(summaryTable.toString());
  });

export const queryUniqueTransactionsCommand = Command.make(
  "query-unique-transactions",
  { end: endOption, start: startOption },
  queryUniqueTransactionsLogic
);
