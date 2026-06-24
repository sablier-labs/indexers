import { Effect } from "effect";
import type { PublicClient } from "viem";
import { stringToHex, zeroAddress } from "viem";
import { describe, expect, it, vi } from "vitest";
import { parseLockupStreamProxenderCandidatesPage } from "../../cli/commands/query/clients/envio.js";
import type { TokenCandidate } from "../../cli/commands/refresh-caches/helpers.js";
import {
  buildProxenderCacheKey,
  buildProxenderCandidates,
  buildTokenCacheKey,
  buildTokenCandidates,
  chooseTokenOutput,
  compareTokenCacheKeys,
  getTokenSuspiciousReasons,
  parseEffectCacheTsv,
  serializeEffectCacheTsv,
  serializeProxenderOutput,
  serializeTokenMetadataOutput,
} from "../../cli/commands/refresh-caches/helpers.js";
import { lookupProxender, lookupTokenMetadata } from "../../cli/commands/refresh-caches/run.js";

const TOKEN_A = "0x0000000000000000000000000000000000000001";
const TOKEN_B = "0x0000000000000000000000000000000000000002";
const LOCKUP = "0x0000000000000000000000000000000000000010";
const PROXY = "0x0000000000000000000000000000000000000020";
const OWNER = "0x0000000000000000000000000000000000000030";

function makeTokenCandidate(overrides: Partial<TokenCandidate> = {}): TokenCandidate {
  const chainId = overrides.chainId ?? 1;
  const address = overrides.address ?? TOKEN_A;
  return {
    address,
    chainId,
    key: buildTokenCacheKey(chainId, address),
    live: overrides.live ?? true,
    previousOutput: overrides.previousOutput,
    suspiciousReasons: overrides.suspiciousReasons ?? [],
  };
}

describe("refresh-caches helpers", () => {
  it("parses and serializes effect cache TSV rows deterministically", () => {
    const rows = parseEffectCacheTsv(`id\toutput
${buildTokenCacheKey(10, TOKEN_B)}\t0
${buildTokenCacheKey(1, TOKEN_A)}\t{"decimals":18,"name":"Token A","symbol":"TKA"}
`);

    expect(serializeEffectCacheTsv(rows, compareTokenCacheKeys)).toBe(`id\toutput
${buildTokenCacheKey(1, TOKEN_A)}\t{"decimals":18,"name":"Token A","symbol":"TKA"}
${buildTokenCacheKey(10, TOKEN_B)}\t0
`);
  });

  it("serializes JSON string escapes for PostgreSQL COPY text", () => {
    const key = buildTokenCacheKey(1, TOKEN_A);
    const output = serializeTokenMetadataOutput({
      decimals: 18,
      name: `"Buy and Cry" Coin`,
      symbol: "$EMOJI",
    });
    const serialized = serializeEffectCacheTsv(new Map([[key, output]]), compareTokenCacheKeys);
    const outputCell = serialized.split("\n")[1]?.split("\t")[1];

    expect(outputCell).toBe(output.replaceAll("\\", "\\\\"));
    expect(parseEffectCacheTsv(serialized).get(key)).toBe(output);
  });

  it("merges live-used token candidates with existing suspicious cache rows", () => {
    const existingRows = new Map([
      [
        buildTokenCacheKey(1, TOKEN_A),
        serializeTokenMetadataOutput({ decimals: 18, name: "A", symbol: "A" }),
      ],
      [buildTokenCacheKey(1, TOKEN_B), "0"],
    ]);

    const candidates = buildTokenCandidates(existingRows, [{ address: TOKEN_A, chainId: 1 }]);

    expect(candidates.map((candidate) => candidate.key)).toEqual([
      buildTokenCacheKey(1, TOKEN_A),
      buildTokenCacheKey(1, TOKEN_B),
    ]);
    expect(candidates[0]?.live).toBe(true);
    expect(candidates[1]?.suspiciousReasons).toEqual(["alias-0"]);
  });

  it("classifies suspicious token rows", () => {
    expect(getTokenSuspiciousReasons("0")).toEqual(["alias-0"]);
    expect(
      getTokenSuspiciousReasons(
        serializeTokenMetadataOutput({ decimals: 0, name: "Unknown", symbol: "UNKNOWN" })
      )
    ).toEqual(["unknown-name", "unknown-symbol", "zero-decimals"]);
    expect(
      getTokenSuspiciousReasons(
        serializeTokenMetadataOutput({ decimals: 18, name: "", symbol: "" })
      )
    ).toEqual(["blank-name", "blank-symbol"]);
  });

  it("protects known previous token rows from transient unknown lookups", () => {
    const previousOutput = serializeTokenMetadataOutput({
      decimals: 18,
      name: "Known",
      symbol: "KNOWN",
    });

    expect(
      chooseTokenOutput(previousOutput, {
        failuresConfirmed: false,
        noCode: false,
        output: "0",
      })
    ).toEqual({
      output: previousOutput,
      protectedPrevious: true,
      reason: "protect-known",
    });

    expect(
      chooseTokenOutput(previousOutput, {
        failuresConfirmed: false,
        noCode: true,
        output: "0",
      })
    ).toEqual({
      output: "0",
      protectedPrevious: false,
      reason: "overwrite-unknown",
    });
  });

  it("protects known previous token rows from suspicious known lookups", () => {
    const previousOutput = serializeTokenMetadataOutput({
      decimals: 18,
      name: "Known",
      symbol: "KNOWN",
    });
    const suspiciousOutput = serializeTokenMetadataOutput({
      decimals: 0,
      name: "Known",
      symbol: "KNOWN",
    });

    expect(
      chooseTokenOutput(previousOutput, {
        failuresConfirmed: false,
        noCode: false,
        output: suspiciousOutput,
      })
    ).toEqual({
      output: previousOutput,
      protectedPrevious: true,
      reason: "protect-known",
    });
  });

  it("builds proxender keys and compact outputs", () => {
    const key = buildProxenderCacheKey(1, LOCKUP, PROXY);
    const candidates = buildProxenderCandidates(new Map(), [
      { chainId: 1, contract: LOCKUP, sender: PROXY },
    ]);

    expect(candidates[0]?.key).toBe(key);
    expect(serializeProxenderOutput("n/a")).toBe("0");
    expect(serializeProxenderOutput(OWNER.toUpperCase())).toBe(JSON.stringify(OWNER));
  });

  it("parses live LockupStream v1.0 candidate pages", () => {
    const parsed = Effect.runSync(
      parseLockupStreamProxenderCandidatesPage([
        {
          chainId: "1",
          contract: LOCKUP,
          id: "stream-1",
          sender: PROXY,
          version: "v1.0",
        },
      ])
    );

    expect(parsed).toEqual([
      {
        chainId: 1,
        contract: LOCKUP,
        id: "stream-1",
        sender: PROXY,
        version: "v1.0",
      },
    ]);
  });

  it("rejects unexpected LockupStream versions", () => {
    expect(() =>
      Effect.runSync(
        parseLockupStreamProxenderCandidatesPage([
          {
            chainId: "1",
            contract: LOCKUP,
            id: "stream-1",
            sender: PROXY,
            version: "v1.1",
          },
        ])
      )
    ).toThrow("Invalid Envio lockup stream payload");
  });
});

describe("refresh-caches RPC lookups", () => {
  it("reads standard ERC-20 metadata", async () => {
    const readContract = vi
      .fn()
      .mockResolvedValueOnce(6)
      .mockResolvedValueOnce("USD Coin")
      .mockResolvedValueOnce("USDC");
    const client = { readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupTokenMetadata(client, makeTokenCandidate());

    expect(result.output).toBe(
      serializeTokenMetadataOutput({ decimals: 6, name: "USD Coin", symbol: "USDC" })
    );
    expect(result.source).toBe("standard-erc20");
  });

  it("falls back to bytes32 ERC-20 metadata", async () => {
    const readContract = vi
      .fn()
      .mockResolvedValueOnce(18)
      .mockRejectedValueOnce(new Error("name reverted"))
      .mockRejectedValueOnce(new Error("symbol reverted"))
      .mockResolvedValueOnce(18)
      .mockResolvedValueOnce(stringToHex("Bytes Token", { size: 32 }))
      .mockResolvedValueOnce(stringToHex("BYTES", { size: 32 }));
    const client = { readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupTokenMetadata(client, makeTokenCandidate());

    expect(result.output).toBe(
      serializeTokenMetadataOutput({ decimals: 18, name: "Bytes Token", symbol: "BYTES" })
    );
    expect(result.source).toBe("bytes32-erc20");
  });

  it("emits alias 0 when metadata fails and code is empty", async () => {
    const readContract = vi.fn().mockRejectedValue(new Error("reverted"));
    const getCode = vi.fn().mockResolvedValue("0x");
    const client = { getCode, readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupTokenMetadata(client, makeTokenCandidate());

    expect(result.output).toBe("0");
    expect(result.noCode).toBe(true);
    expect(result.source).toBe("no-code");
  });

  it("verifies PRBProxy owners through reverse registries", async () => {
    const readContract = vi.fn((args: { functionName: string }) => {
      if (args.functionName === "owner") {
        return Promise.resolve(OWNER);
      }
      return Promise.resolve(PROXY);
    });
    const client = { readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupProxender(client, {
      chainId: 1,
      key: buildProxenderCacheKey(1, LOCKUP, PROXY),
      live: true,
      lockupAddress: LOCKUP,
      previousOutput: undefined,
      streamSender: PROXY,
    });

    expect(result).toEqual({
      ownerOrAlias: OWNER,
      verification: "registry-v4.0.1",
    });
  });

  it("aliases unverified PRBProxy owners", async () => {
    const readContract = vi.fn((args: { functionName: string }) => {
      if (args.functionName === "owner") {
        return Promise.resolve(OWNER);
      }
      return Promise.resolve(zeroAddress);
    });
    const client = { readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupProxender(client, {
      chainId: 1,
      key: buildProxenderCacheKey(1, LOCKUP, PROXY),
      live: true,
      lockupAddress: LOCKUP,
      previousOutput: undefined,
      streamSender: PROXY,
    });

    expect(result.ownerOrAlias).toBe("n/a");
    expect(result.verification).toBe(`reverse-unverified:${zeroAddress}:${zeroAddress}`);
  });

  it("aliases invalid PRBProxy owner results", async () => {
    const readContract = vi.fn().mockResolvedValue("not-an-address");
    const client = { readContract } as Partial<PublicClient> as PublicClient;

    const result = await lookupProxender(client, {
      chainId: 1,
      key: buildProxenderCacheKey(1, LOCKUP, PROXY),
      live: true,
      lockupAddress: LOCKUP,
      previousOutput: undefined,
      streamSender: PROXY,
    });

    expect(result.ownerOrAlias).toBe("n/a");
    expect(result.verification).toBe("owner-call-invalid");
  });
});
