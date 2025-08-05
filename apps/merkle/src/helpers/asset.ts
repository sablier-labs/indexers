import { Address, BigInt } from "@graphprotocol/graph-ts";
import { Asset } from "../generated/types/schema";
import { ERC20 as ERC20Contract } from "../generated/types/templates/ContractMerkleFactory/ERC20";
import { ERC20Bytes as ERC20BytesContract } from "../generated/types/templates/ContractMerkleFactory/ERC20Bytes";
import { getChainId, zero } from "../constants";

export function fetchAssetDecimals(address: Address): BigInt {
  const contract = ERC20Contract.bind(address);
  const decimals = contract.try_decimals();
  if (decimals.reverted) {
    return zero;
  }
  return BigInt.fromI32(decimals.value);
}


export function getOrCreateAsset(address: Address): Asset {
  let id = generateAssetId(address);
  let entity = Asset.load(id);

  if (entity == null) {
    entity = new Asset(id);

    let decimals = fetchAssetDecimals(address);
    let name = getAssetName(address);
    let symbol = getAssetSymbol(address);

    entity.chainId = getChainId();
    entity.address = address;
    entity.symbol = symbol;
    entity.name = name;
    entity.decimals = decimals;

    entity.save();
  }

  return entity;
}

function getAssetSymbol(address: Address): string {
  let contract = ERC20Contract.bind(address);
  let symbol = contract.try_symbol();

  if (symbol.reverted) {
    let contractBytes = ERC20BytesContract.bind(address);
    let symbolBytes = contractBytes.try_symbol();

    if (symbolBytes.reverted) {
      return "Unknown";
    } else {
      return symbolBytes.value.toString();
    }
  } else {
    return symbol.value;
  }
}

function getAssetName(address: Address): string {
  let contract = ERC20Contract.bind(address);
  let name = contract.try_name();

  if (name.reverted) {
    let contractBytes = ERC20BytesContract.bind(address);
    let nameBytes = contractBytes.try_name();

    if (nameBytes.reverted) {
      return "Unknown";
    } else {
      return nameBytes.value.toString();
    }
  } else {
    return name.value;
  }
}

/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */
/** --------------------------------------------------------------------------------------------------------- */

export function generateAssetId(address: Address): string {
  return "".concat(address.toHexString());
}
