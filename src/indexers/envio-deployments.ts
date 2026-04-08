import type { Indexer } from "../types.js";

function getIndexerURL(id: string) {
  return `https://indexer.hyperindex.xyz/${id}/v1/graphql`;
}

function getConverterURL(id: string) {
  return `https://indexer.hyperindex.xyz/${id}/converter`;
}

function createDeployment(args: {
  createdOn?: number;
  explorerURL: string;
  id: string;
  indexer: Indexer.IndexerKey;
}): Indexer.EnvioDeployment {
  return {
    createdOn: args.createdOn,
    explorerURL: args.explorerURL,
    indexer: args.indexer,
    get converterURL() {
      return getConverterURL(this.endpoint.id);
    },
    endpoint: {
      id: args.id,
      get url() {
        return getIndexerURL(this.id);
      },
    },
  };
}

const publicDeployments = {
  airdrops: createDeployment({
    createdOn: 1_712_673_343, // April 8, 2024
    explorerURL: "https://envio.dev/app/sablier-labs/merkle-envio",
    id: "508d217",
    indexer: "airdrops",
  }),
  // Streams ships through the legacy "Lockup" Envio deployment. We kept it to
  // avoid a full redeployment and to preserve the existing billing plan.
  streams: createDeployment({
    createdOn: 1_712_673_343, // April 8, 2024
    explorerURL: "https://envio.dev/app/sablier-labs/lockup-envio",
    id: "53b7e25",
    indexer: "streams",
  }),
} as const satisfies Record<Indexer.IndexerKey, Indexer.EnvioDeployment>;

export const envioDeployments: Record<Indexer.IndexerKey, Indexer.EnvioDeployment> = {
  airdrops: publicDeployments.airdrops,
  streams: publicDeployments.streams,
};

export function getEnvioDeployment(indexer: Indexer.IndexerKey): Indexer.EnvioDeployment {
  return envioDeployments[indexer];
}
