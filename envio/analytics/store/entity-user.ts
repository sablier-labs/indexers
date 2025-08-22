import _ from "lodash";
import { formatEther, zeroAddress } from "viem";
import type { Envio } from "../../common/bindings";
import type { Entity, HandlerContext } from "../bindings";
import { Id } from "../helpers";
import type { Params } from "../helpers/types";

/**
 * The `User` entity tracks unique users across all Sablier protocols.
 * The `UserTransaction` entity tracks particular user interactions with Sablier.
 * @see {@link: file://./../schema.graphql}
 */
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
      address: address.toLowerCase(),
      isAirdropClaim,
    }));

  // Remove duplicates
  const uniqueUsers = _.uniqBy(users, (u) => u.address);
  if (uniqueUsers.length === 0) {
    context.log.info("No users to create or update", { event, users });
    return;
  }

  // Load the entities
  const [userEntities, userTxEntities] = await Promise.all([
    Promise.all(uniqueUsers.map((u) => context.User.get(Id.user(event.chainId, u.address)))),
    Promise.all(
      uniqueUsers.map((u) =>
        context.UserTransaction.get(Id.userTransaction(Id.user(event.chainId, u.address), event.transaction.hash)),
      ),
    ),
  ]);

  // Stop if it's the preload phase: https://docs.envio.dev/docs/HyperIndex/preload-optimization#migrating-from-loaders
  if (context.isPreload) {
    return;
  }

  await Promise.all(
    uniqueUsers.map((user, i) => upsert(context, event, { ...user, entity: userEntities[i], tx: userTxEntities[i] })),
  );
}

async function upsert(context: HandlerContext, event: Envio.Event, params: Params.User): Promise<void> {
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
      address: params.address.toLowerCase(),
      chainId: BigInt(event.chainId),
      id: Id.user(event.chainId, params.address),
      isOnlyAirdropClaimer: Boolean(params.isAirdropClaim),
    };
    context.User.set(user);
  }

  /* -------------------------------------------------------------------------- */
  /*                                   USER TX                                  */
  /* -------------------------------------------------------------------------- */

  let fee = 0;
  if (event.transaction.from?.toLowerCase() === params.address.toLowerCase()) {
    fee = Number(formatEther(event.transaction.value));
  }
  const userTransaction: Entity.UserTransaction = {
    block: BigInt(event.block.number),
    fee,
    hash: event.transaction.hash,
    id: Id.userTransaction(Id.user(event.chainId, params.address), event.transaction.hash),
    isAirdropClaim: Boolean(params.isAirdropClaim),
    timestamp: BigInt(event.block.timestamp),
    user_id: user.id,
  };
  context.UserTransaction.set(userTransaction);
}
