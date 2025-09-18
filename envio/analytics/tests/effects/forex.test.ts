/** biome-ignore-all lint/suspicious/noExplicitAny: any is used to mock axios */
import axios from "axios";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CURRENCY_FREAKS_BASE_URL } from "../../../common/constants";
import { fetchFromCurrencyFreaksAPI } from "../../effects/forex";

// Mock axios
vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
  get: vi.fn(),
  isAxiosError: vi.fn(),
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
        }),
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
        }),
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
        }),
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
        }),
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
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-12-25&from=GBP&to=USD&amount=1`,
      );
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
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-01-01&from=GBP&to=USD&amount=1`,
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
        `${CURRENCY_FREAKS_BASE_URL}/convert/historical?apikey=test-api-key&date=2023-12-25&from=GBP&to=USD&amount=1`,
      );
    });
  });
});
