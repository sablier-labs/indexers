import { Effect, Schedule } from "effect";
import { VendorApiError } from "./errors.js";

type Vendor = VendorApiError["vendor"];

const RETRY_SCHEDULE = Schedule.exponential("100 millis").pipe(
  Schedule.intersect(Schedule.recurs(3)),
  Schedule.jittered
);

const REQUEST_TIMEOUT = "30 seconds";

/**
 * Wrap a vendor HTTP/GraphQL request with a uniform timeout, retry, and error
 * normalization policy. Any non-`VendorApiError` failure is mapped to one
 * tagged with the given vendor so call sites only ever surface
 * `VendorApiError`.
 */
export const withVendorRequest = <A, E, R>(
  vendor: Vendor,
  effect: Effect.Effect<A, E, R>
): Effect.Effect<A, VendorApiError, R> =>
  effect.pipe(
    Effect.timeoutFail({
      duration: REQUEST_TIMEOUT,
      onTimeout: () =>
        new VendorApiError({
          message: `${vendor} request timed out after ${REQUEST_TIMEOUT}`,
          vendor,
        }),
    }),
    Effect.retry(RETRY_SCHEDULE),
    Effect.mapError((error) => {
      if (error instanceof VendorApiError) {
        return error;
      }
      const message = error instanceof Error ? error.message : String(error);
      return new VendorApiError({ message, vendor });
    })
  );
