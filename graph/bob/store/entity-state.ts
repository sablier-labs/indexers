import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";
import { getOrCreateWatcher } from "./entity-watcher";

function getId(chainId: string): string {
  return `state-${chainId}`;
}

export function getOrCreateState(): Entity.State {
  const chainId = readChainId();
  const id = getId(chainId.toString());

  let state = Entity.State.load(id);
  if (state === null) {
    state = new Entity.State(id);
    state.actionCounter = ZERO;
    state.chainId = chainId;
    state.comptroller = Address.zero();
    state.feesTransferredToComptroller = ZERO;
    state.lastUpdatedAt = ZERO;
    state.lastUpdatedBlock = ZERO;
    state.vaultCounter = ZERO;
    state.save();
  }

  return state;
}

export function touchState(state: Entity.State, event: ethereum.Event): void {
  state.lastUpdatedAt = event.block.timestamp;
  state.lastUpdatedBlock = event.block.number;
}

export function addTransferredFees(state: Entity.State, feeAmount: BigInt): void {
  state.feesTransferredToComptroller = state.feesTransferredToComptroller.plus(feeAmount);
}

export function syncStateCounters(state: Entity.State): void {
  const watcher = getOrCreateWatcher();
  state.actionCounter = watcher.actionCounter;
  state.vaultCounter = watcher.vaultCounter;
}
