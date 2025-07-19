import { type Sablier, sablier } from "sablier";
import { formatRelease } from "./helpers";

export const messages = {
  contractNotFound: (release: Sablier.Release, chainId: number, contractName: string) => {
    const chain = sablier.chains.get(chainId);
    if (!chain) {
      return `Contract ${contractName} not found for ${formatRelease(release)} on chain ${chainId}`;
    }
    return `Contract ${contractName} not found for ${formatRelease(release)} on ${chain.name}`;
  },
};
