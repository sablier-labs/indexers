import { getOperationAST, Kind } from "graphql";
import { sepolia } from "sablier/evm/chains";
import { afterEach, expect, it, vi } from "vitest";
import { compareVendors } from "./vendors/equivalence/create-test.js";
import { AirdropsEnvio, AirdropsGraph } from "./vendors/equivalence/queries.js";

const config: Parameters<typeof compareVendors>[0] = {
  chainId: sepolia.id,
  protocol: "airdrops",
  endpoints: {
    envio: "https://envio.test/graphql",
    graph: "https://graph.test/graphql",
  },
};

const campaignQuery: Parameters<typeof compareVendors>[1] = {
  entity: "campaigns",
  envio: AirdropsEnvio.getCampaignsWithActivities,
  graph: AirdropsGraph.getCampaignsWithActivities,
};
const actionQuery: Parameters<typeof compareVendors>[1] = {
  entity: "actions",
  envio: AirdropsEnvio.getActions,
  graph: AirdropsGraph.getActions,
};

type QueryBody = {
  operationName: string;
  variables: {
    first: number;
    where:
      | { chainId: { _eq: number }; subgraphId: { _gt: string }; timestamp: { _lt: number } }
      | { chainId: number; subgraphId_gt: string; timestamp_lt: number };
  };
};

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
  vi.unstubAllGlobals();
});

it("keeps query pairs independent and restarts pagination after a failed request", async () => {
  const key = "test-graph-query-key";
  vi.stubEnv("GRAPH_QUERY_KEY", key);
  const now = vi.spyOn(Date, "now").mockReturnValue(1_800_000_000_123);
  const campaigns = Array.from({ length: 1001 }, (_, index) => ({
    subgraphId: (9_007_199_254_741_994n + BigInt(index)).toString(),
  }));
  const largeCursor = campaigns[999].subgraphId;
  const calls: unknown[] = [];
  const fetch = vi.fn<typeof globalThis.fetch>(async (input, init) => {
    const request = new Request(input, init);
    const vendor = request.url === config.endpoints.graph ? "graph" : "envio";
    const { operationName, variables } = (await request.json()) as QueryBody;
    const { first, where } = variables;
    const [chainId, cursor, cutoff] =
      "subgraphId" in where
        ? [where.chainId._eq, where.subgraphId._gt, where.timestamp._lt]
        : [where.chainId, where.subgraphId_gt, where.timestamp_lt];
    const authorization = request.headers.get("Authorization");
    const entity = operationName === "getCampaignsWithActivities" ? "campaigns" : "actions";
    calls.push({ authorization, chainId, cursor, cutoff, entity, first, vendor });

    if (calls.length === 4) {
      return Response.json({ errors: [{ message: key }] }, { status: 503 });
    }

    const actions = [
      {
        chainId: String(config.chainId),
        subgraphId: "1",
        campaign: {
          asset: {
            address: "0xbaca88a993d9a1452402dc511efeecda1b18c18f",
            name: vendor === "envio" ? "Current name" : "Historical name",
          },
        },
      },
    ];
    const page = (entity === "campaigns" ? campaigns : actions)
      .filter(({ subgraphId }) => BigInt(subgraphId) > BigInt(cursor))
      .slice(0, first);
    return Response.json({ data: { [entity]: page } });
  });
  vi.stubGlobal("fetch", fetch);

  await expect(compareVendors(config, campaignQuery)).rejects.toThrow(
    `graph request failed for airdrops campaigns on chain ${config.chainId} after subgraphId ${largeCursor} (HTTP 503)`
  );
  now.mockReturnValue(1_800_000_002_123);
  await expect(compareVendors(config, actionQuery)).resolves.toBe(1);
  await expect(compareVendors(config, campaignQuery)).resolves.toBe(1001);

  expect(calls).toEqual(
    [
      { cursor: "0", cutoff: 1_799_999_400, entity: "campaigns" },
      { cursor: largeCursor, cutoff: 1_799_999_400, entity: "campaigns" },
      { cursor: "0", cutoff: 1_799_999_402, entity: "actions" },
      { cursor: "0", cutoff: 1_799_999_402, entity: "campaigns" },
      { cursor: largeCursor, cutoff: 1_799_999_402, entity: "campaigns" },
    ].flatMap((page) => [
      { ...page, authorization: null, chainId: config.chainId, first: 1000, vendor: "envio" },
      {
        ...page,
        authorization: `Bearer ${key}`,
        chainId: config.chainId,
        first: 1000,
        vendor: "graph",
      },
    ])
  );
});

it("requests airdrop actions from The Graph in ascending subgraphId order", () => {
  const actions = getOperationAST(AirdropsGraph.getActions)?.selectionSet.selections[0];
  if (actions?.kind !== Kind.FIELD) {
    throw new Error("Expected an actions query field");
  }
  expect(actions.name.value).toBe("actions");
  const args = Object.fromEntries(
    actions.arguments?.map(({ name, value }) => [name.value, value]) ?? []
  );
  expect(args).toMatchObject({
    orderBy: { kind: Kind.ENUM, value: "subgraphId" },
    orderDirection: { kind: Kind.ENUM, value: "asc" },
  });
});
