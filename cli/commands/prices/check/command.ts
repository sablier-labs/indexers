import { Command } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";

export const pricesCheckCommand = Command.make("prices-check", {}, () =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler()
  )
);
