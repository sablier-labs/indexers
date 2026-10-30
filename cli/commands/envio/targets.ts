import { envioDeployments } from "../../../src/indexers/envio-deployments.js";
import { ENVIO_CLOUD_ORG } from "../../services/envio-cloud.types.js";

export const envioTargets = {
  airdrops: {
    cloudName: "merkle-envio",
    productionEndpointUrl: envioDeployments.airdrops.endpoint.url,
  },
  analytics: {
    cloudName: "analytics",
    productionEndpointUrl: "https://indexer.hyperindex.xyz/7672d32/v1/graphql",
  },
  streams: {
    cloudName: "lockup-envio",
    productionEndpointUrl: envioDeployments.streams.endpoint.url,
  },
} as const;

export type EnvioTarget = keyof typeof envioTargets;

export function getEnvioTarget(target: EnvioTarget) {
  return { ...envioTargets[target], organisation: ENVIO_CLOUD_ORG, target };
}
