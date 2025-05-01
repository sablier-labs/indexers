export let chainId = 100;
export let chain = "gnosis";
export let startBlock_lockup = 28766600;
export let startBlock_merkle = 31491790;
export let startBlock_flow = 37356000;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x685e92c9ca2bb23f1b596d0a7d749c0603e88585", "LL", "V20"],
  ["0xce49854a647a1723e8fb7cc3d190cab29a44ab48", "LL2", "V21"],
  ["0xf1caeb104ab29271463259335357d57772c90758", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0xeb148e4ec13aaa65328c0ba089a278138e9e53f9", "LD", "V20"],
  ["0x1df83c7682080b0f0c26a20c6c9cb8623e0df24e", "LD2", "V21"],
  ["0x555eb55cbc477aebbe5652d25d0fea04052d3971", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0x59a4b7255a5d01247837600e7828a6f77f664b34", "LT3", "V22"],
];

export let merged: string[][] = [
  ["0x007af5dc7b1caa66cf7ebcc01e2e6ba4d55d3e92", "LK", "V23"],
];

export let flow: string[][] = [
  ["0x5515f774a4db42820802333ba575f68a6e85bd13", "FL", "V10"],
  ["0x34bc0c2bf1f2da51c65cd821ba4133afcacdb8f5", "FL2", "V11"],
];

export let factory: string[][] = [
  ["0x777f66477ff83ababadf39a3f22a8cc3aee43765", "MSF2", "V21"],
  ["0x5f12318fc6cca518a950e2ee16063a6317c2a9ef", "MSF3", "V22"],
  ["0x64ba580946985b4b87f4d9f7b6598c2156026775", "MSF4", "V23"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 */

export let initializer_lockup = linear[0][0];
export let initializer_merkle = factory[0][0];
export let initializer_flow = flow[0][0];
