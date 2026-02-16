import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";
import { getOrCreateWatcher } from "./entity-watcher";

class ActionParams {
  addressA: Address | null;
  addressB: Address | null;
  amountA: BigInt | null;
  amountB: BigInt | null;
  amountC: BigInt | null;
  category: string;
  vaultId: string | null;
}

function getId(event: ethereum.Event): string {
  const chainId = readChainId().toString();
  const hash = event.transaction.hash.toHexString();
  const logIndex = event.logIndex.toString();
  return `action-${chainId}-${hash}-${logIndex}`;
}

export function createAction(event: ethereum.Event, params: ActionParams): Entity.Action {
  const action = new Entity.Action(getId(event));
  const watcher = getOrCreateWatcher();

  action.block = event.block.number;
  action.category = params.category;
  action.chainId = readChainId();
  action.contract = event.address;
  action.from = event.transaction.from;
  action.hash = event.transaction.hash;
  action.subgraphId = watcher.actionCounter;
  action.timestamp = event.block.timestamp;

  action.addressA = params.addressA;
  action.addressB = params.addressB;
  action.amountA = params.amountA;
  action.amountB = params.amountB;
  action.amountC = params.amountC;
  action.vault = params.vaultId;

  action.save();

  watcher.actionCounter = watcher.actionCounter.plus(ONE);
  watcher.save();

  return action;
}
