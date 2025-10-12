import { NetworksRegistry } from "@pinax/graph-networks-registry";
import axios from "axios";
import type { Command } from "commander";
import { sablier } from "sablier";
import { envioChains } from "../../src/indexers/envio";
import * as helpers from "../helpers";
import { colors, createTable, displayHeader } from "../shared/display-utils";

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

    // Get chain name if available
    const chain = sablier.chains.get(chainId);
    const chainName = chain?.name || "Unknown";

    displayHeader(`🔍 VENDOR SUPPORT CHECK`, "cyan");

    // Display chain info
    console.log("");
    const chainInfoTable = createTable({
      colWidths: [20, 40],
      head: ["Property", "Value"],
      theme: "cyan",
    });

    chainInfoTable.push(
      [colors.value("Chain ID"), colors.value(chainId.toString())],
      [colors.value("Chain Name"), colors.value(chainName)],
    );

    console.log(chainInfoTable.toString());

    // Check vendor support
    const envioResult = await checkEnvioSupport(chainId);
    const graphResult = await checkGraphSupport(chainId);

    // Display results table
    console.log("");
    const resultsTable = createTable({
      colWidths: [20, 20, 40],
      head: ["Vendor", "Status", "Notes"],
      theme: "cyan",
    });

    resultsTable.push(
      [
        colors.value("Envio HyperSync"),
        envioResult.supported ? colors.success("✅ Supported") : colors.error("❌ Not Supported"),
        colors.dim(envioResult.note || "—"),
      ],
      [
        colors.value("The Graph"),
        graphResult.supported ? colors.success("✅ Supported") : colors.error("❌ Not Supported"),
        colors.dim(graphResult.note || "—"),
      ],
    );

    console.log(resultsTable.toString());

    // Summary
    const totalSupported = [envioResult.supported, graphResult.supported].filter(Boolean).length;
    console.log("");
    if (totalSupported === 2) {
      console.log(colors.success("✅ Chain is supported by both vendors"));
    } else if (totalSupported === 1) {
      console.log(colors.warning("⚠️  Chain is partially supported (1 of 2 vendors)"));
    } else {
      console.log(colors.error("❌ Chain is not supported by any vendor"));
    }
  });

  return command;
}

export const checkVendorsCmd = createCheckVendorsCommand();

type VendorCheckResult = {
  note?: string;
  supported: boolean;
};

async function checkEnvioSupport(chainId: number): Promise<VendorCheckResult> {
  if (envioChains.some((c) => c.id === chainId && c.config?.hypersync)) {
    return {
      note: "Supported but not listed in public API",
      supported: true,
    };
  }

  try {
    const response = await axios.get<Array<{ chain_id: number }>>("https://chains.hyperquery.xyz/active_chains");
    const supportedChainIds = response.data.map((c) => c.chain_id);

    return {
      supported: supportedChainIds.includes(chainId),
    };
  } catch (error) {
    return {
      note: `API error: ${error instanceof Error ? error.message : String(error)}`,
      supported: false,
    };
  }
}

async function checkGraphSupport(chainId: number): Promise<VendorCheckResult> {
  try {
    const registry = await NetworksRegistry.fromLatestVersion();
    const supportedChainIds = registry.networks.map((c) => {
      const id = c.caip2Id.replace("eip155:", "");
      return Number.parseInt(id, 10);
    });

    return {
      supported: supportedChainIds.includes(chainId),
    };
  } catch (error) {
    return {
      note: `API error: ${error instanceof Error ? error.message : String(error)}`,
      supported: false,
    };
  }
}
