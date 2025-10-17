/**
 * @see {@link: file://./../analytics.graphql}
 */
import _ from "lodash";
import { formatEther, zeroAddress } from "viem";
import type { Envio } from "../../common/bindings";
import { getTimestamp } from "../../common/time";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";
import { trackMonthlyActiveUser } from "./entity-users-active-monthly";

type Params = {
  address: string;
  entity?: Entity.User;
  isAirdropClaim: boolean;
  tx?: Entity.UserTransaction;
};

export async function createOrUpdate(
  context: HandlerContext,
  event: Envio.Event,
  addresses: (string | undefined)[],
  isAirdropClaim: boolean = false,
): Promise<void> {
  // Filter out invalid addresses and normalize to lowercase
  const users = addresses
    .filter((address): address is string => Boolean(address) && address !== zeroAddress)
    .map((address) => ({
      address,
      isAirdropClaim,
    }));

  // Remove duplicates
  const uniqueUsers = _.uniqBy(users, (u) => u.address);
  if (uniqueUsers.length === 0) {
    context.log.info("No users to create or update", { event, users });
    return;
  }

  // Load the entities
  const userEntities = await Promise.all(uniqueUsers.map((u) => context.User.get(Id.user(event.chainId, u.address))));
  const userTxEntities = await Promise.all(
    uniqueUsers.map((u) =>
      context.UserTransaction.get(Id.userTransaction(Id.user(event.chainId, u.address), event.transaction.hash)),
    ),
  );

  // Stop if it's the preload phase: https://docs.envio.dev/docs/HyperIndex/preload-optimization#migrating-from-loaders
  if (context.isPreload) {
    return;
  }

  for (const [i, user] of uniqueUsers.entries()) {
    await upsert(context, event, { ...user, entity: userEntities[i], tx: userTxEntities[i] });
  }
}

async function upsert(context: HandlerContext, event: Envio.Event, params: Params): Promise<void> {
  // Check if the user transaction already exists. A single transaction can emit multiple events that lead here.
  // By stopping here, we don't handle cases of txs that are both an airdrop claim and some other Sablier interaction.
  // Thus, the `isOnlyAirdropClaimer` field is not guaranteed to be correct, but this is an acceptable trade-off
  // to keep the code relatively simple.
  const userTx = params.tx;
  if (userTx) {
    return;
  }

  /* -------------------------------------------------------------------------- */
  /*                                    USER                                    */
  /* -------------------------------------------------------------------------- */
  let user = params.entity;
  if (user) {
    const newAirdropClaimerStatus = user.isOnlyAirdropClaimer && Boolean(params.isAirdropClaim);
    user = {
      ...user,
      isOnlyAirdropClaimer: newAirdropClaimerStatus,
    };
    if (newAirdropClaimerStatus !== user.isOnlyAirdropClaimer) {
      context.User.set(user);
    }
  } else {
    user = {
      address: params.address,
      chainId: BigInt(event.chainId),
      id: Id.user(event.chainId, params.address),
      isOnlyAirdropClaimer: Boolean(params.isAirdropClaim),
    };
    context.User.set(user);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   USER TX                                  */
  /* -------------------------------------------------------------------------- */

  let fee = "0";
  let feeNumeric = 0n;
  if (event.transaction.from?.toLowerCase() === params.address.toLowerCase()) {
    fee = formatEther(event.transaction.value);
    feeNumeric = event.transaction.value;
  }
  const userTransaction: Entity.UserTransaction = {
    block: BigInt(event.block.number),
    contractAddress: event.srcAddress,
    fee: feeNumeric,
    feeDisplay: fee,
    hash: event.transaction.hash,
    id: Id.userTransaction(Id.user(event.chainId, params.address), event.transaction.hash),
    isAirdropClaim: Boolean(params.isAirdropClaim),
    timestamp: getTimestamp(event.block.timestamp),
    user_id: user.id,
  };
  context.UserTransaction.set(userTransaction);

  // Track this user as active for the month
  await trackMonthlyActiveUser(context, event, params.address);
}
