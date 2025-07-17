import { NetworksRegistry } from "@pinax/graph-networks-registry";
import axios from "axios";
import _ from "lodash";
import { Protocol } from "sablier";
import { describe, expect, it } from "vitest";
import { getIndexerGraph } from "../../src/exports";
import { envioChains } from "../../src/exports/indexers/envio";
import { graphChains } from "../../src/exports/indexers/graph";
import { logger } from "../../src/winston";

describe("Vendors", () => {
  describe("Graph", () => {
    it("should have the indexer chains supported by The Graph", async () => {
      const registry = await NetworksRegistry.fromLatestVersion();
      const supportedChainIds = registry.networks.map((c) => {
        const chainId = c.caip2Id.replace("eip155:", "");
        return _.toNumber(chainId);
      });

      let unsupported = _.difference(graphChains, supportedChainIds);
      unsupported = _.filter(unsupported, (id) => {
        const indexer = getIndexerGraph({ chainId: id, protocol: Protocol.Lockup });
        return indexer?.kind === "official";
      });

      if (unsupported.length > 0) {
        logger.warn(`Chain IDs used by the Sablier Indexers but not supported by The Graph: ${unsupported}`);
        logger.warn(`All chain IDs supported by The Graph: ${Array.from(supportedChainIds).sort((a, b) => a - b)}`);
      }

      expect(unsupported).toHaveLength(0);
    });
  });

  describe("Envio", () => {
    it("should have the indexer chains supported by Envio", async () => {
      const response = await axios.get<Array<{ chain_id: number }>>("https://chains.hyperquery.xyz/active_chains");
      const supportedChainIds = response.data.map((c) => c.chain_id);

      // Chains that use RPC as a data source are not supported by Envio.
      const unsupported = envioChains.filter((c) => {
        return !supportedChainIds.includes(c.id) && !c.config?.hypersync && !c.config?.rpcOnly;
      });

      if (unsupported.length > 0) {
        logger.warn(`Chain IDs used by the Sablier Indexers but not supported by Envio: ${unsupported}`);
        logger.warn(`All chain IDs supported by Envio: ${Array.from(supportedChainIds).sort((a, b) => a - b)}`);
      }

      expect(unsupported).toHaveLength(0);
    });
  });
});
