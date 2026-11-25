import { describe, expect, it } from "vitest";
import type { Entity } from "../bindings.js";
import { exists, register } from "../store/entity-airdrop-campaign.js";

function createContext() {
  const rows = new Map<string, Entity<"AirdropCampaign">>();
  return {
    AirdropCampaign: {
      get: async (id: string) => rows.get(id),
      set: (entity: Entity<"AirdropCampaign">) => {
        rows.set(entity.id, entity);
      },
    },
  };
}

describe("airdrop campaign", () => {
  it("does not exist before registration and exists after", async () => {
    const context = createContext();
    expect(await exists(context, 1, "0xabc")).toBe(false);
    register(context, 1, "0xabc");
    expect(await exists(context, 1, "0xabc")).toBe(true);
  });

  it("matches addresses case-insensitively", async () => {
    const context = createContext();
    register(context, 1, "0xABC");
    expect(await exists(context, 1, "0xaBc")).toBe(true);
  });

  it("registers per chain", async () => {
    const context = createContext();
    register(context, 1, "0xabc");
    expect(await exists(context, 137, "0xabc")).toBe(false);
  });

  it("is idempotent", async () => {
    const context = createContext();
    register(context, 1, "0xabc");
    register(context, 1, "0xabc");
    expect(await exists(context, 1, "0xabc")).toBe(true);
  });
});
