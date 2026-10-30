import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import type { ReleaseOperations } from "../../../cli/commands/envio/lifecycle.js";
import { makeReleaseWorkflow, readDeploymentLogs } from "../../../cli/commands/envio/lifecycle.js";
import type { PreparedDeployment } from "../../../cli/commands/envio/model.js";
import {
  MetricsSchema,
  parseDeploymentConfig,
  parseTimeout,
  syncProgress,
} from "../../../cli/commands/envio/model.js";
import { validateSmoke } from "../../../cli/commands/envio/runtime.js";
import { makeEnvioCloud } from "../../../cli/services/envio-cloud.js";
import { EnvioCloudError } from "../../../cli/services/envio-cloud.types.js";

const candidate = "bbbbbbb";
const previous = "ccccccc";
const older = "ddddddd";
const configText = "chains:\n  - id: 1\n    start_block: 10\n  - id: 10\n    start_block: 20\n";
const prepared: PreparedDeployment = {
  config: parseDeploymentConfig(configText),
  configText,
  deployedAt: 1234,
  preparedCommit: candidate.padEnd(40, "b"),
  sourceCommit: "a".repeat(40),
  target: "streams",
};
const completeMetrics = [
  { block_height: 100, chain_id: 1, latest_processed_block: 100, start_block: 10 },
  { block_height: 200, chain_id: 10, latest_processed_block: 200, start_block: 20 },
];

function fixture() {
  const actions: string[] = [];
  const messages: string[] = [];
  const smokes: string[] = [];
  const state: {
    autoDeploy: boolean;
    commits: string[];
    confirm: boolean;
    failDelete: string;
    failSmoke: boolean;
    historyBranch: string;
    historyOmitted: boolean;
    mismatchProductionEndpoint: boolean;
    metrics: typeof completeMetrics;
    onConfirm: () => void;
    onDelete: (commit: string) => void;
    onSmoke: (endpoint: string) => void;
    production: string;
    settingsBranch: string;
    statuses: string[];
  } = {
    autoDeploy: true,
    commits: [candidate, previous, older],
    confirm: true,
    failDelete: "",
    failSmoke: false,
    historyBranch: "deployment/streams",
    historyOmitted: false,
    metrics: completeMetrics,
    mismatchProductionEndpoint: false,
    production: previous,
    settingsBranch: "deployment/streams",
    statuses: ["active"],
    onConfirm: (): void => undefined,
    onDelete: (_commit: string): void => undefined,
    onSmoke: (_endpoint: string): void => undefined,
  };
  let now = 0;
  const cloud = makeEnvioCloud((args) =>
    Effect.sync(() => {
      let data: unknown;
      if (args[0] === "indexer" && args[1] === "get") {
        data = {
          access_type: "public",
          created_time: "2026-10-01T00:00:00Z",
          deployments: state.commits.map((commit, i) => ({
            commit_hash: commit,
            created_time: `2026-10-0${i + 1}T00:00:00Z`,
            gql_endpoint:
              commit === state.production && !state.mismatchProductionEndpoint
                ? "https://indexer.hyperindex.xyz/53b7e25/v1/graphql"
                : `https://example.com/${commit}/graphql`,
            indexer_id: "lockup-envio",
            organisation_id: "sablier-labs",
            prod_status: commit === state.production ? "prod" : "dev",
          })),
          description: "Streams",
          indexer_id: "lockup-envio",
          organisation_id: "sablier-labs",
        };
      } else if (args[0] === "indexer" && args[1] === "settings") {
        data = {
          auto_deploy: state.autoDeploy,
          branch: state.settingsBranch,
          config_file: "envio/streams/config.yaml",
          repository: "indexers",
          root_dir: "",
        };
      } else if (args[0] === "indexer" && args[1] === "commits") {
        const currentStatus =
          state.statuses.length > 1 ? state.statuses.shift() : state.statuses[0];
        data = (state.historyOmitted ? [] : state.commits).map((commit) => ({
          branch: state.historyBranch,
          commit_hash: commit,
          status: currentStatus,
        }));
      } else if (args[1] === "metrics") {
        data = state.metrics;
      } else if (args[1] === "logs") {
        actions.push("logs");
        data = [];
      } else if (["deploy", "promote", "delete"].includes(args[1])) {
        const [, , , commit] = args;
        actions.push(`${args[1]}:${commit}`);
        if (args[1] === "promote") {
          state.production = commit;
        }
        if (args[1] === "delete") {
          if (commit === state.failDelete) {
            return { exitCode: 1, stderr: "fixture failure", stdout: "" };
          }
          state.commits = state.commits.filter((item) => item !== commit);
          state.onDelete(commit);
        }
        data = {};
      } else {
        throw new Error(`Unexpected Cloud command: ${args.join(" ")}`);
      }
      return { exitCode: 0, stderr: "", stdout: JSON.stringify({ data, ok: true }) };
    })
  );
  const operations: ReleaseOperations = {
    cloud,
    confirm: (message) =>
      Effect.sync(() => {
        messages.push(message);
        state.onConfirm();
        return state.confirm;
      }),
    log: (message) =>
      Effect.sync(() => {
        messages.push(message);
      }),
    now: () => Effect.succeed(now),
    prepare: () =>
      Effect.sync(() => {
        actions.push("prepare");
        return prepared;
      }),
    push: (snapshot) =>
      Effect.sync(() => {
        actions.push(`push:${snapshot.preparedCommit}`);
        state.commits.push(candidate);
      }),
    readPrepared: (_target, commit) =>
      Effect.succeed({ ...prepared, preparedCommit: commit.padEnd(40, commit[0]) }),
    sleep: (milliseconds) =>
      Effect.sync(() => {
        now += milliseconds;
      }),
    smoke: (_snapshot, endpoint) =>
      Effect.sync(() => {
        smokes.push(endpoint);
        state.onSmoke(endpoint);
      }).pipe(
        Effect.zipRight(
          Effect.suspend(() =>
            state.failSmoke
              ? Effect.fail(
                  new EnvioCloudError({ message: "fixture smoke failed", operation: "smoke" })
                )
              : Effect.void
          )
        )
      ),
  };
  return {
    actions,
    messages,
    operations,
    smokes,
    state,
    workflow: makeReleaseWorkflow(operations),
  };
}

async function fail(effect: Effect.Effect<unknown, EnvioCloudError>) {
  const result = await Effect.runPromise(Effect.either(effect));
  expect(Either.isLeft(result)).toBe(true);
  if (Either.isRight(result)) {
    throw new Error("Expected failure");
  }
  return result.left.message;
}

describe("Envio release safety", () => {
  it("refuses full capacity and hosted setting drift before preparing or pushing", async () => {
    const f = fixture();
    expect(await fail(f.workflow.deploy("streams", "HEAD", 100))).toContain("All three");
    expect(f.actions).toEqual([]);
    f.state.commits = [previous];
    f.state.settingsBranch = "main";
    expect(await fail(f.workflow.deploy("streams", "HEAD", 100))).toContain("deployment contract");
    expect(f.actions).toEqual([]);
  });

  it("pushes the prepared SHA and observes pending/deploy without triggering a duplicate deployment", async () => {
    const f = fixture();
    f.state.commits = [previous];
    f.state.statuses = ["pending", "deploy", "active"];
    const result = await Effect.runPromise(f.workflow.deploy("streams", "v7.0.0", 60_000));
    expect(result.sourceCommit).not.toBe(result.preparedCommit);
    expect(f.actions).toEqual(["prepare", `push:${prepared.preparedCommit}`]);
    expect(f.state.production).toBe(previous);
  });

  it("observes inactive through active without a manual trigger when auto-deploy is enabled", async () => {
    const f = fixture();
    f.state.commits = [previous];
    f.state.statuses = ["inactive", "pending", "deploy", "active"];
    await Effect.runPromise(f.workflow.deploy("streams", "HEAD", 60_000));
    expect(f.actions).toEqual(["prepare", `push:${prepared.preparedCommit}`]);
  });

  it("triggers an inactive commit exactly once when auto-deploy is disabled", async () => {
    const f = fixture();
    f.state.autoDeploy = false;
    f.state.commits = [previous];
    f.state.statuses = ["inactive", "inactive", "inactive", "active"];
    await Effect.runPromise(f.workflow.deploy("streams", "HEAD", 60_000));
    expect(f.actions).toEqual([
      "prepare",
      `push:${prepared.preparedCommit}`,
      `deploy:${candidate}`,
    ]);
    expect(f.messages.some((message) => message.includes("triggering one manual deployment"))).toBe(
      true
    );
  });

  it("never mutates during default readiness or promotion checks on an inactive commit", async () => {
    const readiness = fixture();
    readiness.state.statuses = ["inactive"];
    expect(await fail(readiness.workflow.waitReady(prepared, 100))).toContain("Timed out");
    expect(readiness.actions).toEqual(["logs", "logs"]);
    const promotion = fixture();
    promotion.state.statuses = ["inactive"];
    expect(
      await fail(promotion.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100))
    ).toContain("Timed out");
    expect(promotion.actions).toEqual(["logs", "logs"]);
    expect(promotion.state.commits).toEqual([candidate, previous, older]);
  });

  it("verifies retained deployments omitted from recent commit history for promotion and cleanup", async () => {
    const promotion = fixture();
    promotion.state.historyOmitted = true;
    await Effect.runPromise(
      promotion.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100)
    );
    expect(promotion.actions).toEqual([
      `promote:${candidate}`,
      `delete:${previous}`,
      `delete:${older}`,
    ]);
    const cleanup = fixture();
    cleanup.state.historyOmitted = true;
    await Effect.runPromise(cleanup.workflow.cleanup("streams", true, [older], 100));
    expect(cleanup.actions).toEqual([`delete:${older}`]);
  });

  it("rejects a matching commit explicitly reported on another branch", async () => {
    const f = fixture();
    f.state.historyBranch = "main";
    expect(await fail(f.workflow.waitReady(prepared, 100))).toContain("unexpected branch");
    expect(f.actions).toEqual(["logs", "logs"]);
  });

  it.each(["failed", "build_failed", "unknown-state"])(
    "fails closed on %s and retrieves bounded logs",
    async (status) => {
      const f = fixture();
      f.state.statuses = [status];
      await fail(f.workflow.waitReady(prepared, 100));
      expect(f.actions).toEqual(["logs", "logs"]);
    }
  );

  it("times out on empty/missing metrics without promotion or deletion", async () => {
    const f = fixture();
    f.state.metrics = [];
    expect(
      await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100))
    ).toContain("Timed out");
    expect(f.actions).toEqual(["logs", "logs"]);
  });

  it("fails smoke before confirmation or production mutation", async () => {
    const f = fixture();
    f.state.failSmoke = true;
    await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100));
    expect(f.actions).toEqual(["logs", "logs"]);
    expect(f.messages.some((message) => message.startsWith("Promote"))).toBe(false);
  });

  it("shows the exact plan, respects cancellation, and detects production changing during confirmation", async () => {
    const f = fixture();
    f.state.confirm = false;
    expect(
      await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100))
    ).toContain("cancelled");
    expect(f.messages.find((message) => message.startsWith("Promote"))).toContain(
      `${previous}, ${older}`
    );
    expect(f.actions).toEqual([]);
    f.state.confirm = true;
    f.state.onConfirm = () => {
      f.state.production = older;
    };
    expect(
      await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100))
    ).toContain("Production changed");
    expect(f.actions).toEqual([]);
  });

  it("rechecks candidate readiness after confirmation", async () => {
    const f = fixture();
    f.state.onConfirm = () => {
      f.state.metrics = [];
    };
    await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100));
    expect(f.actions).toEqual(["logs", "logs"]);
  });

  it("promotes, verifies production and its stable alias, then deletes only reviewed older IDs", async () => {
    const f = fixture();
    await Effect.runPromise(
      f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100)
    );
    expect(f.actions).toEqual([`promote:${candidate}`, `delete:${previous}`, `delete:${older}`]);
    expect(f.smokes).toContain("https://indexer.hyperindex.xyz/53b7e25/v1/graphql");
    expect(f.state.commits).toEqual([candidate]);
  });

  it("never deletes if production changes during stable alias verification", async () => {
    const f = fixture();
    f.state.onSmoke = (endpoint) => {
      if (endpoint.includes("hyperindex")) {
        f.state.production = older;
      }
    };
    await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100));
    expect(f.actions).toEqual([`promote:${candidate}`]);
  });

  it("never deletes when the production record endpoint differs from the configured stable alias", async () => {
    const f = fixture();
    f.state.mismatchProductionEndpoint = true;
    const error = await fail(
      f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100)
    );
    expect(error).toContain("does not match the configured stable alias");
    expect(f.actions).toEqual([`promote:${candidate}`]);
    expect(f.smokes).not.toContain("https://indexer.hyperindex.xyz/53b7e25/v1/graphql");
  });

  it("checks production again before each deletion", async () => {
    const f = fixture();
    f.state.onDelete = () => {
      f.state.production = older;
    };
    await fail(f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100));
    expect(f.actions).toEqual([`promote:${candidate}`, `delete:${previous}`]);
  });

  it("reports remaining exact IDs on partial failure and safely retries only the remaining selection", async () => {
    const f = fixture();
    f.state.failDelete = older;
    const message = await fail(
      f.workflow.promote("streams", { commit: candidate, kind: "commit" }, 100)
    );
    expect(message).toContain(`Remaining reviewed IDs: ${older}`);
    expect(message).toContain(`--apply --commit ${older}`);
    f.state.failDelete = "";
    await Effect.runPromise(f.workflow.cleanup("streams", true, [older], 100));
    expect(f.actions.filter((action) => action === `delete:${previous}`)).toHaveLength(1);
    expect(f.state.commits).toEqual([candidate]);
  });

  it("cleanup defaults to a dry run and requires explicit exact nonproduction IDs", async () => {
    const f = fixture();
    await Effect.runPromise(f.workflow.cleanup("streams", false, [], 100));
    expect(f.actions).toEqual([]);
    const failures = await Promise.all(
      [[], [previous], [candidate, candidate], [candidate.slice(0, 6)]].map((selection) =>
        fail(f.workflow.cleanup("streams", true, selection, 100))
      )
    );
    expect(failures.every((message) => message.includes("exact nonproduction IDs"))).toBe(true);
    expect(f.actions).toEqual([]);
    await Effect.runPromise(f.workflow.cleanup("streams", true, [older], 100));
    expect(f.actions).toEqual([`delete:${older}`]);
    expect(f.state.commits).toEqual([candidate, previous]);
  });
});

describe("Envio completion and smoke evidence", () => {
  it("requires all configured chains and never uses the status API zero end-block sentinel", () => {
    expect(syncProgress(prepared.config, [completeMetrics[0]]).every((row) => row.complete)).toBe(
      false
    );
    expect(syncProgress(prepared.config, []).every((row) => row.complete)).toBe(false);
    const metrics = Schema.decodeUnknownSync(MetricsSchema)(
      completeMetrics.map((metric) => ({ ...metric, end_block: 0, latest_processed_block: 30 }))
    );
    expect(syncProgress(prepared.config, metrics).every((row) => row.complete)).toBe(false);
    const ended = parseDeploymentConfig(
      "chains:\n  - id: 1\n    start_block: 10\n    end_block: 30\n"
    );
    expect(syncProgress(ended, metrics)[0].complete).toBe(true);
    const futureEnd = parseDeploymentConfig(
      "chains:\n  - id: 1\n    start_block: 10\n    end_block: 999\n"
    );
    expect(syncProgress(futureEnd, completeMetrics)[0].complete).toBe(true);
  });

  it("accepts a non-atomic sample where processed exceeds the head but not one below the goal", () => {
    const ahead = completeMetrics.map((metric) => ({
      ...metric,
      latest_processed_block: metric.block_height + 1,
    }));
    expect(syncProgress(prepared.config, ahead).every((row) => row.complete)).toBe(true);
    const behind = completeMetrics.map((metric) => ({
      ...metric,
      latest_processed_block: metric.block_height - 1,
    }));
    expect(syncProgress(prepared.config, behind).some((row) => row.complete)).toBe(false);
  });

  it("builds one bounded native log argv for operator and failure reads", () => {
    const calls: Array<readonly string[]> = [];
    const cloud = makeEnvioCloud((args) => {
      calls.push(args);
      return Effect.succeed({ exitCode: 0, stderr: "", stdout: '{"ok":true,"data":[]}' });
    });
    Effect.runSync(readDeploymentLogs(cloud, "streams", candidate, true, "24h", 30));
    Effect.runSync(readDeploymentLogs(cloud, "airdrops", candidate, false, "30m", 100));
    expect(calls).toEqual([
      [
        "deployment",
        "logs",
        "lockup-envio",
        candidate,
        "--build",
        "--since",
        "24h",
        "--limit",
        "30",
        "--org",
        "sablier-labs",
        "--output",
        "json",
      ],
      [
        "deployment",
        "logs",
        "merkle-envio",
        candidate,
        "--since",
        "30m",
        "--limit",
        "100",
        "--org",
        "sablier-labs",
        "--output",
        "json",
      ],
    ]);
  });

  it("rejects malformed and duplicate config/metrics and invalid timeouts", () => {
    expect(() => parseDeploymentConfig("chains: []")).toThrow();
    expect(() =>
      parseDeploymentConfig("chains: [{id: 1, start_block: 1}, {id: 1, start_block: 1}]")
    ).toThrow();
    expect(() =>
      Schema.decodeUnknownSync(MetricsSchema)([
        { ...completeMetrics[0], latest_processed_block: -1 },
      ])
    ).toThrow();
    expect(() => syncProgress(prepared.config, [completeMetrics[0], completeMetrics[0]])).toThrow();
    expect(parseTimeout("60m")).toBe(3_600_000);
    expect(() => parseTimeout("0m")).toThrow();
    expect(() => parseTimeout("forever")).toThrow();
  });

  it("validates source SHA and timestamp on every chain, including a redeploy of the same source", () => {
    const response = {
      data: {
        IndexerInfo: prepared.config.chains.map((chain) => ({
          chainId: String(chain.id),
          commitHash: prepared.sourceCommit,
          deployedAt: String(prepared.deployedAt),
        })),
      },
    };
    expect(() => validateSmoke(prepared, response)).not.toThrow();
    expect(() => validateSmoke({ ...prepared, deployedAt: 1235 }, response)).toThrow();
    expect(() =>
      validateSmoke({ ...prepared, sourceCommit: prepared.preparedCommit }, response)
    ).toThrow();
    expect(() => validateSmoke(prepared, { data: { IndexerInfo: [] } })).toThrow();
    expect(() =>
      validateSmoke(prepared, { ...response, errors: [{ message: "fixture" }] })
    ).toThrow();
    expect(() =>
      validateSmoke({ ...prepared, target: "analytics" }, { data: { UserTransaction: [] } })
    ).not.toThrow();
    expect(() => validateSmoke({ ...prepared, target: "analytics" }, { data: {} })).toThrow();
  });
});
