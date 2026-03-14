import type { Envio } from "../../../common/bindings";
import { Id } from "../../../common/id";
import type { Entity, Enum } from "../../bindings";

type ActionParams = {
  addressA?: string;
  addressB?: string;
  amountA?: bigint;
  amountB?: bigint;
  category: Enum.LockupActionCategory;
  streamId?: string;
};

export function create(
  context: {
    LockupAction: { set: (action: Entity.LockupAction) => void };
  },
  event: Envio.Event,
  watcher: Entity.Watcher,
  params: ActionParams
): Entity.LockupAction {
  const id = Id.action(event);

  const action: Entity.LockupAction = {
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
    subgraphId: watcher.lockupActionCounter,
    timestamp: BigInt(event.block.timestamp),
  };
  context.LockupAction.set(action);

  return action;
}
