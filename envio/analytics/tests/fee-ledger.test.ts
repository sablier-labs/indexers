import { describe, expect, it } from "vitest";
import type { Entity } from "../bindings.js";
import type { LedgerKey } from "../store/entity-fee-ledger.js";
import { attribute, collect } from "../store/entity-fee-ledger.js";

function createContext() {
  const rows = new Map<string, Entity<"FeeLedger">>();
  const context = {
    FeeLedger: {
      get: async (id: string) => rows.get(id),
      set: (entity: Entity<"FeeLedger">) => {
        rows.set(entity.id, entity);
      },
    },
  };
  return { context, rows };
}

const contract: LedgerKey = { address: "0xABC", kind: "contract" };
const comptroller: LedgerKey = { kind: "comptroller" };

describe("fee ledger", () => {
  it("returns zero when collected equals attributed", async () => {
    const { context } = createContext();
    await attribute(context, 1, contract, 100n);
    expect(await collect(context, 1, contract, 100n)).toBe(0n);
  });

  it("returns a positive residual when collected exceeds attributed", async () => {
    const { context } = createContext();
    await attribute(context, 1, contract, 100n);
    expect(await collect(context, 1, contract, 130n)).toBe(30n);
  });

  it("returns a negative residual when attributed exceeds collected", async () => {
    const { context } = createContext();
    await attribute(context, 1, contract, 100n);
    expect(await collect(context, 1, contract, 40n)).toBe(-60n);
  });

  it("accumulates across multiple sweeps", async () => {
    const { context } = createContext();
    await attribute(context, 1, contract, 100n);
    expect(await collect(context, 1, contract, 60n)).toBe(-40n);
    await attribute(context, 1, contract, 20n);
    expect(await collect(context, 1, contract, 60n)).toBe(0n);
    expect(await collect(context, 1, contract, 5n)).toBe(5n);
  });

  it("keeps contract and comptroller ledgers independent", async () => {
    const { context, rows } = createContext();
    await attribute(context, 1, contract, 100n);
    await attribute(context, 1, comptroller, 7n);
    expect(await collect(context, 1, comptroller, 7n)).toBe(0n);
    expect(await collect(context, 1, contract, 100n)).toBe(0n);

    expect(rows.get("1_0xabc")).toEqual({
      attributed: 100n,
      chainId: 1n,
      collected: 100n,
      contractAddress: "0xabc",
      id: "1_0xabc",
    });
    expect(rows.get("1_comptroller")).toEqual({
      attributed: 7n,
      chainId: 1n,
      collected: 7n,
      contractAddress: undefined,
      id: "1_comptroller",
    });
  });

  it("keeps chains independent", async () => {
    const { context, rows } = createContext();
    await attribute(context, 1, contract, 10n);
    await attribute(context, 10, contract, 20n);
    expect(rows.size).toBe(2);
  });
});
