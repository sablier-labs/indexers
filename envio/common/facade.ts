import type { Address, EvmContractRegisterContext, EvmEvent, EvmOnEventContext } from "envio";
import { indexer } from "envio";

type EventFor<ContractName extends string, EventName extends string> = Extract<
  EvmEvent,
  { readonly contractName: ContractName; readonly eventName: EventName }
>;

export type EventHandler<ContractName extends string, EventName extends string> = {
  bivarianceHack(args: {
    readonly context: EvmOnEventContext;
    readonly event: EventFor<ContractName, EventName>;
  }): Promise<void> | void;
}["bivarianceHack"];

type LegacyContractRegisterContext = EvmContractRegisterContext &
  Record<`add${string}`, (address: Address) => void>;

type LegacyContractRegisterHandler<ContractName extends string, EventName extends string> = (args: {
  readonly context: LegacyContractRegisterContext;
  readonly event: EventFor<ContractName, EventName>;
}) => Promise<void> | void;

type LegacyHandlerOptions = {
  readonly eventFilters?: (args: {
    readonly addresses: readonly Address[];
    readonly chainId: number;
  }) => boolean | Record<string, unknown> | readonly Record<string, unknown>[];
  readonly where?: unknown;
  readonly wildcard?: boolean;
};

export type EventFacade<ContractName extends string, EventName extends string> = {
  readonly contractRegister: (
    handler: LegacyContractRegisterHandler<ContractName, EventName>,
    options?: LegacyHandlerOptions
  ) => void;
  readonly handler: {
    // biome-ignore lint/style/useUnifiedTypeSignatures: keep overloads to preserve inline handler typing while accepting reused legacy handlers
    (handler: EventHandler<ContractName, EventName>, options?: LegacyHandlerOptions): void;
    (handler: unknown, options?: LegacyHandlerOptions): void;
  };
};

export function contract<ContractName extends string, EventName extends readonly string[]>(
  contractName: ContractName,
  eventNames: EventName
): { readonly [K in EventName[number]]: EventFacade<ContractName, K> } {
  return Object.fromEntries(
    eventNames.map((eventName) => [eventName, event(contractName, eventName)])
  ) as unknown as { readonly [K in EventName[number]]: EventFacade<ContractName, K> };
}

function event<ContractName extends string, EventName extends string>(
  contractName: ContractName,
  eventName: EventName
): EventFacade<ContractName, EventName> {
  return {
    contractRegister(handler, options) {
      indexer.contractRegister(registration(contractName, eventName, options), async (args) => {
        await handler({
          context: legacyContractRegisterContext(args.context),
          event: args.event as EventFor<ContractName, EventName>,
        });
      });
    },
    handler(handler, options) {
      indexer.onEvent(registration(contractName, eventName, options), handler as never);
    },
  };
}

function registration<ContractName extends string, EventName extends string>(
  contractName: ContractName,
  eventName: EventName,
  options: LegacyHandlerOptions = {}
) {
  const result: Record<string, unknown> = { contract: contractName, event: eventName };
  if (options.wildcard !== undefined) {
    result.wildcard = options.wildcard;
  }
  if (options.where) {
    result.where = options.where;
  }
  if (options.eventFilters) {
    result.where = ({ chain }: { readonly chain: Record<string, unknown> & { id: number } }) => {
      const contractState = chain[contractName] as { readonly addresses?: readonly Address[] };
      const filter = options.eventFilters?.({
        addresses: contractState?.addresses ?? [],
        chainId: chain.id,
      });
      return typeof filter === "boolean" ? filter : { params: filter };
    };
  }
  return result as never;
}

function legacyContractRegisterContext(
  context: EvmContractRegisterContext
): LegacyContractRegisterContext {
  return new Proxy(context as LegacyContractRegisterContext, {
    get(target, property, receiver) {
      if (typeof property === "string" && property.startsWith("add")) {
        const contractName = property.slice(3);
        const registration = (
          context.chain as unknown as Record<string, { add?: (address: Address) => void }>
        )[contractName];
        if (registration?.add) {
          return registration.add.bind(registration);
        }
      }
      return Reflect.get(target, property, receiver);
    },
  });
}
