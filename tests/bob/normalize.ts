/**
 * Normalization layer for comparing rindexer (Postgraphile) with The Graph responses.
 *
 * Both vendors use camelCase field names. The main differences:
 * - Graph uses `id` (string of vaultId), rindexer uses `poolId` (numeric string)
 * - Graph stores addresses as Bytes (0x-prefixed hex), rindexer as lowercase hex
 * - Rindexer PoolUserState has no composite `id` — we derive it from poolId + user
 */

/* -------------------------------------------------------------------------- */
/*                              COMMON TYPES                                  */
/* -------------------------------------------------------------------------- */

export type NormalizedPoolState = {
  id: string;
  token: string | null;
  oracle: string | null;
  adapter: string | null;
  shareToken: string | null;
  targetPrice: string | null;
  expiry: string | null;
  createdBlock: string | null;
  createdTxHash: string | null;
  enterCount: string;
  redeemCount: string;
  syncCount: string;
  unstakeCount: string;
  depositedAmountTotal: string;
  sharesMintedTotal: string;
  redeemedAmountTotal: string;
  sharesBurnedRedeemTotal: string;
  redeemedFeeTotal: string;
  latestOraclePrice: string;
  lastOracleSyncAt: string;
  lastUnstakedAmountStaked: string;
  lastUnstakedAmountReceived: string;
  lastActivityBlock: string;
};

export type NormalizedPoolUserState = {
  id: string;
  poolId: string;
  user: string;
  enterCount: string;
  redeemCount: string;
  enteredAmountTotal: string;
  sharesMintedTotal: string;
  redeemedAmountTotal: string;
  sharesBurnedRedeemTotal: string;
  redeemedFeeTotal: string;
  firstEnterBlock: string | null;
  lastActivityBlock: string;
};

/* -------------------------------------------------------------------------- */
/*                                 HELPERS                                    */
/* -------------------------------------------------------------------------- */

function normalizeAddress(value: unknown): string | null {
  if (value == null || value === "") {
    return null;
  }
  return String(value).toLowerCase();
}

function normalizeNumeric(value: unknown): string {
  if (value == null || value === "") {
    return "0";
  }
  return String(value);
}

function normalizeNullableNumeric(value: unknown): string | null {
  if (value == null || value === "") {
    return null;
  }
  return String(value);
}

function normalizeString(value: unknown): string | null {
  if (value == null || value === "") {
    return null;
  }
  return String(value).toLowerCase();
}

/* -------------------------------------------------------------------------- */
/*                      GRAPH → NORMALIZED                                    */
/* -------------------------------------------------------------------------- */

export function normalizeGraphPoolState(raw: Record<string, unknown>): NormalizedPoolState {
  return {
    adapter: normalizeAddress(raw.adapter),
    createdBlock: normalizeNullableNumeric(raw.createdBlock),
    createdTxHash: normalizeString(raw.createdTxHash),
    depositedAmountTotal: normalizeNumeric(raw.depositedAmountTotal),
    enterCount: normalizeNumeric(raw.enterCount),
    expiry: normalizeNullableNumeric(raw.expiry),
    id: String(raw.id),
    lastActivityBlock: normalizeNumeric(raw.lastActivityBlock),
    lastOracleSyncAt: normalizeNumeric(raw.lastOracleSyncAt),
    lastUnstakedAmountReceived: normalizeNumeric(raw.lastUnstakedAmountReceived),
    lastUnstakedAmountStaked: normalizeNumeric(raw.lastUnstakedAmountStaked),
    latestOraclePrice: normalizeNumeric(raw.latestOraclePrice),
    oracle: normalizeAddress(raw.oracle),
    redeemCount: normalizeNumeric(raw.redeemCount),
    redeemedAmountTotal: normalizeNumeric(raw.redeemedAmountTotal),
    redeemedFeeTotal: normalizeNumeric(raw.redeemedFeeTotal),
    sharesBurnedRedeemTotal: normalizeNumeric(raw.sharesBurnedRedeemTotal),
    sharesMintedTotal: normalizeNumeric(raw.sharesMintedTotal),
    shareToken: normalizeAddress(raw.shareToken),
    syncCount: normalizeNumeric(raw.syncCount),
    targetPrice: normalizeNullableNumeric(raw.targetPrice),
    token: normalizeAddress(raw.token),
    unstakeCount: normalizeNumeric(raw.unstakeCount),
  };
}

export function normalizeGraphPoolUserState(raw: Record<string, unknown>): NormalizedPoolUserState {
  return {
    enterCount: normalizeNumeric(raw.enterCount),
    enteredAmountTotal: normalizeNumeric(raw.enteredAmountTotal),
    firstEnterBlock: normalizeNullableNumeric(raw.firstEnterBlock),
    id: String(raw.id),
    lastActivityBlock: normalizeNumeric(raw.lastActivityBlock),
    poolId: normalizeNumeric(raw.poolId),
    redeemCount: normalizeNumeric(raw.redeemCount),
    redeemedAmountTotal: normalizeNumeric(raw.redeemedAmountTotal),
    redeemedFeeTotal: normalizeNumeric(raw.redeemedFeeTotal),
    sharesBurnedRedeemTotal: normalizeNumeric(raw.sharesBurnedRedeemTotal),
    sharesMintedTotal: normalizeNumeric(raw.sharesMintedTotal),
    user: normalizeAddress(raw.user)!,
  };
}

/* -------------------------------------------------------------------------- */
/*                    RINDEXER → NORMALIZED                                   */
/* -------------------------------------------------------------------------- */

export function normalizeRindexerPoolState(raw: Record<string, unknown>): NormalizedPoolState {
  return {
    adapter: normalizeAddress(raw.adapter),
    createdBlock: normalizeNullableNumeric(raw.createdBlock),
    createdTxHash: normalizeString(raw.createdTxHash),
    depositedAmountTotal: normalizeNumeric(raw.depositedAmountTotal),
    enterCount: normalizeNumeric(raw.enterCount),
    expiry: normalizeNullableNumeric(raw.expiry),
    id: String(raw.poolId),
    lastActivityBlock: normalizeNumeric(raw.lastActivityBlock),
    lastOracleSyncAt: normalizeNumeric(raw.lastOracleSyncAt),
    lastUnstakedAmountReceived: normalizeNumeric(raw.lastUnstakedAmountReceived),
    lastUnstakedAmountStaked: normalizeNumeric(raw.lastUnstakedAmountStaked),
    latestOraclePrice: normalizeNumeric(raw.latestOraclePrice),
    oracle: normalizeAddress(raw.oracle),
    redeemCount: normalizeNumeric(raw.redeemCount),
    redeemedAmountTotal: normalizeNumeric(raw.redeemedAmountTotal),
    redeemedFeeTotal: normalizeNumeric(raw.redeemedFeeTotal),
    sharesBurnedRedeemTotal: normalizeNumeric(raw.sharesBurnedRedeemTotal),
    sharesMintedTotal: normalizeNumeric(raw.sharesMintedTotal),
    shareToken: normalizeAddress(raw.shareToken),
    syncCount: normalizeNumeric(raw.syncCount),
    targetPrice: normalizeNullableNumeric(raw.targetPrice),
    token: normalizeAddress(raw.token),
    unstakeCount: normalizeNumeric(raw.unstakeCount),
  };
}

export function normalizeRindexerPoolUserState(
  raw: Record<string, unknown>
): NormalizedPoolUserState {
  const poolId = String(raw.poolId);
  const user = normalizeAddress(raw.user)!;
  return {
    id: `${poolId}-${user}`,
    poolId,
    user,
    enterCount: normalizeNumeric(raw.enterCount),
    enteredAmountTotal: normalizeNumeric(raw.enteredAmountTotal),
    firstEnterBlock: normalizeNullableNumeric(raw.firstEnterBlock),
    lastActivityBlock: normalizeNumeric(raw.lastActivityBlock),
    redeemCount: normalizeNumeric(raw.redeemCount),
    redeemedAmountTotal: normalizeNumeric(raw.redeemedAmountTotal),
    redeemedFeeTotal: normalizeNumeric(raw.redeemedFeeTotal),
    sharesBurnedRedeemTotal: normalizeNumeric(raw.sharesBurnedRedeemTotal),
    sharesMintedTotal: normalizeNumeric(raw.sharesMintedTotal),
  };
}
