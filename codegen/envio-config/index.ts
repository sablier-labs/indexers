import type { Types } from "../../lib/types";
import type { EnvioConfig } from "./config-types";
import { createContracts } from "./contracts";
import { createNetworks } from "./networks";
import { topSections } from "./top-sections";

/**
 * Creates a Graph manifest for a given protocol and chain.
 * @see https://docs.envio.dev/docs/HyperIndex/configuration-file#interactive-schema-explorer
 */
export function createEnvioConfig(protocol: Types.Protocol): EnvioConfig.TopSection {
  const topSection = topSections[protocol];
  const contracts = createContracts(protocol);
  const networks = createNetworks(protocol);

  const config = {
    ...topSection,
    contracts,
    networks,
  } as EnvioConfig.TopSection;

  return config;
}
