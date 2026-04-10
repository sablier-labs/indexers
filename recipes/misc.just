# Query recoverable token deltas
[group("cli")]
[arg("protocol", long, short="i", help="Protocol contract to query (flow, lockup)")]
[arg("chain_id", long="chain-id", short="c", help="Chain ID to query")]
[arg("all_chains", long="all-chains", short="a", value="true", help="Run for all deployed chains")]
@recover-tokens protocol chain_id="1" all_chains="false" *args:
    just cli recover-tokens --protocol={{ protocol }} \
        {{ if all_chains == "true" { "--all-chains" } else { "--chain-id=" + chain_id } }} \
        {{ args }}
