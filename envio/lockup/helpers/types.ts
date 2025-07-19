import type { Envio } from "../../common/bindings";
import type { Entity, Enum } from "../bindings";

export namespace Params {
  export type Cancel = {
    recipient: Envio.Address;
    recipientAmount: bigint;
    sender: Envio.Address;
    senderAmount: bigint;
    streamId: bigint;
  };

  export type CreateEntities = {
    asset: Entity.Asset;
    batch: Entity.Batch;
    batcher: Entity.Batcher;
    users: {
      caller?: Entity.User;
      funder?: Entity.User;
      recipient?: Entity.User;
      sender?: Entity.User;
    };
    watcher: Entity.Watcher;
  };

  export type CreateStreamCommon = {
    asset: Envio.Address;
    cancelable: boolean;
    category: Enum.StreamCategory;
    depositAmount: bigint;
    endTime: bigint;
    funder: Envio.Address;
    proxender?: Envio.Address;
    recipient: Envio.Address;
    sender: Envio.Address;
    shape?: string;
    startTime: bigint;
    tokenId: bigint;
    transferable: boolean;
  };

  export type CreateStreamLinear = CreateStreamCommon & {
    category: "LockupLinear";
    cliffTime: bigint;
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
    to: Envio.Address;
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
