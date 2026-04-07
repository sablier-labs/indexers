import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../utils/lazy-command.js";

const chainIdOption = Options.integer("chain-id").pipe(
  Options.withDescription("Chain ID to check"),
  Options.withAlias("c")
);

export const checkVendorsCommand = Command.make(
  "check-vendors",
  { chainId: chainIdOption },
  ({ chainId }) =>
    lazyHandler(
      () => import("./run.js"),
      (m) => m.handler({ chainId })
    )
);
