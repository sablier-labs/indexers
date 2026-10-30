import { Effect, Either, Schema } from "effect";
import { describe, expect, it } from "vitest";
import { makeEnvioCloud } from "../../../cli/services/envio-cloud.js";
import { CloudIndexerSchema, EnvioCloudError } from "../../../cli/services/envio-cloud.types.js";

const indexer = {
  access_type: "public",
  created_time: "2024-03-21T11:44:52.453",
  description: "Envio indexer for the Sablier Lockup protocol",
  indexer_id: "lockup-envio",
  organisation_id: "sablier-labs",
  deployments: [
    {
      commit_hash: "51e6193",
      created_time: "2026-10-05T12:33:23.872012+00:00",
      gql_endpoint: "https://indexer.hyperindex.xyz/53b7e25/v1/graphql",
      hosted_service_tier: { tier: "small" },
      indexer_id: "lockup-envio",
      organisation_id: "sablier-labs",
      prod_status: "prod",
    },
  ],
};

function client(stdout: string, exitCode = 0) {
  return makeEnvioCloud(() => Effect.succeed({ exitCode, stderr: "", stdout }));
}

function failure(effect: Effect.Effect<unknown, EnvioCloudError>) {
  const result = Effect.runSync(Effect.either(effect));
  if (Either.isRight(result)) {
    throw new Error("Expected the cloud adapter to fail");
  }
  return result.left;
}

describe("Envio Cloud adapter", () => {
  it("validates authenticated indexer records and pins organisation through argv", () => {
    const calls: Array<readonly string[]> = [];
    const cloud = makeEnvioCloud((args) => {
      calls.push(args);
      return Effect.succeed({
        exitCode: 0,
        stderr: "",
        stdout: JSON.stringify({ data: indexer, ok: true }),
      });
    });

    const result = Effect.runSync(cloud.getIndexer("lockup-envio"));
    expect(result.deployments[0].prod_status).toBe("prod");
    expect(result.deployments[0]).not.toHaveProperty("hosted_service_tier");
    expect(calls).toEqual([
      ["indexer", "get", "lockup-envio", "--org", "sablier-labs", "--output", "json"],
    ]);
  });

  it("returns the inventory using the same validated indexer records", () => {
    expect(
      Effect.runSync(client(JSON.stringify({ data: [indexer], ok: true })).listIndexers())
    ).toEqual([Schema.decodeUnknownSync(CloudIndexerSchema)(indexer)]);
  });

  it("checks the exit code before parsing even a success envelope", () => {
    const error = failure(
      client(JSON.stringify({ data: indexer, ok: true }), 1).getIndexer("lockup-envio")
    );
    expect(error.exitCode).toBe(1);
  });

  it.each(["not json", '{"ok":false,"data":{}}', '{"data":{}}'])(
    "rejects unsuccessful or malformed envelopes: %s",
    (stdout) => {
      expect(failure(client(stdout).getIndexer("lockup-envio"))).toBeInstanceOf(EnvioCloudError);
    }
  );

  it.each(['{"ok":true}', '{"ok":true,"data":null}'])(
    "rejects successful responses without data: %s",
    (stdout) => {
      expect(failure(client(stdout).getIndexer("lockup-envio")).message).toBe(
        "CLI response is missing data"
      );
    }
  );

  it("rejects records from other organisations or indexers", () => {
    const otherOrg = { ...indexer, organisation_id: "another-org" };
    expect(
      failure(client(JSON.stringify({ data: otherOrg, ok: true })).getIndexer("lockup-envio"))
    ).toBeInstanceOf(EnvioCloudError);
    expect(
      failure(client(JSON.stringify({ data: indexer, ok: true })).getIndexer("merkle-envio"))
        .message
    ).toBe("CLI returned a different indexer");
    const otherDeployment = {
      ...indexer,
      deployments: [{ ...indexer.deployments[0], indexer_id: "another-indexer" }],
    };
    expect(
      failure(
        client(JSON.stringify({ data: otherDeployment, ok: true })).getIndexer("lockup-envio")
      )
    ).toBeInstanceOf(EnvioCloudError);
  });

  it.each([
    { ...indexer.deployments[0], created_time: "not-a-date" },
    { ...indexer.deployments[0], commit_hash: "not-a-commit" },
    { ...indexer.deployments[0], gql_endpoint: "file:///private" },
    { ...indexer.deployments[0], prod_status: undefined },
  ])("rejects invalid deployment fields", (deployment) => {
    expect(
      failure(
        client(
          JSON.stringify({ data: { ...indexer, deployments: [deployment] }, ok: true })
        ).getIndexer("lockup-envio")
      )
    ).toBeInstanceOf(EnvioCloudError);
  });

  it("exposes generic JSON and process reads without duplicating execution", () => {
    const cloud = client('{"ok":true,"data":[1,2]}');
    expect(
      Effect.runSync(
        cloud.readJson(
          ["deployment", "metrics", "lockup-envio", "51e6193"],
          Schema.Array(Schema.Number)
        )
      )
    ).toEqual([1, 2]);
    expect(
      Effect.runSync(cloud.runCommand(["deployment", "logs", "lockup-envio", "51e6193"])).exitCode
    ).toBe(0);
  });
});
