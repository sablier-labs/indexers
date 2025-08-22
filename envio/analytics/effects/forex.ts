import axios from "axios";
import type { Logger } from "envio";
import { experimental_createEffect, S } from "envio";
import { FIXER_BASE_URL } from "../../common/constants";

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
    return await fetchFromFixerAPI(context.log, date, "GBP", "USD");
  },
);

type FixerResponse = {
  date: string;
  base: string;
  historical: boolean;
  rates: Record<string, number>;
  success: boolean;
  timestamp: number;
};

/**
 * @see https://fixer.io/documentation
 */
export async function fetchFromFixerAPI(logger: Logger, date: string, from: string, to: string): Promise<number> {
  const FIXER_API_KEY = process.env.ENVIO_FIXER_API_KEY;
  if (!FIXER_API_KEY) {
    throw new Error("ENVIO_FIXER_API_KEY is not set");
  }

  const url = new URL(`${FIXER_BASE_URL}/${date}`);
  url.searchParams.set("access_key", FIXER_API_KEY);
  url.searchParams.set("base", from);
  url.searchParams.set("symbols", to);

  try {
    const response = await axios.get<FixerResponse>(url.toString());

    if (!response.data.success || !response.data.rates || !response.data.rates[to]) {
      logger.error("Failed to fetch exchange rate: API returned error", {
        date,
        response: response,
        url: url.toString(),
      });
      return NO_PRICE;
    }

    return response.data.rates[to];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      logger.error(`Failed to fetch exchange rate from Fixer API: ${error.message}`, {
        date,
        url: url.toString(),
      });
    }
    return NO_PRICE;
  }
}
