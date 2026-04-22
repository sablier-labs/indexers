import chalk from "chalk";
import { Console, Effect } from "effect";
import { colors, createTable, displayHeader } from "../../../utils/display.js";
import { withSpinner } from "../../../utils/spinner.js";
import { ENVIO_ANALYTICS_PLAYGROUND_URL, fetchQuarterlyAverageMau } from "../clients/envio.js";
import { formatTimestamp, toHasuraTimestamp } from "../utils/date-range.js";
import { getQuarterWindow } from "../utils/quarter.js";

function formatAverage(value: number): string {
  const floored = Math.floor(value);
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 }).format(floored);
}

export const handler = (options: { readonly quarter: string }) =>
  Effect.gen(function* () {
    const quarterWindow = yield* getQuarterWindow(options.quarter);

    yield* displayHeader("📊 QUARTERLY AVERAGE MAU", "cyan");

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
      fetchQuarterlyAverageMau({
        quarterEnd: toHasuraTimestamp(quarterWindow.end),
        quarterStart: toHasuraTimestamp(quarterWindow.start),
      })
    );

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
