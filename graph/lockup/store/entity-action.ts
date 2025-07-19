import { ethereum } from "@graphprotocol/graph-ts";
import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import { Id } from "../../common/id";
import { CommonParams } from "../../common/types";
import * as Entity from "../bindings/schema";
import { getOrCreateWatcher } from "./entity-watcher";

export function createAction(event: ethereum.Event, params: CommonParams.Action): Entity.Action {
  const id = Id.action(event);
  const action = new Entity.Action(id);
  const watcher = getOrCreateWatcher();

  /* --------------------------- ACTION: TRANSACTION -------------------------- */
  action.block = event.block.number;
  action.chainId = readChainId();
  action.contract = event.address;
  action.fee = event.transaction.value;
  action.from = event.transaction.from;
  action.hash = event.transaction.hash;
  action.subgraphId = watcher.actionCounter;
  action.timestamp = event.block.timestamp;

  /* ----------------------------- ACTION: PARAMS ----------------------------- */
  action.addressA = params.addressA;
  action.addressB = params.addressB;
  action.amountA = params.amountA;
  action.amountB = params.amountB;
  action.category = params.category;
  action.stream = params.streamId;
  action.save();

  /* --------------------------------- WATCHER -------------------------------- */
  watcher.actionCounter = watcher.actionCounter.plus(ONE);
  watcher.save();

  return action;
}
