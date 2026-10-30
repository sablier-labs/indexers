import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { discoverDeployment, selectDeployment } from "../../../cli/commands/envio/discovery.js";
import { getEnvioTarget } from "../../../cli/commands/envio/targets.js";
import { EnvioCloud, makeEnvioCloud } from "../../../cli/services/envio-cloud.js";
import type { CloudDeployment, CloudIndexer } from "../../../cli/services/envio-cloud.types.js";
import { CloudIndexerSchema } from "../../../cli/services/envio-cloud.types.js";

function deployment(commit: string, createdTime: string, prodStatus = "prod"): CloudDeployment {
  return {
    commit_hash: commit,
    created_time: createdTime,
    gql_endpoint: `https://indexer.hyperindex.xyz/${commit}/v1/graphql`,
    indexer_id: "lockup-envio",
    organisation_id: "sablier-labs",
    prod_status: prodStatus,
  };
}

function indexer(deployments: readonly CloudDeployment[]): CloudIndexer {
  return {
    access_type: "public",
    created_time: "2024-03-21T11:44:52.453",
    deployments,
    description: "Streams",
    indexer_id: "lockup-envio",
    organisation_id: "sablier-labs",
  };
}

const production = deployment("aaaaaaa", "2026-10-01T12:00:00Z");
// Non-production marker is synthetic: selectors only rely on the verified "prod" marker.
const older = deployment("bbbbbbb", "2026-10-01T10:00:00Z", "preview");
const newer = deployment("ccccccc", "2026-10-01T11:00:00Z", "preview");

describe("Envio deployment discovery", () => {
  it("uses the source production marker regardless of pricing tier", () => {
    const source = indexer([older, production, newer]);
    const result = Effect.runSync(selectDeployment(source, { kind: "production" }));
    expect(result).toBe(production);
  });

  it("selects the newest nonproduction by creation time, regardless of API order", () => {
    const source = indexer([newer, production, older]);
    expect(Effect.runSync(selectDeployment(source, { kind: "latest-nonproduction" }))).toBe(newer);
  });

  it("orders UTC timestamps correctly when the source omits its timezone", () => {
    const timestampWithoutZone = { ...newer, created_time: "2026-10-01T11:30:00.123456" };
    expect(
      Effect.runSync(
        selectDeployment(indexer([older, timestampWithoutZone]), { kind: "latest-nonproduction" })
      )
    ).toBe(timestampWithoutZone);
  });

  it("resolves an explicit full commit against a source short hash", () => {
    expect(
      Effect.runSync(
        selectDeployment(indexer([production, newer]), {
          commit: `ccccccc${"0".repeat(33)}`,
          kind: "commit",
        })
      )
    ).toBe(newer);
  });

  it("preserves microsecond precision when choosing the latest deployment", () => {
    const first = { ...older, created_time: "2026-10-01T11:30:00.123455Z" };
    const last = { ...newer, created_time: "2026-10-01T11:30:00.123456Z" };
    expect(
      Effect.runSync(selectDeployment(indexer([last, first]), { kind: "latest-nonproduction" }))
    ).toBe(last);
  });

  it.each([
    { commit: "ddddddd", kind: "commit" } as const,
    { commit: "bad", kind: "commit" } as const,
    { kind: "latest-nonproduction" } as const,
  ])("fails when no deployment matches %j", (selector) => {
    expect(
      Either.isLeft(
        Effect.runSync(Effect.either(selectDeployment(indexer([production]), selector)))
      )
    ).toBe(true);
  });

  it("rejects ambiguous production or commit matches", () => {
    const duplicate = { ...production, commit_hash: "aaaaaaa1" };
    for (const selector of [
      { kind: "production" } as const,
      { commit: "aaaaaaa", kind: "commit" } as const,
    ]) {
      expect(
        Either.isLeft(
          Effect.runSync(
            Effect.either(selectDeployment(indexer([production, duplicate]), selector))
          )
        )
      ).toBe(true);
    }
  });

  it("fails on tied newest creation times", () => {
    const tied = { ...newer, commit_hash: "ddddddd" };
    expect(
      Either.isLeft(
        Effect.runSync(
          Effect.either(selectDeployment(indexer([newer, tied]), { kind: "latest-nonproduction" }))
        )
      )
    ).toBe(true);
  });

  it("never falls back to an older deployment when the newest has no endpoint", () => {
    const source = indexer([older, { ...newer, gql_endpoint: null }]);
    const result = Effect.runSync(
      Effect.either(selectDeployment(source, { kind: "latest-nonproduction" }))
    );
    expect(Either.isLeft(result) && result.left.message).toContain("ccccccc has no endpoint");
  });

  it("keeps legacy cloud names and existing production aliases", () => {
    expect(getEnvioTarget("streams")).toMatchObject({
      cloudName: "lockup-envio",
      organisation: "sablier-labs",
      productionEndpointUrl: "https://indexer.hyperindex.xyz/53b7e25/v1/graphql",
    });
    expect(getEnvioTarget("airdrops").cloudName).toBe("merkle-envio");
    expect(getEnvioTarget("analytics").productionEndpointUrl).toBe(
      "https://indexer.hyperindex.xyz/7672d32/v1/graphql"
    );
  });

  it("discovers using the explicit mapped indexer", () => {
    const cloud = makeEnvioCloud(() =>
      Effect.succeed({
        exitCode: 0,
        stderr: "",
        stdout: JSON.stringify({ data: indexer([production]), ok: true }),
      })
    );
    const result = Effect.runSync(
      discoverDeployment("streams", { kind: "production" }).pipe(
        Effect.provideService(EnvioCloud, cloud)
      )
    );
    expect(result.indexer).toEqual(
      Schema.decodeUnknownSync(CloudIndexerSchema)(indexer([production]))
    );
    expect(result.deployment.commit_hash).toBe("aaaaaaa");
  });
});
