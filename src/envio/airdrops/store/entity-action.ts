import type { Envio } from "../../common/bindings";
import { Id } from "../../common/id";
import type { Context, Entity, Enum } from "../bindings";
import type { Params } from "../helpers/types";

export function create(
  context: Context.Handler,
  event: Envio.Event,
  entities: Params.ActionEntities,
  params: Params.Action,
): Entity.Action {
  const action: Entity.Action = {
    block: BigInt(event.block.number),
    campaign_id: entities.campaign.id,
    category: params.category as Enum.ActionCategory,
    chainId: BigInt(event.chainId),
    claimAmount: params.claimAmount,
    claimIndex: params.claimIndex,
    claimRecipient: params.claimRecipient?.toLowerCase(),
    claimStreamId: params.claimStreamId,
    claimTokenId: params.claimTokenId,
    clawbackAmount: params.clawbackAmount,
    clawbackFrom: params.clawbackFrom?.toLowerCase(),
    clawbackTo: params.clawbackTo?.toLowerCase(),
    fee: params.fee,
    from: event.transaction.from?.toLowerCase() || "",
    hash: event.transaction.hash,
    id: Id.action(event),
    subgraphId: entities.watcher.actionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.Action.set(action);
  return action;
}
