import "../node_modules/@sablier/devkit/just/settings.just"

# Build all Graph indexers
[group("graph")]
[no-cd]
@build indexer="all":
    just _graph-for-each graph::_build {{ indexer }}

[no-cd]
[script("bash")]
_build indexer:
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

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run a Graph recipe for all indexers or a specific one
[no-cd]
[script("bash")]
_graph-for-each recipe indexer:
    case "{{ indexer }}" in
        all)
            just _concurrent-indexers \
                "just {{ recipe }} airdrops" \
                "just {{ recipe }} streams"
            ;;
        *)
            just {{ recipe }} {{ indexer }}
            ;;
    esac
