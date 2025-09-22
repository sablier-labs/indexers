import axios from "axios";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import { avalanche, berachain, bsc, chiliz, hyperevm, mainnet, polygon, sonic, sophon, xdc } from "sablier/dist/chains";
import { COINGECKO_BASE_URL } from "../../common/constants";

const NO_PRICE = 0;
const dateType = S.string;

type CoinConfig = {
  api_id: string;
  effect: ReturnType<typeof createEffect>;
};

function createEffect(currency: string) {
  return experimental_createEffect(
    {
      cache: true,
      input: dateType,
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
    api_id: "xdc-network",
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

/**
 * @see https://docs.coingecko.com/reference/coins-id-history
 */
export async function fetchCoinPrice(logger: Logger, date: string, currency: string): Promise<number> {
  const COINGECKO_API_KEY = process.env.ENVIO_COINGECKO_API_KEY;
  if (!COINGECKO_API_KEY) {
    throw new Error("ENVIO_COINGECKO_API_KEY is not set");
  }

  const coinId = coinConfigs[currency].api_id;

  const url = new URL(`${COINGECKO_BASE_URL}/coins/${coinId}/history`);
  url.searchParams.set("date", date);
  url.searchParams.set("localization", "false");

  try {
    const response = await axios.get<CoinGeckoResponse>(url.toString(), {
      headers: {
        "x-cg-demo-api-key": COINGECKO_API_KEY,
      },
    });
    return response.data.market_data.current_price.usd;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Failed to fetch price from CoinGecko: ${error.message}`, {
        date,
        url: url.toString(),
      });
    }
    return NO_PRICE;
  }
}
