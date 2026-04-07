import type { Address } from "viem";
import type { Enum } from "../streams/bindings.js";

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
    category: Enum<"FlowActionCategory"> | Enum<"LockupActionCategory">;
    streamId?: string;
  };
}
