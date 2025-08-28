import { describe, expect, it } from "vitest";
import { getDate, getDateTimestamp } from "../../common/time";

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
});
