import type { Logger } from "envio";
import type { Common, Envio } from "../bindings";
import { ADDRESS_ZERO } from "../constants";
import { Id } from "../id";
import type { CommonParams } from "../types";

type UserContext = { log: Logger; User: { set: (user: Common.User) => void } };

// Implementation
export function createOrUpdate(
  context: UserContext,
  event: Envio.Event,
  user: Common.User | undefined,
  paramsOrAddress?: CommonParams.User | Envio.Address,
): void {
  const params = typeof paramsOrAddress === "string" ? { address: paramsOrAddress } : paramsOrAddress;
  if (!params?.address) {
    context.log.info("Undefined address when creating or updating user", { event });
    return;
  }
  if (params.address === ADDRESS_ZERO) {
    return;
  }

  if (user) {
    update(context, event, user);
    return;
  }
  create(context, event, params);
}

/**
 * This function is not called from airdrop claim event handlers, which is why we mark the user as not an airdrop claimer.
 */
export function update(context: UserContext, event: Envio.Event, user?: Common.User): Common.User | undefined {
  if (!user) {
    context.log.error("Update user: user entity not loaded", { event });
    return user;
  }
  // The fee is paid by `msg.sender`.
  let fee = 0n;
  if (event.transaction.from?.toLowerCase() === user.address.toLowerCase()) {
    fee = event.transaction.value;
  }
  const updatedUser: Common.User = {
    ...user,
    cumulativeFees: user.cumulativeFees + fee,
    isAirdropClaimer: false,
    lastSeenTimestamp: BigInt(event.block.timestamp),
    lastSeenTxHash: event.transaction.hash,
  };
  context.User.set(updatedUser);
  return updatedUser;
}

/* -------------------------------------------------------------------------- */
/*                               INTERNAL LOGIC                               */
/* -------------------------------------------------------------------------- */

function create(context: UserContext, event: Envio.Event, params: CommonParams.User): Common.User {
  // The fee is paid by `msg.sender`.
  let fee = 0n;
  if (event.transaction.from?.toLowerCase() === params.address.toLowerCase()) {
    fee = event.transaction.value;
  }

  const user: Common.User = {
    address: params.address.toLowerCase(),
    chainId: BigInt(event.chainId),
    cumulativeFees: fee,
    firstSeenTimestamp: BigInt(event.block.timestamp),
    firstSeenTxHash: event.transaction.hash,
    id: Id.user(event.chainId, params.address),
    isAirdropClaimer: Boolean(params.isAirdropClaimer),
    lastSeenTimestamp: BigInt(event.block.timestamp),
    lastSeenTxHash: event.transaction.hash,
  };
  context.User.set(user);
  return user;
}
