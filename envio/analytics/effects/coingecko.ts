import axios from "axios";
import axiosRetry from "axios-retry";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
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
import { isToday } from "../../common/time";

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
    }
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

function getApiKey(): string {
  const apiKey = process.env.ENVIO_COINGECKO_API_KEY;
  if (!apiKey) {
    throw new Error("ENVIO_COINGECKO_API_KEY must be set");
  }
  return apiKey;
}

// Create axios instance with retry configuration
const createAxiosInstance = (apiKey: string) => {
  const instance = axios.create({
    headers: {
      "x-cg-pro-api-key": apiKey,
    },
  });

  axiosRetry(instance, {
    onRetry: (_retryCount, _error, _requestConfig) => {
      // This will be handled by the logger in fetch functions
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
 * Fetch the current price of a coin from CoinGecko Pro API's /simple/price endpoint.
 * Uses axios-retry with exponential backoff (up to 5 retries).
 * @see https://docs.coingecko.com/reference/simple-price
 */
async function fetchCurrentCoinPrice(logger: Logger, currency: string): Promise<number> {
  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/simple/price`);
  url.searchParams.set("ids", coinId);
  url.searchParams.set("vs_currencies", "usd");

  const axiosInstance = createAxiosInstance(getApiKey());

  try {
    const response = await axiosInstance.get<CurrentPriceResponse>(url.toString());

    if (!response.data?.[coinId]?.usd) {
      logger.warn(`No current price available from CoinGecko for ${currency}`, {
        coinId,
      });
      return NO_PRICE;
    }

    return response.data[coinId].usd;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Failed to fetch current price after ${MAX_RETRIES} retries: ${error.message}`, {
        currency,
        status: error.response?.status,
        url: url.toString(),
      });
    } else {
      logger.error(`Unexpected error fetching CoinGecko current price: ${error}`, {
        currency,
      });
    }
  }

  return NO_PRICE;
}

/**
 * Fetch the price of a coin from CoinGecko Pro API using axios-retry with exponential backoff (up to 5 retries).
 * @see https://docs.coingecko.com/reference/coins-id-history
 */
export async function fetchCoinPrice(
  logger: Logger,
  date: string,
  currency: string
): Promise<number> {
  // Route current-day requests to the live price endpoint
  if (isToday(date)) {
    return await fetchCurrentCoinPrice(logger, currency);
  }

  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/coins/${coinId}/history`);
  url.searchParams.set("date", date);
  url.searchParams.set("localization", "false");

  const axiosInstance = createAxiosInstance(getApiKey());

  try {
    const response = await axiosInstance.get<CoinGeckoResponse>(url.toString());

    if (!response.data?.market_data?.current_price?.usd) {
      logger.warn(`No price data available from CoinGecko for ${currency} on ${date}`, {
        coinId,
        date,
      });
      return NO_PRICE;
    }

    return response.data.market_data.current_price.usd;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Failed to fetch price after ${MAX_RETRIES} retries: ${error.message}`, {
        currency,
        date,
        status: error.response?.status,
        url: url.toString(),
      });
    } else {
      logger.error(`Unexpected error fetching CoinGecko price: ${error}`, {
        currency,
        date,
      });
    }
  }

  return NO_PRICE;
}
