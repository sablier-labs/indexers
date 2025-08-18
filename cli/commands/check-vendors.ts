import { NetworksRegistry } from "@pinax/graph-networks-registry";
import axios from "axios";
import type { Command } from "commander";
import { sablier } from "sablier";
import { envioChains } from "../../src/indexers/envio";
import * as helpers from "../helpers";

function createCheckVendorsCommand(): Command {
  const command = helpers.createBaseCmd("Check if a chain is supported by The Graph and Envio Hypersync");

  command.option("--chain-id <number>", "Chain ID to check").action(async (options: { chainId?: string }) => {
    if (!options.chainId) {
      throw new Error("--chain-id is required");
    }
    const chainId = Number.parseInt(options.chainId, 10);
    if (Number.isNaN(chainId) || chainId <= 0) {
      throw new Error("Chain ID must be a positive number");
    }

    console.log(`🔍 Checking vendor support for chain with ID: ${chainId}`);

    // Get chain name if available
    const chain = sablier.chains.get(chainId);
    if (chain) {
      console.log(`🔗 Chain name: ${chain.name}`);
    }

    await checkEnvioSupport(chainId);
    await checkGraphSupport(chainId);
  });

  return command;
}

export const checkVendorsCmd = createCheckVendorsCommand();

async function checkEnvioSupport(chainId: number): Promise<void> {
  console.log("Envio:");
  if (envioChains.some((c) => c.id === chainId && c.config?.hypersync)) {
    console.log(`   ⚠️  Chain is supported but not listed in the API`);
    return;
  }

  try {
    const response = await axios.get<Array<{ chain_id: number }>>("https://chains.hyperquery.xyz/active_chains");
    const supportedChainIds = response.data.map((c) => c.chain_id);

    const isEnvioSupported = supportedChainIds.includes(chainId);
    console.log(`   ${isEnvioSupported ? "✅" : "❌"} ${isEnvioSupported ? "Supported" : "Not supported"}\n`);
  } catch (error) {
    console.log(`   ⚠️  Error checking Envio HyperSync: ${error instanceof Error ? error.message : String(error)}`);
  }
}

async function checkGraphSupport(chainId: number): Promise<void> {
  console.log("The Graph:");
  try {
    const registry = await NetworksRegistry.fromLatestVersion();
    const supportedChainIds = registry.networks.map((c) => {
      const id = c.caip2Id.replace("eip155:", "");
      return Number.parseInt(id, 10);
    });

    const isGraphSupported = supportedChainIds.includes(chainId);
    console.log(`   ${isGraphSupported ? "✅" : "❌"} ${isGraphSupported ? "Supported" : "Not supported"}`);
  } catch (error) {
    console.log(`   ⚠️  Error checking The Graph: ${error instanceof Error ? error.message : String(error)}`);
  }
}
