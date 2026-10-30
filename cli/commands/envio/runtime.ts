import { CommandExecutor, FileSystem, HttpBody, HttpClient } from "@effect/platform";
import { Clock, Console, Context, Effect, Schema } from "effect";
import { EnvioCloud } from "../../services/envio-cloud.js";
import { EnvioCloudError } from "../../services/envio-cloud.types.js";
import { PromptService } from "../../services/prompt.js";
import type { ReleaseOperations } from "./lifecycle.js";
import type { PreparedDeployment } from "./model.js";
import { git, prepareDeployment, readPreparedDeployment } from "./preparation.js";

const InfoResponseSchema = Schema.Struct({
  data: Schema.Struct({
    IndexerInfo: Schema.Array(
      Schema.Struct({
        chainId: Schema.String,
        commitHash: Schema.String,
        deployedAt: Schema.String,
      })
    ),
  }),
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
});
const AnalyticsResponseSchema = Schema.Struct({
  data: Schema.Struct({ UserTransaction: Schema.Array(Schema.Struct({ id: Schema.String })) }),
  errors: Schema.optional(Schema.Array(Schema.Unknown)),
});

export function validateSmoke(prepared: PreparedDeployment, response: unknown) {
  if (prepared.target === "analytics") {
    const result = Schema.decodeUnknownSync(AnalyticsResponseSchema)(response);
    if (result.errors?.length) {
      throw new Error("Analytics GraphQL response contains errors");
    }
    return;
  }
  const result = Schema.decodeUnknownSync(InfoResponseSchema)(response);
  const rows = result.data.IndexerInfo;
  if (
    result.errors?.length ||
    rows.length !== prepared.config.chains.length ||
    new Set(rows.map((row) => row.chainId)).size !== rows.length ||
    prepared.config.chains.some(
      (chain) =>
        !rows.some(
          (row) =>
            row.chainId === String(chain.id) &&
            row.commitHash === prepared.sourceCommit &&
            row.deployedAt === String(prepared.deployedAt)
        )
    )
  ) {
    throw new Error(
      "IndexerInfo does not match the captured source commit and deployment timestamp on every configured chain"
    );
  }
}

export const makeReleaseOperations = Effect.gen(function* () {
  const cloud = yield* EnvioCloud;
  const prompt = yield* PromptService;
  const http = yield* HttpClient.HttpClient;
  const executor = yield* CommandExecutor.CommandExecutor;
  const fs = yield* FileSystem.FileSystem;
  const processContext = Context.make(CommandExecutor.CommandExecutor, executor).pipe(
    Context.add(FileSystem.FileSystem, fs)
  );
  const operations: ReleaseOperations = {
    cloud,
    confirm: (message) =>
      prompt
        .confirmOrCancel(message)
        .pipe(
          Effect.mapError(
            () =>
              new EnvioCloudError({ message: "Confirmation cancelled", operation: "confirmation" })
          )
        ),
    log: (message) => Console.error(message),
    now: () => Clock.currentTimeMillis,
    prepare: (target, ref) => prepareDeployment(target, ref).pipe(Effect.provide(processContext)),
    push: (prepared) =>
      git([
        "push",
        "--force",
        "origin",
        `${prepared.preparedCommit}:refs/heads/deployment/${prepared.target}`,
      ]).pipe(Effect.provide(processContext), Effect.asVoid),
    readPrepared: (target, commit) =>
      readPreparedDeployment(target, commit).pipe(Effect.provide(processContext)),
    sleep: (milliseconds) => Effect.sleep(milliseconds),
    smoke: (prepared, endpoint) =>
      Effect.gen(function* () {
        const query =
          prepared.target === "analytics"
            ? "{ UserTransaction(limit: 1) { id } }"
            : "{ IndexerInfo { chainId commitHash deployedAt } }";
        const response = yield* http.post(endpoint, {
          accept: "application/json",
          body: HttpBody.unsafeJson({ query }),
        });
        if (response.status < 200 || response.status >= 300) {
          return yield* Effect.fail(new Error(`GraphQL returned HTTP ${response.status}`));
        }
        const json = yield* response.json;
        yield* Effect.try(() => validateSmoke(prepared, json));
      }).pipe(
        Effect.timeoutFail({
          duration: "30 seconds",
          onTimeout: () => new Error("GraphQL smoke timed out"),
        }),
        Effect.mapError(
          (error) =>
            new EnvioCloudError({
              message: `GraphQL smoke failed for ${endpoint}: ${String(error)}`,
              operation: "GraphQL verification",
            })
        )
      ),
  };
  return operations;
});
