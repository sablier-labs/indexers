import { Address, BigInt, DataSourceContext, ethereum } from "@graphprotocol/graph-ts";
import { readChainId, readContractVersion } from "../../../common/context";
import { logError } from "../../../common/logger";
import {
  CreateVault,
  Enter,
  ExitWithinGracePeriod,
  Redeem,
  SetComptroller,
  SetDefaultAdapter,
  SyncPriceFromOracle,
  TransferFeesToComptroller,
  UnstakeFromAdapter,
} from "../../bindings/SablierBob_v1_0/SablierBob";
import { BobVaultShare_v1_0 as BobVaultShareTemplate } from "../../bindings/templates";
import { Store } from "../../store";

function persistState(event: ethereum.Event): void {
  const state = Store.State.getOrCreate();
  Store.State.syncCounters(state);
  Store.State.touch(state, event);
  state.save();
}

const STATUS_SETTLED = "Settled";

function getVaultOrLog(vaultId: BigInt, category: string) {
  const vault = Store.Vault.get(vaultId);
  if (vault === null) {
    logError("Vault not found in {} handler: {}", [category, vaultId.toString()]);
    return null;
  }

  return vault;
}

export function handle_SablierBob_v1_0_CreateVault(event: CreateVault): void {
  const params = event.params;

  const vault = Store.Vault.create(event, {
    adapter: params.adapter,
    expiry: params.expiry,
    oracle: params.oracle,
    shareToken: params.shareToken,
    targetPrice: params.targetPrice,
    token: params.token,
    vaultId: params.vaultId,
  });

  const context = new DataSourceContext();
  context.setString("alias", "BOB_SHARE");
  context.setBigInt("chainId", readChainId());
  context.setString("vault", vault.id);
  context.setString("version", readContractVersion());
  BobVaultShareTemplate.createWithContext(params.shareToken, context);

  Store.Action.create(event, {
    addressA: params.token,
    addressB: params.oracle,
    amountA: params.targetPrice,
    amountB: params.expiry,
    amountC: null,
    category: "CreateVault",
    vaultId: vault.id,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_Enter(event: Enter): void {
  const params = event.params;
  const vault = getVaultOrLog(params.vaultId, "Enter");
  if (vault === null) {
    return;
  }

  vault.enteredAmount = vault.enteredAmount.plus(params.amountReceived);
  Store.Vault.refreshStatus(vault, event.block.timestamp);
  vault.save();

  Store.Position.applyEnter(
    vault,
    params.user,
    params.amountReceived,
    params.sharesMinted,
    event.block.timestamp
  );

  Store.Action.create(event, {
    addressA: params.user,
    addressB: null,
    amountA: params.amountReceived,
    amountB: params.sharesMinted,
    amountC: null,
    category: "Enter",
    vaultId: vault.id,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_ExitWithinGracePeriod(event: ExitWithinGracePeriod): void {
  const params = event.params;
  const vault = getVaultOrLog(params.vaultId, "ExitWithinGracePeriod");
  if (vault === null) {
    return;
  }

  vault.exitedAmount = vault.exitedAmount.plus(params.amountReceived);
  Store.Vault.refreshStatus(vault, event.block.timestamp);
  vault.save();

  Store.Position.applyExitWithinGracePeriod(
    vault,
    params.user,
    params.amountReceived,
    params.sharesBurned,
    event.block.timestamp
  );

  Store.Action.create(event, {
    addressA: params.user,
    addressB: null,
    amountA: params.amountReceived,
    amountB: params.sharesBurned,
    amountC: null,
    category: "ExitWithinGracePeriod",
    vaultId: vault.id,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_Redeem(event: Redeem): void {
  const params = event.params;
  const vault = getVaultOrLog(params.vaultId, "Redeem");
  if (vault === null) {
    return;
  }

  vault.redeemedAmount = vault.redeemedAmount.plus(params.amountReceived);
  vault.redeemedFeeAmount = vault.redeemedFeeAmount.plus(params.fee);
  vault.status = STATUS_SETTLED;
  if (!vault.adapter.equals(Address.zero())) {
    vault.isStakedWithAdapter = false;
  }
  vault.save();

  Store.Position.applyRedeem(
    vault,
    params.user,
    params.amountReceived,
    params.sharesBurned,
    event.block.timestamp
  );

  Store.Action.create(event, {
    addressA: params.user,
    addressB: null,
    amountA: params.amountReceived,
    amountB: params.sharesBurned,
    amountC: params.fee,
    category: "Redeem",
    vaultId: vault.id,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_SetComptroller(event: SetComptroller): void {
  const params = event.params;

  const state = Store.State.getOrCreate();
  state.comptroller = params.newComptroller;

  Store.Action.create(event, {
    addressA: params.oldComptroller,
    addressB: params.newComptroller,
    amountA: null,
    amountB: null,
    amountC: null,
    category: "SetComptroller",
    vaultId: null,
  });

  Store.State.syncCounters(state);
  Store.State.touch(state, event);
  state.save();
}

export function handle_SablierBob_v1_0_SetDefaultAdapter(event: SetDefaultAdapter): void {
  const params = event.params;

  Store.DefaultAdapter.upsert(event, params.token, params.adapter);

  Store.Action.create(event, {
    addressA: params.token,
    addressB: params.adapter,
    amountA: null,
    amountB: null,
    amountC: null,
    category: "SetDefaultAdapter",
    vaultId: null,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_SyncPriceFromOracle(event: SyncPriceFromOracle): void {
  const params = event.params;
  const vault = getVaultOrLog(params.vaultId, "SyncPriceFromOracle");
  if (vault === null) {
    return;
  }

  Store.Vault.applySyncPrice(vault, params.latestPrice, params.syncedAt, event.block.timestamp);
  vault.save();

  Store.Action.create(event, {
    addressA: params.oracle,
    addressB: null,
    amountA: params.latestPrice,
    amountB: params.syncedAt,
    amountC: null,
    category: "SyncPriceFromOracle",
    vaultId: vault.id,
  });

  persistState(event);
}

export function handle_SablierBob_v1_0_TransferFeesToComptroller(
  event: TransferFeesToComptroller
): void {
  const params = event.params;

  const state = Store.State.getOrCreate();
  Store.State.addTransferredFees(state, params.feeAmount);

  Store.Action.create(event, {
    addressA: params.comptroller,
    addressB: null,
    amountA: params.feeAmount,
    amountB: null,
    amountC: null,
    category: "TransferFeesToComptroller",
    vaultId: null,
  });

  Store.State.syncCounters(state);
  Store.State.touch(state, event);
  state.save();
}

export function handle_SablierBob_v1_0_UnstakeFromAdapter(event: UnstakeFromAdapter): void {
  const params = event.params;
  const vault = getVaultOrLog(params.vaultId, "UnstakeFromAdapter");
  if (vault === null) {
    return;
  }

  vault.isStakedWithAdapter = false;
  vault.status = STATUS_SETTLED;
  vault.unstakedAmountReceived = params.amountReceivedFromAdapter;
  vault.unstakedAmountStaked = params.amountStakedInAdapter;
  vault.save();

  Store.Action.create(event, {
    addressA: params.adapter,
    addressB: null,
    amountA: params.amountStakedInAdapter,
    amountB: params.amountReceivedFromAdapter,
    amountC: null,
    category: "UnstakeFromAdapter",
    vaultId: vault.id,
  });

  persistState(event);
}
