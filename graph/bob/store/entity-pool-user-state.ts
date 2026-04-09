import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import { PoolUserState } from "../bindings/schema";

export function getOrCreatePoolUserState(vaultId: BigInt, user: Address): PoolUserState {
  const id = vaultId.toString() + "-" + user.toHexString();
  let entity = PoolUserState.load(id);

  if (entity === null) {
    entity = new PoolUserState(id);
    entity.poolId = vaultId;
    entity.user = user;

    // Counters
    entity.enterCount = ZERO;
    entity.redeemCount = ZERO;

    // Totals
    entity.enteredAmountTotal = ZERO;
    entity.sharesMintedTotal = ZERO;
    entity.redeemedAmountTotal = ZERO;
    entity.sharesBurnedRedeemTotal = ZERO;
    entity.redeemedFeeTotal = ZERO;

    // Tracking
    entity.firstEnterBlock = null;
    entity.lastActivityBlock = ZERO;
  }

  return entity;
}
