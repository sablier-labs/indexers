import type { Envio } from "../../common/bindings";
import { Id } from "../../common/id";
import type { Context, Entity, Enum } from "../bindings";
import type { Params } from "../helpers/types";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  watcher: Entity.Watcher,
  params: Params.Action
): Entity.Action {
  const action: Entity.Action = {
    block: BigInt(event.block.number),
    campaign_id: params.campaignId,
    category: params.category as Enum.ActionCategory,
    chainId: BigInt(event.chainId),
    claimAmount: params.claimAmount,
    claimIndex: params.claimIndex,
    claimRecipient: params.claimRecipient,
    claimStreamId: params.claimStreamId,
    claimTo: params.claimTo,
    claimTokenId: params.claimTokenId,
    clawbackAmount: params.clawbackAmount,
    clawbackFrom: params.clawbackFrom,
    clawbackTo: params.clawbackTo,
    fee: params.fee,
    forgoneAmount: params.forgoneAmount,
    from: event.transaction.from || "",
    hash: event.transaction.hash,
    id: Id.action(event),
    subgraphId: watcher.actionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.Action.set(action);
  return action;
}
