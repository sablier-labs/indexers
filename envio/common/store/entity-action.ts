import type { Envio } from "../bindings";
import type { CommonEntities } from "../entities";
import { Id } from "../id";
import type { CommonParams } from "../types";

export function create<TAction extends CommonEntities.StreamAction>(
  context: {
    Action: { set: (action: TAction) => void };
  },
  event: Envio.Event,
  watcher: CommonEntities.StreamWatcher,
  params: CommonParams.Action
): TAction {
  const id = Id.action(event);

  const action: CommonEntities.StreamAction = {
    addressA: params.addressA,
    addressB: params.addressB,
    amountA: params.amountA,
    amountB: params.amountB,
    block: BigInt(event.block.number),
    category: params.category,
    chainId: BigInt(event.chainId),
    contract: event.srcAddress,
    fee: event.transaction.value,
    from: event.transaction.from || "",
    hash: event.transaction.hash,
    id,
    stream_id: params.streamId,
    subgraphId: watcher.actionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.Action.set(action as TAction);

  return action as TAction;
}
