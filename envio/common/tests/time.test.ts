import { describe, expect, it } from "vitest";
import {
  getDate,
  getDateTimestamp,
  getDay,
  getMonth,
  getMonthTimestamp,
  getTimestamp,
  isToday,
} from "../../common/time";

describe("time", () => {
  describe("getDate", () => {
    it("should convert Unix timestamp to YYYY-MM-DD format", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      const actual = getDate(timestamp);
      expect(actual).toBe("2024-01-15");
    });

    it("should handle different dates", () => {
      // Unix timestamp for 2023-12-25 00:00:00 UTC
      const timestamp = 1_703_462_400;
      const actual = getDate(timestamp);
      expect(actual).toBe("2023-12-25");
    });

    it("should handle timestamps at end of day", () => {
      // Unix timestamp for 2024-06-01 23:59:59 UTC
      const timestamp = 1_717_286_399;
      const actual = getDate(timestamp);
      expect(actual).toBe("2024-06-01");
    });

    it("should handle epoch timestamp", () => {
      const timestamp = 0;
      const actual = getDate(timestamp);
      expect(actual).toBe("1970-01-01");
    });

    it("should handle leap year", () => {
      // Unix timestamp for 2024-02-29 15:00:00 UTC (leap year)
      const timestamp = 1_709_222_400;
      const actual = getDate(timestamp);
      expect(actual).toBe("2024-02-29");
    });
  });

  describe("getDateTimestamp", () => {
    it("should return Date object set to start of day", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      const actual = getDateTimestamp(timestamp);

      expect(actual).toBeInstanceOf(Date);
      expect(actual.getUTCHours()).toBe(0);
      expect(actual.getUTCMinutes()).toBe(0);
      expect(actual.getUTCSeconds()).toBe(0);
      expect(actual.getUTCMilliseconds()).toBe(0);
      expect(actual.toISOString().split("T")[0]).toBe("2024-01-15");
    });

    it("should handle different dates", () => {
      // Unix timestamp for 2023-12-25 23:59:59 UTC
      const timestamp = 1_703_548_799;
      const actual = getDateTimestamp(timestamp);

      expect(actual.getUTCHours()).toBe(0);
      expect(actual.getUTCMinutes()).toBe(0);
      expect(actual.getUTCSeconds()).toBe(0);
      expect(actual.getUTCMilliseconds()).toBe(0);
      expect(actual.toISOString().split("T")[0]).toBe("2023-12-25");
    });

    it("should handle epoch timestamp", () => {
      const timestamp = 0;
      const actual = getDateTimestamp(timestamp);

      expect(actual.getUTCHours()).toBe(0);
      expect(actual.getUTCMinutes()).toBe(0);
      expect(actual.getUTCSeconds()).toBe(0);
      expect(actual.getUTCMilliseconds()).toBe(0);
      expect(actual.toISOString().split("T")[0]).toBe("1970-01-01");
    });

    it("should normalize different times to same date", () => {
      // Different times on 2024-01-15
      const morning = 1_705_323_000; // 12:30:00 UTC
      const evening = 1_705_354_800; // 21:20:00 UTC

      const morningDate = getDateTimestamp(morning);
      const eveningDate = getDateTimestamp(evening);

      expect(morningDate.getTime()).toBe(eveningDate.getTime());
      expect(morningDate.toISOString().split("T")[0]).toBe("2024-01-15");
    });
  });

  describe("getTimestamp", () => {
    it("should convert Unix timestamp to Date preserving full time", () => {
      // Unix timestamp for 2024-01-15 12:50:45 UTC
      const timestamp = 1_705_323_045;
      const actual = getTimestamp(timestamp);

      expect(actual).toBeInstanceOf(Date);
      expect(actual.getUTCFullYear()).toBe(2024);
      expect(actual.getUTCMonth()).toBe(0); // January is 0
      expect(actual.getUTCDate()).toBe(15);
      expect(actual.getUTCHours()).toBe(12);
      expect(actual.getUTCMinutes()).toBe(50);
      expect(actual.getUTCSeconds()).toBe(45);
    });

    it("should handle epoch timestamp", () => {
      const timestamp = 0;
      const actual = getTimestamp(timestamp);

      expect(actual.getTime()).toBe(0);
      expect(actual.toISOString()).toBe("1970-01-01T00:00:00.000Z");
    });
  });

  describe("getDay", () => {
    it("should return 0 for epoch", () => {
      expect(getDay(0)).toBe(0n);
    });

    it("should calculate day number correctly", () => {
      // 86400 seconds = 1 day
      expect(getDay(86_400)).toBe(1n);
      expect(getDay(86_400 * 2)).toBe(2n);
      expect(getDay(86_400 * 365)).toBe(365n);
    });

    it("should truncate partial days", () => {
      // Less than a full day
      expect(getDay(86_399)).toBe(0n);
      // 1.5 days worth of seconds
      expect(getDay(86_400 + 43_200)).toBe(1n);
    });
  });

  describe("getMonth", () => {
    it("should return YYYY-MM format", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      expect(getMonth(timestamp)).toBe("2024-01");
    });

    it("should pad single-digit months", () => {
      // Unix timestamp for 2024-01-01 00:00:00 UTC
      const january = 1_704_067_200;
      expect(getMonth(january)).toBe("2024-01");

      // Unix timestamp for 2024-09-15 00:00:00 UTC
      const september = 1_726_358_400;
      expect(getMonth(september)).toBe("2024-09");
    });

    it("should handle December correctly", () => {
      // Unix timestamp for 2023-12-25 00:00:00 UTC
      const timestamp = 1_703_462_400;
      expect(getMonth(timestamp)).toBe("2023-12");
    });

    it("should handle epoch", () => {
      expect(getMonth(0)).toBe("1970-01");
    });
  });

  describe("isToday", () => {
    it("should return true for today's date", () => {
      const now = Math.floor(Date.now() / 1000);
      const today = getDate(now);
      expect(isToday(today)).toBe(true);
    });

    it("should return false for yesterday", () => {
      const yesterday = Math.floor(Date.now() / 1000) - 86_400;
      const yesterdayDate = getDate(yesterday);
      expect(isToday(yesterdayDate)).toBe(false);
    });

    it("should return false for tomorrow", () => {
      const tomorrow = Math.floor(Date.now() / 1000) + 86_400;
      const tomorrowDate = getDate(tomorrow);
      expect(isToday(tomorrowDate)).toBe(false);
    });

    it("should return false for a date in the past", () => {
      expect(isToday("2020-01-01")).toBe(false);
    });
  });

  describe("getMonthTimestamp", () => {
    it("should return Date at start of month", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      const actual = getMonthTimestamp(timestamp);

      expect(actual).toBeInstanceOf(Date);
      expect(actual.getUTCFullYear()).toBe(2024);
      expect(actual.getUTCMonth()).toBe(0); // January
      expect(actual.getUTCDate()).toBe(1);
      expect(actual.getUTCHours()).toBe(0);
      expect(actual.getUTCMinutes()).toBe(0);
      expect(actual.getUTCSeconds()).toBe(0);
      expect(actual.getUTCMilliseconds()).toBe(0);
    });

    it("should handle different months", () => {
      // Unix timestamp for 2024-06-20 15:45:00 UTC
      const timestamp = 1_718_894_700;
      const actual = getMonthTimestamp(timestamp);

      expect(actual.getUTCFullYear()).toBe(2024);
      expect(actual.getUTCMonth()).toBe(5); // June
      expect(actual.getUTCDate()).toBe(1);
      expect(actual.toISOString()).toBe("2024-06-01T00:00:00.000Z");
    });

    it("should handle epoch", () => {
      const actual = getMonthTimestamp(0);
      expect(actual.toISOString()).toBe("1970-01-01T00:00:00.000Z");
    });

    it("should normalize different days to same month start", () => {
      // Different days in January 2024
      const jan15 = 1_705_323_000; // 2024-01-15
      const jan31 = 1_706_659_200; // 2024-01-31

      const start15 = getMonthTimestamp(jan15);
      const start31 = getMonthTimestamp(jan31);

      expect(start15.getTime()).toBe(start31.getTime());
      expect(start15.toISOString()).toBe("2024-01-01T00:00:00.000Z");
    });
  });
});
