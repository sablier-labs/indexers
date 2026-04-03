import { Address } from "@graphprotocol/graph-ts";
import { readChainId, readContractAlias } from "../../common/context";
import { Id } from "../../common/id";
import * as Entity from "../bindings/schema";

function loadOrCreate(address: Address, category: string): Entity.Contract {
  const id = Id.contract(address);
  let contract = Entity.Contract.load(id);

  if (contract === null) {
    contract = new Entity.Contract(id);
    contract.address = address;
    contract.alias = readContractAlias();
    contract.category = category;
    contract.chainId = readChainId();
    contract.save();
  }

  return contract;
}

export function loadOrCreateFlowContract(address: Address): Entity.Contract {
  return loadOrCreate(address, "Flow");
}

export function loadOrCreateLockupContract(address: Address): Entity.Contract {
  return loadOrCreate(address, "Lockup");
}
