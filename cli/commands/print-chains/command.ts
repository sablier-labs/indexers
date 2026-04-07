import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../utils/lazy-command.js";

const graphOption = Options.boolean("graph").pipe(
  Options.withAlias("g"),
  Options.withDescription("Use The Graph chain slugs instead of Sablier slugs"),
  Options.withDefault(false)
);

export const printChainsCommand = Command.make("chains", { graph: graphOption }, ({ graph }) =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler(graph)
  )
).pipe(Command.withDescription("Print supported chains"));
