import { mainnet } from "sablier/evm/chains";
import { describe, expect, it } from "vitest";
import { getSelectedIndexers, getStudioEntries } from "../../cli/commands/graph/open-studio.js";

describe("open-studio helpers", () => {
  describe("getSelectedIndexers", () => {
    it("defaults to the public indexer keys only", () => {
      expect(getSelectedIndexers()).toEqual(["airdrops", "streams"]);
    });
  });

  describe("getStudioEntries", () => {
    it("returns only streams entries when filtering by the streams indexer", () => {
      const entries = getStudioEntries({ indexer: "streams" });
      const mainnetEntry = entries.find((entry) => entry.chainId === mainnet.id);

      expect(entries.length).toBeGreaterThan(0);
      expect(entries.every((entry) => entry.indexer === "streams")).toBe(true);
      expect(mainnetEntry).toMatchObject({
        chainId: mainnet.id,
        indexer: "streams",
        name: "sablier-lockup-ethereum",
        url: "https://thegraph.com/studio/subgraph/sablier-lockup-ethereum/",
      });
    });

    it("includes streams entries in the default official indexer set", () => {
      const entries = getStudioEntries({});

      expect(entries.some((entry) => entry.indexer === "streams")).toBe(true);
    });

    it("ignores removed public keys when forced at runtime", () => {
      expect(getStudioEntries({ chainId: mainnet.id, indexer: "flow" as never })).toEqual([]);
      expect(getStudioEntries({ chainId: mainnet.id, indexer: "lockup" as never })).toEqual([]);
    });
  });
});
