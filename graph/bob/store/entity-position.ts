import { Address, BigInt } from "@graphprotocol/graph-ts";
import { ZERO } from "../../common/constants";
import * as Entity from "../bindings/schema";

function getId(vaultEntityId: string, user: Address): string {
  return `position-${vaultEntityId}-${user.toHexString()}`;
}

export function getOrCreatePosition(
  vault: Entity.Vault,
  user: Address,
  timestamp: BigInt
): Entity.Position {
  const id = getId(vault.id, user);
  let position = Entity.Position.load(id);

  if (position === null) {
    position = new Entity.Position(id);
    position.chainId = vault.chainId;
    position.enteredAmount = ZERO;
    position.exitedAmount = ZERO;
    position.firstEnteredAt = null;
    position.lastUpdatedAt = timestamp;
    position.redeemedAmount = ZERO;
    position.shareBalance = ZERO;
    position.shareTransferredIn = ZERO;
    position.shareTransferredOut = ZERO;
    position.sharesEntered = ZERO;
    position.sharesExited = ZERO;
    position.sharesRedeemed = ZERO;
    position.user = user;
    position.vault = vault.id;
    position.save();
  }

  return position;
}

export function applyEnter(
  vault: Entity.Vault,
  user: Address,
  amountReceived: BigInt,
  sharesMinted: BigInt,
  timestamp: BigInt
): void {
  const position = getOrCreatePosition(vault, user, timestamp);
  position.enteredAmount = position.enteredAmount.plus(amountReceived);
  position.sharesEntered = position.sharesEntered.plus(sharesMinted);
  if (position.firstEnteredAt === null) {
    position.firstEnteredAt = timestamp;
  }
  position.lastUpdatedAt = timestamp;
  position.save();
}

export function applyExitWithinGracePeriod(
  vault: Entity.Vault,
  user: Address,
  amountReceived: BigInt,
  sharesBurned: BigInt,
  timestamp: BigInt
): void {
  const position = getOrCreatePosition(vault, user, timestamp);
  position.exitedAmount = position.exitedAmount.plus(amountReceived);
  position.sharesExited = position.sharesExited.plus(sharesBurned);
  position.lastUpdatedAt = timestamp;
  position.save();
}

export function applyRedeem(
  vault: Entity.Vault,
  user: Address,
  amountReceived: BigInt,
  sharesBurned: BigInt,
  timestamp: BigInt
): void {
  const position = getOrCreatePosition(vault, user, timestamp);
  position.redeemedAmount = position.redeemedAmount.plus(amountReceived);
  position.sharesRedeemed = position.sharesRedeemed.plus(sharesBurned);
  position.lastUpdatedAt = timestamp;
  position.save();
}

export function applyShareTransfer(
  vault: Entity.Vault,
  from: Address,
  to: Address,
  amount: BigInt,
  timestamp: BigInt
): void {
  const zero = Address.zero();
  const isMint = from.equals(zero);
  const isBurn = to.equals(zero);

  if (!isMint) {
    const fromPosition = getOrCreatePosition(vault, from, timestamp);
    fromPosition.shareBalance = fromPosition.shareBalance.minus(amount);
    if (!isBurn) {
      fromPosition.shareTransferredOut = fromPosition.shareTransferredOut.plus(amount);
    }
    fromPosition.lastUpdatedAt = timestamp;
    fromPosition.save();
  }

  if (!isBurn) {
    const toPosition = getOrCreatePosition(vault, to, timestamp);
    toPosition.shareBalance = toPosition.shareBalance.plus(amount);
    if (!isMint) {
      toPosition.shareTransferredIn = toPosition.shareTransferredIn.plus(amount);
    }
    toPosition.lastUpdatedAt = timestamp;
    toPosition.save();
  }
}
