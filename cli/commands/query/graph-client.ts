// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { HttpBody, HttpClient } from "@effect/platform";
import { Effect, Schedule } from "effect";
import { VendorApiError } from "../../errors.js";

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

type ActionStats = {
  count: number;
  totalFees: bigint;
};

type FetchQuarterActionStatsOptions = {
  end: string;
  headers: Record<string, string>;
  indexerUrl: string;
  start: string;
};

type GraphAction = {
  fee: string | null;
  subgraphId: string;
};

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const ACTIONS_QUERY = /* GraphQL */ `
  query ActionsInQuarter($end: BigInt!, $first: Int!, $start: BigInt!, $subgraphId: BigInt!) {
    actions(
      first: $first
      orderBy: subgraphId
      orderDirection: asc
      where: { subgraphId_gt: $subgraphId, timestamp_gte: $start, timestamp_lt: $end }
    ) {
      fee
      subgraphId
    }
  }
`;

const PAGE_SIZE = 1000;

const RETRY_SCHEDULE = Schedule.exponential("100 millis").pipe(
  Schedule.intersect(Schedule.recurs(3)),
  Schedule.jittered
);

// -------------------------------------------------------------------------- //
//                                  HELPERS                                   //
// -------------------------------------------------------------------------- //

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

const parseGraphActions = (payload: unknown): Effect.Effect<GraphAction[], VendorApiError> =>
  Effect.gen(function* () {
    if (!isRecord(payload)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Unexpected Graph response", vendor: "graph" })
      );
    }

    const errors = payload.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const message = errors.map((error) => error.message).join("; ");
      return yield* Effect.fail(new VendorApiError({ message, vendor: "graph" }));
    }

    const data = payload.data;
    if (!isRecord(data)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Missing data in Graph response", vendor: "graph" })
      );
    }

    const actionsValue = data.actions;
    if (!Array.isArray(actionsValue)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Missing actions in Graph response", vendor: "graph" })
      );
    }

    const actions: GraphAction[] = [];
    for (const item of actionsValue) {
      if (!isRecord(item)) {
        return yield* Effect.fail(
          new VendorApiError({ message: "Invalid action payload", vendor: "graph" })
        );
      }

      const fee = item.fee;
      const subgraphId = item.subgraphId;

      if (typeof subgraphId !== "string") {
        return yield* Effect.fail(
          new VendorApiError({ message: "Invalid action subgraphId", vendor: "graph" })
        );
      }

      if (fee !== null && typeof fee !== "string") {
        return yield* Effect.fail(
          new VendorApiError({ message: "Invalid action fee", vendor: "graph" })
        );
      }

      actions.push({ fee: fee ?? null, subgraphId });
    }

    return actions;
  });

const fetchActionsPage = (opts: {
  end: string;
  headers: Record<string, string>;
  indexerUrl: string;
  start: string;
  subgraphId: string;
}) =>
  Effect.gen(function* () {
    const response = yield* HttpClient.post(opts.indexerUrl, {
      accept: "application/json",
      body: HttpBody.unsafeJson({
        query: ACTIONS_QUERY,
        variables: {
          end: opts.end,
          first: PAGE_SIZE,
          start: opts.start,
          subgraphId: opts.subgraphId,
        },
      }),
      headers: {
        "content-type": "application/json",
        ...opts.headers,
      },
    });

    if (response.status < 200 || response.status >= 300) {
      return yield* Effect.fail(
        new VendorApiError({
          message: `Graph request failed with status ${response.status}`,
          vendor: "graph",
        })
      );
    }

    const payload = yield* response.json;
    return yield* parseGraphActions(payload);
  }).pipe(
    Effect.retry(RETRY_SCHEDULE),
    Effect.mapError((error) => {
      if (error instanceof VendorApiError) {
        return error;
      }
      const message = error instanceof Error ? error.message : String(error);
      return new VendorApiError({ message, vendor: "graph" });
    })
  );

// -------------------------------------------------------------------------- //
//                                   EXPORTS                                  //
// -------------------------------------------------------------------------- //

export const fetchQuarterActionStats = (opts: FetchQuarterActionStatsOptions) =>
  Effect.gen(function* () {
    let count = 0;
    let subgraphId = "0";
    let totalFees = 0n;

    while (true) {
      const page = yield* fetchActionsPage({
        end: opts.end,
        headers: opts.headers,
        indexerUrl: opts.indexerUrl,
        start: opts.start,
        subgraphId,
      });

      if (page.length === 0) {
        break;
      }

      count += page.length;
      for (const action of page) {
        if (action.fee) {
          totalFees += BigInt(action.fee);
        }
      }

      const last = page.at(-1);
      if (!last) {
        break;
      }
      subgraphId = last.subgraphId;

      if (page.length < PAGE_SIZE) {
        break;
      }
    }

    return { count, totalFees } satisfies ActionStats;
  });
