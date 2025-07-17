import { BigInt } from "@graphprotocol/graph-ts";

export function getDay(timestamp: BigInt): BigInt {
  return timestamp.div(BigInt.fromI32(60 * 60 * 24)); // 60 seconds * 60 minutes * 24 hours
}
