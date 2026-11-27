import { BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ONE, ZERO } from "../../common/constants";
import { readChainId } from "../../common/context";
import { getDirectCallFee } from "../../common/fees";
import * as Entity from "../bindings/schema";

export function getOrCreateWatcher(): Entity.Watcher {
  const chainId = readChainId();
  let watcher = Entity.Watcher.load(chainId.toString());

  if (watcher === null) {
    watcher = new Entity.Watcher(chainId.toString());
    watcher.chainId = chainId;
    watcher.flowActionCounter = ONE;
    watcher.flowStreamCounter = ONE;
    watcher.lockupActionCounter = ONE;
    watcher.lockupStreamCounter = ONE;
  }

  return watcher;
}

/**
 * Batched calls share one `msg.value`, so the fee is attributed only to the first action in the transaction.
 * The caller must save the watcher.
 */
export function attributeFee(watcher: Entity.Watcher, event: ethereum.Event): BigInt {
  const lastFeeHash = watcher.lastFeeHash;
  if (lastFeeHash !== null && lastFeeHash.equals(event.transaction.hash)) {
    return ZERO;
  }
  const fee = getDirectCallFee(event);
  if (fee.gt(ZERO)) {
    watcher.lastFeeHash = event.transaction.hash;
  }
  return fee;
}
