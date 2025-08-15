import { Address, BigInt, Bytes } from "@graphprotocol/graph-ts";

/* -------------------------------------------------------------------------- */
/*                                  ADDRESSES                                 */
/* -------------------------------------------------------------------------- */
export const PRB_PROXY_REGISTRY_v4_0_0 = Address.fromBytes(
  Bytes.fromHexString("0xd42a2bb59775694c9df4c7822bffab150e6c699d"),
);
export const PRB_PROXY_REGISTRY_v4_0_1 = Address.fromBytes(
  Bytes.fromHexString("0x584009e9ede26e212182c9745f5c000191296a78"),
);

/* -------------------------------------------------------------------------- */
/*                                   NUMBERS                                  */
/* -------------------------------------------------------------------------- */
export const DECIMALS_18 = BigInt.fromU32(18);
export const ONE = BigInt.fromU32(1);
export const TEN = BigInt.fromU32(10);
export const TWO = BigInt.fromU32(2);
export const ZERO = BigInt.fromU32(0);

/* -------------------------------------------------------------------------- */
/*                                   VERSIONS                                 */
/* -------------------------------------------------------------------------- */
export const AIRDROPS_V1_1 = "v1.1";
export const AIRDROPS_V1_2 = "v1.2";
export const AIRDROPS_V1_3 = "v1.3";

export const FLOW_V1_0 = "v1.0";
export const FLOW_V1_1 = "v1.1";

export const LOCKUP_V1_0 = "v1.0";
export const LOCKUP_V1_1 = "v1.1";
export const LOCKUP_V1_2 = "v1.2";
export const LOCKUP_V2_0 = "v2.0";

/* -------------------------------------------------------------------------- */
/*                                    MISC                                    */
/* -------------------------------------------------------------------------- */
export const LOG_PREFIX = "[SABLIER] ";
