export let chainId = 5;
export let chain = "goerli";
export let startBlock = 9098200;

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias2], [address2, alias2]]
 */

export let linear: string[][] = [
  ["0xa2215702f518d425cc9f593be8a54efc3e4a08e9", "LL"],
];

export let dynamic: string[][] = [
  ["0xb6e272431f555951844e0d071fb18e48e315132f", "LD"],
];

/** PRBProxy registry */
export let registry = "0xa87bc4c1bc54e1c1b28d2dd942a094a6b665b8c9";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 * It should be a linear contract, the oldest/first one deployed on this chain.
 */

export let initializer = linear[0][0];
