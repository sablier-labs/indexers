import { Protocol } from "sablier";
import type { Indexer } from "../types";

function getURL(id: string) {
  return `https://indexer.hyperindex.xyz/${id}/v1/graphql`;
}

export const envioDeployments: Record<Indexer.Protocol, Indexer.EnvioDeployment> = {
  airdrops: {
    createdOn: 1_712_673_343, // April 8, 2024
    endpoint: {
      id: "508d217",
      get url() {
        return getURL(this.id);
      },
    },
    explorerURL: "https://envio.dev/app/sablier-labs/merkle-envio",
    protocol: Protocol.Airdrops,
  },
  flow: {
    createdOn: 1_731_318_958, // November 1, 2024
    endpoint: {
      id: "3b4ea6b",
      get url() {
        return getURL(this.id);
      },
    },
    explorerURL: "https://envio.dev/app/sablier-labs/flow-envio",
    protocol: Protocol.Flow,
  },
  lockup: {
    createdOn: 1_712_673_343, // April 8, 2024
    endpoint: {
      id: "53b7e25",
      get url() {
        return getURL(this.id);
      },
    },
    explorerURL: "https://envio.dev/app/sablier-labs/lockup-envio",
    protocol: Protocol.Lockup,
  },
};
