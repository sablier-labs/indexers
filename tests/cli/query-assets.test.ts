import { Effect } from "effect";
import { describe, expect, it } from "vitest";
import {
  buildAssetFiles,
  getQueryAssetsDateSegment,
  getQueryAssetsFilePath,
  getStaleQueryAssetFilePaths,
} from "../../cli/commands/query/assets.file.js";
import { getNextAssetsCursor, parseAssetsPage } from "../../cli/commands/query/clients/envio.js";

const INVALID_ENVIO_ASSET_PAYLOAD_REGEX = /Invalid Envio asset payload|Out-of-range integer value/;
const QUERY_ASSETS_DATE = "2026-03-06";
const GENERATED_AT = "2026-03-06T00:00:00.000Z";
const AIRDROPS_MAINNET_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/airdrops/mainnet\\.json$`
);
const STALE_LOCKUP_OPTIMISM_FILE_REGEX = new RegExp(
  `cli/generated/assets-${QUERY_ASSETS_DATE}/lockup/optimism\\.json$`
);

describe("query-assets helpers", () => {
  describe("parseAssetsPage", () => {
    it("parses Envio asset pages and returns the next cursor", () => {
      const page = Effect.runSync(
        parseAssetsPage([
          {
            address: "0x0000000000000000000000000000000000000001",
            chainId: "1",
            decimals: "18",
            id: "asset-1-0x0000000000000000000000000000000000000001",
            name: "Token A",
            symbol: "TKA",
          },
          {
            address: "0x0000000000000000000000000000000000000002",
            chainId: "10",
            decimals: "6",
            id: "asset-10-0x0000000000000000000000000000000000000002",
            name: "Token B",
            symbol: "TKB",
          },
        ])
      );

      expect(page).toEqual([
        {
          address: "0x0000000000000000000000000000000000000001",
          chainId: 1,
          decimals: 18,
          id: "asset-1-0x0000000000000000000000000000000000000001",
          name: "Token A",
          symbol: "TKA",
        },
        {
          address: "0x0000000000000000000000000000000000000002",
          chainId: 10,
          decimals: 6,
          id: "asset-10-0x0000000000000000000000000000000000000002",
          name: "Token B",
          symbol: "TKB",
        },
      ]);
      expect(getNextAssetsCursor(page)).toBe("asset-10-0x0000000000000000000000000000000000000002");
    });

    it("rejects invalid asset payloads before they reach disk", () => {
      expect(() =>
        Effect.runSync(
          parseAssetsPage([
            {
              address: "not-an-address",
              chainId: "1",
              decimals: "-1",
              id: "",
              name: "Broken Token",
              symbol: "BRK",
            },
          ])
        )
      ).toThrow(INVALID_ENVIO_ASSET_PAYLOAD_REGEX);
    });
  });

  describe("buildAssetFiles", () => {
    it("groups assets by chain and sorts addresses deterministically", () => {
      const files = buildAssetFiles(
        "lockup",
        [
          {
            address: "0x0000000000000000000000000000000000000002",
            chainId: 1,
            decimals: 6,
            id: "asset-1-0x2",
            name: "Token B",
            symbol: "TKB",
          },
          {
            address: "0x0000000000000000000000000000000000000001",
            chainId: 1,
            decimals: 18,
            id: "asset-1-0x1",
            name: "Token A",
            symbol: "TKA",
          },
          {
            address: "0x0000000000000000000000000000000000000010",
            chainId: 10,
            decimals: 18,
            id: "asset-10-0x10",
            name: "Token C",
            symbol: "TKC",
          },
        ],
        GENERATED_AT
      );

      expect(files).toEqual([
        {
          chainId: 1,
          chainName: "Ethereum",
          chainSlug: "mainnet",
          generatedAt: GENERATED_AT,
          indexer: "lockup",
          vendor: "envio",
          assets: [
            {
              address: "0x0000000000000000000000000000000000000001",
              decimals: 18,
              name: "Token A",
              symbol: "TKA",
            },
            {
              address: "0x0000000000000000000000000000000000000002",
              decimals: 6,
              name: "Token B",
              symbol: "TKB",
            },
          ],
        },
        {
          chainId: 10,
          chainName: "OP Mainnet",
          chainSlug: "optimism",
          generatedAt: GENERATED_AT,
          indexer: "lockup",
          vendor: "envio",
          assets: [
            {
              address: "0x0000000000000000000000000000000000000010",
              decimals: 18,
              name: "Token C",
              symbol: "TKC",
            },
          ],
        },
      ]);
    });

    it("supports airdrops exports with the shared protocol type", () => {
      const files = buildAssetFiles(
        "airdrops",
        [
          {
            address: "0x0000000000000000000000000000000000000001",
            chainId: 1,
            decimals: 18,
            id: "asset-1-0x1",
            name: "Token A",
            symbol: "TKA",
          },
        ],
        GENERATED_AT
      );

      expect(files).toEqual([
        {
          chainId: 1,
          chainName: "Ethereum",
          chainSlug: "mainnet",
          generatedAt: GENERATED_AT,
          indexer: "airdrops",
          vendor: "envio",
          assets: [
            {
              address: "0x0000000000000000000000000000000000000001",
              decimals: 18,
              name: "Token A",
              symbol: "TKA",
            },
          ],
        },
      ]);
      expect(getQueryAssetsDateSegment(GENERATED_AT)).toBe(QUERY_ASSETS_DATE);
      expect(getQueryAssetsFilePath("airdrops", 1, QUERY_ASSETS_DATE)).toMatch(
        AIRDROPS_MAINNET_FILE_REGEX
      );
    });

    it("detects stale generated chain files", () => {
      const files = buildAssetFiles(
        "lockup",
        [
          {
            address: "0x0000000000000000000000000000000000000001",
            chainId: 1,
            decimals: 18,
            id: "asset-1-0x1",
            name: "Token A",
            symbol: "TKA",
          },
        ],
        GENERATED_AT
      );

      const staleFilePaths = getStaleQueryAssetFilePaths(
        "lockup",
        ["mainnet.json", "optimism.json", "notes.txt"],
        files,
        QUERY_ASSETS_DATE
      );

      expect(staleFilePaths).toHaveLength(1);
      expect(staleFilePaths[0]).toMatch(STALE_LOCKUP_OPTIMISM_FILE_REGEX);
    });
  });
});
