import type { t as Address_t } from "envio/src/Address.gen";
import type { logger as Logger_t } from "envio/src/Envio.gen";
import type { genericEvent as Internal_genericEvent } from "envio/src/Internal.gen";

/**
 * Generic bindings hard-coded here because Envio doesn't export them.
 * @see https://github.com/enviodev/hyperindex/issues/532
 */
export namespace Envio {
  export type Address = Address_t;
  export type Block = {
    readonly number: number;
    readonly timestamp: number;
    readonly hash: string;
  };

  export type eventLog<params> = Internal_genericEvent<params, Block, Transaction>;
  export type EventLog<params> = eventLog<params>;
  export type Event<Params extends object = Record<string, unknown>> = EventLog<Params>;

  export type Logger = Logger_t;

  export type Transaction = {
    readonly from: undefined | Address_t;
    readonly hash: string;
    readonly to: undefined | Address_t;
    readonly transactionIndex: number;
    readonly value: bigint;
  };
}
