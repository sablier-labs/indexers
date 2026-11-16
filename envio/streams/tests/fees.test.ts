import { describe, expect, it } from "vitest";
import type { Envio } from "../../common/bindings.js";
import { getDirectCallFee } from "../../common/fees.js";
import * as Watcher from "../store/entity-watcher.js";

const LOCKUP = "0x6E0bAD2c077d699841F1929b45bfb93FAfBEd395";
const WRAPPER = "0xB9767bF7e25fD7c1b26dC31ACF01E7e0c02cD7cE";
const HASH = "0x2cd4334f8f4fd583d8ad9b92fa4bb694d5d34eb66564fa939237139df9a736b6";
const VALUE = 7_100_000_000_000_000_000n;

function event(to: string, hash = HASH): Envio.Event {
  return {
    block: { hash: "0x", number: 1, timestamp: 1 },
    chainId: 56,
    logIndex: 0,
    params: {},
    srcAddress: LOCKUP as Envio.Event["srcAddress"],
    transaction: {
      from: undefined,
      hash,
      to: to as Envio.Transaction["to"],
      transactionIndex: 0,
      value: VALUE,
    },
  };
}

describe("getDirectCallFee", () => {
  it("counts the value when the Sablier contract is called directly, ignoring address case", () => {
    expect(getDirectCallFee(event(LOCKUP.toLowerCase()))).toBe(VALUE);
  });

  it("ignores the value when a wrapper contract is called", () => {
    expect(getDirectCallFee(event(WRAPPER))).toBe(0n);
  });
});

describe("Watcher.getFee", () => {
  it("attributes a batch transaction's fee only once", () => {
    const watcher = Watcher.create(56);
    expect(Watcher.getFee(watcher, event(LOCKUP))).toBe(VALUE);
    expect(Watcher.getFee({ ...watcher, lastFeeHash: HASH }, event(LOCKUP))).toBe(0n);
    expect(Watcher.getFee({ ...watcher, lastFeeHash: HASH }, event(LOCKUP, "0x01"))).toBe(VALUE);
  });
});
