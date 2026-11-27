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
  export type ERC20Metadata = {
    decimals: number;
    name: string;
    symbol: string;
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
