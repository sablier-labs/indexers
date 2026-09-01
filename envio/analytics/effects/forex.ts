import axios from "axios";
import type { Logger } from "envio";
import { createEffect, S } from "envio";
import { FRANKFURTER_BASE_URL } from "../../common/constants.js";
import { shiftDateUtc } from "../../common/time.js";

type FrankfurterResponse = {
  base?: unknown;
  date?: unknown;
  quote?: unknown;
  rate?: unknown;
};

const FRANKFURTER_TIMEOUT_MS = 10_000;
const NO_RATE = 0;
const LOOKBACK_DAYS = 7;
const dateType = S.string;

export const fetchGBPExchangeRate = createEffect(
  {
    cache: true,
    input: dateType,
    name: "FRANKFURTER_GBP_USD",
    output: S.number,
    rateLimit: { calls: 10, per: "second" },
  },
  async ({ context, input: date }) => await fetchGBPRateWithFallback(context.log, date)
);

/**
 * Fetch the GBP→USD exchange rate for a given date, falling back to nearest earlier dates when
 * the primary call returns no data. Walks back up to `LOOKBACK_DAYS` days; never forward.
 */
export async function fetchGBPRateWithFallback(logger: Logger, date: string): Promise<number> {
  const primary = await fetchFromFrankfurterAPI(logger, date);
  if (primary !== NO_RATE) {
    return primary;
  }

  for (let offsetDays = 1; offsetDays <= LOOKBACK_DAYS; offsetDays++) {
    const candidate = shiftDateUtc(date, -offsetDays);
    const rate = await fetchFromFrankfurterAPI(logger, candidate);
    if (rate !== NO_RATE) {
      logger.warn(`Using fallback GBP rate from ${candidate} (target ${date})`, {
        candidate,
        offsetDays,
        target: date,
      });
      return rate;
    }
  }
  throw new Error(
    `No GBP/USD exchange rate found for ${date} or the previous ${LOOKBACK_DAYS} days`
  );
}

/**
 * Fetch the GBP to USD exchange rate for a given date.
 * @see https://frankfurter.dev/
 */
export async function fetchFromFrankfurterAPI(logger: Logger, date: string): Promise<number> {
  const url = new URL(`${FRANKFURTER_BASE_URL}/rate/GBP/USD`);
  url.searchParams.set("date", date);

  try {
    const response = await axios.get<FrankfurterResponse>(url.toString(), {
      timeout: FRANKFURTER_TIMEOUT_MS,
    });
    const { base, date: responseDate, quote, rate } = response.data;

    if (
      base !== "GBP" ||
      responseDate !== date ||
      quote !== "USD" ||
      typeof rate !== "number" ||
      !Number.isFinite(rate) ||
      rate <= 0
    ) {
      throw new Error(`Invalid Frankfurter response for GBP/USD on ${date}`);
    }

    return rate;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      logger.warn(`No GBP/USD exchange rate available from Frankfurter for ${date}`, {
        date,
        url: url.toString(),
      });
      return NO_RATE;
    }

    logger.error("Failed to fetch exchange rate from Frankfurter", {
      date,
      error: error instanceof Error ? error.message : String(error),
      status: axios.isAxiosError(error) ? error.response?.status : undefined,
      url: url.toString(),
    });
    throw error;
  }
}
