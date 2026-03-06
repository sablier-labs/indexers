import { describe, expect, it } from "vitest";
import {
  computeRecoverTokenRows,
  getRecoverTokensContractName,
  getRecoverTokensDefaultFilePath,
  parseIndexedAssetFile,
} from "../../cli/commands/recover-tokens.helpers.js";

const QUERY_ASSETS_DATE = "2026-03-06";
const LOCKUP_DEFAULT_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/lockup/mainnet\\.json$`
);
const FLOW_DEFAULT_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/flow/optimism\\.json$`
);
const INVALID_ASSET_FILE_NUMERIC_FIELDS_REGEX = /Invalid asset decimals|Invalid chainId/;

describe("recover-tokens helpers", () => {
  describe("getRecoverTokensContractName", () => {
    it("maps indexers to the expected contract names", () => {
      expect(getRecoverTokensContractName("lockup")).toBe("SablierLockup");
      expect(getRecoverTokensContractName("flow")).toBe("SablierFlow");
    });
  });

  describe("getRecoverTokensDefaultFilePath", () => {
    it("builds the default export file path from indexer and chain ID", () => {
      expect(getRecoverTokensDefaultFilePath("lockup", 1, QUERY_ASSETS_DATE)).toMatch(
        LOCKUP_DEFAULT_FILE_REGEX
      );
      expect(getRecoverTokensDefaultFilePath("flow", 10, QUERY_ASSETS_DATE)).toMatch(
        FLOW_DEFAULT_FILE_REGEX
      );
    });
  });

  describe("parseIndexedAssetFile", () => {
    it("parses the exported asset file shape", () => {
      const parsed = parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "flow",
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
        indexer: "flow",
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

    it("rejects invalid numeric fields from custom asset files", () => {
      expect(() =>
        parseIndexedAssetFile(`{
  "generatedAt": "2026-03-06T00:00:00.000Z",
  "vendor": "envio",
  "indexer": "flow",
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
