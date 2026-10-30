import { envioDeployments } from "../../../src/indexers/envio-deployments.js";
import { ENVIO_CLOUD_ORG } from "../../services/envio-cloud.types.js";
import { ENVIO_ANALYTICS_ENDPOINT } from "../query/clients/envio.js";

export const envioTargets = {
  airdrops: {
    cloudName: "merkle-envio",
    productionEndpointUrl: envioDeployments.airdrops.endpoint.url,
  },
  analytics: {
    cloudName: "analytics",
    productionEndpointUrl: ENVIO_ANALYTICS_ENDPOINT,
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
