import type { Indexer } from "../../src";
import type { EnvioConfig } from "./config-types";

export const topSections: Record<Indexer.Name, EnvioConfig.TopSection> = {
  airdrops: get("airdrops"),
  analytics: get("analytics"),
  flow: get("flow"),
  lockup: get("lockup"),
};

function get(name: Indexer.Name): EnvioConfig.TopSection {
  return {
    ecosystem: "evm",
    name: `sablier-${name}`,
    output: "./bindings",
    preload_handlers: true,
    schema: "./schema.graphql",
    unordered_multichain_mode: true,
    field_selection: {
      transaction_fields: ["from", "hash", "to", "transactionIndex", "value"],
    },
    contracts: [],
    networks: [],
  };
}
