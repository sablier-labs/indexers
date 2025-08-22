import type { Enum as FlowEnum } from "../flow/bindings";
import type { Enum as LockupEnum } from "../lockup/bindings";
import type { Envio } from "./bindings";

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
    owner: Envio.Address;
  };
}

export namespace CommonParams {
  export type Action = {
    addressA?: string;
    addressB?: string;
    amountA?: bigint;
    amountB?: bigint;
    category: FlowEnum.ActionCategory | LockupEnum.ActionCategory;
    streamId?: string;
  };
}
