import { Address, BigInt } from "@graphprotocol/graph-ts";
export namespace CommonParams {
  export class Action {
    addressA: Address | null = null;
    addressB: Address | null = null;
    amountA: BigInt | null = null;
    amountB: BigInt | null = null;
    category: string;
    streamId: string | null = null;
  }
  export class Approval {
    approved: Address;
    owner: Address;
    tokenId: BigInt;
  }

  export class ApprovalForAll {
    approved: boolean;
    owner: Address;
    operator: Address;
  }
}
