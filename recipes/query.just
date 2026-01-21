# Query quarterly average MAU (Envio analytics)
[group("cli")]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@query-average-mau quarter="latest" *args:
    just cli query-average-mau --quarter={{ quarter }} {{ args }}

# Query actions (The Graph)
[group("cli")]
[arg("chain_id", long="chain-id", short="c", help="Chain ID to query")]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@query-actions chain_id quarter="latest" *args:
    just cli query-actions --chain-id={{ chain_id }} \
        --quarter={{ quarter }} \
        {{ args }}

# Query total USD fees (Envio analytics)
[group("cli")]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@query-total-usd-fees quarter="latest" *args:
    just cli query-total-usd-fees --quarter={{ quarter }} {{ args }}

# Query unique transactions (Envio analytics)
[group("cli")]
[arg("quarter", long, short="q", help="Quarter to query in YYYY-q1 format")]
@query-unique-txs quarter="latest" *args:
    just cli query-unique-txs --quarter={{ quarter }} {{ args }}
