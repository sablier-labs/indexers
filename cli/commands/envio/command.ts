import { Command, Options } from "@effect/cli";
import { lazyHandler } from "../../utils/lazy-command.js";

const indexer = Options.choice("indexer", ["airdrops", "analytics", "streams"] as const);
const deployment = Options.text("deployment").pipe(
  Options.withDefault("production"),
  Options.withDescription("production, latest-nonproduction, or a prepared commit SHA")
);
const timeout = Options.text("timeout").pipe(Options.withDefault("60m"));
const ref = Options.text("ref").pipe(Options.withDefault("HEAD"));

const list = Command.make("list", {}, () =>
  lazyHandler(
    () => import("./run.js"),
    (module) => module.list()
  )
).pipe(Command.withDescription("List the three Sablier Cloud projects"));
const endpoint = Command.make("endpoint", { deployment, indexer }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (module) => module.endpoint(args)
  )
);
const status = Command.make("status", { deployment, indexer }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (module) => module.status(args)
  )
);
const logs = Command.make(
  "logs",
  {
    build: Options.boolean("build"),
    deployment,
    indexer,
    limit: Options.integer("limit").pipe(Options.withDefault(100)),
    since: Options.text("since").pipe(Options.withDefault("30m")),
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (module) => module.logs(args)
    )
);
const deploy = Command.make(
  "deploy",
  {
    indexer: Options.choice("indexer", ["airdrops", "analytics", "streams", "all"] as const).pipe(
      Options.withDefault("all")
    ),
    ref,
    timeout,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (module) => module.deploy(args)
    )
);
const promote = Command.make(
  "promote",
  {
    deployment: Options.text("deployment").pipe(Options.withDefault("latest-nonproduction")),
    indexer,
    timeout,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (module) => module.promote(args)
    )
);
const release = Command.make("release", { indexer, ref, timeout }, (args) =>
  lazyHandler(
    () => import("./run.js"),
    (module) => module.release(args)
  )
);
const cleanup = Command.make(
  "cleanup",
  {
    apply: Options.boolean("apply"),
    commits: Options.text("commit").pipe(Options.repeated),
    indexer,
    timeout,
  },
  (args) =>
    lazyHandler(
      () => import("./run.js"),
      (module) => module.cleanup(args)
    )
);

export const envioCommand = Command.make("envio").pipe(
  Command.withDescription("Inspect and release Sablier's Envio Cloud deployments"),
  Command.withSubcommands([list, status, logs, endpoint, deploy, promote, release, cleanup])
);
