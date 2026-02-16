import { Address, BigInt, ethereum } from "@graphprotocol/graph-ts";
import { ONE, ZERO } from "../../common/constants";
import { readChainId, readContractAlias, readContractVersion } from "../../common/context";
import * as Entity from "../bindings/schema";
import { getOrCreateAsset } from "./entity-asset";
import { getOrCreateWatcher } from "./entity-watcher";

const STATUS_ACTIVE = "Active";
const STATUS_SETTLED = "Settled";

class CreateVaultParams {
  adapter: Address;
  expiry: BigInt;
  oracle: Address;
  shareToken: Address;
  targetPrice: BigInt;
  token: Address;
  vaultId: BigInt;
}

function getId(chainId: string, vaultId: string): string {
  return `vault-${chainId}-${vaultId}`;
}

export function getVaultEntityId(vaultId: BigInt): string {
  const chainId = readChainId().toString();
  return getId(chainId, vaultId.toString());
}

export function getVault(vaultId: BigInt): Entity.Vault | null {
  return Entity.Vault.load(getVaultEntityId(vaultId));
}

export function createVault(event: ethereum.Event, params: CreateVaultParams): Entity.Vault {
  const chainId = readChainId();
  const chainIdString = chainId.toString();
  const vaultIdString = params.vaultId.toString();

  const id = getId(chainIdString, vaultIdString);
  const vault = new Entity.Vault(id);

  const watcher = getOrCreateWatcher();
  vault.subgraphId = watcher.vaultCounter;
  watcher.vaultCounter = watcher.vaultCounter.plus(ONE);
  watcher.save();

  const asset = getOrCreateAsset(params.token);

  vault.alias = `${readContractAlias()}-${chainIdString}-${vaultIdString}`;
  vault.asset = asset.id;
  vault.adapter = params.adapter;
  vault.chainId = chainId;
  vault.enteredAmount = ZERO;
  vault.exitedAmount = ZERO;
  vault.expiry = params.expiry;
  vault.hash = event.transaction.hash;
  vault.isStakedWithAdapter = !params.adapter.equals(Address.zero());
  vault.lastSyncedAt = event.block.timestamp;
  vault.lastSyncedPrice = ZERO;
  vault.oracle = params.oracle;
  vault.redeemedAmount = ZERO;
  vault.redeemedFeeAmount = ZERO;
  vault.shareToken = params.shareToken;
  vault.status = STATUS_ACTIVE;
  vault.targetPrice = params.targetPrice;
  vault.timestamp = event.block.timestamp;
  vault.totalShares = ZERO;
  vault.unstakedAmountReceived = ZERO;
  vault.unstakedAmountStaked = ZERO;
  vault.vaultId = params.vaultId;
  vault.version = readContractVersion();
  vault.save();

  return vault;
}

export function refreshStatus(vault: Entity.Vault, nowTimestamp: BigInt): void {
  // Status is terminal once settled. Only transition from Active -> Settled.
  if (vault.status == STATUS_SETTLED) {
    return;
  }

  if (nowTimestamp.ge(vault.expiry) || vault.lastSyncedPrice.ge(vault.targetPrice)) {
    vault.status = STATUS_SETTLED;
    return;
  }
  vault.status = STATUS_ACTIVE;
}

export function applySyncPrice(
  vault: Entity.Vault,
  latestPrice: BigInt,
  syncedAt: BigInt,
  nowTimestamp: BigInt
): void {
  vault.lastSyncedPrice = latestPrice;
  vault.lastSyncedAt = syncedAt;
  refreshStatus(vault, nowTimestamp);
}

export function bumpShares(vault: Entity.Vault, delta: BigInt): void {
  vault.totalShares = vault.totalShares.plus(delta);
}

export function decreaseShares(vault: Entity.Vault, delta: BigInt): void {
  vault.totalShares = vault.totalShares.minus(delta);
}
