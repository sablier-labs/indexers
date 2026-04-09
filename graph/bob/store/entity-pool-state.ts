import { BigInt } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import { PoolState } from "../bindings/schema";

export function getOrCreatePoolState(vaultId: BigInt): PoolState {
  const id = vaultId.toString();
  let entity = PoolState.load(id);

  if (entity === null) {
    entity = new PoolState(id);

    // Counters
    entity.enterCount = ZERO;
    entity.redeemCount = ZERO;
    entity.syncCount = ZERO;
    entity.unstakeCount = ZERO;

    // Totals
    entity.depositedAmountTotal = ZERO;
    entity.sharesMintedTotal = ZERO;
    entity.redeemedAmountTotal = ZERO;
    entity.sharesBurnedRedeemTotal = ZERO;
    entity.redeemedFeeTotal = ZERO;

    // Latest state
    entity.latestOraclePrice = ZERO;
    entity.lastOracleSyncAt = ZERO;
    entity.lastUnstakedAmountStaked = ZERO;
    entity.lastUnstakedAmountReceived = ZERO;
    entity.lastActivityBlock = ZERO;
  }

  return entity;
}
