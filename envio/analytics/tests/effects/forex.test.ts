/** biome-ignore-all lint/suspicious/noExplicitAny: any is used to mock axios */
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CURRENCY_FREAKS_BASE_URL } from "../../../common/constants.js";
import { fetchFromCurrencyFreaksAPI, fetchGBPRateWithFallback } from "../../effects/forex.js";

// Mock axios
vi.mock("axios", () => ({
  get: vi.fn(),
  isAxiosError: vi.fn(),
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

const mockedAxios = axios as any;

// Mock logger
const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
};

describe("fetchFromCurrencyFreaksAPI", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    vi.clearAllMocks();
    // Reset environment variables
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  describe("error handling scenarios", () => {
    it("should return 0 when API key parameter is missing", async () => {
      // Test the function directly with missing API key parameter
      await expect(fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "")).resolves.toBe(0);
    });

    it("should return 0 when API returns no rate", async () => {
      const mockResponse = {
        data: {
          // rate is missing
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(0);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch exchange rate: API returned error",
        expect.objectContaining({
          date: "2023-01-01",
          response: mockResponse,
          url: expect.stringContaining(CURRENCY_FREAKS_BASE_URL),
        })
      );
    });

    it("should return 0 when rate is zero", async () => {
      const mockResponse = {
        data: {
          rate: 0,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(0);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch exchange rate: API returned error",
        expect.objectContaining({
          date: "2023-01-01",
          response: mockResponse,
        })
      );
    });

    it("should return 0 when rate is null", async () => {
      const mockResponse = {
        data: {
          rate: null,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(0);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch exchange rate: API returned error",
        expect.objectContaining({
          date: "2023-01-01",
          response: mockResponse,
        })
      );
    });

    it("should return 0 and log error for axios errors", async () => {
      const axiosError = new Error("Network Error");
      (axiosError as any).isAxiosError = true;
      mockedAxios.isAxiosError.mockReturnValue(true);
      mockedAxios.get.mockRejectedValueOnce(axiosError);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(0);
      expect(mockLogger.error).toHaveBeenCalledWith(
        "Failed to fetch exchange rate from CurrencyFreaks API: Network Error",
        expect.objectContaining({
          url: expect.stringContaining(CURRENCY_FREAKS_BASE_URL),
        })
      );
    });

    it("should return 0 for non-axios errors without logging", async () => {
      const genericError = new Error("Some other error");
      mockedAxios.isAxiosError.mockReturnValue(false);
      mockedAxios.get.mockRejectedValueOnce(genericError);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(0);
      // Should not log error for non-axios errors
      expect(mockLogger.error).not.toHaveBeenCalled();
    });
  });

  describe("URL construction", () => {
    beforeEach(() => {
      const mockResponse = {
        data: {
          rate: 1.2345,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);
    });

    it("should construct correct URL with parameters", async () => {
      await fetchFromCurrencyFreaksAPI(mockLogger, "2023-12-25", "test-api-key");

      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-12-25&from=GBP&to=USD&amount=1`
      );
    });
  });

  describe("walk-back fallback", () => {
    it("should return the primary rate without warning when first call succeeds", async () => {
      mockedAxios.get.mockResolvedValueOnce({ data: { rate: 1.25 } });

      const result = await fetchGBPRateWithFallback(mockLogger, "2024-03-15", "test-api-key");

      expect(result).toBe(1.25);
      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(mockLogger.warn).not.toHaveBeenCalled();
    });

    it("should walk back and return the first available rate", async () => {
      // 2024-03-15 misses, 2024-03-14 misses, 2024-03-13 succeeds with 1.30
      mockedAxios.get
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: {} })
        .mockResolvedValueOnce({ data: { rate: 1.3 } });

      const result = await fetchGBPRateWithFallback(mockLogger, "2024-03-15", "test-api-key");

      expect(result).toBe(1.3);
      expect(mockedAxios.get).toHaveBeenCalledTimes(3);
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        1,
        expect.stringContaining("date=2024-03-15")
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        2,
        expect.stringContaining("date=2024-03-14")
      );
      expect(mockedAxios.get).toHaveBeenNthCalledWith(
        3,
        expect.stringContaining("date=2024-03-13")
      );
      expect(mockLogger.warn).toHaveBeenCalledWith(
        "Using fallback GBP rate from 2024-03-13 (target 2024-03-15)",
        expect.objectContaining({
          candidate: "2024-03-13",
          offsetDays: 2,
          target: "2024-03-15",
        })
      );
    });

    it("should return 0 when all fallback dates miss", async () => {
      // All 8 calls (target + 7 fallbacks) miss
      for (let i = 0; i < 8; i++) {
        mockedAxios.get.mockResolvedValueOnce({ data: {} });
      }

      const result = await fetchGBPRateWithFallback(mockLogger, "2024-03-15", "test-api-key");

      expect(result).toBe(0);
      expect(mockedAxios.get).toHaveBeenCalledTimes(8);
      expect(mockLogger.warn).not.toHaveBeenCalled();
    });
  });

  describe("success scenarios", () => {
    it("should return exchange rate for successful API response", async () => {
      const mockResponse = {
        data: {
          rate: 1.2345,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-01-01", "test-api-key");

      expect(result).toBe(1.2345);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-01-01&from=GBP&to=USD&amount=1`
      );
    });

    it("should handle different date formats correctly", async () => {
      const mockResponse = {
        data: {
          rate: 1.3456,
        },
      };

      mockedAxios.get.mockResolvedValueOnce(mockResponse);

      const result = await fetchFromCurrencyFreaksAPI(mockLogger, "2023-12-25", "test-api-key");

      expect(result).toBe(1.3456);
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-12-25&from=GBP&to=USD&amount=1`
      );
    });
  });
});
