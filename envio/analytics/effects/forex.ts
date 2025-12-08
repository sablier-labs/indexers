import axios from "axios";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import _ from "lodash";
import { CURRENCY_FREAKS_BASE_URL } from "../../common/constants";
import { isToday } from "../../common/time";

type CurrencyFreaksResponse = {
  rate: number;
};

type CurrencyFreaksLatestResponse = {
  rates: {
    [currency: string]: string;
  };
};

const NO_PRICE = 0;
const dateType = S.string;

export const fetchGBPExchangeRate = experimental_createEffect(
  {
    cache: true,
    input: dateType,
    name: "GBP_USD",
    output: S.number,
  },
  async ({ context, input: date }) => {
    const CURRENCY_FREAKS_API_KEY = process.env.ENVIO_CURRENCY_FREAKS_API_KEY;
    if (!CURRENCY_FREAKS_API_KEY) {
      throw new Error("ENVIO_CURRENCY_FREAKS_API_KEY is not set");
    }
    if (isToday(date)) {
      return await fetchTodayGBPRate(context.log, CURRENCY_FREAKS_API_KEY);
    }
    return await fetchFromCurrencyFreaksAPI(context.log, date, CURRENCY_FREAKS_API_KEY);
  },
);

/**
 * Fetch the latest exchange rate for GBP to USD
 * @see https://currencyfreaks.com/documentation.html
 */
async function fetchTodayGBPRate(logger: Logger, apiKey: string): Promise<number> {
  const url = new URL(`${CURRENCY_FREAKS_BASE_URL}/rates/latest`);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("symbols", "GBP");

  try {
    const response = await axios.get<CurrencyFreaksLatestResponse>(url.toString());

    if (!response.data.rates?.GBP) {
      logger.error("Failed to fetch latest GBP rate: API returned no GBP rate", {
        response: response.data,
        url: url.toString(),
      });
      return NO_PRICE;
    }

    // Convert USD to GBP rate to GBP to USD rate
    const usdToGbpRate = _.toNumber(response.data.rates.GBP);
    if (_.isNaN(usdToGbpRate) || usdToGbpRate === 0) {
      logger.error("Invalid GBP rate received", { rate: response.data.rates.GBP });
      return NO_PRICE;
    }

    // The API returns USD to GBP rate, but we need GBP to USD rate
    const gbpToUsdRate = 1 / usdToGbpRate;
    // Truncate to 4 decimal places
    return Math.trunc(gbpToUsdRate * 10_000) / 10_000;
  } catch (error) {
    handleCurrencyFreaksError(logger, error, url);
    return NO_PRICE;
  }
}

/**
 * @see https://currencyfreaks.com/documentation.html
 */
export async function fetchFromCurrencyFreaksAPI(logger: Logger, date: string, apiKey: string): Promise<number> {
  const url = new URL(`${CURRENCY_FREAKS_BASE_URL}/convert/historical`);
  url.searchParams.set("apikey", apiKey);
  url.searchParams.set("date", date);
  url.searchParams.set("from", "GBP");
  url.searchParams.set("to", "USD");
  url.searchParams.set("amount", "1");

  try {
    const response = await axios.get<CurrencyFreaksResponse>(url.toString());

    if (!response.data.rate || _.isNaN(response.data.rate)) {
      logger.error("Failed to fetch exchange rate: API returned error", {
        date,
        response: response,
        url: url.toString(),
      });
      return NO_PRICE;
    }

    return _.toNumber(response.data.rate);
  } catch (error) {
    handleCurrencyFreaksError(logger, error, url);
    return NO_PRICE;
  }
}

function handleCurrencyFreaksError(logger: Logger, error: unknown, url: URL): void {
  if (axios.isAxiosError(error)) {
    logger.error(`Failed to fetch exchange rate from CurrencyFreaks API: ${error.message}`, {
      url: url.toString(),
    });
  }
}
