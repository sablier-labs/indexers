import { Address, BigInt } from "@graphprotocol/graph-ts";

export namespace Params {
  export class AdjustFlowStream {
    oldRatePerSecond: BigInt;
    newRatePerSecond: BigInt;
    tokenId: BigInt;
  }

  export class CreateFlowStream {
    ratePerSecond: BigInt;
    recipient: Address;
    sender: Address;
    streamId: BigInt;
    token: Address;
    transferable: boolean;
  }

  export class DepositFlowStream {
    funder: Address;
    streamId: BigInt;
    amount: BigInt;
  }

  export class PauseFlowStream {
    sender: Address;
    recipient: Address;
    streamId: BigInt;
    totalDebt: BigInt;
  }

  export class RefundFromFlowStream {
    sender: Address;
    streamId: BigInt;
    amount: BigInt;
  }

  export class RestartFlowStream {
    sender: Address;
    streamId: BigInt;
    ratePerSecond: BigInt;
  }

  export class Transfer {
    from: Address;
    to: Address;
    tokenId: BigInt;
  }

  export class VoidFlowStream {
    sender: Address;
    recipient: Address;
    streamId: BigInt;
    newTotalDebt: BigInt;
    writtenOffDebt: BigInt;
  }

  export class WithdrawFromFlowStream {
    caller: Address;
    to: Address;
    streamId: BigInt;
    withdrawAmount: BigInt;
  }
}
