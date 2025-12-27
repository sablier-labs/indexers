import { describe, expect, it } from "vitest";
import { Id } from "../helpers/id";

describe("Id", () => {
  /* -------------------------------------------------------------------------- */
  /*                             DAILY FIAT FEES                                */
  /* -------------------------------------------------------------------------- */
  describe("dailyFiatFees", () => {
    it("should create daily fiat fees id", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      const actual = Id.dailyFiatFees(timestamp);
      expect(actual).toBe("2024-01-15");
    });

    it("should handle different chain ids", () => {
      // Unix timestamp for 2023-12-25 00:00:00 UTC
      const timestamp = 1_703_462_400;
      const actual = Id.dailyFiatFees(timestamp);
      expect(actual).toBe("2023-12-25");
    });

    it("should handle timestamps at different times of day", () => {
      // Unix timestamp for 2024-06-01 23:59:59 UTC
      const timestamp = 1_717_286_399;
      const actual = Id.dailyFiatFees(timestamp);
      expect(actual).toBe("2024-06-01");
    });

    it("should handle epoch timestamp", () => {
      const timestamp = 0;
      const actual = Id.dailyFiatFees(timestamp);
      expect(actual).toBe("1970-01-01");
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                           DAILY CRYPTO FEES                                */
  /* -------------------------------------------------------------------------- */

  describe("dailyCryptoFees", () => {
    it("should create daily crypto fees id", () => {
      // Unix timestamp for 2024-01-15 12:30:00 UTC
      const timestamp = 1_705_323_000;
      const actual = Id.dailyCryptoFees(1, timestamp);
      expect(actual).toBe("2024-01-15_ETH");
    });

    it("should handle different chain ids", () => {
      // Unix timestamp for 2023-12-25 00:00:00 UTC
      const timestamp = 1_703_462_400;
      const actual = Id.dailyCryptoFees(137, timestamp);
      expect(actual).toBe("2023-12-25_POL");
    });

    it("should handle timestamps at different times of day", () => {
      // Unix timestamp for 2024-06-01 23:59:59 UTC
      const timestamp = 1_717_286_399;
      const actual = Id.dailyCryptoFees(1, timestamp);
      expect(actual).toBe("2024-06-01_ETH");
    });

    it("should handle epoch timestamp", () => {
      const timestamp = 0;
      const actual = Id.dailyCryptoFees(1, timestamp);
      expect(actual).toBe("1970-01-01_ETH");
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                             FEE TRANSACTION                                */
  /* -------------------------------------------------------------------------- */

  describe("feeTransaction", () => {
    it("should create fee transaction id", () => {
      const chainId = 1;
      const hash = "0xabc123def456";
      const actual = Id.feeTransaction(chainId, hash);
      expect(actual).toBe("1_0xabc123def456");
    });

    it("should handle different chain ids", () => {
      const chainId = 137;
      const hash = "0xdef789ghi012";
      const actual = Id.feeTransaction(chainId, hash);
      expect(actual).toBe("137_0xdef789ghi012");
    });

    it("should handle empty hash", () => {
      const actual = Id.feeTransaction(1, "");
      expect(actual).toBe("1_");
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                                    USER                                    */
  /* -------------------------------------------------------------------------- */

  describe("user", () => {
    it("should create user id with lowercase address", () => {
      const actual = Id.user(1, "0xABCDEF123456789");
      expect(actual).toBe("1_0xabcdef123456789");
    });

    it("should handle different chain ids", () => {
      const actual = Id.user(42, "0x1234567890AbCdEf");
      expect(actual).toBe("42_0x1234567890abcdef");
    });

    it("should handle zero chain id", () => {
      const actual = Id.user(0, "0xABC123");
      expect(actual).toBe("0_0xabc123");
    });
  });

  /* -------------------------------------------------------------------------- */
  /*                              USER TRANSACTION                              */
  /* -------------------------------------------------------------------------- */

  describe("userTransaction", () => {
    it("should create user transaction id", () => {
      const userId = "1_0xabc123";
      const hash = "0xdef456";
      const actual = Id.userTransaction(userId, hash);
      expect(actual).toBe("1_0xabc123_0xdef456");
    });

    it("should handle empty strings", () => {
      const actual = Id.userTransaction("", "");
      expect(actual).toBe("_");
    });
  });
});
