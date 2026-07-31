import { indexer } from "envio";
import { fetchBlockTimestamp } from "../../common/effects/index.js";
import deployment from "../indexer-info.json";

indexer.onBlock(
  {
    name: "IndexerInfo",
    where: ({ chain }) => ({
      block: {
        number: {
          _gte: chain.startBlock,
          _lte: chain.startBlock,
        },
      },
    }),
  },
  async ({ block, context }) => {
    // Preload optimization runs block handlers twice; only persist the final pass.
    if (context.isPreload) {
      return;
    }

    const chainId = context.chain.id;
    const deployedAt =
      deployment.deployedAt === null
        ? await context.effect(fetchBlockTimestamp, { blockNumber: block.number, chainId })
        : BigInt(deployment.deployedAt);

    context.IndexerInfo.set({
      chainId: BigInt(chainId),
      commitHash: deployment.commitHash,
      deployedAt,
      id: chainId.toString(),
      indexer: "streams",
      protocols: ["flow", "lockup"],
      startBlock: BigInt(block.number),
      vendor: "envio",
      versionLabel: deployment.versionLabel ?? undefined,
    });
  }
);
