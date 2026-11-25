import type { Logger } from "envio";
import { sablier } from "sablier";
import type { Address } from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Envio } from "../../common/bindings.js";
import { fetchNativeValueReceived } from "../effects/call-trace.js";
import { fetchMinFeeWei } from "../effects/min-fee.js";
import type { FeePolicy } from "../store/fee-resolver.js";
import { FeePolicies, resolveFee } from "../store/fee-resolver.js";

const CHAIN_ID = 1;
const CONTRACT = "0x00000000000000000000000000000000000000Cc" as Address;
const WRAPPER = "0x00000000000000000000000000000000000000bb" as Address;
const TX_HASH = "0xabc";

const traceEffect = vi.fn<(input: unknown) => Promise<string | null>>();
const minFeeEffect = vi.fn<(input: unknown) => Promise<string | null>>();

const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
} satisfies Logger;

const context = {
  effect: ((effect: unknown, input: unknown) => {
    if (effect === fetchNativeValueReceived) {
      return traceEffect(input);
    }
    if (effect === fetchMinFeeWei) {
      return minFeeEffect(input);
    }
    return Promise.reject(new Error("Unexpected effect"));
  }) as Parameters<typeof resolveFee>[0]["effect"],
  log: mockLogger,
};

function createEvent(to: Address | undefined, value = 100n): Envio.Event {
  return {
    block: { hash: "0xblock", number: 1234, timestamp: 1 },
    chainId: CHAIN_ID,
    logIndex: 0,
    params: {},
    srcAddress: CONTRACT,
    transaction: { from: WRAPPER, hash: TX_HASH, to, transactionIndex: 0, value },
  };
}

function sablierContract(): Address {
  const contract = sablier.contracts.getAll({ chainId: CHAIN_ID, protocol: "lockup" })?.[0];
  if (!contract) {
    throw new Error("No Sablier contract on the test chain");
  }
  return contract.address as Address;
}

describe("resolveFee", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("direct call", () => {
    it("uses the transaction value without RPC", async () => {
      const event = createEvent(CONTRACT.toLowerCase() as Address, 100n);

      await expect(resolveFee(context, event, FeePolicies.voluntaryContract)).resolves.toEqual({
        amount: 100n,
        source: "TX_VALUE",
      });
      expect(traceEffect).not.toHaveBeenCalled();
      expect(minFeeEffect).not.toHaveBeenCalled();
    });

    it("returns undefined for a zero transaction value", async () => {
      await expect(
        resolveFee(context, createEvent(CONTRACT, 0n), FeePolicies.airdropOracle)
      ).resolves.toBeUndefined();
      expect(traceEffect).not.toHaveBeenCalled();
    });
  });

  it("returns undefined without RPC when a Sablier contract is the callee", async () => {
    const event = createEvent(sablierContract().toUpperCase().replace("0X", "0x") as Address);

    await expect(resolveFee(context, event, FeePolicies.airdropOracle)).resolves.toBeUndefined();
    expect(traceEffect).not.toHaveBeenCalled();
    expect(minFeeEffect).not.toHaveBeenCalled();
  });

  describe("trace", () => {
    it("uses the traced value", async () => {
      traceEffect.mockResolvedValueOnce("42");

      await expect(
        resolveFee(context, createEvent(WRAPPER), FeePolicies.airdropOracle)
      ).resolves.toEqual({ amount: 42n, source: "TRACE" });
      expect(traceEffect).toHaveBeenCalledWith({
        chainId: CHAIN_ID,
        contract: CONTRACT.toLowerCase(),
        txHash: TX_HASH,
      });
      expect(minFeeEffect).not.toHaveBeenCalled();
    });

    it("returns undefined for a traced zero without falling back", async () => {
      traceEffect.mockResolvedValueOnce("0");

      await expect(
        resolveFee(context, createEvent(WRAPPER), FeePolicies.airdropOracle)
      ).resolves.toBeUndefined();
      expect(minFeeEffect).not.toHaveBeenCalled();
    });

    it("traces transactions without a recipient", async () => {
      traceEffect.mockResolvedValueOnce("3");

      await expect(
        resolveFee(context, createEvent(undefined), FeePolicies.voluntaryComptroller)
      ).resolves.toEqual({ amount: 3n, source: "TRACE" });
    });
  });

  describe("min-fee fallback", () => {
    beforeEach(() => {
      traceEffect.mockResolvedValue(null);
    });

    it.each<[string, FeePolicy, object]>([
      [
        "FEE() at block 0",
        FeePolicies.airdropFixed,
        { blockNumber: 0, fn: "FEE", streamId: undefined },
      ],
      [
        "calculateMinFeeWei() at the event block",
        FeePolicies.airdropOracle,
        { blockNumber: 1234, fn: "calculateMinFeeWei", streamId: undefined },
      ],
      [
        "calculateMinFeeWei(streamId) at the event block",
        FeePolicies.streamWithdraw(9n),
        { blockNumber: 1234, fn: "calculateMinFeeWei", streamId: 9n },
      ],
    ])("reads %s", async (_name, policy, expected) => {
      minFeeEffect.mockResolvedValueOnce("17");

      await expect(resolveFee(context, createEvent(WRAPPER), policy)).resolves.toEqual({
        amount: 17n,
        source: "MIN_FEE",
      });
      expect(minFeeEffect).toHaveBeenCalledWith({
        chainId: CHAIN_ID,
        contract: CONTRACT.toLowerCase(),
        ...expected,
      });
    });

    it("returns undefined for a zero minimum fee", async () => {
      minFeeEffect.mockResolvedValueOnce("0");

      await expect(
        resolveFee(context, createEvent(WRAPPER), FeePolicies.airdropOracle)
      ).resolves.toBeUndefined();
    });

    it("returns undefined when the minimum fee is unavailable", async () => {
      minFeeEffect.mockResolvedValueOnce(null);

      await expect(
        resolveFee(context, createEvent(WRAPPER), FeePolicies.airdropOracle)
      ).resolves.toBeUndefined();
    });

    it.each([
      ["voluntaryComptroller", FeePolicies.voluntaryComptroller],
      ["voluntaryContract", FeePolicies.voluntaryContract],
      ["preset", FeePolicies.preset],
    ])("returns undefined without a minimum for %s", async (_name, policy) => {
      await expect(resolveFee(context, createEvent(WRAPPER), policy)).resolves.toBeUndefined();
      expect(minFeeEffect).not.toHaveBeenCalled();
    });
  });
});
