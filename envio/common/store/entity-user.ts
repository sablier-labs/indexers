import type { Logger } from "envio";
import _ from "lodash";
import { formatEther, zeroAddress } from "viem";
import type { Envio } from "../bindings";
import type { CommonEntities } from "../entities";
import { Id } from "../id";
import type { CommonParams } from "../types";

type UserContext = {
  log: Logger;
  User: { set: (user: CommonEntities.User) => void };
  UserTransaction: {
    get: (id: string) => Promise<CommonEntities.UserTransaction | undefined>;
    set: (userTransaction: CommonEntities.UserTransaction) => void;
  };
};

export async function createOrUpdate(
  context: UserContext,
  event: Envio.Event,
  users: CommonParams.User[],
): Promise<void> {
  // Filter out invalid addresses and normalize to lowercase
  users = users
    .filter((u) => Boolean(u.address) && u.address !== zeroAddress)
    .map((u) => ({ ...u, address: u.address?.toLowerCase() }));

  // Remove duplicates
  users = _.uniqBy(users, (u) => u.address);

  if (users.length === 0) {
    context.log.info("No users to create or update", { event, users });
    return;
  }

  await Promise.all(users.map((user) => upsert(context, event, user)));
}

async function upsert(context: UserContext, event: Envio.Event, params: CommonParams.User): Promise<void> {
  if (!params.address) {
    context.log.error("Upsert user: address is undefined", { event });
    return;
  }

  if (params.address === zeroAddress) {
    context.log.error("Upsert user: address is the zero address", { address: params.address, event });
    return;
  }

  // Check if the user transaction already exists. A single transaction can emit multiple events that lead here.
  const userId = Id.user(event.chainId, params.address);
  const userTxId = Id.userTransaction(userId, event.transaction.hash);
  const userTx = await context.UserTransaction.get(userTxId);

  // By stopping here, we don't check for cases where the same tx is an airdrop claim and some other interaction.
  // So the `isOnlyAirdropClaimer` field is not guaranteed to be correct, but it's an acceptable trade-off.
  if (userTx) {
    return;
  }

  /* ---------------------------------- USER ---------------------------------- */
  let user = params.entity;
  if (user) {
    user = {
      ...user,
      isOnlyAirdropClaimer: user.isOnlyAirdropClaimer && Boolean(params.isAirdropClaim),
    };
  } else {
    user = {
      address: params.address.toLowerCase(),
      chainId: BigInt(event.chainId),
      id: userId,
      isOnlyAirdropClaimer: Boolean(params.isAirdropClaim),
    };
  }
  context.User.set(user);

  /* -------------------------- USER TRANSACTION -------------------------- */
  let fee = 0;
  if (event.transaction.from?.toLowerCase() === params.address.toLowerCase()) {
    fee = Number(formatEther(event.transaction.value));
  }
  const userTransaction: CommonEntities.UserTransaction = {
    block: BigInt(event.block.number),
    fee,
    hash: event.transaction.hash,
    id: userTxId,
    isAirdropClaim: Boolean(params.isAirdropClaim),
    timestamp: BigInt(event.block.timestamp),
    user_id: userId,
  };
  context.UserTransaction.set(userTransaction);
}
