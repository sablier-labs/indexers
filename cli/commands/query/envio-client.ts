// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { HttpBody, HttpClient } from "@effect/platform";
import { Effect, Schedule } from "effect";
import { VendorApiError } from "../../errors.js";

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

type EnvioAggregateResponse = {
  data: Record<string, unknown>;
};

type EnvioRequestOptions = {
  query: string;
  variables: Record<string, string>;
};

type QuarterlyAverageMauResult = {
  average: number | null;
};

type TotalUsdFeesResult = {
  totalUsd: bigint | null;
};

type UniqueTransactionsResult = {
  count: bigint;
};

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

export const ENVIO_ANALYTICS_ENDPOINT = "https://indexer.hyperindex.xyz/7672d32/v1/graphql";

const QUARTERLY_AVERAGE_MAU_QUERY = /* GraphQL */ `
  query QuarterlyAverageMAU($quarterStart: timestamptz!, $quarterEnd: timestamptz!) {
    UsersActiveMonthly_aggregate(
      where: { monthTimestamp: { _gte: $quarterStart, _lt: $quarterEnd } }
    ) {
      aggregate {
        avg {
          count
        }
      }
    }
  }
`;

const TOTAL_USD_FEES_QUERY = /* GraphQL */ `
  query TotalUsdFees($dateStart: timestamptz!, $dateEnd: timestamptz!) {
    FiatFeesDaily_aggregate(where: { dateTimestamp: { _gte: $dateStart, _lt: $dateEnd } }) {
      aggregate {
        sum {
          amountUSD
        }
      }
    }
  }
`;

const UNIQUE_TRANSACTIONS_QUERY = /* GraphQL */ `
  query UniqueTransactions($dateStart: timestamptz!, $dateEnd: timestamptz!) {
    UserTransaction_aggregate(where: { timestamp: { _gte: $dateStart, _lt: $dateEnd } }) {
      aggregate {
        count(columns: [hash], distinct: true)
      }
    }
  }
`;

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

function parseNumber(value: unknown): Effect.Effect<number, VendorApiError> {
  if (typeof value === "number") {
    if (!Number.isFinite(value)) {
      return Effect.fail(new VendorApiError({ message: "Invalid numeric value", vendor: "envio" }));
    }
    return Effect.succeed(value);
  }

  if (typeof value === "string") {
    const parsed = Number(value);
    if (!Number.isFinite(parsed)) {
      return Effect.fail(new VendorApiError({ message: "Invalid numeric value", vendor: "envio" }));
    }
    return Effect.succeed(parsed);
  }

  return Effect.fail(new VendorApiError({ message: "Invalid numeric value", vendor: "envio" }));
}

function parseBigIntValue(value: unknown): Effect.Effect<bigint, VendorApiError> {
  if (typeof value === "bigint") {
    return Effect.succeed(value);
  }

  if (typeof value === "number") {
    if (!Number.isInteger(value)) {
      return Effect.fail(new VendorApiError({ message: "Invalid bigint value", vendor: "envio" }));
    }
    return Effect.succeed(BigInt(value));
  }

  if (typeof value === "string") {
    try {
      return Effect.succeed(BigInt(value));
    } catch (error) {
      const message = error instanceof Error ? error.message : "Invalid bigint value";
      return Effect.fail(new VendorApiError({ message, vendor: "envio" }));
    }
  }

  return Effect.fail(new VendorApiError({ message: "Invalid bigint value", vendor: "envio" }));
}

const parseEnvioPayload = (
  payload: unknown
): Effect.Effect<EnvioAggregateResponse, VendorApiError> =>
  Effect.gen(function* () {
    if (!isRecord(payload)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Unexpected Envio response", vendor: "envio" })
      );
    }

    const errors = payload.errors;
    if (Array.isArray(errors) && errors.length > 0) {
      const message = errors
        .map((error) => {
          if (isRecord(error) && typeof error.message === "string") {
            return error.message;
          }
          return "Unknown error";
        })
        .join("; ");
      return yield* Effect.fail(new VendorApiError({ message, vendor: "envio" }));
    }

    const data = payload.data;
    if (!isRecord(data)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Missing data in Envio response", vendor: "envio" })
      );
    }

    return { data } satisfies EnvioAggregateResponse;
  });

const fetchEnvioQuery = (opts: EnvioRequestOptions) =>
  Effect.gen(function* () {
    const response = yield* HttpClient.post(ENVIO_ANALYTICS_ENDPOINT, {
      accept: "application/json",
      body: HttpBody.unsafeJson({
        query: opts.query,
        variables: opts.variables,
      }),
      headers: {
        "content-type": "application/json",
      },
    });

    if (response.status < 200 || response.status >= 300) {
      return yield* Effect.fail(
        new VendorApiError({
          message: `Envio request failed with status ${response.status}`,
          vendor: "envio",
        })
      );
    }

    const payload = yield* response.json;
    return yield* parseEnvioPayload(payload);
  }).pipe(
    Effect.retry(RETRY_SCHEDULE),
    Effect.mapError((error) => {
      if (error instanceof VendorApiError) {
        return error;
      }
      const message = error instanceof Error ? error.message : String(error);
      return new VendorApiError({ message, vendor: "envio" });
    })
  );

// -------------------------------------------------------------------------- //
//                                   EXPORTS                                  //
// -------------------------------------------------------------------------- //

export const fetchQuarterlyAverageMau = (opts: { quarterEnd: string; quarterStart: string }) =>
  Effect.gen(function* () {
    const response = yield* fetchEnvioQuery({
      query: QUARTERLY_AVERAGE_MAU_QUERY,
      variables: {
        quarterEnd: opts.quarterEnd,
        quarterStart: opts.quarterStart,
      },
    });

    const aggregateValue = response.data.UsersActiveMonthly_aggregate;
    if (aggregateValue === null) {
      return { average: null } satisfies QuarterlyAverageMauResult;
    }

    if (!isRecord(aggregateValue)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid MAU aggregate payload", vendor: "envio" })
      );
    }

    const aggregate = aggregateValue.aggregate;
    if (aggregate === null) {
      return { average: null } satisfies QuarterlyAverageMauResult;
    }

    if (!isRecord(aggregate)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid MAU aggregate payload", vendor: "envio" })
      );
    }

    const avg = aggregate.avg;
    if (avg === null) {
      return { average: null } satisfies QuarterlyAverageMauResult;
    }

    if (!isRecord(avg)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid MAU aggregate payload", vendor: "envio" })
      );
    }

    const countValue = avg.count;
    if (countValue === null || countValue === undefined) {
      return { average: null } satisfies QuarterlyAverageMauResult;
    }

    const average = yield* parseNumber(countValue);

    return { average } satisfies QuarterlyAverageMauResult;
  });

export const fetchTotalUsdFees = (opts: { dateEnd: string; dateStart: string }) =>
  Effect.gen(function* () {
    const response = yield* fetchEnvioQuery({
      query: TOTAL_USD_FEES_QUERY,
      variables: {
        dateEnd: opts.dateEnd,
        dateStart: opts.dateStart,
      },
    });

    const aggregateValue = response.data.FiatFeesDaily_aggregate;
    if (aggregateValue === null) {
      return { totalUsd: null } satisfies TotalUsdFeesResult;
    }

    if (!isRecord(aggregateValue)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid fees aggregate payload", vendor: "envio" })
      );
    }

    const aggregate = aggregateValue.aggregate;
    if (aggregate === null) {
      return { totalUsd: null } satisfies TotalUsdFeesResult;
    }

    if (!isRecord(aggregate)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid fees aggregate payload", vendor: "envio" })
      );
    }

    const sum = aggregate.sum;
    if (sum === null) {
      return { totalUsd: null } satisfies TotalUsdFeesResult;
    }

    if (!isRecord(sum)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid fees aggregate payload", vendor: "envio" })
      );
    }

    const amountUsdValue = sum.amountUSD;
    if (amountUsdValue === null || amountUsdValue === undefined) {
      return { totalUsd: null } satisfies TotalUsdFeesResult;
    }

    const totalUsd = yield* parseBigIntValue(amountUsdValue);

    return { totalUsd } satisfies TotalUsdFeesResult;
  });

export const fetchUniqueTransactions = (opts: { dateEnd: string; dateStart: string }) =>
  Effect.gen(function* () {
    const response = yield* fetchEnvioQuery({
      query: UNIQUE_TRANSACTIONS_QUERY,
      variables: {
        dateEnd: opts.dateEnd,
        dateStart: opts.dateStart,
      },
    });

    const aggregateValue = response.data.UserTransaction_aggregate;
    if (!isRecord(aggregateValue)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid transactions aggregate payload", vendor: "envio" })
      );
    }

    const aggregate = aggregateValue.aggregate;
    if (!isRecord(aggregate)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid transactions aggregate payload", vendor: "envio" })
      );
    }

    const countValue = aggregate.count;
    if (countValue === null || countValue === undefined) {
      return { count: 0n } satisfies UniqueTransactionsResult;
    }

    const count = yield* parseBigIntValue(countValue);

    return { count } satisfies UniqueTransactionsResult;
  });
