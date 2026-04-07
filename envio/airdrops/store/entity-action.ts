import type { Envio } from "../../common/bindings.js";
import { Id } from "../../common/id.js";
import type { Context, Entity, Enum } from "../bindings.js";
import type { Params } from "../helpers/types.js";

export function create(
  context: Context.Handler,
  event: Envio.Event<unknown>,
  watcher: Entity<"Watcher">,
  params: Params.Action
): Entity<"Action"> {
  const action: Entity<"Action"> = {
    block: BigInt(event.block.number),
    campaign_id: params.campaignId,
    category: params.category as Enum<"ActionCategory">,
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
    from: event.transaction.from || "",
    hash: event.transaction.hash,
    id: Id.action(event),
    subgraphId: watcher.actionCounter,
    timestamp: BigInt(event.block.timestamp),
    vcaForgoneAmount: params.vcaForgoneAmount,
  };
  context.Action.set(action);
  return action;
}
