# Query recoverable token deltas
[group("cli")]
[arg("indexer", long, short="i", help="Protocol contract to query (flow, lockup)")]
[arg("chain_id", long="chain-id", short="c", help="Chain ID to query")]
@recover-tokens indexer chain_id="1" *args:
    just cli recover-tokens --indexer={{ indexer }} \
        --chain-id={{ chain_id }} \
        {{ args }}
