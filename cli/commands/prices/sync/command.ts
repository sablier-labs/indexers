import { Command } from "@effect/cli";
import { lazyHandler } from "../../../utils/lazy-command.js";

export const pricesSyncCommand = Command.make("prices-sync", {}, () =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler()
  )
);
