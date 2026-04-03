# Query recoverable token deltas
[group("cli")]
[arg("protocol", long, short="i", help="Protocol contract to query (flow, lockup)")]
[arg("chain_id", long="chain-id", short="c", help="Chain ID to query")]
@recover-tokens protocol chain_id="1" *args:
    just cli recover-tokens --protocol={{ protocol }} \
        --chain-id={{ chain_id }} \
        {{ args }}
