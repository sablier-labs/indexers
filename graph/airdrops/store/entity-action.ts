import { ethereum } from "@graphprotocol/graph-ts";
import { ONE } from "../../common/constants";
import { readChainId } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";
import { Params } from "../helpers/types";
import { getOrCreateWatcher } from "./entity-watcher";

export function createAction(event: ethereum.Event, params: Params.Action): Entity.Action {
  const actionId = Id.action(event);
  const action = new Entity.Action(actionId);
  const watcher = getOrCreateWatcher();

  /* --------------------------- ACTION: TRANSACTION -------------------------- */
  action.block = event.block.number;
  action.chainId = readChainId();
  action.from = event.transaction.from;
  action.hash = event.transaction.hash;
  action.subgraphId = watcher.actionCounter;
  action.timestamp = event.block.timestamp;

  /* ----------------------------- ACTION: PARAMS ----------------------------- */
  action.campaign = params.campaign;
  action.category = params.category;
  action.claimAmount = params.claimAmount;
  action.claimIndex = params.claimIndex;
  action.claimRecipient = params.claimRecipient;
  action.claimStreamId = params.claimStreamId;
  action.claimTokenId = params.claimTokenId;
  action.clawbackAmount = params.clawbackAmount;
  action.clawbackFrom = params.clawbackFrom;
  action.clawbackTo = params.clawbackTo;
  action.fee = params.fee;
  action.save();

  /* --------------------------------- WATCHER -------------------------------- */
  watcher.actionCounter = watcher.actionCounter.plus(ONE);
  watcher.save();

  return action;
}
