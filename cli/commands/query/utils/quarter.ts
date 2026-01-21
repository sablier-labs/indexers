// -------------------------------------------------------------------------- //
//                                   IMPORTS                                  //
// -------------------------------------------------------------------------- //

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc.js";
import { Effect } from "effect";
import { ValidationError } from "../../../errors.js";

// -------------------------------------------------------------------------- //
//                                   SETUP                                    //
// -------------------------------------------------------------------------- //

dayjs.extend(utc);

// -------------------------------------------------------------------------- //
//                                    TYPES                                   //
// -------------------------------------------------------------------------- //

export type QuarterNumber = 1 | 2 | 3 | 4;

export type QuarterWindow = {
  end: dayjs.Dayjs;
  name: string;
  quarter: QuarterNumber;
  start: dayjs.Dayjs;
  year: number;
};

// -------------------------------------------------------------------------- //
//                                  CONSTANTS                                 //
// -------------------------------------------------------------------------- //

const QUARTER_PATTERN = /^([0-9]{4})-q([1-4])$/i;

export const DEFAULT_QUARTER_NAME = getMostRecentQuarterName(dayjs.utc());

// -------------------------------------------------------------------------- //
//                                  HELPERS                                   //
// -------------------------------------------------------------------------- //

export function formatQuarterName(opts: { quarter: QuarterNumber; year: number }): string {
  return `${opts.year}-q${opts.quarter}`;
}

export function getMostRecentQuarterName(referenceDate: dayjs.Dayjs): string {
  const currentQuarter = getQuarterFromDate(referenceDate);
  if (currentQuarter === 1) {
    return formatQuarterName({ quarter: 4, year: referenceDate.year() - 1 });
  }
  return formatQuarterName({
    quarter: (currentQuarter - 1) as QuarterNumber,
    year: referenceDate.year(),
  });
}

export function getQuarterFromDate(referenceDate: dayjs.Dayjs): QuarterNumber {
  const quarterIndex = Math.floor(referenceDate.month() / 3) + 1;
  return quarterIndex as QuarterNumber;
}

export function getQuarterWindow(
  quarterName: string
): Effect.Effect<QuarterWindow, ValidationError> {
  const normalized = quarterName.trim();
  const normalizedLower = normalized.toLowerCase();
  const resolved =
    normalizedLower === "" || normalizedLower === "latest" ? DEFAULT_QUARTER_NAME : normalized;
  const match = QUARTER_PATTERN.exec(resolved);
  if (!match) {
    return Effect.fail(
      new ValidationError({
        field: "quarter",
        message: "Quarter must be formatted as YYYY-q1, YYYY-q2, YYYY-q3, or YYYY-q4",
      })
    );
  }

  const year = Number(match[1]);
  const quarter = Number(match[2]) as QuarterNumber;
  const startMonth = (quarter - 1) * 3;
  const start = dayjs.utc().year(year).month(startMonth).startOf("month");
  const end = start.add(3, "month");

  return Effect.succeed({
    end,
    name: formatQuarterName({ quarter, year }),
    quarter,
    start,
    year,
  });
}
