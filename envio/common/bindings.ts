import type { logger as Logger_t } from "envio/src/Envio.gen.js";
import type { genericEvent as Internal_genericEvent } from "envio/src/Internal.gen.js";
import type { Address } from "viem";

/**
 * Generic bindings hard-coded here because Envio doesn't export them.
 * @see https://github.com/enviodev/hyperindex/issues/532
 */
export namespace Envio {
  export type Block = {
    readonly number: number;
    readonly timestamp: number;
    readonly hash: string;
  };

  export type eventLog<params> = Internal_genericEvent<params, Block, Transaction>;
  export type EventLog<params> = eventLog<params>;
  // biome-ignore lint/suspicious/noConfusingVoidType: Envio generates `params: void` for no-param events
  export type Event<Params = Record<string, unknown> | void> = EventLog<Params>;

  export type Logger = Logger_t;

  export type Transaction = {
    readonly from: undefined | Address;
    readonly hash: string;
    readonly to: undefined | Address;
    readonly transactionIndex: number;
    readonly value: bigint;
  };
}
