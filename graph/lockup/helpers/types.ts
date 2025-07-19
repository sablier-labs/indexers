import { Address, BigInt } from "@graphprotocol/graph-ts";

export namespace Params {
  export class CancelStream {
    recipient: Address;
    recipientAmount: BigInt;
    sender: Address;
    senderAmount: BigInt;
    streamId: BigInt;
  }

  export class CreateStreamCommon {
    asset: Address;
    cancelable: boolean;
    category: string;
    depositAmount: BigInt;
    endTime: BigInt;
    funder: Address;
    recipient: Address;
    shape: string | null;
    sender: Address;
    streamId: BigInt;
    startTime: BigInt;
    transferable: boolean;
  }

  export class CreateStreamLinear {
    cliffTime: BigInt;
    unlockAmountCliff: BigInt | null; // v2.0 and above
    unlockAmountStart: BigInt | null; // v2.0 and above
  }

  export class CreateStreamDynamic {
    segments: Segment[];
  }

  export class CreateStreamTranched {
    tranches: Tranche[];
  }

  export class RenounceStream {
    streamId: BigInt;
  }

  export class TransferNFT {
    from: Address;
    to: Address;
    tokenId: BigInt;
  }

  export class WithdrawFromStream {
    amount: BigInt;
    streamId: BigInt;
    to: Address;
  }
}

export class Segment {
  amount: BigInt;
  exponent: BigInt;
  milestone: BigInt;

  constructor(amount: BigInt, exponent: BigInt, milestone: BigInt) {
    this.amount = amount;
    this.exponent = exponent;
    this.milestone = milestone;
  }
}

export class Tranche {
  amount: BigInt;
  timestamp: BigInt;

  constructor(amount: BigInt, timestamp: BigInt) {
    this.amount = amount;
    this.timestamp = timestamp;
  }
}
