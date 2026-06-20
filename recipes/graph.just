import "../node_modules/@sablier/devkit/just/settings.just"

set no-cd

# Build all Graph indexers
@build-all:
    just _concurrent-indexers \
        "just graph::build airdrops" \
        "just graph::build streams"

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
@revive *args:
    just cli revive-graphs {{ args }}
