import axios from "axios";
import axiosRetry from "axios-retry";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import _ from "lodash";
import {
  avalanche,
  berachain,
  bsc,
  chiliz,
  hyperevm,
  mainnet,
  monad,
  polygon,
  sonic,
  sophon,
  xdc,
} from "sablier/evm/chains";
import { COINGECKO_BASE_URL } from "../../common/constants";

const MAX_RETRIES = 5;
const NO_PRICE = 0;

type CoinConfig = {
  api_id: string;
  effect: ReturnType<typeof createEffect>;
};

function createEffect(currency: string) {
  return experimental_createEffect(
    {
      cache: true,
      input: S.string,
      name: `${currency}_USD`,
      output: S.number,
    },
    async ({ context, input: date }) => {
      return await fetchCoinPrice(context.log, date, currency);
    },
  );
}

/**
 * How to add a new coin:
 *
 * 1. Add the coin configuration to the `coinConfigs` object below
 * 2. Update the `@sablier/price-data` package with the new coin's historical data
 * 3. Run `just price-data-sync` to copy the TSV file to `.envio/cache/`
 */
export const coinConfigs: Record<string, CoinConfig> = {
  [avalanche.nativeCurrency.symbol]: {
    api_id: "avalanche-2",
    effect: createEffect(avalanche.nativeCurrency.symbol),
  },
  [berachain.nativeCurrency.symbol]: {
    api_id: "berachain-bera",
    effect: createEffect(berachain.nativeCurrency.symbol),
  },
  [bsc.nativeCurrency.symbol]: {
    api_id: "binancecoin",
    effect: createEffect(bsc.nativeCurrency.symbol),
  },
  [chiliz.nativeCurrency.symbol]: {
    api_id: "chiliz",
    effect: createEffect(chiliz.nativeCurrency.symbol),
  },
  [hyperevm.nativeCurrency.symbol]: {
    api_id: "hyperliquid",
    effect: createEffect(hyperevm.nativeCurrency.symbol),
  },
  [mainnet.nativeCurrency.symbol]: {
    api_id: "ethereum",
    effect: createEffect(mainnet.nativeCurrency.symbol),
  },
  [polygon.nativeCurrency.symbol]: {
    api_id: "matic-network",
    effect: createEffect(polygon.nativeCurrency.symbol),
  },
  [monad.nativeCurrency.symbol]: {
    api_id: "monad",
    effect: createEffect(monad.nativeCurrency.symbol),
  },
  [sophon.nativeCurrency.symbol]: {
    api_id: "sophon",
    effect: createEffect(sophon.nativeCurrency.symbol),
  },
  [sonic.nativeCurrency.symbol]: {
    api_id: "sonic-3",
    effect: createEffect(sonic.nativeCurrency.symbol),
  },
  [xdc.nativeCurrency.symbol]: {
    api_id: "xdce-crowd-sale",
    effect: createEffect(xdc.nativeCurrency.symbol),
  },
};

type CoinGeckoResponse = {
  market_data: {
    current_price: {
      usd: number;
    };
  };
};

type CurrentPriceResponse = {
  [coinId: string]: {
    usd: number;
  };
};

/**
 * Check if a date string (DD-MM-YYYY format) is today in UTC
 */
function isToday(dateString: string): boolean {
  const today = new Date();
  const [day, month, year] = dateString.split("-");
  return (
    today.getUTCDate() === _.toInteger(day) &&
    today.getUTCMonth() + 1 === _.toInteger(month) &&
    today.getUTCFullYear() === _.toInteger(year)
  );
}

// Create axios instances with retry configuration for each API key
const createAxiosInstance = (apiKey: string) => {
  const instance = axios.create({
    headers: {
      "x-cg-demo-api-key": apiKey,
    },
  });

  axiosRetry(instance, {
    onRetry: (_retryCount, _error, _requestConfig) => {
      // This will be handled by the logger in fetchCoinPrice
    },
    retries: MAX_RETRIES,
    retryCondition: (error) => {
      // Retry on network errors, timeouts, and 429 status codes
      return axiosRetry.isNetworkOrIdempotentRequestError(error) || error.response?.status === 429;
    },
    retryDelay: (retryNumber, error) => {
      // If server provides Retry-After header, use it
      if (error.response?.headers["retry-after"]) {
        return Number(error.response.headers["retry-after"]) * 1000;
      }
      // Otherwise use exponential backoff starting at 1 second
      return 2 ** (retryNumber - 1) * 1000;
    },
  });

  return instance;
};

/**
 * Fetch the current price of a coin from CoinGecko's /simple/price endpoint.
 * Uses 3-way API key rotation for load distribution.
 * @see https://docs.coingecko.com/reference/simple-price
 */
async function fetchCurrentCoinPrice(logger: Logger, currency: string): Promise<number> {
  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/simple/price`);
  url.searchParams.set("ids", coinId);
  url.searchParams.set("vs_currencies", "usd");

  // Get API keys
  const COINGECKO_API_KEY_1 = process.env.ENVIO_COINGECKO_API_KEY_1;
  const COINGECKO_API_KEY_2 = process.env.ENVIO_COINGECKO_API_KEY_2;
  const COINGECKO_API_KEY_3 = process.env.ENVIO_COINGECKO_API_KEY_3;

  if (!COINGECKO_API_KEY_1 || !COINGECKO_API_KEY_2 || !COINGECKO_API_KEY_3) {
    throw new Error("ENVIO_COINGECKO_API_KEY_1, ENVIO_COINGECKO_API_KEY_2, and ENVIO_COINGECKO_API_KEY_3 must be set");
  }

  const apiKeys = [COINGECKO_API_KEY_1, COINGECKO_API_KEY_2, COINGECKO_API_KEY_3];
  const MAX_ATTEMPTS = 9; // 3 attempts per key

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const keyIndex = i % 3;
    const apiKey = apiKeys[keyIndex];
    const apiKeyName = String(keyIndex + 1);

    const axiosInstance = createAxiosInstance(apiKey);

    try {
      const response = await axiosInstance.get<CurrentPriceResponse>(url.toString());

      if (!response.data?.[coinId]?.usd) {
        throw new Error(`Invalid response structure from CoinGecko /simple/price API`);
      }

      return response.data[coinId].usd;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        logger.warn(
          `Failed to fetch current price (attempt ${i + 1}/${MAX_ATTEMPTS}) with API key ${apiKeyName}: ${error.message}`,
          {
            apiKeyName,
            attempt: i + 1,
            currency,
            status,
            url: url.toString(),
          },
        );

        if (i === MAX_ATTEMPTS - 1) {
          logger.error(`All ${MAX_ATTEMPTS} attempts exhausted for CoinGecko current price fetch`, {
            currency,
          });
        }
      } else {
        logger.error(`Unexpected error fetching CoinGecko current price: ${error}`, {
          currency,
        });
      }
    }
  }

  return NO_PRICE;
}

/**
 * Fetch the price of a coin from CoinGecko demo API using axios-retry with exponential backoff.
 * Alternates between three API keys for load distribution.
 * @see https://docs.coingecko.com/reference/coins-id-history
 */
export async function fetchCoinPrice(logger: Logger, date: string, currency: string): Promise<number> {
  // Route current-day requests to the live price endpoint
  if (isToday(date)) {
    return await fetchCurrentCoinPrice(logger, currency);
  }

  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/coins/${coinId}/history`);
  url.searchParams.set("date", date);
  url.searchParams.set("localization", "false");

  // Get API keys
  const COINGECKO_API_KEY_1 = process.env.ENVIO_COINGECKO_API_KEY_1;
  const COINGECKO_API_KEY_2 = process.env.ENVIO_COINGECKO_API_KEY_2;
  const COINGECKO_API_KEY_3 = process.env.ENVIO_COINGECKO_API_KEY_3;

  if (!COINGECKO_API_KEY_1 || !COINGECKO_API_KEY_2 || !COINGECKO_API_KEY_3) {
    throw new Error("ENVIO_COINGECKO_API_KEY_1, ENVIO_COINGECKO_API_KEY_2, and ENVIO_COINGECKO_API_KEY_3 must be set");
  }

  const apiKeys = [COINGECKO_API_KEY_1, COINGECKO_API_KEY_2, COINGECKO_API_KEY_3];
  const MAX_ATTEMPTS = 9; // 3 attempts per key

  for (let i = 0; i < MAX_ATTEMPTS; i++) {
    const keyIndex = i % 3;
    const apiKey = apiKeys[keyIndex];
    const apiKeyName = String(keyIndex + 1);

    const axiosInstance = createAxiosInstance(apiKey);

    try {
      const response = await axiosInstance.get<CoinGeckoResponse>(url.toString());

      if (!response.data?.market_data?.current_price?.usd) {
        throw new Error(`Invalid response structure from CoinGecko /coins/history API`);
      }

      return response.data.market_data.current_price.usd;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        logger.warn(
          `Failed to fetch price (attempt ${i + 1}/${MAX_ATTEMPTS}) with API key ${apiKeyName}: ${error.message}`,
          {
            apiKeyName,
            attempt: i + 1,
            currency,
            date,
            status,
            url: url.toString(),
          },
        );

        // If this was the last attempt, log final error
        if (i === MAX_ATTEMPTS - 1) {
          logger.error(`All ${MAX_ATTEMPTS} attempts exhausted for CoinGecko price fetch`, {
            currency,
            date,
          });
        }
      } else {
        logger.error(`Unexpected error fetching CoinGecko price: ${error}`, {
          currency,
          date,
        });
      }
    }
  }

  return NO_PRICE;
}
