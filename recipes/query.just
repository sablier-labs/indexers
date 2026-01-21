# Query quarterly average MAU (Envio analytics)
[group("cli")]
@query-average-mau *args:
    just cli query-average-mau {{ args }}

# Query actions (Envio analytics)
[group("cli")]
@query-actions *args:
    just cli query-actions {{ args }}

# Query total USD fees (Envio analytics)
[group("cli")]
@query-total-usd-fees *args:
    just cli query-total-usd-fees {{ args }}

# Query unique transactions (Envio analytics)
[group("cli")]
@query-unique-txs *args:
    just cli query-unique-txs {{ args }}
