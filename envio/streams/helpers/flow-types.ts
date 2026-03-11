import type { Envio } from "../../common/bindings";
import type { Entity } from "../bindings";

export namespace Params {
  export type CreateEntities = {
    asset: Entity.Asset;
    batch: Entity.FlowBatch;
    batcher: Entity.FlowBatcher;
    watcher: Entity.Watcher;
  };

  export type Create = {
    recipient: Envio.Address;
    ratePerSecond: bigint;
    sender: Envio.Address;
    startTime: bigint;
    tokenId: bigint;
    transferable: boolean;
  };
}
