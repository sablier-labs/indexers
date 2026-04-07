import type { Address } from "viem";
import type { Entity } from "../bindings.js";

export namespace Params {
  export type CreateEntities = {
    asset: Entity<"Asset">;
    batch: Entity<"FlowBatch">;
    batcher: Entity<"FlowBatcher">;
    watcher: Entity<"Watcher">;
  };

  export type Create = {
    recipient: Address;
    ratePerSecond: bigint;
    sender: Address;
    startTime: bigint;
    tokenId: bigint;
    transferable: boolean;
  };
}
