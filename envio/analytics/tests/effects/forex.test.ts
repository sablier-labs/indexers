import axios from "axios";
import type { Logger } from "envio";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { FRANKFURTER_BASE_URL } from "../../../common/constants.js";
import { fetchFromFrankfurterAPI, fetchGBPRateWithFallback } from "../../effects/forex.js";

vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
    isAxiosError: vi.fn(),
  },
}));

const mockedGet = vi.mocked(axios.get);
const mockedIsAxiosError = vi.mocked(axios.isAxiosError);

const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
} satisfies Logger;

function frankfurterResponse(date: string, rate = 1.2345) {
  return {
    data: {
      base: "GBP",
      date,
      quote: "USD",
      rate,
    },
  };
}

function httpError(status: number): Error & { response: { status: number } } {
  return Object.assign(new Error(`HTTP ${status}`), { response: { status } });
}

describe("fetchFromFrankfurterAPI", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a valid rate and applies the request timeout", async () => {
    mockedGet.mockResolvedValueOnce(frankfurterResponse("2023-12-25"));

    await expect(fetchFromFrankfurterAPI(mockLogger, "2023-12-25")).resolves.toBe(1.2345);
    expect(mockedGet).toHaveBeenCalledWith(`${FRANKFURTER_BASE_URL}/rate/GBP/USD?date=2023-12-25`, {
      timeout: 10_000,
    });
  });

  it.each([
    ["missing rate", { base: "GBP", date: "2023-01-01", quote: "USD" }],
    ["zero rate", { base: "GBP", date: "2023-01-01", quote: "USD", rate: 0 }],
    ["negative rate", { base: "GBP", date: "2023-01-01", quote: "USD", rate: -1 }],
    ["non-numeric rate", { base: "GBP", date: "2023-01-01", quote: "USD", rate: "1.2" }],
    ["wrong base", { base: "EUR", date: "2023-01-01", quote: "USD", rate: 1.2 }],
    ["wrong quote", { base: "GBP", date: "2023-01-01", quote: "EUR", rate: 1.2 }],
    ["wrong date", { base: "GBP", date: "2023-01-02", quote: "USD", rate: 1.2 }],
  ])("rejects a %s response", async (_scenario, data) => {
    mockedGet.mockResolvedValueOnce({ data });

    await expect(fetchFromFrankfurterAPI(mockLogger, "2023-01-01")).rejects.toThrow(
      "Invalid Frankfurter response for GBP/USD on 2023-01-01"
    );
    expect(mockLogger.error).toHaveBeenCalledWith(
      "Failed to fetch exchange rate from Frankfurter",
      expect.objectContaining({ date: "2023-01-01" })
    );
  });

  it("returns the no-rate sentinel for a 404", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValueOnce(httpError(404));

    await expect(fetchFromFrankfurterAPI(mockLogger, "2023-01-01")).resolves.toBe(0);
    expect(mockLogger.warn).toHaveBeenCalledWith(
      "No GBP/USD exchange rate available from Frankfurter for 2023-01-01",
      expect.objectContaining({ date: "2023-01-01" })
    );
  });

  it("propagates non-404 HTTP errors", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValueOnce(httpError(503));

    await expect(fetchFromFrankfurterAPI(mockLogger, "2023-01-01")).rejects.toThrow("HTTP 503");
    expect(mockLogger.error).toHaveBeenCalledWith(
      "Failed to fetch exchange rate from Frankfurter",
      expect.objectContaining({ status: 503 })
    );
  });

  it("propagates unexpected errors", async () => {
    const error = new Error("Unexpected failure");
    mockedIsAxiosError.mockReturnValue(false);
    mockedGet.mockRejectedValueOnce(error);

    await expect(fetchFromFrankfurterAPI(mockLogger, "2023-01-01")).rejects.toBe(error);
    expect(mockLogger.error).toHaveBeenCalledWith(
      "Failed to fetch exchange rate from Frankfurter",
      expect.objectContaining({ error: "Unexpected failure" })
    );
  });
});

describe("fetchGBPRateWithFallback", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the target-date rate without a fallback", async () => {
    mockedGet.mockResolvedValueOnce(frankfurterResponse("2024-03-15", 1.25));

    await expect(fetchGBPRateWithFallback(mockLogger, "2024-03-15")).resolves.toBe(1.25);
    expect(mockedGet).toHaveBeenCalledTimes(1);
    expect(mockLogger.warn).not.toHaveBeenCalled();
  });

  it("walks backward and returns the first available rate", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet
      .mockRejectedValueOnce(httpError(404))
      .mockRejectedValueOnce(httpError(404))
      .mockResolvedValueOnce(frankfurterResponse("2024-03-13", 1.3));

    await expect(fetchGBPRateWithFallback(mockLogger, "2024-03-15")).resolves.toBe(1.3);
    expect(mockedGet).toHaveBeenCalledTimes(3);
    expect(mockedGet).toHaveBeenNthCalledWith(
      1,
      expect.stringContaining("date=2024-03-15"),
      expect.any(Object)
    );
    expect(mockedGet).toHaveBeenNthCalledWith(
      2,
      expect.stringContaining("date=2024-03-14"),
      expect.any(Object)
    );
    expect(mockedGet).toHaveBeenNthCalledWith(
      3,
      expect.stringContaining("date=2024-03-13"),
      expect.any(Object)
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

  it("rejects when the target date and all fallback dates have no rate", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValue(httpError(404));

    await expect(fetchGBPRateWithFallback(mockLogger, "2024-03-15")).rejects.toThrow(
      "No GBP/USD exchange rate found for 2024-03-15 or the previous 7 days"
    );
    expect(mockedGet).toHaveBeenCalledTimes(8);
  });

  it("does not walk backward after an operational failure", async () => {
    mockedIsAxiosError.mockReturnValue(true);
    mockedGet.mockRejectedValueOnce(httpError(503));

    await expect(fetchGBPRateWithFallback(mockLogger, "2024-03-15")).rejects.toThrow("HTTP 503");
    expect(mockedGet).toHaveBeenCalledTimes(1);
  });
});
