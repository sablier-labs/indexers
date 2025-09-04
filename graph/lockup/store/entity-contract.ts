import { Address } from "@graphprotocol/graph-ts";
import { readChainId, readContractAlias } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

export function getOrCreateContract(address: Address): Entity.Contract {
  const id = Id.contract(address);
  let contract = Entity.Contract.load(id);

  if (contract === null) {
    contract = new Entity.Contract(id);
    contract.address = address;
    contract.alias = readContractAlias();
    contract.category = "Lockup";
    contract.chainId = readChainId();
    contract.save();
  }

  return contract;
}
