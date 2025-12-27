import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { readChainId } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

export function createDeprecatedStream(
  event: ethereum.Event,
  address: Address,
  tokenId: BigInt
): Entity.DeprecatedStream {
  const id = Id.stream(address, tokenId);
  const deprecatedStream = new Entity.DeprecatedStream(id);
  deprecatedStream.chainId = readChainId();
  deprecatedStream.contractAddress = address;
  deprecatedStream.hash = event.transaction.hash;
  deprecatedStream.timestamp = event.block.timestamp;
  deprecatedStream.tokenId = tokenId;
  deprecatedStream.save();
  return deprecatedStream;
}

export function existsDeprecatedStream(address: Address, tokenId: BigInt): boolean {
  const id = Id.stream(address, tokenId);
  const deprecatedStream = Entity.DeprecatedStream.load(id);
  return deprecatedStream !== null;
}
