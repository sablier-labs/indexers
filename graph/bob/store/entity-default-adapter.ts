import { Address, ethereum } from "@graphprotocol/graph-ts";
import { readChainId } from "../../common/context";
import * as Entity from "../bindings/schema";

function getId(chainId: string, token: string): string {
  return `default-adapter-${chainId}-${token}`;
}

export function upsertDefaultAdapter(
  event: ethereum.Event,
  token: Address,
  adapter: Address
): Entity.DefaultAdapter {
  const chainId = readChainId();
  const id = getId(chainId.toString(), token.toHexString());

  let defaultAdapter = Entity.DefaultAdapter.load(id);
  if (defaultAdapter === null) {
    defaultAdapter = new Entity.DefaultAdapter(id);
    defaultAdapter.chainId = chainId;
    defaultAdapter.token = token;
  }

  defaultAdapter.adapter = adapter;
  defaultAdapter.block = event.block.number;
  defaultAdapter.timestamp = event.block.timestamp;
  defaultAdapter.hash = event.transaction.hash;
  defaultAdapter.save();

  return defaultAdapter;
}
