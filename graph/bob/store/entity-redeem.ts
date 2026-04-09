import { Redeem as RedeemEvent } from "../bindings/SablierBob/SablierBob";
import { Redeem } from "../bindings/schema";

export function createRedeem(event: RedeemEvent): void {
  const id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  const entity = new Redeem(id);

  entity.poolId = event.params.vaultId;
  entity.user = event.params.user;
  entity.amountReceived = event.params.amountReceived;
  entity.sharesBurned = event.params.sharesBurned;
  entity.fee = event.params.fee;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;

  entity.save();
}
