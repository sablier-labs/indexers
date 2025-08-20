
type hyperSyncConfig = {endpointUrl: string}
type hyperFuelConfig = {endpointUrl: string}

@genType.opaque
type rpcConfig = {
  syncConfig: Config.syncConfig,
}

@genType
type syncSource = HyperSync(hyperSyncConfig) | HyperFuel(hyperFuelConfig) | Rpc(rpcConfig)

@genType.opaque
type aliasAbi = Ethers.abi

type eventName = string

type contract = {
  name: string,
  abi: aliasAbi,
  addresses: array<string>,
  events: array<eventName>,
}

type configYaml = {
  syncSource,
  startBlock: int,
  confirmedBlockThreshold: int,
  contracts: dict<contract>,
}

let publicConfig = ChainMap.fromArrayUnsafe([
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x1a272b596b10f02931480bc7a3617db4a8d154e3",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xf35ab407cf28012ba57caf5ee2f6d6e4420253bc",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x71dd3ca88e7564416e5c2e350090c12bf8f6144a",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x2d9221a63e12aa796619cb381ec4a71b201281f5",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x3df2aaede81d2f6b261f79047517713b8e844e04",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x39efdc3dbb57b2388ccc4bb40ac4cb1226bc9e44",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0xb10daee1fcf62243ae27776d7a92d39dc8740f95",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0x7cc7e125d83a581ff438608490cc0f7bdff79127",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xafb979d9afad1ad27c5eff4e27226e3ab9e5dcc9",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x9deabf7815b42bf4e9a03eec35a486ff74ee7459",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x3962f6585946823440d274ad7c719b02b49de51e",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xf86b359035208e4529686a1825f2d5bee38c28a8",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x7c01aa3783577e15fd7e272443d44b92d5b21056",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=1)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://1.hypersync.xyz"}),
        startBlock: 17613133,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x044ec80fbec40f0ee7e7b3856828170971796c19",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xe041629d99730b3ee4d6518097c45b4e3591992b",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x2455bff7a71e6e441b2d0b1b1e480fe36ebf6d1e",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x906356e4e6410ea0a97dbc5b071cf394ab0dcd69",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xc5612fea2d370127ac67048115bd6b1df7b7f7c0",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x6f68516c21e248cddfaf4898e66b2b0adee0e0d6",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0xb923abdca17aed90eb5ec5e407bd37164f632bfd",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xd6920c1094eabc4b71f3dc411a1566f64f4c206e",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x4b45090152a5731b5bc71b5baf71e60e05b33867",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x4994325f8d4b4a36bd643128beb3ec3e582192c0",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x5c22471a86e9558ed9d22235dd5e0429207ccf4b",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x90952912a50079bef00d5f49c975058d6573acdc",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x822e9c4852e978104d82f0f785bfa663c2b700c1",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=10)
    (
      chain,
      {
        confirmedBlockThreshold: 0,
        syncSource: HyperSync({endpointUrl: "https://10.hypersync.xyz"}),
        startBlock: 106405061,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xe41909f5623c3b78219d9a2bb92be95aee5bbc30",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xd6482334242862951da3e730f818c3f6e3f45a30",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x489e0dc5e62a751a2b209f1cc03e189fd6257176",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=50)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://50.hypersync.xyz"}),
        startBlock: 85225620,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x434d73465aac4125d204a6637eb6c579d8d69f48",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x96aa12809cac29bba4944feca1dfdc8e1704e6c1",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xf9f89d99fb702b06fba16a294b7614089defe068",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xfce01f79247cf450062545e7155d7bd568551d0e",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x4c4610af3f3861ec99b6f6f8066c03e4c3a0e023",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0xf2f3fef2454dca59eca929d2d8cd2a8669cc6214",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x3fe4333f62a75c2a85c8211c6aefd1b9bfde6e51",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xf900c5e3aa95b59cc976e6bc9c0998618729a5fa",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x14c35e126d75234a90c9fb185bf8ad3edb6a90d2",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xeb6d84c585bf8aea34f05a096d6faa3b8477d146",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x88ad3b5c62a46df953a5d428d33d70408f53c408",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xab5f007b33edda56962a0fc428b15d544ea46591",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x6e0bad2c077d699841f1929b45bfb93fafbed395",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=56)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://56.hypersync.xyz"}),
        startBlock: 29646271,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x777f66477ff83ababadf39a3f22a8cc3aee43765",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x5f12318fc6cca518a950e2ee16063a6317c2a9ef",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x64ba580946985b4b87f4d9f7b6598c2156026775",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x5515f774a4db42820802333ba575f68a6e85bd13",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x34bc0c2bf1f2da51c65cd821ba4133afcacdb8f5",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0xeb148e4ec13aaa65328c0ba089a278138e9e53f9",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x685e92c9ca2bb23f1b596d0a7d749c0603e88585",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0x1df83c7682080b0f0c26a20c6c9cb8623e0df24e",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xce49854a647a1723e8fb7cc3d190cab29a44ab48",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x555eb55cbc477aebbe5652d25d0fea04052d3971",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xf1caeb104ab29271463259335357d57772c90758",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x59a4b7255a5d01247837600e7828a6f77f664b34",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x007af5dc7b1caa66cf7ebcc01e2e6ba4d55d3e92",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=100)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://100.hypersync.xyz"}),
        startBlock: 28766600,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xc6fc028e988d158c52aa2e38cdd6f969aa14bdcd",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x9797b40340be0bfc9ec0dbb8712627bcdd17e771",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x26c341c4d79ba8f6bfb450a49e9165c936316b14",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=130)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://130.hypersync.xyz"}),
        startBlock: 13882080,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0xf4906225e783fb8977410bdbfb960cabed6c2ef4",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xc28872e0c1f3633eed467907123727ac0155029d",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xf0d61b42311c810dfde191d58427d81e87c5d5f6",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xcf2d812d5aad4e6fec3b05850ff056b21159d496",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x3e5c4130ea7cfbd364fa5f170289d697865ca94b",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x7313addb53f96a4f710d3b91645c62b434190725",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x67422c3e36a908d5c3237e9cffeb40bde7060f6e",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xb194c7278c627d52e440316b74c5f24fc70c1565",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x5f0e1dea4a635976ef51ec2a2ed41490d1eba003",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x8d4ddc187a73017a5d7cef733841f55115b13762",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x8d87c5eddb5644d1a714f85930ca940166e465f0",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xbf67f0a1e847564d0efad475782236d3fa7e9ec2",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xe0bfe071da104e571298f8b6e0fce44c512c1ff4",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=137)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://137.hypersync.xyz"}),
        startBlock: 44637127,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x46de683d20c3575a0381ffd66c10ab6836390140",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x8a84fcf962163a7e98bf0dafd918973c846fa5c8",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x8e7e78799f8cc87d4816112a758281dabc158452",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x015899a075b7c181e357cd0ed000683dbb4f1fce",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xe3747379bf7282e0ab5389a63ea053a5256042df",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xe6c7324bea8474209103e407779eec600c07cf3f",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x2fca69fa0a318efdf4c15ee8f13a873347a8a8d4",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xf03f4bf48b108360baf1597fb8053ebe0f5245da",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x8cb69b514e97a904743922e1adf3d1627deeee8d",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x1fb145a47eb9b8bf565273e137356376197b3559",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x7bccb3595aa81dbe8a69dd8c46f5c2a3cf76594a",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=324)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://324.hypersync.xyz"}),
        startBlock: 32472581,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xa9264ef7cb1516cc27fcd5149a2909ace885ffb6",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x5dd399bb320412df92df5c10484d3f8d481fe231",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xa2dd5e785aa0225d681416884d395c7e22d92850",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=478)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: Rpc({syncConfig: Config.getSyncConfig({initialBlockInterval: 2000,intervalCeiling: 2000,})}),
        startBlock: 3359301,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0xdb07a1749d5ca49909c7c4159652fbd527c735b8",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x278ac15622846806bd46fbdbdb8db8d09614173a",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xc0107f368fbb50075d2190549055d9e6bf75c5c9",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x46fa0164c5af9382d330e5a245a2ca8a18398950",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x89d964e0b508234bcfdc7a32ae0aa0356f422b70",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0x49d753422ff05daa291a9efa383e4f57daead889",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x17c4f98c40e69a6a0d5c42b11e3733f076a99e20",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xaa05e418fb7851c211351c65435f1b17cbfa88bf",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x6329591464fa6721c8e1c1271e4c6c41531aea6b",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x83403c6426e6d044bf3b84ec1c007db211aaa140",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x6c65aaf03186d1da60127d3d7792cf36ed99d909",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=1890)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: Rpc({syncConfig: Config.getSyncConfig({initialBlockInterval: 2000,intervalCeiling: 2000,})}),
        startBlock: 63524930,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xe2c0c3e0ff10df4485a2dcbbdd1d002a40446164",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x0c72b957347b51285854f015e4d20641655b939a",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x001f1408515ccd5c1a19a682455ed4efa39dadd6",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x555b0766f494c641bb522086da4e728ac08c1420",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xc69c06c030e825ede13f1486078aa9a2e2aaffaf",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x7282d83e49363f373102d195f66649ebd6c57b9b",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x28fcae6bda2546c93183eec8638691b2eb184003",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x14eb4ab47b2ec2a71763eaba202a252e176fae88",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=2741)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://2741.hypersync.xyz"}),
        startBlock: 72821,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x5e73bb96493c10919204045fcdb639d35ad859f8",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xbe64e8718d82c598ebcda5149d10eb68b79632a4",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xfe6972d0ae797fae343e5a58d0c7d8513937f092",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xf31c8e7d9a0bd310a9d5fb317ba67bb1f0101c6d",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x946654ab30dd6ed10236c89f2c8b2719df653691",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xac19f4181e58efb7094e0cb4e1bb18c79f6aadf4",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x63b92f7e2f69877184c955e63b9d8dff55e52e14",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xf3cd08105b6745965149ef02b8abdcea0ae51241",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=2818)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://2818.hypersync.xyz"}),
        startBlock: 45825,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xf60beadefbeb98c927e13c4165bca7d85ba32cb2",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x3df48bb93509d9a041c81f6670c37b1eeb3e154b",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x4f5f9b3fb57bba43aaf90e3f71d8f8f384e88e20",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x40e75bb2f2aa3507d3a332872829c71be19ef623",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x1fa500262b352d821b4e1c933a20f2242b45383d",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x251fc799344151026d19b959b8f3667416d56b88",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x91211e1760280d3f7df2182ce4d1fd6a1735c202",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xf46d1f8c85f215a515f6d738ab3e3ba081f6c083",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=5330)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://5330.hypersync.xyz"}),
        startBlock: 2896160,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x5e73bb96493c10919204045fcdb639d35ad859f8",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xd641a0e4509cced67cc24e7bdcde2a31b7f7cf77",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xcff4a803b0bf55dd1be38fb96088478f3d2eecf2",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xcb099efc90e88690e287259410b9ae63e1658cc6",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x946654ab30dd6ed10236c89f2c8b2719df653691",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xac19f4181e58efb7094e0cb4e1bb18c79f6aadf4",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x63b92f7e2f69877184c955e63b9d8dff55e52e14",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x1cae76b71913598d7664d16641ccb6037d8ed61a",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=5845)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://tangle.hypersync.xyz"}),
        startBlock: 2515961,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x5545c8e7c3e1f74adc98e518f2e8d23a002c4412",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x58a51e5382318eea6065bb7721eecdf4331c0b90",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xd9e108f26fe104ce1058d48070438dedb3ad826a",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x1a9adc0e2114c8407cc31669baafeee031d15dd2",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x6fe93c7f6cd1dc394e71591e3c42715be7180a6a",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x645b00960dc352e699f89a81fc845c0c645231cf",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x6b9a46c8377f21517e65fa3899b3a9fab19d17f5",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0x461e13056a3a3265cef4c593f01b2e960755de91",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xfcf737582d167c7d20a336532eb8bcca8cf8e350",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xf9e9ed67dd2fab3b3ca024a2d66fcf0764d36742",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x4cb16d4153123a74bc724d161050959754f378d8",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xf4937657ed8b3f3cb379eed47b8818ee947beb1e",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xb5d78dd3276325f5faf3106cc4acc56e28e0fe3b",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=8453)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://8453.hypersync.xyz"}),
        startBlock: 1750275,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x0fd01dd30f96a15de6afad5627d45ef94752460a",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xc472391db89e7be07170f18c4fdb010242507f2c",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x75970dde488431fc4961494569def3269f20d6b3",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xc968e8eefe19bd6de8868df40d9740be127a172a",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x704552099f5ad679294d337638b9a57fd4726f52",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xd8c65bd7cb6924ef895b2edca03407c652f5a2c5",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xbbfa51a10be68714fa33281646b986dae9f52021",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x3aebadfc423fd08be4715986f68d5e9a597ec974",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=34443)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://34443.hypersync.xyz"}),
        startBlock: 11343389,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x237400ef5a41886a75b0e036228221df075b3b80",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0xc9a5a0bc2d8e217bdbdfe7486e9e72c5c3308f01",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x7efd170e3e32dc1b4c17eb4cfff92c81ff43a6cb",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x18a12a7035aa56240bcd236bc019aa245dcc015a",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x87cf87ec5de33deb4a88787065373563ba85ee72",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0xa9efbef1a35ff80041f567391bdc9813b2d50197",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x197d655f3be03903fd25e7828c3534504bfe525e",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xf390ce6f54e4dc7c5a5f7f8689062b7591f7111d",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xfdd9d122b451f549f48c4942c6fa6646d849e8c1",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x53f5eeb133b99c6e59108f35bcc7a116da50c5ce",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x05a323a4c936fed6d02134c5f0877215cd186b51",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x0da2c7aa93e7cd43e6b8d043aab5b85cfddf3818",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x467d5bf8cfa1a5f99328fbdcb9c751c78934b725",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=42161)
    (
      chain,
      {
        confirmedBlockThreshold: 0,
        syncSource: HyperSync({endpointUrl: "https://42161.hypersync.xyz"}),
        startBlock: 107508404,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x4849e797d7aab20fcc8f807efafdfff98a83412e",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x0430ed39ea2789acdf27b89268117ebabc8176d1",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x6bcd2260825cfed440bb765f7a92f6cdbdc90f43",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x8c172e42c06302e3cfe555dc4d6b71a756ee186b",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xac7cb985d4022a5ebd4a385374ac3d3b487b3c63",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x665d1c8337f1035cfbe13dd94bb669110b975f5f",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x610346e9088afa70d6b03e96a800b3267e75ca19",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0x0310da0d8ff141166ed47548f00c96464880781f",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xb24b65e015620455bb41deaad4e1902f1be9805f",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xe3826241e5eebb3f5fede33f9f677047674d3fbf",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xc0bf14afb95ca4c049bdc19e06a3531d8065f6fd",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xfa536049652bfb5f57ba8dcfbec1b2b2dd9803d3",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x3c81bbbe72ef8ef3fb1d19b0bd6310ad0dd27e82",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=43114)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://43114.hypersync.xyz"}),
        startBlock: 32164219,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x9d4923e2ff0b9dadc447a89f528760928f84d0f7",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x20c9a3e27322fc2b21ced430d1b2e12d90804db6",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x28fcae6bda2546c93183eec8638691b2eb184003",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=50104)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://50104.hypersync.xyz"}),
        startBlock: 11275708,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x35e9c3445a039b258eb7112a5eea259a825e8ac0",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xaa122611e0e3a0771127aa4cd4995a896bb2c20b",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x949bfa08f1632432a2656a9db17ca34d54da8296",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xefc6e4c7dc5faa0cfbfebb5e04ea7cd47f64012f",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xf2e46b249cfe09c2b3a2022dc81e0bb4be3336f1",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xb5d39049510f47ee7f74c528105d225e42747d63",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xc46ce4b77cbc46d17a2eceb2cc8e2ee23d96529f",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x6964252561e8762dd10267176eac5078b6291e51",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=59144)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://59144.hypersync.xyz"}),
        startBlock: 7728316,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x7868af143cc5e6cd03f9b4f5cdd2832695a85d6b",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xa031544946ed769377128fbd961c9d621c4b4179",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xc19a2542156b5d7960e0ef46e9787e7d336cf428",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=80094)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://80094.hypersync.xyz"}),
        startBlock: 780094,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0x92fc05e49c27884d554d98a5c01ff0894a9dc29a",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x3abcdda756d069cf3c7a17410602343966eaff27",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xdd40b4f5b216f524a55e2e8f75637e8b453e4bd2",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xfdac2799644141856e20e021ac06f231cafc731f",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x16b50eb5eaef0366f1a4da594e2a8c8943a297e0",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xdf578c2c70a86945999c65961417057363530a1c",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xcb099efc90e88690e287259410b9ae63e1658cc6",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xa705de617673e2fe63a4ea0e58c26897601d32a5",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x9b1468d29b4a5869f00c92517c57f8656e928b93",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x91fb72e5297e2728c10fde73bde74a4888a68570",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xdbb6e9653d7e41766712db22eb08ed3f21009fdd",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=81457)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://81457.hypersync.xyz"}),
        startBlock: 243844,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0xf632521bbab0dbc2bef169865e6c8e285afe0a42",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x899a05feb160fe912f621733a1d0b39c1446b3eb",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x6a3466398a66c7ce801989b45c390cdc8717102d",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0xd5f78708d83ac2bc8734a8cdf2d112c1bb3b62a2",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xfb6b72a5988a7701a9090c56936269241693a9cc",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xf46d5fa9bfc964e8d06846c8739aec69bc06344d",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0xbd7aaa2984c0a887e93c66baae222749883763d3",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x6dcb73e5f7e8e70be20b3b9cf50e3be4625a91c3",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xfe7fc0bbde84c239c0ab89111d617dc7cc58049f",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xb8c724df3ec8f2bf8fa808df2cb5dbab22f3e68c",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xa4777ca525d43a7af55d45b11b430606d7416f8d",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=84532)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://84532.hypersync.xyz"}),
        startBlock: 7545175,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x92fc05e49c27884d554d98a5c01ff0894a9dc29a",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xf978034bb3cab5fe88d23db5cb38d510485dab90",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x9efc8663cab0e2d97ad17c9fbfc8392445517e94",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x28eab88ee8a951f78e1028557d0c3fd97af61a33",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xcff4a803b0bf55dd1be38fb96088478f3d2eecf2",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xdf578c2c70a86945999c65961417057363530a1c",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xcb099efc90e88690e287259410b9ae63e1658cc6",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0x711900e5f55d427cd88e5e3fcae54ccf02de71f4",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=88888)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://chiliz.hypersync.xyz"}),
        startBlock: 19125587,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0xb3ade5463000e6c0d376e7d7570f372ebf98bdaf",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x344afe8ad5dba3d55870dc398e0f53b635b2ed0d",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0x6df0bffdb106b19d1e954853f4d14003e21b7854",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x66826f53bffeaab71adc7fe1a77e86f8268848d8",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0xc4f104ce12cb12484ff67cf0c4bd0561f0014ec2",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0xde6a30d851efd0fc2a9c922f294801cfd5fcb3a1",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0x80640ca758615ee83801ec43452feea09a202d33",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xaaff2d11f9e7cd2a9cdc674931fac0358a165995",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x57e14ab4dad920548899d86b54ad47ea27f00987",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0xac199bfea92aa4d4c3d8a49fd463ead99c7a6a8f",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0xbc5dc6d77612e636da32af0d85ca3179a57330fd",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0xb0f78ddc01d829d8b567821eb193de8082b57d9d",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xcb0b1f1d116ed62135848d8c90eb61afda936da8",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=534352)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://534352.hypersync.xyz"}),
        startBlock: 500707,
        contracts
      }
    )
  },
  {
    let contracts = Js.Dict.fromArray([
      (
        "SablierV2MerkleStreamerFactory_v1_1",
        {
          name: "SablierV2MerkleStreamerFactory_v1_1",
          abi: Types.SablierV2MerkleStreamerFactory_v1_1.abi,
          addresses: [
            "0xbacc1d151a78eed71d504f701c25e8739dc0262d",
          ],
          events: [
            Types.SablierV2MerkleStreamerFactory_v1_1.CreateMerkleStreamerLL.name,
          ],
        }
      ),
      (
        "SablierV2MerkleStreamerLL_v1_1",
        {
          name: "SablierV2MerkleStreamerLL_v1_1",
          abi: Types.SablierV2MerkleStreamerLL_v1_1.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleStreamerLL_v1_1.TransferAdmin.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Clawback.name,
            Types.SablierV2MerkleStreamerLL_v1_1.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLockupFactory_v1_2",
        {
          name: "SablierV2MerkleLockupFactory_v1_2",
          abi: Types.SablierV2MerkleLockupFactory_v1_2.abi,
          addresses: [
            "0x56e9180a8d2c35c99f2f8a1a5ab8abe79e876e8c",
          ],
          events: [
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLL.name,
            Types.SablierV2MerkleLockupFactory_v1_2.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLL_v1_2",
        {
          name: "SablierV2MerkleLL_v1_2",
          abi: Types.SablierV2MerkleLL_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLL_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLL_v1_2.Clawback.name,
            Types.SablierV2MerkleLL_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierV2MerkleLT_v1_2",
        {
          name: "SablierV2MerkleLT_v1_2",
          abi: Types.SablierV2MerkleLT_v1_2.abi,
          addresses: [
          ],
          events: [
            Types.SablierV2MerkleLT_v1_2.TransferAdmin.name,
            Types.SablierV2MerkleLT_v1_2.Clawback.name,
            Types.SablierV2MerkleLT_v1_2.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleFactory_v1_3",
        {
          name: "SablierMerkleFactory_v1_3",
          abi: Types.SablierMerkleFactory_v1_3.abi,
          addresses: [
            "0xf642751d1271c88bbb8786067de808b32a016fd4",
          ],
          events: [
            Types.SablierMerkleFactory_v1_3.CreateMerkleInstant.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLL.name,
            Types.SablierMerkleFactory_v1_3.CreateMerkleLT.name,
          ],
        }
      ),
      (
        "SablierMerkleInstant_v1_3",
        {
          name: "SablierMerkleInstant_v1_3",
          abi: Types.SablierMerkleInstant_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleInstant_v1_3.TransferAdmin.name,
            Types.SablierMerkleInstant_v1_3.Clawback.name,
            Types.SablierMerkleInstant_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLL_v1_3",
        {
          name: "SablierMerkleLL_v1_3",
          abi: Types.SablierMerkleLL_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLL_v1_3.TransferAdmin.name,
            Types.SablierMerkleLL_v1_3.Clawback.name,
            Types.SablierMerkleLL_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierMerkleLT_v1_3",
        {
          name: "SablierMerkleLT_v1_3",
          abi: Types.SablierMerkleLT_v1_3.abi,
          addresses: [
          ],
          events: [
            Types.SablierMerkleLT_v1_3.TransferAdmin.name,
            Types.SablierMerkleLT_v1_3.Clawback.name,
            Types.SablierMerkleLT_v1_3.Claim.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_0",
        {
          name: "SablierFlow_v1_0",
          abi: Types.SablierFlow_v1_0.abi,
          addresses: [
            "0x5ae8c13f6ae094887322012425b34b0919097d8a",
          ],
          events: [
            Types.SablierFlow_v1_0.Approval.name,
            Types.SablierFlow_v1_0.ApprovalForAll.name,
            Types.SablierFlow_v1_0.Transfer.name,
            Types.SablierFlow_v1_0.AdjustFlowStream.name,
            Types.SablierFlow_v1_0.CreateFlowStream.name,
            Types.SablierFlow_v1_0.DepositFlowStream.name,
            Types.SablierFlow_v1_0.PauseFlowStream.name,
            Types.SablierFlow_v1_0.RefundFromFlowStream.name,
            Types.SablierFlow_v1_0.RestartFlowStream.name,
            Types.SablierFlow_v1_0.VoidFlowStream.name,
            Types.SablierFlow_v1_0.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierFlow_v1_1",
        {
          name: "SablierFlow_v1_1",
          abi: Types.SablierFlow_v1_1.abi,
          addresses: [
            "0x93fe8f86e881a23e5a2feb4b160514fd332576a6",
          ],
          events: [
            Types.SablierFlow_v1_1.Approval.name,
            Types.SablierFlow_v1_1.ApprovalForAll.name,
            Types.SablierFlow_v1_1.Transfer.name,
            Types.SablierFlow_v1_1.AdjustFlowStream.name,
            Types.SablierFlow_v1_1.CreateFlowStream.name,
            Types.SablierFlow_v1_1.DepositFlowStream.name,
            Types.SablierFlow_v1_1.PauseFlowStream.name,
            Types.SablierFlow_v1_1.RefundFromFlowStream.name,
            Types.SablierFlow_v1_1.RestartFlowStream.name,
            Types.SablierFlow_v1_1.VoidFlowStream.name,
            Types.SablierFlow_v1_1.WithdrawFromFlowStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_0",
        {
          name: "SablierV2LockupDynamic_v1_0",
          abi: Types.SablierV2LockupDynamic_v1_0.abi,
          addresses: [
            "0x421e1e7a53ff360f70a2d02037ee394fa474e035",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_0.Approval.name,
            Types.SablierV2LockupDynamic_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_0.Transfer.name,
            Types.SablierV2LockupDynamic_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_0",
        {
          name: "SablierV2LockupLinear_v1_0",
          abi: Types.SablierV2LockupLinear_v1_0.abi,
          addresses: [
            "0xd4300c5bc0b9e27c73ebabdc747ba990b1b570db",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_0.Approval.name,
            Types.SablierV2LockupLinear_v1_0.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_0.Transfer.name,
            Types.SablierV2LockupLinear_v1_0.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_0.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_1",
        {
          name: "SablierV2LockupDynamic_v1_1",
          abi: Types.SablierV2LockupDynamic_v1_1.abi,
          addresses: [
            "0xc9940ad8f43aad8e8f33a4d5dbbf0a8f7ff4429a",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_1.Approval.name,
            Types.SablierV2LockupDynamic_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_1.Transfer.name,
            Types.SablierV2LockupDynamic_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_1",
        {
          name: "SablierV2LockupLinear_v1_1",
          abi: Types.SablierV2LockupLinear_v1_1.abi,
          addresses: [
            "0x7a43f8a888fa15e68c103e18b0439eb1e98e4301",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_1.Approval.name,
            Types.SablierV2LockupLinear_v1_1.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_1.Transfer.name,
            Types.SablierV2LockupLinear_v1_1.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_1.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_1.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupDynamic_v1_2",
        {
          name: "SablierV2LockupDynamic_v1_2",
          abi: Types.SablierV2LockupDynamic_v1_2.abi,
          addresses: [
            "0x73bb6dd3f5828d60f8b3dbc8798eb10fba2c5636",
          ],
          events: [
            Types.SablierV2LockupDynamic_v1_2.Approval.name,
            Types.SablierV2LockupDynamic_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupDynamic_v1_2.Transfer.name,
            Types.SablierV2LockupDynamic_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.CreateLockupDynamicStream.name,
            Types.SablierV2LockupDynamic_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupDynamic_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupLinear_v1_2",
        {
          name: "SablierV2LockupLinear_v1_2",
          abi: Types.SablierV2LockupLinear_v1_2.abi,
          addresses: [
            "0x3e435560fd0a03ddf70694b35b673c25c65abb6c",
          ],
          events: [
            Types.SablierV2LockupLinear_v1_2.Approval.name,
            Types.SablierV2LockupLinear_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupLinear_v1_2.Transfer.name,
            Types.SablierV2LockupLinear_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.CreateLockupLinearStream.name,
            Types.SablierV2LockupLinear_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupLinear_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierV2LockupTranched_v1_2",
        {
          name: "SablierV2LockupTranched_v1_2",
          abi: Types.SablierV2LockupTranched_v1_2.abi,
          addresses: [
            "0x3a1bea13a8c24c0ea2b8fae91e4b2762a59d7af5",
          ],
          events: [
            Types.SablierV2LockupTranched_v1_2.Approval.name,
            Types.SablierV2LockupTranched_v1_2.ApprovalForAll.name,
            Types.SablierV2LockupTranched_v1_2.Transfer.name,
            Types.SablierV2LockupTranched_v1_2.CancelLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.CreateLockupTranchedStream.name,
            Types.SablierV2LockupTranched_v1_2.RenounceLockupStream.name,
            Types.SablierV2LockupTranched_v1_2.WithdrawFromLockupStream.name,
          ],
        }
      ),
      (
        "SablierLockup_v2_0",
        {
          name: "SablierLockup_v2_0",
          abi: Types.SablierLockup_v2_0.abi,
          addresses: [
            "0xd116c275541cdbe7594a202bd6ae4dbca4578462",
          ],
          events: [
            Types.SablierLockup_v2_0.Approval.name,
            Types.SablierLockup_v2_0.ApprovalForAll.name,
            Types.SablierLockup_v2_0.Transfer.name,
            Types.SablierLockup_v2_0.CancelLockupStream.name,
            Types.SablierLockup_v2_0.CreateLockupDynamicStream.name,
            Types.SablierLockup_v2_0.CreateLockupLinearStream.name,
            Types.SablierLockup_v2_0.CreateLockupTranchedStream.name,
            Types.SablierLockup_v2_0.RenounceLockupStream.name,
            Types.SablierLockup_v2_0.WithdrawFromLockupStream.name,
          ],
        }
      ),
    ])
    let chain = ChainMap.Chain.makeUnsafe(~chainId=11155111)
    (
      chain,
      {
        confirmedBlockThreshold: 200,
        syncSource: HyperSync({endpointUrl: "https://11155111.hypersync.xyz"}),
        startBlock: 4067889,
        contracts
      }
    )
  },
])

@genType
let getGeneratedByChainId: int => configYaml = chainId => {
  let chain = ChainMap.Chain.makeUnsafe(~chainId)
  if !(publicConfig->ChainMap.has(chain)) {
    Js.Exn.raiseError(
      "No chain with id " ++ chain->ChainMap.Chain.toString ++ " found in config.yaml",
    )
  }
  publicConfig->ChainMap.get(chain)
}
