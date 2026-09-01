import axios from "axios";
import type { Logger } from "envio";
import { createEffect, S } from "envio";
import * as _ from "lodash-es";
import { FRANKFURTER_BASE_URL } from "../../common/constants.js";
import { shiftDateUtc } from "../../common/time.js";

type FrankfurterResponse = {
  rate: number;
};

const NO_PRICE = 0;
const LOOKBACK_DAYS = 7;
const dateType = S.string;

export const fetchGBPExchangeRate = createEffect(
  {
    cache: true,
    input: dateType,
    name: "GBP_USD",
    output: S.number,
    rateLimit: false,
  },
  async ({ context, input: date }) => await fetchGBPRateWithFallback(context.log, date)
);

/**
 * Fetch the GBP→USD exchange rate for a given date, falling back to nearest earlier dates when
 * the primary call returns no data. Walks back up to `LOOKBACK_DAYS` days; never forward.
 */
export async function fetchGBPRateWithFallback(logger: Logger, date: string): Promise<number> {
  const primary = await fetchFromFrankfurterAPI(logger, date);
  if (primary !== NO_PRICE) {
    return primary;
  }

  for (let offsetDays = 1; offsetDays <= LOOKBACK_DAYS; offsetDays++) {
    const candidate = shiftDateUtc(date, -offsetDays);
    const rate = await fetchFromFrankfurterAPI(logger, candidate);
    if (rate !== NO_PRICE) {
      logger.warn(`Using fallback GBP rate from ${candidate} (target ${date})`, {
        candidate,
        offsetDays,
        target: date,
      });
      return rate;
    }
  }
  return NO_PRICE;
}

/**
 * Fetch the GBP to USD exchange rate for a given date.
 * @see https://frankfurter.dev/
 */
export async function fetchFromFrankfurterAPI(logger: Logger, date: string): Promise<number> {
  const url = new URL(`${FRANKFURTER_BASE_URL}/rate/GBP/USD`);
  url.searchParams.set("date", date);

  try {
    const response = await axios.get<FrankfurterResponse>(url.toString());

    if (!response.data.rate || _.isNaN(response.data.rate)) {
      logger.error("Failed to fetch exchange rate: API returned error", {
        date,
        response: response.data,
        url: url.toString(),
      });
      return NO_PRICE;
    }

    return _.toNumber(response.data.rate);
  } catch (error) {
    handleFrankfurterError(logger, error, url);
    return NO_PRICE;
  }
}

function handleFrankfurterError(logger: Logger, error: unknown, url: URL): void {
  if (axios.isAxiosError(error)) {
    logger.error(`Failed to fetch exchange rate from Frankfurter API: ${error.message}`, {
      url: url.toString(),
    });
  }
}
