import { Address, dataSource } from "@graphprotocol/graph-ts";
import { logError } from "../../../common/logger";
import * as Entity from "../../bindings/schema";
import { Transfer } from "../../bindings/templates/BobVaultShare_v1_0/ERC20";
import { Store } from "../../store";

function persistState(event: Transfer): void {
  const state = Store.State.getOrCreate();
  Store.State.syncCounters(state);
  Store.State.touch(state, event);
  state.save();
}

function getVaultIdFromContext(): string | null {
  const context = dataSource.context();
  const value = context.getString("vault");
  if (value === null) {
    return null;
  }
  return value;
}

export function handle_BobVaultShare_v1_0_Transfer(event: Transfer): void {
  const vaultId = getVaultIdFromContext();
  if (vaultId === null) {
    logError("Missing vault context for BobVaultShare template {}", [
      dataSource.address().toHexString(),
    ]);
    return;
  }

  const vault = Entity.Vault.load(vaultId);
  if (vault === null) {
    logError("Vault not found in BobVaultShare transfer: {}", [vaultId]);
    return;
  }

  Store.Position.applyShareTransfer(
    vault,
    event.params.from,
    event.params.to,
    event.params.amount,
    event.block.timestamp
  );

  const from = event.params.from;
  const to = event.params.to;
  const amount = event.params.amount;
  const zero = Address.zero();
  const isMint = from.equals(zero);
  const isBurn = to.equals(zero);

  if (isMint) {
    Store.Vault.bumpShares(vault, amount);
  } else if (isBurn) {
    Store.Vault.decreaseShares(vault, amount);
  }

  if (!isMint && !isBurn) {
    Store.Action.create(event, {
      addressA: from,
      addressB: to,
      amountA: amount,
      amountB: null,
      amountC: null,
      category: "ShareTransfer",
      vaultId: vault.id,
    });
  }

  Store.Vault.refreshStatus(vault, event.block.timestamp);
  vault.save();

  persistState(event);
}
