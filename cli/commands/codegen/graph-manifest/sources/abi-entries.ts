import _ from "lodash";
import { indexedContracts } from "../../../../../contracts/index.js";
import type { Indexer } from "../../../../../src/index.js";
import type { Model } from "../../../../../src/types.js";
import paths, { getRelativePath } from "../../../../paths.js";
import type { GraphManifest } from "../manifest-types.js";

function get(name: string): GraphManifest.ABI {
  return {
    get file() {
      return getFilePath(name);
    },
    name,
  };
}

const erc20 = get("ERC20");
const erc20Bytes = get("ERC20Bytes");
const prbProxy = get("PRBProxy");
const prbProxyRegistry = get("PRBProxyRegistry");

export function getABIEntries(
  protocol: Indexer.Protocol,
  contractName: string,
  version: Model.Version
) {
  const contract = _.find(indexedContracts[protocol], (c) => {
    return c.name === contractName && c.versions.includes(version);
  });
  if (!contract) {
    throw new Error(`Contract ${contractName} not found for ABI entries`);
  }

  const contractABIEntries: GraphManifest.ABI[] = [
    {
      file: getFilePath(contractName, protocol, version),
      name: contractName,
    },
  ];

  const otherABIEntries: GraphManifest.ABI[] = [erc20, erc20Bytes];
  if (protocol === "lockup") {
    otherABIEntries.push(prbProxy, prbProxyRegistry);
  }

  return [...contractABIEntries, ...otherABIEntries];
}

function getFilePath(contractName: string, protocol?: Indexer.Protocol, version?: Model.Version) {
  // It doesn't matter what protocol we use here, we just need the path to the manifests.
  const manifestsPath = paths.graph.manifests(protocol ?? "lockup");
  const abiPath = paths.abi(contractName, protocol, version);
  return getRelativePath(manifestsPath, abiPath);
}
