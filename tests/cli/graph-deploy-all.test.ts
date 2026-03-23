import { Duration, Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  DEPLOY_RETRY_SCHEDULE,
  isTransientDeployFailure,
} from "../../cli/commands/graph/deploy/all.js";

describe("graph deploy retry helpers", () => {
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
