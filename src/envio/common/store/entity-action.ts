import type { Common, Envio } from "../bindings";
import { Id } from "../id";
import type { CommonParams } from "../types";

export function create<TAction extends Common.StreamAction>(
  context: {
    Action: { set: (action: TAction) => void };
  },
  event: Envio.Event,
  watcher: Common.StreamWatcher,
  params: CommonParams.Action,
): TAction {
  const id = Id.action(event);

  const action: Common.StreamAction = {
    addressA: params.addressA?.toLowerCase(),
    addressB: params.addressB?.toLowerCase(),
    amountA: params.amountA,
    amountB: params.amountB,
    block: BigInt(event.block.number),
    category: params.category,
    chainId: BigInt(event.chainId),
    contract: event.srcAddress.toLowerCase(),
    fee: event.transaction.value,
    from: event.transaction.from?.toLowerCase() || "",
    hash: event.transaction.hash,
    id,
    stream_id: params.streamId,
    subgraphId: watcher.actionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.Action.set(action as TAction);

  return action as TAction;
}
