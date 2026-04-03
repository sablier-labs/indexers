import { describe, expect, it } from "vitest";
import {
  computeRecoverTokenRows,
  getRecoverTokensAssetFileIndexer,
  getRecoverTokensContractName,
  getRecoverTokensDefaultFilePath,
  parseIndexedAssetFile,
} from "../../cli/commands/recover-tokens.helpers.js";

const QUERY_ASSETS_DATE = "2026-03-06";
const STREAMS_MAINNET_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/streams/mainnet\\.json$`
);
const STREAMS_OPTIMISM_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/streams/optimism\\.json$`
);
const INVALID_ASSET_FILE_NUMERIC_FIELDS_REGEX = /Invalid asset decimals|Invalid chainId/;

describe("recover-tokens helpers", () => {
  describe("getRecoverTokensContractName", () => {
    it("maps protocols to the expected contract names", () => {
      expect(getRecoverTokensContractName("lockup")).toBe("SablierLockup");
      expect(getRecoverTokensContractName("flow")).toBe("SablierFlow");
    });
  });

  describe("getRecoverTokensAssetFileIndexer", () => {
    it("uses the shared streams asset snapshot for both protocols", () => {
      expect(getRecoverTokensAssetFileIndexer("lockup")).toBe("streams");
      expect(getRecoverTokensAssetFileIndexer("flow")).toBe("streams");
    });
  });

  describe("getRecoverTokensDefaultFilePath", () => {
    it("builds the default export file path from the shared streams snapshots", () => {
      expect(getRecoverTokensDefaultFilePath("lockup", 1, QUERY_ASSETS_DATE)).toMatch(
        STREAMS_MAINNET_FILE_REGEX
      );
      expect(getRecoverTokensDefaultFilePath("flow", 10, QUERY_ASSETS_DATE)).toMatch(
        STREAMS_OPTIMISM_FILE_REGEX
      );
    });
  });

  describe("parseIndexedAssetFile", () => {
    it("parses the exported asset file shape", () => {
      const parsed = parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "streams",
  "chainId": 1,
  "chainSlug": "mainnet",
  "chainName": "Ethereum",
  "assets": [
    {
      "address": "0x0000000000000000000000000000000000000001",
      "symbol": "TOK",
      "name": "Token",
      "decimals": 18
    }
  ]
}`);

      expect(parsed).toEqual({
        chainId: 1,
        chainName: "Ethereum",
        chainSlug: "mainnet",
        generatedAt: "2026-03-06T00:00:00.000Z",
        indexer: "streams",
        vendor: "envio",
        assets: [
          {
            address: "0x0000000000000000000000000000000000000001",
            decimals: 18,
            name: "Token",
            symbol: "TOK",
          },
        ],
      });
    });

    it("accepts airdrops files even though recover-tokens stays flow-lockup only", () => {
      const parsed = parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "airdrops",
  "chainId": 1,
  "chainSlug": "mainnet",
  "chainName": "Ethereum",
  "assets": [
    {
      "address": "0x0000000000000000000000000000000000000001",
      "symbol": "TOK",
      "name": "Token",
      "decimals": 18
    }
  ]
}`);

      expect(parsed.indexer).toBe("airdrops");
    });

    it("accepts empty asset names emitted by query-assets snapshots", () => {
      const parsed = parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "streams",
  "chainId": 8453,
  "chainSlug": "base",
  "chainName": "Base",
  "assets": [
    {
      "address": "0x010a5603cfefb902653a4256cf7625237534b245",
      "symbol": "CLAW",
      "name": "",
      "decimals": 18
    }
  ]
}`);

      expect(parsed.assets).toEqual([
        {
          address: "0x010a5603cfefb902653a4256cf7625237534b245",
          decimals: 18,
          name: "",
          symbol: "CLAW",
        },
      ]);
    });

    it("rejects invalid numeric fields from custom asset files", () => {
      expect(() =>
        parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "streams",
  "chainId": 0,
  "chainSlug": "mainnet",
  "chainName": "Ethereum",
  "assets": [
    {
      "address": "0x0000000000000000000000000000000000000001",
      "symbol": "TOK",
      "name": "Token",
      "decimals": -1
    }
  ]
}`)
      ).toThrow(INVALID_ASSET_FILE_NUMERIC_FIELDS_REGEX);
    });
  });

  describe("computeRecoverTokenRows", () => {
    it("filters zero deltas, counts skipped rows, and sorts by absolute delta", () => {
      const result = computeRecoverTokenRows({
        aggregateAmountResults: [10n, 18n, null, 8n],
        balanceResults: [30n, 18n, 5n, 1n],
        assets: [
          {
            address: "0x0000000000000000000000000000000000000001",
            decimals: 18,
            name: "Token A",
            symbol: "TKA",
          },
          {
            address: "0x0000000000000000000000000000000000000002",
            decimals: 18,
            name: "Token B",
            symbol: "TKB",
          },
          {
            address: "0x0000000000000000000000000000000000000003",
            decimals: 18,
            name: "Token C",
            symbol: "TKC",
          },
          {
            address: "0x0000000000000000000000000000000000000004",
            decimals: 18,
            name: "Token D",
            symbol: "TKD",
          },
        ],
      });

      expect(result.scannedCount).toBe(4);
      expect(result.skippedCount).toBe(1);
      expect(result.nonZeroCount).toBe(2);
      expect(result.rows.map((row) => [row.symbol, row.delta])).toEqual([
        ["TKA", 20n],
        ["TKD", -7n],
      ]);
    });
  });
});
