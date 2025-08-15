import { Address } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import { readChainId, readContractAlias } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

export function getOrCreateFactory(factoryAddress: Address): Entity.Factory {
  const id = Id.factory(factoryAddress);
  let factory = Entity.Factory.load(id);

  if (factory === null) {
    factory = new Entity.Factory(id);
    factory.address = factoryAddress;
    factory.alias = readContractAlias();
    factory.campaignCounter = ZERO;
    factory.chainId = readChainId();
  }

  return factory;
}
