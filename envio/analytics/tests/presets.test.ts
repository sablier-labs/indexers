import type { Logger } from "envio";
import { lightlink } from "sablier/evm/chains";
import { describe, expect, it, vi } from "vitest";
import { FEB_03_2025 } from "../../common/constants.js";
import type { Entity, HandlerContext } from "../bindings.js";
import { fetchGBPExchangeRate } from "../effects/forex.js";
import type { Action } from "../presets/helpers.js";
import { processActions } from "../presets/helpers.js";

vi.mock("../store/entity-user.js", () => ({ createOrUpdate: vi.fn() }));

const CONTRACT = "0x00000000000000000000000000000000000000cc";

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

function action(hash: string, fee: string): Action {
  return {
    block: "1",
    category: "Withdraw",
    chainId: String(lightlink.id),
    contract: CONTRACT,
    fee,
    from: "0x00000000000000000000000000000000000000ee",
    hash,
    id: hash,
    subgraphId: "1",
    timestamp: String(FEB_03_2025 + 86_400),
  };
}

describe("processActions", () => {
  it("accumulates the fees of actions that fall on the same day", async () => {
    const cryptoFees = createTable<Entity<"CryptoFeesDaily">>();
    const feeTxs = createTable<Entity<"FeeTransaction">>();
    const context = {
      AirdropCampaign: createTable<Entity<"AirdropCampaign">>().table,
      CryptoFeesDaily: cryptoFees.table,
      FeeTransaction: feeTxs.table,
      FiatFeesDaily: createTable<Entity<"FiatFeesDaily">>().table,
      log: mockLogger,
      // Every price effect returns 2000 USD; the GBP rate is 1.25.
      effect: (effect: unknown) => Promise.resolve(effect === fetchGBPExchangeRate ? 1.25 : 2000),
    } as unknown as HandlerContext;

    await processActions(context, lightlink.id, [action("0x01", "100"), action("0x02", "250")]);

    expect(feeTxs.rows.size).toBe(2);
    expect([...cryptoFees.rows.values()].map((row) => row.amount)).toEqual([350n]);
  });
});
