// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import { HttpBody, HttpClient } from "@effect/platform";
import { Effect } from "effect";
import { isAddress } from "viem";
import { VendorApiError } from "../../../utils/errors.js";
import { withVendorRequest } from "../../../utils/vendor-request.js";

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

type EnvioAggregateResponse = {
  data: Record<string, unknown>;
};

export type EnvioIndexerAsset = {
  address: string;
  chainId: number;
  decimals: number;
  id: string;
  name: string;
  symbol: string;
};

type EnvioRequestOptions = {
  endpoint?: string;
  query: string;
  variables: Record<string, unknown>;
};

type QuarterlyAverageMauResult = {
  average: number | null;
};

type TotalUsdFeesResult = {
  totalUsd: bigint | null;
};

type UniqueTxsResult = {
  count: bigint;
};

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

export const ENVIO_ANALYTICS_ENDPOINT = "https://indexer.hyperindex.xyz/7672d32/v1/graphql";
export const ENVIO_ANALYTICS_PLAYGROUND_URL =
  "https://envio.dev/app/sablier-labs/analytics/48b96e0/playground";

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

const UNIQUE_TXS_QUERY = /* GraphQL */ `
  query UniqueTxs($dateStart: timestamptz!, $dateEnd: timestamptz!) {
    UserTransaction_aggregate(where: { timestamp: { _gte: $dateStart, _lt: $dateEnd } }) {
      aggregate {
        count(columns: [hash], distinct: true)
      }
    }
  }
`;

const INDEXER_ASSETS_QUERY = /* GraphQL */ `
  query IndexerAssets($afterId: String!, $limit: Int!) {
    Asset(limit: $limit, order_by: [{ id: asc }], where: { id: { _gt: $afterId } }) {
      address
      chainId
      decimals
      id
      name
      symbol
    }
  }
`;

export const INDEXER_ASSETS_PAGE_SIZE = 1000;

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
    if (!Number.isSafeInteger(value)) {
      return Effect.fail(new VendorApiError({ message: "Unsafe bigint value", vendor: "envio" }));
    }
    return Effect.succeed(BigInt(value));
  }

  if (typeof value === "string") {
    return Effect.try({
      catch: (error) =>
        new VendorApiError({
          message: error instanceof Error ? error.message : "Invalid bigint value",
          vendor: "envio",
        }),
      try: () => BigInt(value),
    });
  }

  return Effect.fail(new VendorApiError({ message: "Invalid bigint value", vendor: "envio" }));
}

function parseSafeInteger(
  value: unknown,
  options?: { minimum?: number }
): Effect.Effect<number, VendorApiError> {
  return Effect.gen(function* () {
    const parsed = yield* parseNumber(value);

    if (!Number.isInteger(parsed)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid integer value", vendor: "envio" })
      );
    }

    if (!Number.isSafeInteger(parsed)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Unsafe integer value", vendor: "envio" })
      );
    }

    if (options?.minimum !== undefined && parsed < options.minimum) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Out-of-range integer value", vendor: "envio" })
      );
    }

    return parsed;
  });
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
  withVendorRequest(
    "envio",
    Effect.gen(function* () {
      const response = yield* HttpClient.post(opts.endpoint ?? ENVIO_ANALYTICS_ENDPOINT, {
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
    })
  );

export function getNextAssetsCursor(
  assets: readonly Pick<EnvioIndexerAsset, "id">[]
): string | null {
  return assets.length === 0 ? null : (assets.at(-1)?.id ?? null);
}

export const parseAssetsPage = (
  payload: unknown
): Effect.Effect<EnvioIndexerAsset[], VendorApiError> =>
  Effect.gen(function* () {
    const invalidPayload = () =>
      Effect.fail(new VendorApiError({ message: "Invalid Envio asset payload", vendor: "envio" }));

    if (!Array.isArray(payload)) {
      return yield* Effect.fail(
        new VendorApiError({ message: "Invalid Envio asset page payload", vendor: "envio" })
      );
    }

    const assets: EnvioIndexerAsset[] = [];

    for (const item of payload) {
      if (!isRecord(item)) {
        return yield* invalidPayload();
      }

      const address = item.address;
      const chainId = item.chainId;
      const decimals = item.decimals;
      const id = item.id;
      const name = item.name;
      const symbol = item.symbol;

      if (
        typeof address !== "string" ||
        !isAddress(address) ||
        typeof id !== "string" ||
        id.length === 0 ||
        typeof name !== "string" ||
        typeof symbol !== "string"
      ) {
        return yield* invalidPayload();
      }

      assets.push({
        address,
        chainId: yield* parseSafeInteger(chainId, { minimum: 1 }),
        decimals: yield* parseSafeInteger(decimals, { minimum: 0 }),
        id,
        name,
        symbol,
      });
    }

    return assets;
  });

const fetchAssetsPage = (opts: { afterId: string; endpoint: string }) =>
  Effect.gen(function* () {
    const response = yield* fetchEnvioQuery({
      endpoint: opts.endpoint,
      query: INDEXER_ASSETS_QUERY,
      variables: {
        afterId: opts.afterId,
        limit: INDEXER_ASSETS_PAGE_SIZE,
      },
    });

    return yield* parseAssetsPage(response.data.Asset);
  });

// -------------------------------------------------------------------------- //
//                                   EXPORTS                                  //
// -------------------------------------------------------------------------- //

export const fetchAssets = (opts: { endpoint: string }) =>
  Effect.gen(function* () {
    const assets: EnvioIndexerAsset[] = [];
    let afterId = "";

    while (true) {
      const page = yield* fetchAssetsPage({
        afterId,
        endpoint: opts.endpoint,
      });

      assets.push(...page);

      const nextCursor = getNextAssetsCursor(page);
      if (!nextCursor || page.length < INDEXER_ASSETS_PAGE_SIZE) {
        break;
      }

      afterId = nextCursor;
    }

    return assets;
  });

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

export const fetchUniqueTxs = (opts: { dateEnd: string; dateStart: string }) =>
  Effect.gen(function* () {
    const response = yield* fetchEnvioQuery({
      query: UNIQUE_TXS_QUERY,
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
      return { count: 0n } satisfies UniqueTxsResult;
    }

    const count = yield* parseBigIntValue(countValue);

    return { count } satisfies UniqueTxsResult;
  });
