import type { Indexer } from "../../../../src/types";
import type { EnvioConfig } from "./config-types";

export const topSections: Record<Indexer.Name, EnvioConfig.TopSection> = {
  airdrops: get("airdrops"),
  analytics: get("analytics"),
  flow: get("flow"),
  lockup: get("lockup"),
};

function get(name: Indexer.Name): EnvioConfig.TopSection {
  return {
    contracts: [],
    ecosystem: "evm",
    field_selection: {
      transaction_fields: ["from", "hash", "to", "transactionIndex", "value"],
    },
    name: `sablier-${name}`,
    networks: [],
    output: "./bindings",
    preload_handlers: true,
    schema: `./${name}.graphql`,
    unordered_multichain_mode: true,
  };
}
