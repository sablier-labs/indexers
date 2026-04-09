import { SyncPriceFromOracle as SyncEvent } from "../bindings/SablierBob/SablierBob";
import { SyncPriceFromOracle } from "../bindings/schema";

export function createSyncPriceFromOracle(event: SyncEvent): void {
  const id = event.transaction.hash.toHexString() + "-" + event.logIndex.toString();
  const entity = new SyncPriceFromOracle(id);

  entity.poolId = event.params.vaultId;
  entity.latestPrice = event.params.latestPrice;
  entity.blockNumber = event.block.number;
  entity.blockTimestamp = event.block.timestamp;
  entity.txHash = event.transaction.hash;
  entity.logIndex = event.logIndex;

  entity.save();
}
