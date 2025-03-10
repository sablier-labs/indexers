export let chainId = 42161;
export let chain = "arbitrum-one";
export let startBlock_lockup = 107509950;
export let startBlock_merkle = 161026550;
export let startBlock_flow = 281305000;

/** Rule: keep addresses lowercased */

/**
 * Keep aliases unique and always in sync with the frontend
 * @example export let linear = [[address1, alias1, version1], [address2, alias2, version2]]
 */

export let linear: string[][] = [
  ["0x197d655f3be03903fd25e7828c3534504bfe525e", "LL", "V20"],
  ["0xfdd9d122b451f549f48c4942c6fa6646d849e8c1", "LL2", "V21"],
  ["0x05a323a4c936fed6d02134c5f0877215cd186b51", "LL3", "V22"],
];

export let dynamic: string[][] = [
  ["0xa9efbef1a35ff80041f567391bdc9813b2d50197", "LD", "V20"],
  ["0xf390ce6f54e4dc7c5a5f7f8689062b7591f7111d", "LD2", "V21"],
  ["0x53f5eeb133b99c6e59108f35bcc7a116da50c5ce", "LD3", "V22"],
];

export let tranched: string[][] = [
  ["0x0da2c7aa93e7cd43e6b8d043aab5b85cfddf3818", "LT3", "V22"],
];

export let merged: string[][] = [
  ["0x467d5bf8cfa1a5f99328fbdcb9c751c78934b725", "LK", "V23"],
];

export let flow: string[][] = [
  ["0x18a12a7035aa56240bcd236bc019aa245dcc015a", "FL", "V10"],
  ["0x87cf87ec5de33deb4a88787065373563ba85ee72", "FL2", "V11"],
];

export let factory: string[][] = [
  ["0x237400ef5a41886a75b0e036228221df075b3b80", "MSF2", "V21"],
  ["0xc9a5a0bc2d8e217bdbdfe7486e9e72c5c3308f01", "MSF3", "V22"],
  ["0x7efd170e3e32dc1b4c17eb4cfff92c81ff43a6cb", "MSF4", "V23"],
];

/** PRBProxy registry */
export let registry = "0x584009e9ede26e212182c9745f5c000191296a78";

/**
 * The initializer contract is used to trigger the indexing of all other contracts.
 */

export let initializer_lockup = linear[0][0];
export let initializer_merkle = factory[0][0];
export let initializer_flow = flow[0][0];
