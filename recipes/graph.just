import "../node_modules/@sablier/devkit/just/settings.just"

# Build all Graph indexers
[no-cd]
@build-all:
    just _concurrent-indexers \
        "just graph::build airdrops" \
        "just graph::build streams"

[no-cd]
[script("bash")]
build indexer:
    just codegen::graph {{ indexer }}
    indexer_dir="graph/{{ indexer }}"
    pnpm --dir "{{ justfile_dir() }}" exec graph build \
        "$indexer_dir/manifests/mainnet.yaml" \
        --output-dir "$indexer_dir/build"
    echo "✅ Built Graph indexer"

# Ping all Graph endpoints to wake up dormant subgraphs
[group("graph")]
[no-cd]
@revive *args:
    just cli revive-graphs {{ args }}
