import { Duration, Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  DEPLOY_RETRY_SCHEDULE,
  isTransientDeployFailure,
} from "../../cli/commands/graph/deploy/all/run.js";
import { extractDeployFailureMessage } from "../../cli/commands/graph/deploy/helpers.js";
import { applyIndexerInfoMetadata } from "../../cli/commands/graph/deploy/indexer-info.js";

describe("graph deployment helpers", () => {
  it("injects deployment metadata into the IndexerInfo source", () => {
    const manifest = {
      dataSources: [
        {
          name: "IndexerInfo",
          context: {
            commitHash: { data: "development" },
            deployedAt: { data: "0" },
            versionLabel: { data: "development" },
          },
        },
      ],
    };

    applyIndexerInfoMetadata(manifest, {
      commitHash: "abc123",
      deployedAt: 1_753_987_200,
      versionLabel: "v3.0--v1.0.0",
    });

    expect(manifest.dataSources[0]?.context).toEqual({
      commitHash: { data: "abc123" },
      deployedAt: { data: "1753987200" },
      versionLabel: { data: "v3.0--v1.0.0" },
    });
  });

  it("detects transient deploy failures from rate limits and network errors", () => {
    expect(isTransientDeployFailure("Error: 429 Too Many Requests", "")).toBe(true);
    expect(isTransientDeployFailure("", "socket hang up while deploying")).toBe(true);
    expect(isTransientDeployFailure("", "network error: ECONNRESET")).toBe(true);
  });

  it("does not mark auth and manifest errors as transient", () => {
    expect(isTransientDeployFailure("", "Unauthorized: invalid deploy key")).toBe(false);
    expect(isTransientDeployFailure("", "Manifest file not found")).toBe(false);
    expect(isTransientDeployFailure("", "invalid command line argument")).toBe(false);
  });

  it("does not mark version label conflicts as transient", () => {
    expect(
      isTransientDeployFailure(
        "",
        "✖ Failed to deploy to Graph node https://api.studio.thegraph.com/deploy/: Version label already exists."
      )
    ).toBe(false);
  });

  it("extracts a user-facing message for version label conflicts", () => {
    expect(
      extractDeployFailureMessage(
        "",
        "✖ Failed to deploy to Graph node https://api.studio.thegraph.com/deploy/: Version label already exists.",
        1
      )
    ).toBe(
      "Version label already exists. Choose a new --version-label or delete the existing version in Graph Studio before retrying."
    );
  });

  it("retries three times with 2s, 4s, and 8s delays", async () => {
    let state = DEPLOY_RETRY_SCHEDULE.initial;

    const first = await Effect.runPromise(DEPLOY_RETRY_SCHEDULE.step(0, "retry", state));
    state = first[0];

    const second = await Effect.runPromise(DEPLOY_RETRY_SCHEDULE.step(0, "retry", state));
    state = second[0];

    const third = await Effect.runPromise(DEPLOY_RETRY_SCHEDULE.step(0, "retry", state));
    state = third[0];

    const exhausted = await Effect.runPromise(DEPLOY_RETRY_SCHEDULE.step(0, "retry", state));

    expect([Duration.format(first[1][0]), first[1][1]]).toEqual(["2s", 0]);
    expect([Duration.format(second[1][0]), second[1][1]]).toEqual(["4s", 1]);
    expect([Duration.format(third[1][0]), third[1][1]]).toEqual(["8s", 2]);
    expect(exhausted[2]._tag).toBe("Done");
  });
});
