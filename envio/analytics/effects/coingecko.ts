import axios from "axios";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import { avalanche, berachain, bsc, chiliz, mainnet, polygon } from "sablier/dist/chains";
import { COINGECKO_BASE_URL } from "../../common/constants";

const NO_PRICE = 0;
const dateType = S.string;

const COINGECKO_IDS = {
  [avalanche.nativeCurrency.symbol]: "avalanche-2",
  [berachain.nativeCurrency.symbol]: "berachain-bera",
  [bsc.nativeCurrency.symbol]: "binancecoin",
  [chiliz.nativeCurrency.symbol]: "chiliz",
  [mainnet.nativeCurrency.symbol]: "ethereum",
  [polygon.nativeCurrency.symbol]: "matic-network",
} as const;

function create(currency: string) {
  return experimental_createEffect(
    {
      cache: true,
      input: dateType,
      name: `${currency}_USD`,
      output: S.number,
    },
    async ({ context, input: date }) => {
      return fetchFromCoinGecko(context.log, date, currency);
    },
  );
}

export const fetchCryptoPrice = {
  [avalanche.nativeCurrency.symbol]: create(avalanche.nativeCurrency.symbol),
  [berachain.nativeCurrency.symbol]: create(berachain.nativeCurrency.symbol),
  [bsc.nativeCurrency.symbol]: create(bsc.nativeCurrency.symbol),
  [chiliz.nativeCurrency.symbol]: create(chiliz.nativeCurrency.symbol),
  GBP: create("GBP"),
  [mainnet.nativeCurrency.symbol]: create(mainnet.nativeCurrency.symbol),
  [polygon.nativeCurrency.symbol]: create(polygon.nativeCurrency.symbol),
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
export async function fetchFromCoinGecko(logger: Logger, date: string, currency: string): Promise<number> {
  const COINGECKO_API_KEY = process.env.ENVIO_COINGECKO_API_KEY;
  if (!COINGECKO_API_KEY) {
    throw new Error("ENVIO_COINGECKO_API_KEY is not set");
  }

  if (!COINGECKO_IDS[currency]) {
    throw new Error("COINGECKO_IDS[currency] is not set");
  }
  const coinId = COINGECKO_IDS[currency];

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
