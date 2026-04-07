import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../../display.js";
import { withSpinner } from "../../../spinner.js";
import { ENVIO_ANALYTICS_PLAYGROUND_URL, fetchUniqueTxs } from "../clients/envio.js";
import { formatTimestamp, toHasuraTimestamp } from "../utils/date-range.js";
import { getQuarterWindow } from "../utils/quarter.js";

const THOUSANDS_PATTERN = /\B(?=(\d{3})+(?!\d))/g;

function formatCount(value: bigint): string {
  const raw = value.toString();
  const isNegative = raw.startsWith("-");
  const digits = isNegative ? raw.slice(1) : raw;
  const formatted = digits.replace(THOUSANDS_PATTERN, ",");
  return isNegative ? `-${formatted}` : formatted;
}

export const handler = (options: { readonly quarter: string }) =>
  Effect.gen(function* () {
    const quarterWindow = yield* getQuarterWindow(options.quarter);

    yield* displayHeader("🧾 UNIQUE TRANSACTIONS", "cyan");

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
      fetchUniqueTxs({
        dateEnd: toHasuraTimestamp(quarterWindow.end),
        dateStart: toHasuraTimestamp(quarterWindow.start),
      })
    );

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
