import type { Common, Envio } from "../../common/bindings";
import type { Entity } from "../bindings";

export namespace Params {
  export type CreateEntities = {
    asset: Entity.Asset;
    batch: Entity.Batch;
    batcher: Entity.Batcher;
    users: {
      creator?: Common.User;
      recipient?: Common.User;
      sender?: Common.User;
    };
    watcher: Entity.Watcher;
  };

  export type Create = {
    recipient: Envio.Address;
    ratePerSecond: bigint;
    sender: Envio.Address;
    tokenId: bigint;
    transferable: boolean;
  };
}
