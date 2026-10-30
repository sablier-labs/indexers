import { Effect, Schema } from "effect";
import type { makeEnvioCloud } from "../../services/envio-cloud.js";
import type { CloudIndexer } from "../../services/envio-cloud.types.js";
import { EnvioCloudError } from "../../services/envio-cloud.types.js";
import type { DeploymentSelector } from "./discovery.js";
import { selectDeployment } from "./discovery.js";
import type { PreparedDeployment } from "./model.js";
import { CommitsSchema, MetricsSchema, SettingsSchema, sameCommit, syncProgress } from "./model.js";
import type { EnvioTarget } from "./targets.js";
import { getEnvioTarget } from "./targets.js";

export type ReleaseOperations = {
  readonly cloud: ReturnType<typeof makeEnvioCloud>;
  readonly confirm: (message: string) => Effect.Effect<boolean, EnvioCloudError>;
  readonly log: (message: string) => Effect.Effect<void>;
  readonly now: () => Effect.Effect<number>;
  readonly prepare: (
    target: EnvioTarget,
    ref: string
  ) => Effect.Effect<PreparedDeployment, EnvioCloudError>;
  readonly push: (prepared: PreparedDeployment) => Effect.Effect<void, EnvioCloudError>;
  readonly readPrepared: (
    target: EnvioTarget,
    commit: string
  ) => Effect.Effect<PreparedDeployment, EnvioCloudError>;
  readonly sleep: (milliseconds: number) => Effect.Effect<void>;
  readonly smoke: (
    prepared: PreparedDeployment,
    endpoint: string
  ) => Effect.Effect<void, EnvioCloudError>;
};

const failedStatuses = new Set([
  "failed",
  "error",
  "build_failed",
  "deploy_failed",
  "stopped",
  "terminated",
  "deleted",
]);
const waitingStatuses = new Set(["pending", "deploy", "deploying", "building"]);

function failure(operation: string, message: string) {
  return new EnvioCloudError({ message, operation });
}

function getProduction(indexer: CloudIndexer) {
  const production = indexer.deployments.filter((item) => item.prod_status === "prod");
  if (production.length !== 1) {
    throw failure("production check", "Expected exactly one production deployment");
  }
  return production[0];
}

export function makeReleaseWorkflow(ops: ReleaseOperations) {
  function inventory(target: EnvioTarget) {
    return ops.cloud.getIndexer(getEnvioTarget(target).cloudName);
  }

  function production(target: EnvioTarget) {
    return inventory(target).pipe(
      Effect.flatMap((indexer) =>
        Effect.try({
          catch: (error) => failure("production check", String(error)),
          try: () => getProduction(indexer),
        })
      )
    );
  }

  function assertProduction(target: EnvioTarget, expected: string) {
    return production(target).pipe(
      Effect.flatMap((current) =>
        current.commit_hash === expected
          ? Effect.succeed(current)
          : Effect.fail(
              failure(
                "production race check",
                `Production changed from ${expected} to ${current.commit_hash}; aborting. Reinspect before retrying.`
              )
            )
      )
    );
  }

  function selected(target: EnvioTarget, selector: DeploymentSelector) {
    return inventory(target).pipe(Effect.flatMap((indexer) => selectDeployment(indexer, selector)));
  }

  function logs(target: EnvioTarget, commit: string, build: boolean, since: string, limit: number) {
    return ops.cloud.readJson(
      [
        "deployment",
        "logs",
        getEnvioTarget(target).cloudName,
        commit,
        ...(build ? ["--build"] : []),
        "--since",
        since,
        "--limit",
        String(limit),
      ],
      Schema.Array(Schema.Unknown)
    );
  }

  function reportFailureLogs(target: EnvioTarget, commit: string) {
    return Effect.forEach([true, false], (build) =>
      logs(target, commit, build, build ? "24h" : "30m", 30).pipe(
        Effect.flatMap((rows) =>
          ops.log(`${build ? "Build" : "Runtime"} logs for ${commit}: ${JSON.stringify(rows)}`)
        ),
        Effect.catchAll((error) =>
          ops.log(`Unable to retrieve ${build ? "build" : "runtime"} logs: ${error.message}`)
        )
      )
    );
  }

  function waitReady(prepared: PreparedDeployment, timeout: number) {
    const { cloudName } = getEnvioTarget(prepared.target);
    return Effect.gen(function* () {
      const deadline = (yield* ops.now()) + timeout;
      let triggered = false;
      while ((yield* ops.now()) < deadline) {
        const commits = yield* ops.cloud.readJson(["indexer", "commits", cloudName], CommitsSchema);
        const matches = commits.filter(
          (item) =>
            item.branch === `deployment/${prepared.target}` &&
            sameCommit(item.commit_hash, prepared.preparedCommit)
        );
        if (matches.length > 1) {
          return yield* Effect.fail(
            failure("deployment polling", "Prepared commit is ambiguous in the Cloud commit list")
          );
        }
        const [commit] = matches;
        if (
          !commit &&
          commits.some((item) => sameCommit(item.commit_hash, prepared.preparedCommit))
        ) {
          return yield* Effect.fail(
            failure("deployment polling", "Prepared commit belongs to an unexpected branch")
          );
        }
        if (commit) {
          if (failedStatuses.has(commit.status)) {
            return yield* Effect.fail(
              failure(
                "deployment polling",
                `Deployment ${commit.commit_hash} entered ${commit.status}`
              )
            );
          }
          if (commit.status === "inactive" && !triggered) {
            // One manual trigger only; auto-deploy and pending/deploy states are observed first.
            yield* mutate("deploy", prepared.target, commit.commit_hash);
            triggered = true;
          } else if (
            commit.status !== "active" &&
            commit.status !== "inactive" &&
            !waitingStatuses.has(commit.status)
          ) {
            return yield* Effect.fail(
              failure(
                "deployment polling",
                `Unknown commit status '${commit.status}'; refusing to proceed`
              )
            );
          }
        }
        if (!commit || commit.status === "active") {
          // Retained deployments can outlive the CLI's recent-commit history window.
          // A present history status always takes precedence over this inventory fallback.
          const indexer = yield* inventory(prepared.target);
          const candidates = indexer.deployments.filter((item) =>
            sameCommit(item.commit_hash, prepared.preparedCommit)
          );
          if (candidates.length > 1) {
            return yield* Effect.fail(
              failure(
                "deployment polling",
                "Prepared commit is ambiguous in the deployment inventory"
              )
            );
          }
          const [candidate] = candidates;
          if (candidate?.gql_endpoint) {
            const metrics = yield* ops.cloud.readJson(
              ["deployment", "metrics", cloudName, candidate.commit_hash],
              MetricsSchema
            );
            const progress = yield* Effect.try({
              catch: (error) => failure("deployment metrics", String(error)),
              try: () => syncProgress(prepared.config, metrics),
            });
            yield* ops.log(
              `${prepared.target} ${candidate.commit_hash}: ${progress.map((row) => `${row.chainId}=${row.processed ?? "missing"}/${row.goal ?? "unknown"}`).join(" ")}`
            );
            if (progress.every((row) => row.complete)) {
              yield* ops.smoke(prepared, candidate.gql_endpoint);
              return candidate;
            }
          }
        }
        const remaining = deadline - (yield* ops.now());
        if (remaining > 0) {
          yield* ops.sleep(Math.min(10_000, remaining));
        }
      }
      return yield* Effect.fail(
        failure(
          "deployment polling",
          `Timed out waiting for every configured chain of ${prepared.preparedCommit}. Inspect production and candidate status before retrying; readiness checks do not delete deployments.`
        )
      );
    }).pipe(
      Effect.timeoutFail({
        duration: timeout,
        onTimeout: () =>
          failure(
            "deployment polling",
            `Timed out after ${timeout}ms; inspect production and candidate status before retrying`
          ),
      }),
      Effect.tapError(() => reportFailureLogs(prepared.target, prepared.preparedCommit))
    );
  }

  function mutate(action: "deploy" | "promote" | "delete", target: EnvioTarget, commit: string) {
    return ops.cloud
      .runCommand([
        "deployment",
        action,
        getEnvioTarget(target).cloudName,
        commit,
        "--yes",
        "--output",
        "json",
      ])
      .pipe(
        Effect.flatMap((output) => {
          if (output.exitCode !== 0) {
            return Effect.fail(
              failure(
                `deployment ${action}`,
                `Cloud ${action} failed for ${commit} (exit ${output.exitCode}). Reinspect Cloud before retrying.`
              )
            );
          }
          return Schema.decodeUnknown(
            Schema.parseJson(Schema.Struct({ ok: Schema.Literal(true) }))
          )(output.stdout).pipe(
            Effect.mapError(() =>
              failure(
                `deployment ${action}`,
                `Cloud ${action} did not confirm success for ${commit}; reinspect before retrying`
              )
            ),
            Effect.asVoid
          );
        })
      );
  }

  function verifyProduction(
    prepared: PreparedDeployment,
    expectedCloudCommit: string,
    timeout: number,
    previousProduction = expectedCloudCommit
  ) {
    return Effect.gen(function* () {
      // The marker may take a moment to reflect promotion, but any third deployment aborts.
      const deadline = (yield* ops.now()) + timeout;
      while ((yield* ops.now()) < deadline) {
        const current = yield* production(prepared.target);
        if (current.commit_hash === expectedCloudCommit) {
          const stableAlias = getEnvioTarget(prepared.target).productionEndpointUrl;
          if (current.gql_endpoint !== stableAlias) {
            return yield* Effect.fail(
              failure(
                "verify promotion",
                `Production endpoint ${current.gql_endpoint ?? "missing"} does not match the configured stable alias ${stableAlias}; no deployments deleted`
              )
            );
          }
          yield* waitReady(prepared, Math.max(1, deadline - (yield* ops.now())));
          yield* ops.smoke(prepared, stableAlias);
          yield* assertProduction(prepared.target, expectedCloudCommit);
          return;
        }
        if (current.commit_hash !== previousProduction) {
          return yield* Effect.fail(
            failure(
              "verify promotion",
              `Unexpected production ${current.commit_hash}; no deployments deleted`
            )
          );
        }
        const remaining = deadline - (yield* ops.now());
        if (remaining <= 0) {
          return yield* Effect.fail(
            failure("verify promotion", "Production marker did not update; no deployments deleted")
          );
        }
        yield* ops.sleep(Math.min(10_000, remaining));
      }
      return yield* Effect.fail(
        failure("verify promotion", "Production verification timed out; no deployments deleted")
      );
    }).pipe(
      Effect.timeoutFail({
        duration: timeout,
        onTimeout: () =>
          failure("verify promotion", "Promotion verification timed out; no deployments deleted"),
      })
    );
  }

  function deleteReviewed(
    target: EnvioTarget,
    expectedProduction: string,
    commits: readonly string[]
  ) {
    const remaining = [...commits];
    const deleted: string[] = [];
    return Effect.gen(function* () {
      for (const commit of commits) {
        const current = yield* assertProduction(target, expectedProduction);
        if (commit === current.commit_hash || sameCommit(commit, expectedProduction)) {
          return yield* Effect.fail(
            failure("cleanup", "Refusing to delete the protected production deployment")
          );
        }
        const indexer = yield* inventory(target);
        // Recheck on the same inventory used to authorize this exact deletion.
        const latest = yield* Effect.try({
          catch: (error) => failure("cleanup", String(error)),
          try: () => getProduction(indexer),
        });
        if (latest.commit_hash !== expectedProduction) {
          return yield* Effect.fail(
            failure("cleanup", "Production changed before deletion; aborting")
          );
        }
        if (indexer.deployments.some((item) => item.commit_hash === commit)) {
          yield* mutate("delete", target, commit);
          const deadline = (yield* ops.now()) + 60_000;
          let present = true;
          while (present && (yield* ops.now()) < deadline) {
            yield* assertProduction(target, expectedProduction);
            present = (yield* inventory(target)).deployments.some(
              (item) => item.commit_hash === commit
            );
            if (present) {
              yield* ops.sleep(10_000);
            }
          }
          if (present) {
            return yield* Effect.fail(
              failure(
                "cleanup",
                `Deletion of ${commit} was not reflected in inventory within 60 seconds`
              )
            );
          }
        }
        deleted.push(commit);
        remaining.shift();
      }
      return deleted;
    }).pipe(
      Effect.mapError((error) =>
        failure(
          "cleanup",
          `${error.message}. Deleted: ${deleted.join(", ") || "none"}. Remaining reviewed IDs: ${remaining.join(", ")}. Safe retry after inspecting production: just envio::cleanup ${target} --apply ${remaining.map((id) => `--commit ${id}`).join(" ")}`
        )
      )
    );
  }

  function deploy(target: EnvioTarget, ref: string, timeout: number) {
    return Effect.gen(function* () {
      const { cloudName } = getEnvioTarget(target);
      const settings = yield* ops.cloud.readJson(
        ["indexer", "settings", "get", cloudName],
        SettingsSchema
      );
      if (
        settings.branch !== `deployment/${target}` ||
        settings.root_dir !== "" ||
        settings.repository !== "indexers" ||
        settings.config_file !== `envio/${target}/config.yaml`
      ) {
        return yield* Effect.fail(
          failure(
            "deployment preflight",
            "Hosted repository, branch, root directory, or config file differs from the deployment contract; no push performed"
          )
        );
      }
      const indexer = yield* inventory(target);
      const current = yield* Effect.try({
        catch: (error) => failure("deployment preflight", String(error)),
        try: () => getProduction(indexer),
      });
      if (indexer.deployments.length >= 3) {
        return yield* Effect.fail(
          failure(
            "deployment capacity",
            `All three deployment slots are occupied; no push performed. Production ${current.commit_hash} is protected. Review cleanup candidates: ${indexer.deployments
              .filter((item) => item.commit_hash !== current.commit_hash)
              .map((item) => item.commit_hash)
              .join(", ")}. Run just envio::cleanup ${target} first.`
          )
        );
      }
      const prepared = yield* ops.prepare(target, ref);
      yield* ops.log(
        `Prepared ${target}: source=${prepared.sourceCommit} prepared=${prepared.preparedCommit} deployedAt=${prepared.deployedAt}; auto_deploy=${settings.auto_deploy}`
      );
      // Preparation can take time: capacity and production are rechecked immediately before pushing.
      yield* assertProduction(target, current.commit_hash);
      if ((yield* inventory(target)).deployments.length >= 3) {
        return yield* Effect.fail(
          failure(
            "deployment capacity",
            "Deployment slots filled during preparation; no push performed"
          )
        );
      }
      yield* ops.push(prepared);
      yield* waitReady(prepared, timeout);
      return prepared;
    });
  }

  function promote(target: EnvioTarget, selector: DeploymentSelector, timeout: number) {
    return Effect.gen(function* () {
      const snapshot = yield* inventory(target);
      const candidate = yield* selectDeployment(snapshot, selector);
      const current = yield* Effect.try({
        catch: (error) => failure("promotion", String(error)),
        try: () => getProduction(snapshot),
      });
      const prepared = yield* ops.readPrepared(
        target,
        selector.kind === "commit" ? selector.commit : candidate.commit_hash
      );
      yield* waitReady(prepared, timeout);
      const deletions = snapshot.deployments
        .filter((item) => item.commit_hash !== candidate.commit_hash)
        .map((item) => item.commit_hash);
      const accepted = yield* ops.confirm(
        `Promote ${target}: current production ${current.commit_hash} -> candidate ${candidate.commit_hash} (source ${prepared.sourceCommit}, prepared ${prepared.preparedCommit}, deployedAt ${prepared.deployedAt}). After production sync and alias verification, permanently delete these exact deployments: ${deletions.join(", ") || "none"}. No concurrent dashboard/remote deployment operations are permitted. Continue?`
      );
      if (!accepted) {
        return yield* Effect.fail(
          failure("promotion", "Promotion cancelled; no deployments changed")
        );
      }
      yield* assertProduction(target, current.commit_hash);
      // Confirmation can remain open indefinitely; repeat sync/smoke after the answer.
      yield* waitReady(prepared, timeout);
      yield* assertProduction(target, current.commit_hash);
      if (candidate.commit_hash !== current.commit_hash) {
        yield* mutate("promote", target, candidate.commit_hash);
      }
      yield* verifyProduction(prepared, candidate.commit_hash, timeout, current.commit_hash).pipe(
        Effect.mapError((error) =>
          failure(
            "verify promotion",
            `${error.message}. Promotion may already be active for ${candidate.commit_hash}; cleanup was stopped before deleting any deployment.`
          )
        )
      );
      yield* deleteReviewed(target, candidate.commit_hash, deletions);
      return candidate;
    });
  }

  function cleanup(
    target: EnvioTarget,
    apply: boolean,
    commits: readonly string[],
    timeout: number
  ) {
    return Effect.gen(function* () {
      const indexer = yield* inventory(target);
      const current = yield* Effect.try({
        catch: (error) => failure("cleanup", String(error)),
        try: () => getProduction(indexer),
      });
      const candidates = indexer.deployments.filter(
        (item) => item.commit_hash !== current.commit_hash
      );
      if (!apply) {
        yield* ops.log(
          `Production ${current.commit_hash} is protected. Cleanup candidates: ${candidates.map((item) => item.commit_hash).join(", ") || "none"}. Apply only explicitly reviewed IDs with --apply --commit <id> (repeat --commit).`
        );
        return [];
      }
      if (
        commits.length === 0 ||
        new Set(commits).size !== commits.length ||
        commits.some((commit) => !candidates.some((candidate) => candidate.commit_hash === commit))
      ) {
        return yield* Effect.fail(
          failure(
            "cleanup",
            "--apply requires unique, exact nonproduction IDs repeated with --commit; selectors and production IDs are rejected"
          )
        );
      }
      const prepared = yield* ops.readPrepared(target, current.commit_hash);
      yield* verifyProduction(prepared, current.commit_hash, timeout);
      if (
        !(yield* ops.confirm(
          `Keep production ${current.commit_hash}; permanently delete only ${commits.join(", ")} from ${target}? No concurrent dashboard/remote deployment operations are permitted.`
        ))
      ) {
        return yield* Effect.fail(failure("cleanup", "Cleanup cancelled"));
      }
      yield* verifyProduction(prepared, current.commit_hash, timeout);
      return yield* deleteReviewed(target, current.commit_hash, commits);
    });
  }

  return { cleanup, deploy, logs, promote, selected, waitReady };
}
