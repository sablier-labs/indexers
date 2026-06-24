import { isAddress } from "viem";

export const CACHE_HEADER = "id\toutput";
export const UNKNOWN_ALIAS = "0";
export const NOT_AVAILABLE = "n/a";

export type EffectCacheRows = Map<string, string>;

export type TokenMetadata = {
  decimals: number;
  name: string;
  symbol: string;
};

export type TokenCacheKey = {
  address: string;
  chainId: number;
};

export type ProxenderCacheKey = {
  chainId: number;
  lockupAddress: string;
  streamSender: string;
};

export type TokenCandidate = TokenCacheKey & {
  key: string;
  live: boolean;
  previousOutput: string | undefined;
  suspiciousReasons: string[];
};

export type ProxenderCandidate = ProxenderCacheKey & {
  key: string;
  live: boolean;
  previousOutput: string | undefined;
};

export type TokenLookupMergeInput = {
  failuresConfirmed: boolean;
  noCode: boolean;
  output: string;
};

export type TokenOutputDecision = {
  output: string;
  protectedPrevious: boolean;
  reason: "new" | "overwrite-known" | "overwrite-unknown" | "protect-known";
};

type ParsedTokenOutput =
  | {
      kind: "known";
      metadata: TokenMetadata;
    }
  | {
      kind: "unknown";
    };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isSafeChainId(value: unknown): value is number {
  return Number.isSafeInteger(value) && Number(value) > 0;
}

export function normalizeAddress(address: string): string {
  return address.toLowerCase();
}

export function buildTokenCacheKey(chainId: number, address: string): string {
  return JSON.stringify([chainId, normalizeAddress(address)]);
}

export function buildProxenderCacheKey(
  chainId: number,
  lockupAddress: string,
  streamSender: string
): string {
  return JSON.stringify([chainId, normalizeAddress(lockupAddress), normalizeAddress(streamSender)]);
}

function parseJsonArray(value: string): unknown[] | null {
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

export function parseTokenCacheKey(key: string): TokenCacheKey | null {
  const tuple = parseJsonArray(key);
  if (tuple?.length !== 2) {
    return null;
  }

  const [chainId, address] = tuple;
  if (!isSafeChainId(chainId) || typeof address !== "string" || !isAddress(address)) {
    return null;
  }

  return {
    address: normalizeAddress(address),
    chainId,
  };
}

export function parseProxenderCacheKey(key: string): ProxenderCacheKey | null {
  const tuple = parseJsonArray(key);
  if (tuple?.length !== 3) {
    return null;
  }

  const [chainId, lockupAddress, streamSender] = tuple;
  if (
    !isSafeChainId(chainId) ||
    typeof lockupAddress !== "string" ||
    typeof streamSender !== "string" ||
    !isAddress(lockupAddress) ||
    !isAddress(streamSender)
  ) {
    return null;
  }

  return {
    chainId,
    lockupAddress: normalizeAddress(lockupAddress),
    streamSender: normalizeAddress(streamSender),
  };
}

export function parseEffectCacheTsv(content: string): EffectCacheRows {
  const rows = new Map<string, string>();
  const lines = content.split("\n");

  for (let index = 0; index < lines.length; index++) {
    const line = lines[index];
    if (!line) {
      continue;
    }
    if (index === 0 && line === CACHE_HEADER) {
      continue;
    }

    const tabIndex = line.indexOf("\t");
    if (tabIndex === -1) {
      continue;
    }

    rows.set(line.slice(0, tabIndex), line.slice(tabIndex + 1));
  }

  return rows;
}

function compareStrings(left: string, right: string): number {
  if (left < right) {
    return -1;
  }
  if (left > right) {
    return 1;
  }
  return 0;
}

export function compareTokenCacheKeys(left: string, right: string): number {
  const leftKey = parseTokenCacheKey(left);
  const rightKey = parseTokenCacheKey(right);
  if (!leftKey || !rightKey) {
    return compareStrings(left, right);
  }
  return leftKey.chainId - rightKey.chainId || compareStrings(leftKey.address, rightKey.address);
}

export function compareProxenderCacheKeys(left: string, right: string): number {
  const leftKey = parseProxenderCacheKey(left);
  const rightKey = parseProxenderCacheKey(right);
  if (!leftKey || !rightKey) {
    return compareStrings(left, right);
  }
  return (
    leftKey.chainId - rightKey.chainId ||
    compareStrings(leftKey.lockupAddress, rightKey.lockupAddress) ||
    compareStrings(leftKey.streamSender, rightKey.streamSender)
  );
}

export function serializeEffectCacheTsv(
  rows: ReadonlyMap<string, string>,
  compareKeys: (left: string, right: string) => number
): string {
  const lines = [CACHE_HEADER];
  const entries = [...rows.entries()].sort(([left], [right]) => compareKeys(left, right));

  for (const [key, output] of entries) {
    lines.push(`${key}\t${output}`);
  }

  return `${lines.join("\n")}\n`;
}

export function parseTokenCacheOutput(output: string): ParsedTokenOutput | null {
  if (output === UNKNOWN_ALIAS) {
    return { kind: "unknown" };
  }

  try {
    const parsed = JSON.parse(output);
    if (!isRecord(parsed)) {
      return null;
    }

    const { decimals, name, symbol } = parsed;
    if (
      typeof decimals !== "number" ||
      !Number.isSafeInteger(decimals) ||
      decimals < 0 ||
      typeof name !== "string" ||
      typeof symbol !== "string"
    ) {
      return null;
    }

    return {
      kind: "known",
      metadata: {
        decimals,
        name,
        symbol,
      },
    };
  } catch {
    return null;
  }
}

export function isKnownTokenOutput(output: string | undefined): boolean {
  if (output === undefined) {
    return false;
  }

  return parseTokenCacheOutput(output)?.kind === "known";
}

function isSuspiciousTokenOutput(output: string): boolean {
  return getTokenSuspiciousReasons(output).length > 0;
}

export function serializeTokenMetadataOutput(metadata: TokenMetadata): string {
  return JSON.stringify({
    decimals: metadata.decimals,
    name: metadata.name,
    symbol: metadata.symbol,
  });
}

export function getTokenSuspiciousReasons(output: string | undefined): string[] {
  if (output === undefined) {
    return [];
  }

  const parsed = parseTokenCacheOutput(output);
  if (!parsed) {
    return ["invalid-output"];
  }
  if (parsed.kind === "unknown") {
    return ["alias-0"];
  }

  const reasons: string[] = [];
  if (parsed.metadata.name.trim() === "") {
    reasons.push("blank-name");
  }
  if (parsed.metadata.symbol.trim() === "") {
    reasons.push("blank-symbol");
  }
  if (parsed.metadata.name === "Unknown") {
    reasons.push("unknown-name");
  }
  if (parsed.metadata.symbol === "UNKNOWN") {
    reasons.push("unknown-symbol");
  }
  if (parsed.metadata.decimals === 0) {
    reasons.push("zero-decimals");
  }

  return reasons;
}

export function buildTokenCandidates(
  existingRows: ReadonlyMap<string, string>,
  liveAssets: readonly { address: string; chainId: number }[],
  chainIdFilter?: number
): TokenCandidate[] {
  const candidates = new Map<string, TokenCandidate>();

  for (const [key, previousOutput] of existingRows) {
    const parsedKey = parseTokenCacheKey(key);
    if (!parsedKey || (chainIdFilter !== undefined && parsedKey.chainId !== chainIdFilter)) {
      continue;
    }

    const suspiciousReasons = getTokenSuspiciousReasons(previousOutput);
    if (suspiciousReasons.length === 0) {
      continue;
    }

    candidates.set(key, {
      ...parsedKey,
      key,
      live: false,
      previousOutput,
      suspiciousReasons,
    });
  }

  for (const asset of liveAssets) {
    if (chainIdFilter !== undefined && asset.chainId !== chainIdFilter) {
      continue;
    }

    const key = buildTokenCacheKey(asset.chainId, asset.address);
    const previousOutput = existingRows.get(key);
    const existingCandidate = candidates.get(key);

    candidates.set(key, {
      address: normalizeAddress(asset.address),
      chainId: asset.chainId,
      key,
      live: true,
      previousOutput,
      suspiciousReasons:
        existingCandidate?.suspiciousReasons ?? getTokenSuspiciousReasons(previousOutput),
    });
  }

  return [...candidates.values()].sort((left, right) => compareTokenCacheKeys(left.key, right.key));
}

export function chooseTokenOutput(
  previousOutput: string | undefined,
  lookup: TokenLookupMergeInput
): TokenOutputDecision {
  const nextIsKnown = isKnownTokenOutput(lookup.output);
  const nextIsSuspicious = nextIsKnown && isSuspiciousTokenOutput(lookup.output);
  const previousIsKnown = isKnownTokenOutput(previousOutput);

  if (previousOutput === undefined) {
    return {
      output: lookup.output,
      protectedPrevious: false,
      reason: "new",
    };
  }

  if (nextIsKnown && (!previousIsKnown || !nextIsSuspicious)) {
    return {
      output: lookup.output,
      protectedPrevious: false,
      reason: previousIsKnown ? "overwrite-known" : "overwrite-unknown",
    };
  }

  if (previousIsKnown && !lookup.noCode && !lookup.failuresConfirmed) {
    return {
      output: previousOutput,
      protectedPrevious: true,
      reason: "protect-known",
    };
  }

  return {
    output: lookup.output,
    protectedPrevious: false,
    reason: "overwrite-unknown",
  };
}

export function buildProxenderCandidates(
  existingRows: ReadonlyMap<string, string>,
  liveStreams: readonly { chainId: number; contract: string; sender: string }[],
  chainIdFilter?: number
): ProxenderCandidate[] {
  const candidates = new Map<string, ProxenderCandidate>();

  for (const [key, previousOutput] of existingRows) {
    const parsedKey = parseProxenderCacheKey(key);
    if (!parsedKey || (chainIdFilter !== undefined && parsedKey.chainId !== chainIdFilter)) {
      continue;
    }

    candidates.set(key, {
      ...parsedKey,
      key,
      live: false,
      previousOutput,
    });
  }

  for (const stream of liveStreams) {
    if (chainIdFilter !== undefined && stream.chainId !== chainIdFilter) {
      continue;
    }

    const key = buildProxenderCacheKey(stream.chainId, stream.contract, stream.sender);
    const previousOutput = existingRows.get(key);
    candidates.set(key, {
      chainId: stream.chainId,
      key,
      live: true,
      lockupAddress: normalizeAddress(stream.contract),
      previousOutput,
      streamSender: normalizeAddress(stream.sender),
    });
  }

  return [...candidates.values()].sort((left, right) =>
    compareProxenderCacheKeys(left.key, right.key)
  );
}

export function serializeProxenderOutput(ownerOrAlias: string): string {
  return ownerOrAlias === NOT_AVAILABLE
    ? UNKNOWN_ALIAS
    : JSON.stringify(normalizeAddress(ownerOrAlias));
}
