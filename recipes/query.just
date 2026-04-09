import "../node_modules/@sablier/devkit/just/settings.just"

# Query quarterly average MAU (Envio analytics)
[no-cd]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@average-mau quarter="latest" *args:
    just cli query-average-mau --quarter={{ quarter }} {{ args }}

# Query actions (The Graph)
[arg("chain_id", long="chain-id", short="c", help="Chain ID to query")]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
[no-cd]
@actions chain_id quarter="latest" *args:
    just cli query-actions --chain-id={{ chain_id }} \
        --quarter={{ quarter }} \
        {{ args }}

# Query total USD fees (Envio analytics)
[no-cd]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@total-usd-fees quarter="latest" *args:
    just cli query-total-usd-fees --quarter={{ quarter }} {{ args }}

# Query unique transactions (Envio analytics)
[no-cd]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@unique-txs quarter="latest" *args:
    just cli query-unique-txs --quarter={{ quarter }} {{ args }}

# Query protocol assets (Envio catalog export)
[no-cd]
[arg("indexer", long, short="i", help="Public indexer to export asset addresses for (airdrops, streams)")]
@assets indexer *args:
    just cli query-assets --indexer={{ indexer }} {{ args }}
