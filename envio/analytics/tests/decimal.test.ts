import { parseUnits } from "viem";
import { describe, expect, it } from "vitest";
import { addDecimalStrings, toDecimalString } from "../helpers/decimal.js";

describe("decimal helpers", () => {
  describe("toDecimalString", () => {
    it("expands tiny scientific notation values", () => {
      const value = toDecimalString(1.322_775_243_115_240_3e-12);

      expect(value).toBe("0.0000000000013227752431152403");
      expect(parseUnits(value, 2)).toBe(0n);
    });

    it("expands large scientific notation values", () => {
      expect(toDecimalString(2.003_106_217e21)).toBe("2003106217000000000000");
    });

    it("rejects malformed scientific notation", () => {
      expect(() => toDecimalString("1e2e3")).toThrow("Invalid decimal number: 1e2e3");
    });
  });

  describe("addDecimalStrings", () => {
    it("adds tiny fee display values exactly", () => {
      expect(addDecimalStrings("0.000000000000000999", "0.000000000000000999")).toBe(
        "0.000000000000001998"
      );
    });

    it("accepts scientific notation inputs", () => {
      expect(addDecimalStrings("1.3227752431152403e-12", "0.000000000000000001")).toBe(
        "0.0000000000013227762431152403"
      );
    });

    it("rejects malformed decimal inputs", () => {
      expect(() => addDecimalStrings("1.2.3", "0")).toThrow("Invalid decimal number: 1.2.3");
    });

    it("preserves sub-cent daily accumulation", () => {
      const value = addDecimalStrings("0.004", "0.004");

      expect(value).toBe("0.008");
      expect(parseUnits(value, 2)).toBe(1n);
    });
  });
});
