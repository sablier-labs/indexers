import type { Indexer } from "../../../../src/types.js";
import type { EnvioConfig } from "./config-types.js";

export const topSections: Record<Indexer.Name, EnvioConfig.TopSection> = {
  airdrops: get("airdrops"),
  analytics: get("analytics"),
  flow: get("flow"),
  lockup: get("lockup"),
};

function get(name: Indexer.Name): EnvioConfig.TopSection {
  return {
    name: `sablier-${name}`,
    address_format: "lowercase",
    ecosystem: "evm",
    output: "./bindings",
    preload_handlers: true,
    schema: `${name}.graphql`,
    unordered_multichain_mode: true,
    field_selection: {
      transaction_fields: ["from", "hash", "to", "transactionIndex", "value"],
    },
    contracts: [],
    networks: [],
  };
}
