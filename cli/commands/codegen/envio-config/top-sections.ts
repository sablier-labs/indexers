import type { EnvioConfig } from "./config-types.js";

export const topSections: Record<string, EnvioConfig.TopSection> = {
  airdrops: get("airdrops"),
  analytics: get("analytics"),
  streams: get("streams"),
};

function get(name: string): EnvioConfig.TopSection {
  return {
    name: `sablier-${name}`,
    address_format: "lowercase",
    ecosystem: "evm",
    output: "./bindings",
    schema: `${name}.graphql`,
    field_selection: {
      transaction_fields: ["from", "hash", "to", "transactionIndex", "value"],
    },
    contracts: [],
    chains: [],
  };
}
