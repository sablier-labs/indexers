import type { DocumentNode } from "graphql";
import { GraphQLClient } from "graphql-request";
import { describe, expect, it } from "vitest";
import type { NormalizedPoolState, NormalizedPoolUserState } from "./normalize.js";
import {
  normalizeGraphPoolState,
  normalizeGraphPoolUserState,
  normalizeRindexerPoolState,
  normalizeRindexerPoolUserState,
} from "./normalize.js";
import { GraphQueries, RindexerQueries } from "./queries.js";

/* -------------------------------------------------------------------------- */
/*                              ENDPOINTS                                     */
/* -------------------------------------------------------------------------- */

const GRAPH_ENDPOINT =
  process.env.BOB_GRAPH_ENDPOINT ??
  "https://api.studio.thegraph.com/query/112500/sablier-bob/version/latest";
const RINDEXER_ENDPOINT =
  process.env.BOB_RINDEXER_ENDPOINT ?? "https://sablier-bob-rindexer.up.railway.app/graphql";

/* -------------------------------------------------------------------------- */
/*                               HELPERS                                      */
/* -------------------------------------------------------------------------- */

const PAGE_SIZE = 1000;
const TIMEOUT = 120_000;

/**
 * Paginate a Graph subgraph query (flat array response).
 * Graph uses `first`/`skip` and returns entities as a top-level array.
 */
async function fetchAllGraphPages<T>(
  client: GraphQLClient,
  document: DocumentNode,
  rootKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  normalize: (raw: any) => T
): Promise<T[]> {
  const results: T[] = [];
  let skip = 0;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await client.request<Record<string, any[]>>(document, {
      first: PAGE_SIZE,
      skip,
    });

    const items = response[rootKey];
    if (!items || items.length === 0) {
      break;
    }

    results.push(...items.map(normalize));
    if (items.length < PAGE_SIZE) {
      break;
    }

    skip += PAGE_SIZE;
  }

  return results;
}

/**
 * Paginate a rindexer (Postgraphile) query.
 * Postgraphile uses `first`/`offset` and wraps results in `{ nodes: [...] }`.
 */
async function fetchAllRindexerPages<T>(
  client: GraphQLClient,
  document: DocumentNode,
  rootKey: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  normalize: (raw: any) => T
): Promise<T[]> {
  const results: T[] = [];
  let offset = 0;

  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const response = await client.request<Record<string, { nodes: any[] }>>(document, {
      first: PAGE_SIZE,
      offset,
    });

    const items = response[rootKey]?.nodes;
    if (!items || items.length === 0) {
      break;
    }

    results.push(...items.map(normalize));
    if (items.length < PAGE_SIZE) {
      break;
    }

    offset += PAGE_SIZE;
  }

  return results;
}

function toMap<T extends { id: string }>(entities: T[]): Map<string, T> {
  return new Map(entities.map((e) => [e.id, e]));
}

/* -------------------------------------------------------------------------- */
/*                                 TESTS                                      */
/* -------------------------------------------------------------------------- */

describe("Bob: rindexer ↔ Graph equivalence", () => {
  const graphClient = new GraphQLClient(GRAPH_ENDPOINT);
  const rindexerClient = new GraphQLClient(RINDEXER_ENDPOINT);

  it(
    "PoolState entities match between rindexer and Graph",
    async () => {
      const [graphPools, rindexerPools] = await Promise.all([
        fetchAllGraphPages<NormalizedPoolState>(
          graphClient,
          GraphQueries.getPoolStates,
          "poolStates",
          normalizeGraphPoolState
        ),
        fetchAllRindexerPages<NormalizedPoolState>(
          rindexerClient,
          RindexerQueries.getPoolStates,
          "allPoolStates",
          normalizeRindexerPoolState
        ),
      ]);

      console.info(
        `Fetched ${graphPools.length} Graph pools, ${rindexerPools.length} rindexer pools`
      );

      expect(graphPools.length, "Pool count mismatch between Graph and rindexer").toBe(
        rindexerPools.length
      );
      expect(graphPools.length).toBeGreaterThan(0);

      const rindexerMap = toMap(rindexerPools);

      for (const graphPool of graphPools) {
        const rindexerPool = rindexerMap.get(graphPool.id);
        expect(
          rindexerPool,
          `Pool ${graphPool.id} exists in Graph but not in rindexer`
        ).toBeDefined();

        expect(graphPool, `Pool ${graphPool.id} mismatch`).toEqual(rindexerPool);
      }

      console.info(`Successfully compared ${graphPools.length} PoolState entities.`);
    },
    TIMEOUT
  );

  it(
    "PoolUserState entities match between rindexer and Graph",
    async () => {
      const [graphUsers, rindexerUsers] = await Promise.all([
        fetchAllGraphPages<NormalizedPoolUserState>(
          graphClient,
          GraphQueries.getPoolUserStates,
          "poolUserStates",
          normalizeGraphPoolUserState
        ),
        fetchAllRindexerPages<NormalizedPoolUserState>(
          rindexerClient,
          RindexerQueries.getPoolUserStates,
          "allPoolUserStates",
          normalizeRindexerPoolUserState
        ),
      ]);

      console.info(
        `Fetched ${graphUsers.length} Graph user states, ${rindexerUsers.length} rindexer user states`
      );

      expect(graphUsers.length, "User state count mismatch between Graph and rindexer").toBe(
        rindexerUsers.length
      );
      expect(graphUsers.length).toBeGreaterThan(0);

      const rindexerMap = toMap(rindexerUsers);

      for (const graphUser of graphUsers) {
        const rindexerUser = rindexerMap.get(graphUser.id);
        expect(
          rindexerUser,
          `User state ${graphUser.id} exists in Graph but not in rindexer`
        ).toBeDefined();

        expect(graphUser, `User state ${graphUser.id} mismatch`).toEqual(rindexerUser);
      }

      console.info(`Successfully compared ${graphUsers.length} PoolUserState entities.`);
    },
    TIMEOUT
  );
});
