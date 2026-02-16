import { Kind } from "graphql";
import type { Sablier } from "sablier";
import { chains } from "sablier/evm";
import paths, { getRelativePath } from "../../../../../lib/paths.js";
import { getMergedSchema } from "../../../../../schema/merger.js";
import { getSubgraphYamlChainSlug } from "../../../../../src/indexers/graph.js";
import type { GraphManifest } from "../manifest-types.js";

const BOB_CHAIN_ID = chains.sepolia.id;
const BOB_ADDRESS = "0xEF5E35AC7c7290858d145047b9bCF6c7e21BDd33" as Sablier.Address;
const BOB_START_BLOCK = 10_234_029;
const BOB_ALIAS = "BOB";
const BOB_VERSION = "v1.0";

function getEntities(): string[] {
  const schema = getMergedSchema("bob");
  const entityNames: string[] = [];

  for (const definition of schema.definitions) {
    if (definition.kind === Kind.OBJECT_TYPE_DEFINITION && definition.name) {
      entityNames.push(definition.name.value);
    }
  }

  return entityNames.sort();
}

function getFilePath(contractName: string): string {
  const manifestsPath = paths.graph.manifests("bob");
  const abiPath = paths.abi(contractName);
  return getRelativePath(manifestsPath, abiPath);
}

export function getBobSources(chainId: number): GraphManifest.Source[] {
  if (chainId !== BOB_CHAIN_ID) {
    return [];
  }

  const entities = getEntities();
  const network = getSubgraphYamlChainSlug(chainId);

  const mainSource: GraphManifest.Source = {
    _type: "data-source",
    context: {
      alias: {
        data: BOB_ALIAS,
        type: "String",
      },
      chainId: {
        data: chainId.toString(),
        type: "BigInt",
      },
      version: {
        data: BOB_VERSION,
        type: "String",
      },
    },
    kind: "ethereum/contract",
    mapping: {
      abis: [
        {
          file: getFilePath("SablierBob"),
          name: "SablierBob",
        },
        {
          file: getFilePath("ERC20"),
          name: "ERC20",
        },
        {
          file: getFilePath("ERC20Bytes"),
          name: "ERC20Bytes",
        },
      ],
      apiVersion: "0.0.9",
      entities,
      eventHandlers: [
        {
          event:
            "CreateVault(indexed uint256,indexed address,indexed address,address,address,uint128,uint40)",
          handler: "handle_SablierBob_v1_0_CreateVault",
        },
        {
          event: "Enter(indexed uint256,indexed address,uint128,uint128)",
          handler: "handle_SablierBob_v1_0_Enter",
        },
        {
          event: "ExitWithinGracePeriod(indexed uint256,indexed address,uint128,uint128)",
          handler: "handle_SablierBob_v1_0_ExitWithinGracePeriod",
        },
        {
          event: "Redeem(indexed uint256,indexed address,uint128,uint128,uint256)",
          handler: "handle_SablierBob_v1_0_Redeem",
        },
        {
          event: "SetComptroller(address,address)",
          handler: "handle_SablierBob_v1_0_SetComptroller",
        },
        {
          event: "SetDefaultAdapter(indexed address,indexed address)",
          handler: "handle_SablierBob_v1_0_SetDefaultAdapter",
        },
        {
          event: "SyncPriceFromOracle(indexed uint256,indexed address,uint128,uint40)",
          handler: "handle_SablierBob_v1_0_SyncPriceFromOracle",
        },
        {
          event: "TransferFeesToComptroller(indexed address,uint256)",
          handler: "handle_SablierBob_v1_0_TransferFeesToComptroller",
        },
        {
          event: "UnstakeFromAdapter(indexed uint256,indexed address,uint128,uint128)",
          handler: "handle_SablierBob_v1_0_UnstakeFromAdapter",
        },
      ],
      file: "../mappings/v1.0/SablierBob.ts",
      kind: "ethereum/events",
      language: "wasm/assemblyscript",
    },
    name: "SablierBob_v1_0",
    network,
    source: {
      abi: "SablierBob",
      address: BOB_ADDRESS,
      startBlock: BOB_START_BLOCK,
    },
  };

  const templateSource: GraphManifest.Source = {
    _type: "template",
    kind: "ethereum/contract",
    mapping: {
      abis: [
        {
          file: getFilePath("ERC20"),
          name: "ERC20",
        },
        {
          file: getFilePath("ERC20Bytes"),
          name: "ERC20Bytes",
        },
      ],
      apiVersion: "0.0.9",
      entities,
      eventHandlers: [
        {
          event: "Transfer(indexed address,indexed address,uint256)",
          handler: "handle_BobVaultShare_v1_0_Transfer",
        },
      ],
      file: "../mappings/v1.0/BobVaultShare.ts",
      kind: "ethereum/events",
      language: "wasm/assemblyscript",
    },
    name: "BobVaultShare_v1_0",
    network,
    source: {
      abi: "ERC20",
    },
  };

  return [mainSource, templateSource];
}
