import { Console, Effect, Schema } from "effect";
import { EnvioCloud, EnvioCloudLive } from "../../services/envio-cloud.js";
import { CLOUD_COMMIT_PATTERN, EnvioCloudError } from "../../services/envio-cloud.types.js";
import type { DeploymentSelector } from "./discovery.js";
import { discoverDeployment } from "./discovery.js";
import { makeReleaseWorkflow } from "./lifecycle.js";
import { MetricsSchema, parseTimeout, syncProgress } from "./model.js";
import { readPreparedDeployment, withProjectLock } from "./preparation.js";
import { makeReleaseOperations } from "./runtime.js";
import type { EnvioTarget } from "./targets.js";
import { envioTargets, getEnvioTarget } from "./targets.js";

function validated<A>(operation: string, evaluate: () => A) {
  return Effect.try({
    try: evaluate,
    catch: (error) => new EnvioCloudError({ message: String(error), operation }),
  });
}

export function parseSelector(value: string): DeploymentSelector {
  if (value === "production" || value === "latest-nonproduction") {
    return { kind: value };
  }
  if (!CLOUD_COMMIT_PATTERN.test(value)) {
    throw new Error(
      "Deployment must be production, latest-nonproduction, or a 7 to 40 character prepared commit SHA"
    );
  }
  return { commit: value, kind: "commit" };
}

type Selection = { readonly indexer: EnvioTarget; readonly deployment: string };
type Timed = { readonly timeout: string };

export const list = () =>
  Effect.gen(function* () {
    const cloud = yield* EnvioCloud;
    const projects = yield* cloud.listIndexers();
    const rows = Object.entries(envioTargets).map(([target, mapping]) => {
      const project = projects.find((item) => item.indexer_id === mapping.cloudName);
      return {
        deployments: project?.deployments ?? [],
        indexer: target,
        present: project !== undefined,
        project: mapping.cloudName,
      };
    });
    yield* Console.log(JSON.stringify(rows, null, 2));
  }).pipe(Effect.provide(EnvioCloudLive));

export const endpoint = (args: Selection) =>
  Effect.gen(function* () {
    const selector = yield* validated("selector", () => parseSelector(args.deployment));
    const result = yield* discoverDeployment(args.indexer, selector);
    yield* Console.log(result.deployment.gql_endpoint);
  }).pipe(Effect.provide(EnvioCloudLive));

export const status = (args: Selection) =>
  Effect.gen(function* () {
    const cloud = yield* EnvioCloud;
    const selector = yield* validated("selector", () => parseSelector(args.deployment));
    const selected = yield* discoverDeployment(args.indexer, selector);
    const prepared = yield* readPreparedDeployment(
      args.indexer,
      selector.kind === "commit" ? selector.commit : selected.deployment.commit_hash
    );
    const metrics = yield* cloud.readJson(
      ["deployment", "metrics", selected.cloudName, selected.deployment.commit_hash],
      MetricsSchema
    );
    const chains = yield* validated("deployment metrics", () =>
      syncProgress(prepared.config, metrics)
    );
    yield* Console.log(
      JSON.stringify(
        {
          chains,
          complete: chains.every((chain) => chain.complete),
          deployment: selected.deployment,
          sourceCommit: prepared.sourceCommit,
        },
        null,
        2
      )
    );
  }).pipe(Effect.provide(EnvioCloudLive));

export const logs = (
  args: Selection & { readonly build: boolean; readonly since: string; readonly limit: number }
) =>
  Effect.gen(function* () {
    const selector = yield* validated("selector", () => parseSelector(args.deployment));
    if (args.limit < 1 || args.limit > 100) {
      return yield* Effect.fail(
        new EnvioCloudError({ message: "Log limit must be between 1 and 100", operation: "logs" })
      );
    }
    const since = yield* validated("logs", () => parseTimeout(args.since));
    if (since > (args.build ? 30 : 7) * 86_400_000) {
      return yield* Effect.fail(
        new EnvioCloudError({
          message: "Log lookback exceeds Cloud's bounded window",
          operation: "logs",
        })
      );
    }
    const selected = yield* discoverDeployment(args.indexer, selector);
    const cloud = yield* EnvioCloud;
    const rows = yield* cloud.readJson(
      [
        "deployment",
        "logs",
        getEnvioTarget(args.indexer).cloudName,
        selected.deployment.commit_hash,
        ...(args.build ? ["--build"] : []),
        "--since",
        args.since,
        "--limit",
        String(args.limit),
      ],
      Schema.Array(Schema.Unknown)
    );
    yield* Console.log(JSON.stringify(rows, null, 2));
  }).pipe(Effect.provide(EnvioCloudLive));

export const deploy = (
  args: Timed & { readonly indexer: EnvioTarget | "all"; readonly ref: string }
) =>
  Effect.gen(function* () {
    const timeout = yield* validated("timeout", () => parseTimeout(args.timeout));
    const workflow = makeReleaseWorkflow(yield* makeReleaseOperations);
    const targets: readonly EnvioTarget[] =
      args.indexer === "all" ? ["airdrops", "analytics", "streams"] : [args.indexer];
    for (const target of targets) {
      yield* withProjectLock(target, workflow.deploy(target, args.ref, timeout));
    }
  }).pipe(Effect.provide(EnvioCloudLive));

export const promote = (args: Selection & Timed) =>
  Effect.gen(function* () {
    const timeout = yield* validated("timeout", () => parseTimeout(args.timeout));
    const selector = yield* validated("selector", () => parseSelector(args.deployment));
    const workflow = makeReleaseWorkflow(yield* makeReleaseOperations);
    yield* withProjectLock(args.indexer, workflow.promote(args.indexer, selector, timeout));
  }).pipe(Effect.provide(EnvioCloudLive));

export const release = (args: Timed & { readonly indexer: EnvioTarget; readonly ref: string }) =>
  Effect.gen(function* () {
    const timeout = yield* validated("timeout", () => parseTimeout(args.timeout));
    const workflow = makeReleaseWorkflow(yield* makeReleaseOperations);
    yield* withProjectLock(
      args.indexer,
      Effect.gen(function* () {
        const prepared = yield* workflow.deploy(args.indexer, args.ref, timeout);
        yield* workflow.promote(
          args.indexer,
          { commit: prepared.preparedCommit, kind: "commit" },
          timeout
        );
      })
    );
  }).pipe(Effect.provide(EnvioCloudLive));

export const cleanup = (
  args: Timed & {
    readonly indexer: EnvioTarget;
    readonly apply: boolean;
    readonly commits: readonly string[];
  }
) =>
  Effect.gen(function* () {
    const timeout = yield* validated("timeout", () => parseTimeout(args.timeout));
    const workflow = makeReleaseWorkflow(yield* makeReleaseOperations);
    const operation = workflow.cleanup(args.indexer, args.apply, args.commits, timeout);
    yield* args.apply ? withProjectLock(args.indexer, operation) : operation;
  }).pipe(Effect.provide(EnvioCloudLive));
