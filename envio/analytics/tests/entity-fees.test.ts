import type { Logger } from "envio";
import { mainnet, sepolia } from "sablier/evm/chains";
import type { Address } from "viem";
import { beforeEach, describe, expect, it, vi } from "vitest";
import type { Envio } from "../../common/bindings.js";
import { FEB_03_2025 } from "../../common/constants.js";
import type { Entity, HandlerContext } from "../bindings.js";
import { fetchNativeValueReceived } from "../effects/call-trace.js";
import { coinConfigs } from "../effects/coingecko.js";
import { fetchGBPExchangeRate } from "../effects/forex.js";
import { fetchMinFeeWei } from "../effects/min-fee.js";
import { register } from "../store/entity-airdrop-campaign.js";
import { createOrUpdate } from "../store/entity-fees.js";
import type { FeePolicy } from "../store/fee-resolver.js";
import { FeePolicies } from "../store/fee-resolver.js";

const CHAIN_ID = mainnet.id;
const CONTRACT = "0x00000000000000000000000000000000000000Cc" as Address;
const OTHER_CONTRACT = "0x00000000000000000000000000000000000000Dd" as Address;
const WRAPPER = "0x00000000000000000000000000000000000000bb" as Address;
const CAMPAIGN = "0x00000000000000000000000000000000000000aa" as Address;
const TX_HASH = "0xabc";
const TIMESTAMP = FEB_03_2025 + 86_400;

const traceEffect = vi.fn<(input: unknown) => Promise<string | null>>();
const minFeeEffect = vi.fn<(input: unknown) => Promise<string | null>>();
const effectSpy = vi.fn<(effect: unknown) => void>();

const mockLogger = {
  debug: vi.fn(),
  error: vi.fn(),
  info: vi.fn(),
  warn: vi.fn(),
} satisfies Logger;

function createTable<T extends { id: string }>() {
  const rows = new Map<string, T>();
  return {
    rows,
    table: {
      get: async (id: string) => rows.get(id),
      set: (entity: T) => {
        rows.set(entity.id, entity);
      },
    },
  };
}

function createContext() {
  const campaigns = createTable<Entity<"AirdropCampaign">>();
  const cryptoFees = createTable<Entity<"CryptoFeesDaily">>();
  const feeTxs = createTable<Entity<"FeeTransaction">>();
  const fiatFees = createTable<Entity<"FiatFeesDaily">>();
  const ledgers = createTable<Entity<"FeeLedger">>();

  const context = {
    AirdropCampaign: campaigns.table,
    CallTrace: createTable<Entity<"CallTrace">>().table,
    CryptoFeesDaily: cryptoFees.table,
    FeeLedger: ledgers.table,
    FeeTransaction: feeTxs.table,
    FiatFeesDaily: fiatFees.table,
    log: mockLogger,
    effect: (effect: unknown, input: unknown) => {
      effectSpy(effect);
      if (effect === coinConfigs[mainnet.nativeCurrency.symbol]?.effect) {
        return Promise.resolve(2000);
      }
      if (effect === fetchGBPExchangeRate) {
        return Promise.resolve(1.25);
      }
      if (effect === fetchNativeValueReceived) {
        return traceEffect(input);
      }
      if (effect === fetchMinFeeWei) {
        return minFeeEffect(input);
      }
      return Promise.reject(new Error("Unexpected effect"));
    },
  } as unknown as HandlerContext;

  return {
    campaigns: campaigns.rows,
    context,
    cryptoFees: cryptoFees.rows,
    feeTxs: feeTxs.rows,
    ledgers: ledgers.rows,
  };
}

function createEvent(
  overrides: {
    chainId?: number;
    srcAddress?: Address;
    timestamp?: number;
    to?: Address;
    value?: bigint;
  } = {}
): Envio.Event {
  const {
    chainId = CHAIN_ID,
    srcAddress = CONTRACT,
    timestamp = TIMESTAMP,
    to = CONTRACT,
    value = 100n,
  } = overrides;
  return {
    block: { hash: "0xblock", number: 1234, timestamp },
    chainId,
    logIndex: 0,
    params: {},
    srcAddress,
    transaction: { from: WRAPPER, hash: TX_HASH, to, transactionIndex: 0, value },
  };
}

async function record(
  ctx: ReturnType<typeof createContext>,
  event: Envio.Event,
  policy: FeePolicy = FeePolicies.voluntaryContract
): Promise<void> {
  await createOrUpdate(ctx.context, event, policy);
}

function onlyFeeTx(ctx: ReturnType<typeof createContext>): Entity<"FeeTransaction"> {
  expect(ctx.feeTxs.size).toBe(1);
  const [feeTx] = ctx.feeTxs.values();
  return feeTx;
}

describe("Store.Fees.createOrUpdate", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    traceEffect.mockResolvedValue(null);
    minFeeEffect.mockResolvedValue(null);
  });

  it("records the transaction value for a direct call", async () => {
    const ctx = createContext();
    await record(ctx, createEvent({ value: 100n }));

    const feeTx = onlyFeeTx(ctx);
    expect(feeTx).toMatchObject({ amount: 100n, contractAddress: CONTRACT, source: "TX_VALUE" });
    const [daily] = ctx.cryptoFees.values();
    expect(daily.amount).toBe(100n);
    expect(ctx.ledgers.get(`${CHAIN_ID}_${CONTRACT.toLowerCase()}`)?.attributed).toBe(100n);
    expect(traceEffect).not.toHaveBeenCalled();
  });

  it("records the traced value for a relayed call", async () => {
    const ctx = createContext();
    traceEffect.mockResolvedValueOnce("42");
    await record(ctx, createEvent({ to: WRAPPER, value: 1000n }), FeePolicies.voluntaryComptroller);

    expect(onlyFeeTx(ctx)).toMatchObject({ amount: 42n, source: "TRACE" });
    const [daily] = ctx.cryptoFees.values();
    expect(daily.amount).toBe(42n);
    expect(ctx.ledgers.get(`${CHAIN_ID}_comptroller`)?.attributed).toBe(42n);
  });

  it("falls back to the minimum fee when no trace is available", async () => {
    const ctx = createContext();
    minFeeEffect.mockResolvedValueOnce("17");
    await record(ctx, createEvent({ to: WRAPPER, value: 1000n }), FeePolicies.airdropOracle);

    expect(onlyFeeTx(ctx)).toMatchObject({ amount: 17n, source: "MIN_FEE" });
  });

  it("deduplicates later events from the same contract in the same transaction without resolving the fee", async () => {
    const ctx = createContext();
    traceEffect.mockResolvedValueOnce("42");
    await record(ctx, createEvent({ to: WRAPPER }));
    effectSpy.mockClear();

    await record(ctx, createEvent({ to: WRAPPER }));

    expect(ctx.feeTxs.size).toBe(1);
    expect(effectSpy).not.toHaveBeenCalled();
    expect(ctx.ledgers.get(`${CHAIN_ID}_${CONTRACT.toLowerCase()}`)?.attributed).toBe(42n);
  });

  it("records a separate fee for another contract in the same transaction", async () => {
    const ctx = createContext();
    traceEffect.mockResolvedValueOnce("42").mockResolvedValueOnce("8");
    await record(ctx, createEvent({ to: WRAPPER }));
    await record(ctx, createEvent({ srcAddress: OTHER_CONTRACT, to: WRAPPER }));

    expect([...ctx.feeTxs.values()].map((feeTx) => [feeTx.contractAddress, feeTx.amount])).toEqual([
      [CONTRACT, 42n],
      [OTHER_CONTRACT, 8n],
    ]);
    const [daily] = ctx.cryptoFees.values();
    expect(daily.amount).toBe(50n);
  });

  it("skips transactions sent to a registered airdrop campaign", async () => {
    const ctx = createContext();
    register(ctx.context, CHAIN_ID, CAMPAIGN);
    await record(ctx, createEvent({ to: CAMPAIGN }), FeePolicies.voluntaryComptroller);

    expect(ctx.feeTxs.size).toBe(0);
    expect(traceEffect).not.toHaveBeenCalled();
  });

  it("records preset fees without a ledger entry", async () => {
    const ctx = createContext();
    await record(ctx, createEvent(), FeePolicies.preset);

    expect(onlyFeeTx(ctx)).toMatchObject({ amount: 100n, source: "TX_VALUE" });
    expect(ctx.ledgers.size).toBe(0);
  });

  it.each([
    ["an excluded chain", { chainId: sepolia.id }],
    ["a pre-fee timestamp", { timestamp: FEB_03_2025 - 1 }],
  ])("records nothing on %s", async (_name, overrides) => {
    const ctx = createContext();
    await record(ctx, createEvent(overrides));

    expect(ctx.feeTxs.size).toBe(0);
    expect(ctx.cryptoFees.size).toBe(0);
    expect(ctx.ledgers.size).toBe(0);
    expect(effectSpy).not.toHaveBeenCalled();
  });
});
