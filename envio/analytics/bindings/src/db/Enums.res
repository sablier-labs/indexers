module ContractType = {
  @genType
  type t = 
    | @as("SablierFlow_v1_0") SablierFlow_v1_0
    | @as("SablierFlow_v1_1") SablierFlow_v1_1
    | @as("SablierLockup_v2_0") SablierLockup_v2_0
    | @as("SablierMerkleFactory_v1_3") SablierMerkleFactory_v1_3
    | @as("SablierMerkleInstant_v1_3") SablierMerkleInstant_v1_3
    | @as("SablierMerkleLL_v1_3") SablierMerkleLL_v1_3
    | @as("SablierMerkleLT_v1_3") SablierMerkleLT_v1_3
    | @as("SablierV2LockupDynamic_v1_0") SablierV2LockupDynamic_v1_0
    | @as("SablierV2LockupDynamic_v1_1") SablierV2LockupDynamic_v1_1
    | @as("SablierV2LockupDynamic_v1_2") SablierV2LockupDynamic_v1_2
    | @as("SablierV2LockupLinear_v1_0") SablierV2LockupLinear_v1_0
    | @as("SablierV2LockupLinear_v1_1") SablierV2LockupLinear_v1_1
    | @as("SablierV2LockupLinear_v1_2") SablierV2LockupLinear_v1_2
    | @as("SablierV2LockupTranched_v1_2") SablierV2LockupTranched_v1_2
    | @as("SablierV2MerkleLL_v1_2") SablierV2MerkleLL_v1_2
    | @as("SablierV2MerkleLT_v1_2") SablierV2MerkleLT_v1_2
    | @as("SablierV2MerkleLockupFactory_v1_2") SablierV2MerkleLockupFactory_v1_2
    | @as("SablierV2MerkleStreamerFactory_v1_1") SablierV2MerkleStreamerFactory_v1_1
    | @as("SablierV2MerkleStreamerLL_v1_1") SablierV2MerkleStreamerLL_v1_1

  let name = "CONTRACT_TYPE"
  let variants = [
    SablierFlow_v1_0,
    SablierFlow_v1_1,
    SablierLockup_v2_0,
    SablierMerkleFactory_v1_3,
    SablierMerkleInstant_v1_3,
    SablierMerkleLL_v1_3,
    SablierMerkleLT_v1_3,
    SablierV2LockupDynamic_v1_0,
    SablierV2LockupDynamic_v1_1,
    SablierV2LockupDynamic_v1_2,
    SablierV2LockupLinear_v1_0,
    SablierV2LockupLinear_v1_1,
    SablierV2LockupLinear_v1_2,
    SablierV2LockupTranched_v1_2,
    SablierV2MerkleLL_v1_2,
    SablierV2MerkleLT_v1_2,
    SablierV2MerkleLockupFactory_v1_2,
    SablierV2MerkleStreamerFactory_v1_1,
    SablierV2MerkleStreamerLL_v1_1,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

module EntityType = {
  @genType
  type t = 
    | @as("Revenue") Revenue
    | @as("RevenueTransaction") RevenueTransaction
    | @as("User") User
    | @as("UserTransaction") UserTransaction
    | @as("dynamic_contract_registry") DynamicContractRegistry

  let name = "ENTITY_TYPE"
  let variants = [
    Revenue,
    RevenueTransaction,
    User,
    UserTransaction,
    DynamicContractRegistry,
  ]
  let config = Internal.makeEnumConfig(~name, ~variants)
}

let allEnums = ([
  ContractType.config->Internal.fromGenericEnumConfig,
  EntityType.config->Internal.fromGenericEnumConfig,
])
