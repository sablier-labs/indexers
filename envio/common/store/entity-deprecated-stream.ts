import type { Envio } from "../bindings";
import type { CommonEntities } from "../entities";
import { Id } from "../id";

export type DeprecatedStreamContext = {
  DeprecatedStream: {
    get: (id: string) => Promise<CommonEntities.DeprecatedStream | undefined>;
    set: (deprecatedStream: CommonEntities.DeprecatedStream) => void;
  };
};

export function create(
  context: DeprecatedStreamContext,
  event: Envio.Event,
  tokenId: bigint,
): CommonEntities.DeprecatedStream {
  const deprecatedStream: CommonEntities.DeprecatedStream = {
    chainId: BigInt(event.chainId),
    contractAddress: event.srcAddress,
    hash: event.transaction.hash,
    id: Id.stream(event.srcAddress, event.chainId, tokenId),
    timestamp: BigInt(event.block.timestamp),
    tokenId: BigInt(tokenId),
  };
  context.DeprecatedStream.set(deprecatedStream);
  return deprecatedStream;
}
