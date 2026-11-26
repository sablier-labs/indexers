# Envio Analytics

Private Envio indexer for internal Sablier analytics. `analytics.graphql` is its directly maintained source schema; the
shared `schema/` directory does not own it. Its endpoint and playground source of truth are `ENVIO_ANALYTICS_ENDPOINT`
and `ENVIO_ANALYTICS_PLAYGROUND_URL` in `cli/commands/query/clients/envio.ts`.

## Payable Releases

Only payable releases charge native-currency fees through `msg.value`. Add `Store.Fees.createOrUpdate` only to handlers
for those releases.

| Protocol | Payable versions | Non-payable versions |
| -------- | ---------------- | -------------------- |
| Airdrops | v1.3, v2.0, v3.0 | v1.1, v1.2           |
| Lockup   | v2.0, v3.0, v4.0 | v1.0, v1.1, v1.2     |
| Flow     | v1.1, v2.0, v3.0 | v1.0                 |

`isEvmReleasePayable` in the `sablier` SDK (`src/evm/helpers.ts`) is the canonical source of truth.

## Fee Attribution

A fee is the native value that the emitting contract received, not the outer `tx.value`. `Store.Fees.createOrUpdate`
finds it in this order and records the result in `FeeTransaction.source`:

1. `TX_VALUE`: `tx.to` is the emitting contract. The fee is `tx.value`.
2. No fee: `tx.to` is another known Sablier contract or a registered `AirdropCampaign`. These contracts never forward
   native value to a fee-charging contract.
3. `TRACE`: for any other callee, the fee is the summed value of the successful `CALL` frames into the contract.
4. `MIN_FEE`: when no trace is available and the policy has a `minFee`, the fee is the minimum that the contract
   enforces. This value is a lower bound.

Pass a policy from `FeePolicies` in `store/fee-resolver.ts` to every `Store.Fees.createOrUpdate` call:

| Policy                     | Use for                                            |
| -------------------------- | -------------------------------------------------- |
| `airdropFixed`             | Airdrops v1.3 claims                               |
| `airdropOracle`            | Airdrops v2.0 and later claims                     |
| `streamWithdraw(streamId)` | Withdrawals in Lockup v3.0+ and Flow v2.0+         |
| `voluntaryComptroller`     | Other payable calls in Lockup v3.0+ and Flow v2.0+ |
| `voluntaryContract`        | Lockup v2.0 and Flow v1.1                          |
| `preset`                   | Synthetic preset events                            |

- When you add a policy, set `minFee` only if the contract rejects a lower `msg.value` for that call.
- Set `ledger` to the place where the release keeps its fees until a sweep: `contract` or `comptroller`.
- The store records at most one `FeeTransaction` for each transaction and contract pair.
- In each factory handler for a campaign that creates Lockup streams, call `Store.AirdropCampaign.register`. A claim
  sent directly to a registered campaign then needs no call trace.
- Keep `UserTransaction.fee` on the direct-call rule. For a relayed call, `tx.from` did not pay the fee.
- Send trace requests to RouteMesh only. The fallback client reports the error of the last public RPC, which hides the
  cause.
- Do not log the `message` of a viem error. It contains the RPC URL, and the URL contains the RouteMesh API key. Log
  `shortMessage`.

`FeeCollection.unattributed` is the cumulative collected fees minus the cumulative attributed fees of the swept ledger.
Expect zero for a contract ledger. A positive value means that a sweep collected fees that the indexer did not
attribute. A negative value means that attributed fees are not swept yet, or that the indexer overcounted.

## Effect Caches

Envio loads each `.envio/cache/<effect>.tsv` file into a new deployment, and the indexer does not call an effect for a
cached input.

- `<SYMBOL>_USD.tsv`: `@sablier/price-data` owns these files. Update them with `just envio::prices-sync` only.
- `nativeValueReceived.tsv`: the call-trace results, zero values included. `minFeeWei.tsv` appears only when the
  fallback ran.
- Do not commit a forex cache. The rate of a recent date can change.

To refresh the fee caches, run `just cache-backfill` in `envio/analytics`, then commit the fee cache files.

- The recipe backfills locally, restarts the indexer after a crash, and dumps the caches when all chains are synced.
- The recipe also restarts the indexer after 45 minutes without a new event. Rate-limited HyperSync queries can stop the
  progress while the process stays alive.
- It continues from the stored progress. Run it again after an interruption. Use `just envio dev tui_off -r` first only
  when you need a clean database.
- The local `ENVIO_API_TOKEN` quota controls the speed. With the free package, a full backfill takes several days.
- The log is `.logs/analytics-cache-backfill.log`.

If you change the trace parsers or the input of a cached effect, delete its cache file and refresh it. A stale row gives
a wrong fee and no error.
