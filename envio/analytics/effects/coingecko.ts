import axios from "axios";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import { avalanche, berachain, bsc, chiliz, hyperevm, mainnet, polygon, sonic, sophon, xdc } from "sablier/dist/chains";
import { COINGECKO_BASE_URL } from "../../common/constants";

const MAX_RETRIES = 5;
const NO_PRICE = 0;
const RETRY_DELAY = 1000; // 1 second

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
 * 1. Go to the coin's CoinGecko page, the "Historical Data" section
 * 2. Download the CSV file using the icon in the top right
 * 3. Open the CSV file in a text editor
 * 4. Ask an LLM to convert it to the TSV format
 * 5. Save the file in the {@link file://./../.envio/cache/ETH_USD.tsv} directory
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

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * Fetch the price of a coin from CoinGecko demo API using an exponential backoff strategy.
 * If the request is rate limited, the function will retry after the specified delay.
 * If the request fails after the maximum number of retries, the function will return NO_PRICE.
 * @see https://docs.coingecko.com/reference/coins-id-history
 */
export async function fetchCoinPrice(logger: Logger, date: string, currency: string): Promise<number> {
  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/coins/${coinId}/history`);
  url.searchParams.set("date", date);
  url.searchParams.set("localization", "false");

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    // Use API key based on attempt parity: odd attempts use _1, even attempts use _2
    const isOddAttempt = attempt % 2 === 1;
    const COINGECKO_API_KEY = isOddAttempt
      ? process.env.ENVIO_COINGECKO_API_KEY_1
      : process.env.ENVIO_COINGECKO_API_KEY_2;

    if (!COINGECKO_API_KEY) {
      throw new Error(`ENVIO_COINGECKO_API_KEY_${isOddAttempt ? "1" : "2"} is not set`);
    }

    try {
      const response = await axios.get<CoinGeckoResponse>(url.toString(), {
        headers: {
          "x-cg-demo-api-key": COINGECKO_API_KEY,
        },
      });
      return response.data.market_data.current_price.usd;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Handle rate limiting
        if (status === 429 && attempt < MAX_RETRIES) {
          const retryAfter = error.response?.headers["retry-after"];
          const waitTime = retryAfter ? Number(retryAfter) * 1000 : RETRY_DELAY;

          logger.warn(
            `Rate limited by CoinGecko (429). Retrying in ${waitTime}ms... (attempt ${attempt + 1}/${MAX_RETRIES})`,
            {
              currency,
              date,
              retryAfter,
            },
          );

          await delay(waitTime);
          continue; // Retry the request
        }

        // Log error for non-429 errors or after max retries
        logger.error(`Failed to fetch price from CoinGecko: ${error.message}`, {
          attempt: attempt + 1,
          date,
          status,
          url: url.toString(),
        });
      }

      // If it's the last attempt or a non-retryable error, return NO_PRICE
      if (attempt === MAX_RETRIES) {
        logger.error(`Max retries (${MAX_RETRIES}) exceeded for CoinGecko price fetch`, {
          currency,
          date,
        });
      }

      return NO_PRICE;
    }
  }

  return NO_PRICE;
}
