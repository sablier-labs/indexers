export let chainId = 11155420;
export let chain = "optimism-sepolia";
export let startBlock_lockup = 7451810;
export let startBlock_merkle = 7452580;
export let startBlock_flow = 20763000;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xe59D28bEF2D37E99b93E734ed1dDcFc4B9C1bf73", "LL2", "V21"],
  ["0x0a881bbd71a21710d56ff1931ec8189d94019d60", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0xf9e4095C1dfC058B34135C5c48cae66a8D2b3Aa5", "LD2", "V21"],
  ["0x89ec3830040dec63e9df0c904d649fda4d49df16", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0xb971a93608413c54f407ee86c7c15b295e0004bb", "LT3", "V22"],
];

export let merged: string[][] = [
  ["0x1f898895eab949ffd34c29cf859c035dc4525df4", "LK", "V23"],
];

export let flow: string[][] = [
  ["0x417db0f2bd020fc4d6bccea6b2bb6be0c541862e", "FL", "V10"],
  ["0x77873085a88189c8b82b3a01bcbc294108d02805", "FL2", "V11"],
];

export let factory: string[][] = [
  ["0x9b6cC73522f22Ad3f2F8187e892A51b95f1A0E8a", "MSF2", "V21"],
  ["0x6CBe6e298A9354306e6ee65f63FF85CFA7062a39", "MSF3", "V22"],
  ["0x2934a7addc3000d1625ed1e8d21c070a89073702", "MSF4", "V23"],
];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 */

export let initializer_lockup = linear[0][0];
export let initializer_merkle = factory[0][0];
export let initializer_flow = flow[0][0];
