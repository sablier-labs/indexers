import type { Address, Logger as EnvioLogger } from "envio";

export type { EvmEvent, Logger } from "envio";

export namespace Envio {
  export type Block = {
    readonly hash: string;
    readonly number: number;
    readonly timestamp: number;
  };

  // biome-ignore lint/suspicious/noConfusingVoidType: Envio generates `params: void` for no-param events
  export type Event<Params = Record<string, unknown> | void> = {
    readonly block: Block;
    readonly chainId: number;
    readonly contractName?: string;
    readonly eventName?: string;
    readonly logIndex: number;
    readonly params: Params;
    readonly srcAddress: Address;
    readonly transaction: Transaction;
  };

  export type Logger = EnvioLogger;

  export type Transaction = {
    readonly from: undefined | Address;
    readonly hash: string;
    readonly to: undefined | Address;
    readonly transactionIndex: number;
    readonly value: bigint;
  };
}
