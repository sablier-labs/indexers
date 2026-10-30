import path from "node:path";
import { CommandExecutor, FileSystem, Command as PlatformCommand } from "@effect/platform";
import { Clock, Effect, Schema, Stream } from "effect";
import { CLOUD_COMMIT_PATTERN, EnvioCloudError } from "../../services/envio-cloud.types.js";
import { ROOT_DIR } from "../../utils/paths.js";
import type { PreparedDeployment } from "./model.js";
import { parseDeploymentConfig } from "./model.js";
import type { EnvioTarget } from "./targets.js";

const WHITESPACE = /\s+/u;
const DEPLOYED_AT_TRAILER = /^Envio-Deployed-At: (?<timestamp>\d+)$/mu;

function error(operation: string, cause: unknown) {
  return new EnvioCloudError({
    message: cause instanceof Error ? cause.message : String(cause),
    operation,
  });
}

export function git(args: readonly string[], cwd = ROOT_DIR) {
  return Effect.scoped(
    Effect.gen(function* () {
      const executor = yield* CommandExecutor.CommandExecutor;
      const process = yield* executor.start(
        PlatformCommand.make("git", ...args).pipe(PlatformCommand.workingDirectory(cwd))
      );
      const read = <E>(stream: Stream.Stream<Uint8Array, E>) =>
        Stream.runFoldEffect(stream, Buffer.alloc(0), (output, chunk) =>
          output.length + chunk.length <= 4 * 1024 * 1024
            ? Effect.succeed(Buffer.concat([output, chunk]))
            : Effect.fail(error("git", "Git output exceeded 4 MiB"))
        );
      const [stdout, stderr, exitCode] = yield* Effect.all(
        [read(process.stdout), read(process.stderr), process.exitCode],
        { concurrency: "unbounded" }
      );
      if (exitCode !== 0) {
        return yield* Effect.fail(
          error(
            `git ${args[0]}`,
            `Git failed with exit ${exitCode}: ${stderr.toString("utf8").slice(-2000)}`
          )
        );
      }
      return stdout.toString("utf8").trim();
    })
  ).pipe(
    Effect.timeoutFail({
      duration: "60 seconds",
      onTimeout: () => error("git", "Git command timed out"),
    }),
    Effect.mapError((cause) => error(`git ${args[0]}`, cause))
  );
}

/** The worktree owns every preparation edit; the caller's checkout and index remain untouched. */
export function prepareDeployment(target: EnvioTarget, ref: string, root = ROOT_DIR) {
  return Effect.scoped(
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const sourceCommit = yield* git(
        ["rev-parse", "--verify", "--end-of-options", `${ref}^{commit}`],
        root
      );
      const temporary = yield* fs.makeTempDirectoryScoped({ prefix: "envio-deploy-" });
      const worktree = path.join(temporary, "worktree");
      yield* Effect.acquireRelease(
        git(["worktree", "add", "--detach", worktree, sourceCommit], root),
        () => git(["worktree", "remove", "--force", worktree], root).pipe(Effect.orDie)
      );
      const deployedAt = Math.trunc((yield* Clock.currentTimeMillis) / 1000);
      const relativeConfig = `envio/${target}/config.yaml`;
      const configText = yield* fs.readFileString(path.join(worktree, relativeConfig));
      const config = yield* Effect.try({
        catch: (cause) => error("deployment config", cause),
        try: () => parseDeploymentConfig(configText),
      });
      if (target !== "analytics") {
        const cache = `envio/${target}/.envio/cache`;
        const tokenMetadata = yield* fs.readFileString(
          path.join(worktree, cache, "tokenMetadata.tsv")
        );
        if (
          !tokenMetadata.startsWith("id\toutput\n") ||
          tokenMetadata.trim().split("\n").length < 2
        ) {
          return yield* Effect.fail(
            error(
              "prepare deployment",
              "Token metadata cache is missing, empty, or has an invalid header"
            )
          );
        }
        yield* fs.remove(path.join(worktree, ".envio/cache"), { force: true, recursive: true });
        yield* fs.makeDirectory(path.join(worktree, ".envio"), { recursive: true });
        yield* fs.copy(path.join(worktree, cache), path.join(worktree, ".envio/cache"));
        const metadataPath = `envio/${target}/indexer-info.json`;
        const metadataText = yield* fs.readFileString(path.join(worktree, metadataPath));
        const metadata = yield* Schema.decodeUnknown(
          Schema.parseJson(Schema.Record({ key: Schema.String, value: Schema.Unknown }))
        )(metadataText);
        yield* fs.writeFileString(
          path.join(worktree, metadataPath),
          `${JSON.stringify({ ...metadata, commitHash: sourceCommit, deployedAt }, null, 2)}\n`
        );
        yield* git(["add", "--force", "-A", "--", ".envio/cache", metadataPath], worktree);
      }
      yield* git(
        [
          "-c",
          "core.hooksPath=/dev/null",
          "commit",
          "--allow-empty",
          "-m",
          `chore(envio): prepare ${target} deployment\n\nEnvio-Source: ${sourceCommit}\nEnvio-Deployed-At: ${deployedAt}`,
        ],
        worktree
      );
      const preparedCommit = yield* git(["rev-parse", "HEAD"], worktree);
      return {
        config,
        configText,
        deployedAt,
        preparedCommit,
        sourceCommit,
        target,
      } satisfies PreparedDeployment;
    })
  ).pipe(Effect.mapError((cause) => error("prepare deployment", cause)));
}

/** Fetch only a reviewed exact SHA, never a movable branch as the candidate identity. */
export function readPreparedDeployment(target: EnvioTarget, commit: string, root = ROOT_DIR) {
  return Effect.gen(function* () {
    if (!CLOUD_COMMIT_PATTERN.test(commit)) {
      return yield* Effect.fail(error("read prepared deployment", "Invalid prepared commit"));
    }
    const normalizedCommit = commit.toLowerCase();
    const resolve = git(["rev-parse", "--verify", `${normalizedCommit}^{commit}`], root);
    const preparedCommit = yield* resolve.pipe(
      Effect.catchAll(() =>
        Effect.gen(function* () {
          let exact = normalizedCommit;
          if (commit.length !== 40) {
            const remote = yield* git(
              ["ls-remote", "origin", `refs/heads/deployment/${target}`],
              root
            );
            const [remoteCommit] = remote.split(WHITESPACE);
            if (remoteCommit?.length !== 40 || !remoteCommit.startsWith(normalizedCommit)) {
              return yield* Effect.fail(
                error(
                  "read prepared deployment",
                  "Prepared object unavailable locally; pass its full 40-character SHA for an exact fetch"
                )
              );
            }
            exact = remoteCommit;
          }
          yield* git(["fetch", "--no-tags", "origin", exact], root);
          return yield* resolve;
        })
      )
    );
    const parents = (yield* git(["show", "-s", "--format=%P", preparedCommit], root)).split(" ");
    const message = yield* git(["show", "-s", "--format=%B", preparedCommit], root);
    if (
      parents.length !== 1 ||
      !parents[0] ||
      !message.startsWith(`chore(envio): prepare ${target} deployment`)
    ) {
      return yield* Effect.fail(
        error("read prepared deployment", "Commit is not a prepared deployment for this indexer")
      );
    }
    const [sourceCommit] = parents;
    const configText = yield* git(["show", `${preparedCommit}:envio/${target}/config.yaml`], root);
    const config = yield* Effect.try({
      catch: (cause) => error("deployment config", cause),
      try: () => parseDeploymentConfig(configText),
    });
    let deployedAt: number;
    if (target === "analytics") {
      const capturedTimestamp = DEPLOYED_AT_TRAILER.exec(message)?.groups?.timestamp;
      deployedAt = Number(
        capturedTimestamp ?? (yield* git(["show", "-s", "--format=%ct", preparedCommit], root))
      );
    } else {
      const text = yield* git(
        ["show", `${preparedCommit}:envio/${target}/indexer-info.json`],
        root
      );
      const metadata = yield* Schema.decodeUnknown(
        Schema.parseJson(
          Schema.Struct({
            commitHash: Schema.Literal(sourceCommit),
            deployedAt: Schema.Number.pipe(Schema.int(), Schema.positive()),
          })
        )
      )(text);
      ({ deployedAt } = metadata);
    }
    return {
      config,
      configText,
      deployedAt,
      preparedCommit,
      sourceCommit,
      target,
    } satisfies PreparedDeployment;
  }).pipe(Effect.mapError((cause) => error("read prepared deployment", cause)));
}

export function withProjectLock<A, E, R>(
  target: EnvioTarget,
  effect: Effect.Effect<A, E, R>,
  root = ROOT_DIR
) {
  return Effect.scoped(
    Effect.gen(function* () {
      const fs = yield* FileSystem.FileSystem;
      const common = yield* git(["rev-parse", "--git-common-dir"], root);
      const lock = path.resolve(root, common, `envio-release-${target}.lock`);
      yield* Effect.acquireRelease(
        fs
          .makeDirectory(lock)
          .pipe(
            Effect.mapError(() =>
              error(
                "project lock",
                `Another local ${target} mutation is running (${lock}). If stale, verify the previous process exited before removing it.`
              )
            )
          ),
        () => fs.remove(lock, { recursive: true }).pipe(Effect.orDie)
      );
      return yield* effect;
    })
  );
}
