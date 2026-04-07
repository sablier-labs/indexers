import type { Address } from "viem";
import type { Entity, Enum } from "../bindings.js";

export namespace Params {
  export type Cancel = {
    recipient: Address;
    recipientAmount: bigint;
    sender: Address;
    senderAmount: bigint;
    streamId: bigint;
  };

  export type CreateEntities = {
    asset: Entity<"Asset">;
    batch: Entity<"LockupBatch">;
    batcher: Entity<"LockupBatcher">;
    watcher: Entity<"Watcher">;
  };

  export type CreateStreamCommon = {
    asset: Address;
    cancelable: boolean;
    category: Enum<"LockupStreamCategory">;
    depositAmount: bigint;
    endTime: bigint;
    funder: Address;
    proxender?: Address;
    recipient: Address;
    sender: Address;
    shape?: string;
    startTime: bigint;
    tokenId: bigint;
    transferable: boolean;
  };

  export type CreateStreamLinear = CreateStreamCommon & {
    category: "LockupLinear";
    cliffTime: bigint;
    granularity?: bigint; // v4.0 and above
    unlockAmountCliff?: bigint; // v2.0 and above
    unlockAmountStart?: bigint; // v2.0 and above
  };

  export type CreateStreamDynamic = CreateStreamCommon & {
    category: "LockupDynamic";
    segments: Segment[];
  };

  export type CreateStreamTranched = CreateStreamCommon & {
    category: "LockupTranched";
    tranches: Tranche[];
  };

  export type Withdraw = {
    amount: bigint;
    streamId: bigint;
    to: Address;
  };
}

export type Segment = {
  amount: bigint;
  exponent: bigint;
  milestone: bigint;
};

export type Tranche = {
  amount: bigint;
  timestamp: bigint;
};
