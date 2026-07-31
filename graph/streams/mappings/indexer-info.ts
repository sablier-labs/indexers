import { ethereum } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import {
  readChainId,
  readIndexerCommitHash,
  readIndexerDeployedAt,
  readIndexerVersionLabel,
} from "../../common/context";
import * as Entity from "../bindings/schema";

export function handleIndexerInfo(block: ethereum.Block): void {
  const chainId = readChainId();
  const configuredDeployedAt = readIndexerDeployedAt();
  const info = new Entity.IndexerInfo(chainId.toString());

  info.chainId = chainId;
  info.commitHash = readIndexerCommitHash();
  info.deployedAt = configuredDeployedAt.equals(ZERO) ? block.timestamp : configuredDeployedAt;
  info.indexer = "streams";
  info.protocols = ["flow", "lockup"];
  info.startBlock = block.number;
  info.vendor = "graph";
  info.versionLabel = readIndexerVersionLabel();
  info.save();
}
