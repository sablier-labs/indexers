import { Command } from "@effect/cli";
import { lazyHandler } from "../../utils/lazy-command.js";

export const exportSchemaCommand = Command.make("export-schema", {}, () =>
  lazyHandler(
    () => import("./run.js"),
    (m) => m.handler()
  )
);
