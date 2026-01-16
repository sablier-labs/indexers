# Build all Graph indexers
[group("graph")]
@build-graph-indexer indexer="all":
    just graph-for-each _build-graph-indexer {{ indexer }}

[script("bash")]
_build-graph-indexer indexer: (codegen-graph indexer)
    manifest_path=graph/{{ indexer }}/manifests/mainnet.yaml
    pnpm graph build \
        $manifest_path \
        --output-dir graph/{{ indexer }}/build
    echo "✅ Built Graph indexer"

# Codegen everything for the Graph indexer (order matters):
# 1. GraphQL schema
# 2. YAML manifest
# 3. AssemblyScript bindings
[doc("Codegen everything for the Graph indexer")]
[group("codegen"), group("graph")]
@codegen-graph indexer="all":
    just graph-for-each _codegen-graph {{ indexer }}

@_codegen-graph indexer:
    just codegen-schema graph {{ indexer }}
    just codegen-graph-manifest {{ indexer }} all
    just codegen-graph-bindings {{ indexer }}

# Codegen the Graph subgraph bindings
[group("codegen"), group("graph")]
@codegen-graph-bindings indexer="all":
    just graph-for-each _codegen-graph-bindings {{ indexer }}

[script("bash")]
_codegen-graph-bindings indexer:
    protocol_dir="graph/{{ indexer }}"
    bindings_dir=$protocol_dir/bindings
    pnpm dlx del-cli $bindings_dir
    pnpm graph codegen \
        --output-dir $bindings_dir \
        $protocol_dir/manifests/sepolia.yaml
    echo "✅ Generated Graph bindings"

# Codegen the Graph subgraph manifest
[group("codegen"), group("graph")]
@codegen-graph-manifest indexer="all" chain="all":
    just cli codegen graph-manifest \
        --indexer {{ indexer }} \
        --chain {{ chain }}

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run a graph recipe for all protocols or a specific one
[private, script("bash")]
graph-for-each recipe indexer:
    if [ "{{ indexer }}" = "all" ]; then
        just concurrent-protocol-indexers \
            "just {{ recipe }} airdrops" \
            "just {{ recipe }} flow" \
            "just {{ recipe }} lockup"
    else
        just {{ recipe }} {{ indexer }}
    fi
