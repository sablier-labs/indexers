export let chainId = 34443;
export let chain = "mode-mainnet";
export let startBlock_lockup = 11343000;
export let startBlock_merkle = 11343000;
export let startBlock_flow = 16616000;

export let hypersync = "https://mode.hypersync.xyz";

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0xd8c65bd7cb6924ef895b2edca03407c652f5a2c5", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0x704552099f5ad679294d337638b9a57fd4726f52", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0xbbfa51a10be68714fa33281646b986dae9f52021", "LT3", "V22"],
];

export let merged: string[][] = [
  ["0x3aebadfc423fd08be4715986f68d5e9a597ec974", "LK", "V23"],
];

export let flow: string[][] = [
  ["0x75970dde488431fc4961494569def3269f20d6b3", "FL", "V10"],
  ["0xc968e8eefe19bd6de8868df40d9740be127a172a", "FL2", "V11"],
];

export let factory: string[][] = [
  ["0x0fd01dd30f96a15de6afad5627d45ef94752460a", "MSF3", "V22"],
  ["0xc472391db89e7be07170f18c4fdb010242507f2c", "MSF4", "V23"],
];

/** PRBProxy registry */
export let registry = "";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 */

export let initializer_lockup = linear[0][0];
export let initializer_merkle = factory[0][0];
export let initializer_flow = flow[0][0];
