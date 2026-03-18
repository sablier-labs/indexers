import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";
import { DEFAULT_QUARTER_NAME } from "../utils/quarter.js";

const quarterOption = Options.text("quarter").pipe(
  Options.withAlias("q"),
  Options.withDefault(DEFAULT_QUARTER_NAME),
  Options.withDescription("Quarter to query in YYYY-q1 format")
);

export const queryTotalUsdFeesCommand = Command.make(
  "query-total-usd-fees",
  { quarter: quarterOption },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler(args)
    )
);
