import { BigInt } from "@graphprotocol/graph-ts";
import { ONE } from "../../common/constants";
import {
  CreateVault,
  Enter,
  Redeem,
  SyncPriceFromOracle,
  UnstakeFromAdapter,
} from "../bindings/SablierBob/SablierBob";
import { Store } from "../store";

/* -------------------------------------------------------------------------- */
/*                                CREATE VAULT                                */
/* -------------------------------------------------------------------------- */

export function handleCreateVault(event: CreateVault): void {
  const pool = Store.PoolState.getOrCreate(event.params.vaultId);

  pool.token = event.params.token;
  pool.oracle = event.params.oracle;
  pool.adapter = event.params.adapter;
  pool.shareToken = event.params.shareToken;
  pool.targetPrice = event.params.targetPrice;
  pool.expiry = event.params.expiry;
  pool.createdBlock = event.block.number;
  pool.createdTxHash = event.transaction.hash.toHexString();

  pool.lastActivityBlock = maxBigInt(pool.lastActivityBlock, event.block.number);
  pool.save();
}

/* -------------------------------------------------------------------------- */
/*                                    ENTER                                   */
/* -------------------------------------------------------------------------- */

export function handleEnter(event: Enter): void {
  /* -------------------------------- PoolState ------------------------------- */
  const pool = Store.PoolState.getOrCreate(event.params.vaultId);

  pool.enterCount = pool.enterCount.plus(ONE);
  pool.depositedAmountTotal = pool.depositedAmountTotal.plus(event.params.amountReceived);
  pool.sharesMintedTotal = pool.sharesMintedTotal.plus(event.params.sharesMinted);
  pool.lastActivityBlock = maxBigInt(pool.lastActivityBlock, event.block.number);
  pool.save();

  /* ------------------------------ PoolUserState ----------------------------- */
  const userState = Store.PoolUserState.getOrCreate(event.params.vaultId, event.params.user);

  userState.enterCount = userState.enterCount.plus(ONE);
  userState.enteredAmountTotal = userState.enteredAmountTotal.plus(event.params.amountReceived);
  userState.sharesMintedTotal = userState.sharesMintedTotal.plus(event.params.sharesMinted);

  if (
    userState.firstEnterBlock === null ||
    event.block.number.lt(userState.firstEnterBlock as BigInt)
  ) {
    userState.firstEnterBlock = event.block.number;
  }

  userState.lastActivityBlock = maxBigInt(userState.lastActivityBlock, event.block.number);
  userState.save();

  Store.Enter.create(event);
}

/* -------------------------------------------------------------------------- */
/*                                   REDEEM                                   */
/* -------------------------------------------------------------------------- */

export function handleRedeem(event: Redeem): void {
  /* -------------------------------- PoolState ------------------------------- */
  const pool = Store.PoolState.getOrCreate(event.params.vaultId);

  pool.redeemCount = pool.redeemCount.plus(ONE);
  pool.redeemedAmountTotal = pool.redeemedAmountTotal.plus(event.params.amountReceived);
  pool.sharesBurnedRedeemTotal = pool.sharesBurnedRedeemTotal.plus(event.params.sharesBurned);
  pool.redeemedFeeTotal = pool.redeemedFeeTotal.plus(event.params.fee);
  pool.lastActivityBlock = maxBigInt(pool.lastActivityBlock, event.block.number);
  pool.save();

  /* ------------------------------ PoolUserState ----------------------------- */
  const userState = Store.PoolUserState.getOrCreate(event.params.vaultId, event.params.user);

  userState.redeemCount = userState.redeemCount.plus(ONE);
  userState.redeemedAmountTotal = userState.redeemedAmountTotal.plus(event.params.amountReceived);
  userState.sharesBurnedRedeemTotal = userState.sharesBurnedRedeemTotal.plus(
    event.params.sharesBurned
  );
  userState.redeemedFeeTotal = userState.redeemedFeeTotal.plus(event.params.fee);
  userState.lastActivityBlock = maxBigInt(userState.lastActivityBlock, event.block.number);
  userState.save();

  /* ---------------------------------- Event --------------------------------- */
  Store.Redeem.create(event);
}

/* -------------------------------------------------------------------------- */
/*                                 SYNC PRICE                                 */
/* -------------------------------------------------------------------------- */

export function handleSyncPriceFromOracle(event: SyncPriceFromOracle): void {
  const pool = Store.PoolState.getOrCreate(event.params.vaultId);

  pool.syncCount = pool.syncCount.plus(ONE);
  pool.latestOraclePrice = event.params.latestPrice;
  pool.lastOracleSyncAt = event.params.syncedAt;
  pool.lastActivityBlock = maxBigInt(pool.lastActivityBlock, event.block.number);
  pool.save();

  Store.SyncPriceFromOracle.create(event);
}

/* -------------------------------------------------------------------------- */
/*                                   UNSTAKE                                  */
/* -------------------------------------------------------------------------- */

export function handleUnstakeFromAdapter(event: UnstakeFromAdapter): void {
  const pool = Store.PoolState.getOrCreate(event.params.vaultId);

  pool.unstakeCount = pool.unstakeCount.plus(ONE);
  pool.lastUnstakedAmountStaked = event.params.wrappedTokenUnstakedAmount;
  pool.lastUnstakedAmountReceived = event.params.amountReceivedFromAdapter;
  pool.lastActivityBlock = maxBigInt(pool.lastActivityBlock, event.block.number);
  pool.save();
}

function maxBigInt(a: BigInt, b: BigInt): BigInt {
  return a.gt(b) ? a : b;
}
