import type { Types } from "../../lib/types";
import type { EnvioConfig } from "./config-types";

export const topSections: Record<Types.Protocol, EnvioConfig.TopSection> = {
  airdrops: get("airdrops"),
  flow: get("flow"),
  lockup: get("lockup"),
};

function get(name: string): EnvioConfig.TopSection {
  return {
    ecosystem: "evm",
    name: `sablier-${name}`,
    output: "./bindings",
    schema: "./schema.graphql",
    unordered_multichain_mode: true,
    field_selection: {
      transaction_fields: ["from", "hash", "to", "transactionIndex", "value"],
    },
    contracts: [],
    networks: [],
  };
}
