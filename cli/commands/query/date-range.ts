// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Effect } from "effect";
import { ValidationError } from "../../errors.js";

// -------------------------------------------------------------------------- //
//                                   SETUP                                    //
// -------------------------------------------------------------------------- //

dayjs.extend(utc);

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

export type DateRange = {
  end: dayjs.Dayjs;
  start: dayjs.Dayjs;
};

// -------------------------------------------------------------------------- //
//                                  HELPERS                                   //
// -------------------------------------------------------------------------- //

function parseDateValue(
  label: "end" | "start",
  value: string
): Effect.Effect<dayjs.Dayjs, ValidationError> {
  const parsed = dayjs.utc(value.trim());
  if (!parsed.isValid()) {
    return Effect.fail(
      new ValidationError({
        field: label,
        message: "Date must be formatted as YYYY-MM-DD or ISO 8601 timestamp",
      })
    );
  }

  return Effect.succeed(parsed);
}

export function getDateRange(opts: {
  end: string;
  start: string;
}): Effect.Effect<DateRange, ValidationError> {
  return Effect.gen(function* () {
    const end = yield* parseDateValue("end", opts.end);
    const start = yield* parseDateValue("start", opts.start);

    if (!start.isBefore(end)) {
      return yield* Effect.fail(
        new ValidationError({
          field: "end",
          message: "End date must be after start date",
        })
      );
    }

    return { end, start } satisfies DateRange;
  });
}

export function formatTimestamp(value: dayjs.Dayjs): string {
  return value.format("YYYY-MM-DD HH:mm");
}

export function toHasuraTimestamp(value: dayjs.Dayjs): string {
  return value.toISOString();
}
