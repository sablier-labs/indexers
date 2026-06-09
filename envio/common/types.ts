import type { Address } from "viem";

export type StreamActionCategory =
  | "Adjust"
  | "Approval"
  | "ApprovalForAll"
  | "Cancel"
  | "Create"
  | "Deposit"
  | "Pause"
  | "Refund"
  | "Renounce"
  | "Restart"
  | "Transfer"
  | "Void"
  | "Withdraw";

export namespace RPCData {
  export enum Category {
    Proxender = "proxenders",
    ERC20 = "erc20",
  }

  export type ERC20Metadata = {
    decimals: number;
    name: string;
    symbol: string;
  };

  export type ProxenderInfo = {
    owner: Address;
  };
}

export namespace CommonParams {
  export type Action = {
    addressA?: string;
    addressB?: string;
    amountA?: bigint;
    amountB?: bigint;
    category: StreamActionCategory;
    streamId?: string;
  };
}
