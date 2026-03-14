import type { Envio } from "../../../common/bindings";
import { Id } from "../../../common/id";
import type { Entity, Enum } from "../../bindings";

type ActionParams = {
  addressA?: string;
  addressB?: string;
  amountA?: bigint;
  amountB?: bigint;
  category: Enum.FlowActionCategory;
  streamId?: string;
};

export function create(
  context: {
    FlowAction: { set: (action: Entity.FlowAction) => void };
  },
  event: Envio.Event,
  watcher: Entity.Watcher,
  params: ActionParams
): Entity.FlowAction {
  const id = Id.action(event);

  const action: Entity.FlowAction = {
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
    subgraphId: watcher.flowActionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.FlowAction.set(action);

  return action;
}
