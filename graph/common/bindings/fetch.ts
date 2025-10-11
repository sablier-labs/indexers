import { Address, BigInt } from "@graphprotocol/graph-ts";
import { isTokenWithUrl } from "../url-tokens";
import { ERC20, ERC20Bytes } from "./bindings";
import { ZERO } from "../constants";

export function fetchAssetDecimals(address: Address): BigInt {
  const contract = ERC20.bind(address);
  const decimals = contract.try_decimals();
  if (decimals.reverted) {
    return ZERO;
  }
  return BigInt.fromI32(decimals.value);
}

export function fetchAssetName(address: Address): string {
  // Block known scam tokens with URLs in names
  if (isTokenWithUrl(address.toHexString())) {
    return "Unknown";
  }

  const contract = ERC20.bind(address);
  const name = contract.try_name();

  if (name.reverted) {
    const contractBytes = ERC20Bytes.bind(address);
    const nameBytes = contractBytes.try_name();

    if (nameBytes.reverted) {
      return "Unknown";
    }
    return nameBytes.value.toString();
  }
  return name.value;
}


export function fetchAssetSymbol(address: Address): string {
  // Block known scam tokens with URLs in symbols
  if (isTokenWithUrl(address.toHexString())) {
    return "Unknown";
  }

  const contract = ERC20.bind(address);
  const symbol = contract.try_symbol();

  if (symbol.reverted) {
    const contractBytes = ERC20Bytes.bind(address);
    const symbolBytes = contractBytes.try_symbol();

    if (symbolBytes.reverted) {
      return "Unknown";
    }
    return symbolBytes.value.toString();
  }
  return symbol.value;
}

