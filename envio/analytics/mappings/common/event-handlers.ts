import type { Envio } from "../../../common/bindings";
import type { HandlerContext } from "../../bindings";
import { Store } from "../../store";

/* -------------------------------------------------------------------------- */
/*                                   ERC-721                                  */
/* -------------------------------------------------------------------------- */

/**
 * Generic handler for ERC721 Approval events
 * @see https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L391-L425
 */
export async function handleApproval(
  context: HandlerContext,
  event: Envio.Event,
  params: { owner: string; approved: string }
): Promise<void> {
  await Store.User.createOrUpdate(context, event, [
    params.owner,
    params.approved,
    event.transaction.from,
  ]);
}

/**
 * Generic handler for ERC721 ApprovalForAll events
 * @see https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L427-L441
 */
export async function handleApprovalForAll(
  context: HandlerContext,
  event: Envio.Event,
  params: { owner: string; operator: string }
): Promise<void> {
  await Store.User.createOrUpdate(context, event, [
    params.owner,
    params.operator,
    event.transaction.from,
  ]);
}

/**
 * Generic handler for ERC721 Transfer events
 * @see https://github.com/OpenZeppelin/openzeppelin-contracts/blob/e4f7021/contracts/token/ERC721/ERC721.sol#L115-L129
 */
export async function handleTransfer(
  context: HandlerContext,
  event: Envio.Event,
  params: { from: string; to: string }
): Promise<void> {
  await Store.User.createOrUpdate(context, event, [params.from, params.to, event.transaction.from]);
}
