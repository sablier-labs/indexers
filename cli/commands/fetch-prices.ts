import * as fs from "node:fs";
import * as path from "node:path";
import axios from "axios";
import type { Command } from "commander";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import _ from "lodash";
import { coinConfigs } from "../../envio/analytics/effects/coingecko";
import { COINGECKO_BASE_URL } from "../../envio/common/constants";
import * as helpers from "../helpers";

dayjs.extend(utc);

const MAX_RETRIES = 5;
const RETRY_DELAY = 1000; // 1 second

type FetchPricesOptions = {
  currency: string;
  month?: string;
  year?: string;
};

type CoinGeckoRangeResponse = {
  prices: Array<[number, number]>; // [timestamp, price]
};

function createFetchPricesCommand(): Command {
  const command = helpers.createBaseCmd("Fetch historical prices for a currency from CoinGecko");

  command
    .requiredOption("--currency <symbol>", "Currency symbol (e.g., ETH, BTC)")
    .option("--year <YYYY>", "Year in YYYY format (defaults to current year)")
    .option("--month <MM>", "Month in MM format (01-12) (defaults to current month)")
    .action(async (options: FetchPricesOptions) => {
      await fetchPricesAction(options);
    });

  return command;
}

export const fetchPricesCmd = createFetchPricesCommand();

async function fetchPricesAction(options: FetchPricesOptions): Promise<void> {
  const { currency } = options;

  // Apply defaults for year and month
  const now = dayjs.utc();
  const currentYear = now.year();
  const currentMonth = now.month() + 1; // dayjs month() returns 0-11

  let year: string;
  let month: string;

  if (options.month) {
    month = options.month;
  } else {
    // Default to current month
    month = currentMonth.toString().padStart(2, "0");
  }

  if (options.year) {
    year = options.year;
  } else {
    // Default to current year
    year = currentYear.toString();
  }

  // Validate inputs
  validateInputs(currency, year, month);

  const yearNum = _.toNumber(year);
  const monthNum = _.toNumber(month);

  console.log(`🔍 Fetching ${currency} prices for ${year}-${month.padStart(2, "0")}`);

  // Calculate date range
  const { fromTimestamp, toTimestamp } = calculateDateRange(yearNum, monthNum);

  try {
    // Fetch prices from CoinGecko
    const priceData = await fetchPricesFromCoinGecko(currency, fromTimestamp, toTimestamp);

    // Process and update TSV file
    await updateTsvFile(currency, priceData, yearNum, monthNum);

    console.log(`✅ Successfully updated ${currency}_USD.tsv with ${priceData.length} price entries`);
  } catch (error) {
    console.error(`❌ Failed to fetch prices: ${error instanceof Error ? error.message : String(error)}`);
    throw error;
  }
}

function validateInputs(currency: string, year: string, month: string): void {
  // Check if currency is supported
  if (!coinConfigs[currency]) {
    const supportedCurrencies = Object.keys(coinConfigs).join(", ");
    throw new Error(`Currency "${currency}" is not supported. Available currencies: ${supportedCurrencies}`);
  }

  // Validate year format
  const yearNum = _.toNumber(year);
  if (_.isNaN(yearNum) || year.length !== 4 || yearNum < 2025) {
    throw new Error("Year must be in YYYY format (starting from 2025)");
  }

  // Validate month format
  const monthNum = Number.parseInt(month, 10);
  if (_.isNaN(monthNum) || monthNum < 1 || monthNum > 12) {
    throw new Error("Month must be between 01 and 12");
  }

  // Check if date is not in the future
  const now = dayjs.utc();
  const currentYear = now.year();
  const currentMonth = now.month() + 1; // dayjs month() returns 0-11

  if (yearNum > currentYear || (yearNum === currentYear && monthNum > currentMonth)) {
    throw new Error("Cannot fetch prices for future dates");
  }
}

function calculateDateRange(year: number, month: number): { fromTimestamp: number; toTimestamp: number } {
  const now = dayjs.utc();
  const currentYear = now.year();
  const currentMonth = now.month() + 1; // dayjs month() returns 0-11

  // Start of the month at 00:00 UTC
  const fromDate = dayjs
    .utc()
    .year(year)
    .month(month - 1)
    .startOf("month");
  const fromTimestamp = fromDate.unix();

  let toTimestamp: number;

  if (year === currentYear && month === currentMonth) {
    // Current month: use yesterday at 00:00 UTC
    const yesterday = now.subtract(1, "day").startOf("day");
    toTimestamp = yesterday.unix();
  } else {
    // Past months: use first day of next month at 00:00 UTC
    const toDate = fromDate.add(1, "month");
    toTimestamp = toDate.unix();
  }

  return { fromTimestamp, toTimestamp };
}

async function fetchPricesFromCoinGecko(
  currency: string,
  fromTimestamp: number,
  toTimestamp: number,
): Promise<Array<{ date: string; price: number }>> {
  const COINGECKO_API_KEY = process.env.ENVIO_COINGECKO_API_KEY;
  if (!COINGECKO_API_KEY) {
    throw new Error("ENVIO_COINGECKO_API_KEY environment variable is not set");
  }

  const coinId = coinConfigs[currency].api_id;
  const url = new URL(`${COINGECKO_BASE_URL}/coins/${coinId}/market_chart/range`);
  url.searchParams.set("from", fromTimestamp.toString());
  url.searchParams.set("to", toTimestamp.toString());
  url.searchParams.set("vs_currency", "usd");

  for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
    try {
      const response = await axios.get<CoinGeckoRangeResponse>(url.toString(), {
        headers: {
          "x-cg-demo-api-key": COINGECKO_API_KEY,
        },
      });

      // Process the response to extract first price for each date
      const pricesByDate = new Map<string, number>();

      for (const [timestamp, price] of response.data.prices) {
        const date = dayjs(timestamp).utc().format("YYYY-MM-DD");

        // Only keep the first price for each date
        if (!pricesByDate.has(date)) {
          pricesByDate.set(date, price);
        }
      }

      // Convert to array and sort by date
      return Array.from(pricesByDate.entries())
        .map(([date, price]) => ({ date, price }))
        .sort((a, b) => a.date.localeCompare(b.date));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        // Handle rate limiting
        if (status === 429 && attempt < MAX_RETRIES) {
          const retryAfter = error.response?.headers["retry-after"];
          const waitTime = retryAfter ? Number(retryAfter) * 1000 : RETRY_DELAY * 2 ** attempt;

          console.warn(
            `⚠️  Rate limited by CoinGecko (429). Retrying in ${waitTime}ms... (attempt ${attempt + 1}/${MAX_RETRIES + 1})`,
          );

          await delay(waitTime);
          continue; // Retry the request
        }

        // Log error for non-429 errors or after max retries
        console.error(`Failed to fetch prices from CoinGecko: ${error.message}`, {
          attempt: attempt + 1,
          status,
          url: url.toString(),
        });
      }

      // If it's the last attempt or a non-retryable error, throw error
      if (attempt === MAX_RETRIES) {
        throw new Error(`Max retries (${MAX_RETRIES}) exceeded for CoinGecko price fetch`);
      }

      throw error;
    }
  }

  throw new Error("Unexpected error in fetchPricesFromCoinGecko");
}

async function updateTsvFile(
  currency: string,
  priceData: Array<{ date: string; price: number }>,
  year: number,
  month: number,
): Promise<void> {
  const cacheDir = path.join(process.cwd(), "envio", "analytics", ".envio", "cache");
  const tsvPath = path.join(cacheDir, `${currency}_USD.tsv`);

  // Ensure cache directory exists
  if (!fs.existsSync(cacheDir)) {
    fs.mkdirSync(cacheDir, { recursive: true });
  }

  const existingEntries: Array<{ date: string; price: number }> = [];

  // Read existing TSV file if it exists
  if (fs.existsSync(tsvPath)) {
    const content = fs.readFileSync(tsvPath, "utf-8");
    const lines = content.trim().split("\n");

    // Skip header line and parse entries
    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (line) {
        const [dateQuoted, priceStr] = line.split("\t");
        const date = dateQuoted.replace(/"/g, ""); // Remove quotes
        const price = Number.parseFloat(priceStr);

        if (!Number.isNaN(price)) {
          existingEntries.push({ date, price });
        }
      }
    }
  }

  // Filter out dates that already exist and are within the target month
  const targetMonthStr = `${year}-${month.toString().padStart(2, "0")}`;
  const existingDatesInMonth = new Set(
    existingEntries.filter((entry) => entry.date.startsWith(targetMonthStr)).map((entry) => entry.date),
  );

  const newEntries = priceData.filter((entry) => !existingDatesInMonth.has(entry.date));

  if (newEntries.length === 0) {
    console.log(`ℹ️  No new price data to add for ${currency} in ${targetMonthStr}`);
    return;
  }

  // Combine existing and new entries, then sort by date
  const allEntries = [...existingEntries, ...newEntries].sort((a, b) => a.date.localeCompare(b.date));

  // Write TSV file
  const tsvContent = ["id\toutput", ...allEntries.map((entry) => `"${entry.date}"\t${entry.price}`)].join("\n") + "\n";

  fs.writeFileSync(tsvPath, tsvContent, "utf-8");

  console.log(`📁 Updated ${path.relative(process.cwd(), tsvPath)} with ${newEntries.length} new entries`);
}

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
