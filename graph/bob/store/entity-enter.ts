import { Enter as EnterEvent } from "../bindings/SablierBob/SablierBob";
import { Enter } from "../bindings/schema";

export function createEnter(event: EnterEvent): void {
  const id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  const entity = new Enter(id);

  entity.poolId = event.params.vaultId;
  entity.user = event.params.user;
  entity.amountReceived = event.params.amountReceived;
  entity.sharesMinted = event.params.sharesMinted;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.transactionHash = event.transaction.hash;
  entity.logIndex = event.logIndex;

  entity.save();
}
