import "../node_modules/@sablier/devkit/just/settings.just"

set no-cd

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Codegen all indexers
[group("envio")]
[group("graph")]
@all:
    just _concurrent-vendors \
        "just codegen::envio" \
        "just codegen::graph"

# Codegen the GraphQL schema
[group("envio")]
[group("graph")]
@schema vendor="all" indexer="all":
    just cli codegen schema \
        --vendor {{ vendor }} \
        --indexer {{ indexer }}
    just --quiet biome-write "envio/**/*.graphql"

# ---------------------------------------------------------------------------- #
#                                     ENVIO                                    #
# ---------------------------------------------------------------------------- #


# Codegen everything for the Envio indexer (order matters):
# 1. GraphQL schema
# 2. Envio config YAML
[doc("Codegen everything for the Envio indexer")]
[group("envio")]
@envio indexer="all":
    just codegen::_envio-for-each codegen::_codegen-envio {{ indexer }}

@_codegen-envio indexer:
    just codegen::schema envio {{ indexer }}
    just codegen::envio-config {{ indexer }}
    just codegen::envio-bindings {{ indexer }}

# Codegen the Envio bindings
[group("envio")]
@envio-bindings indexer="all":
    just codegen::_envio-for-each codegen::_codegen-envio-bindings {{ indexer }}

[script("bash")]
_codegen-envio-bindings indexer:
    indexer_dir="envio/{{ indexer }}"
    generated_types_file="$indexer_dir/.envio/types.d.ts"
    pnpm envio codegen \
        --directory "$indexer_dir" \
        --config config.yaml

    # Verify the critical files were generated
    if [ ! -f "$generated_types_file" ]; then
        echo "❌ Failed to generate Envio bindings for {{ indexer }}"
        exit 1
    fi
    echo "✅ Generated Envio bindings"

# Codegen the Envio config YAML
[group("envio")]
@envio-config indexer="all":
    just cli codegen envio-config --indexer {{ indexer }}


# ---------------------------------------------------------------------------- #
#                                     GRAPH                                    #
# ---------------------------------------------------------------------------- #

# Codegen everything for the Graph indexer (order matters):
# 1. GraphQL schema
# 2. YAML manifest
[doc("Codegen everything for the Graph indexer")]
[group("graph")]
@graph indexer="all":
    just codegen::_graph-for-each codegen::_codegen-graph {{ indexer }}

@_codegen-graph indexer:
    just codegen::schema graph {{ indexer }}
    just codegen::graph-manifest {{ indexer }} all
    just codegen::graph-bindings {{ indexer }}

# Codegen the Graph subgraph bindings
[group("graph")]
@graph-bindings indexer="all":
    just codegen::_graph-for-each codegen::_codegen-graph-bindings {{ indexer }}

[script("bash")]
_codegen-graph-bindings indexer:
    indexer_dir="graph/{{ indexer }}"
    bindings_dir="$indexer_dir/bindings"
    pnpm dlx del-cli "$bindings_dir"
    pnpm --dir "{{ justfile_dir() }}" exec graph codegen \
        --output-dir "$bindings_dir" \
        "$indexer_dir/manifests/sepolia.yaml"
    echo "✅ Generated Graph bindings"

# Codegen the Graph subgraph manifest
[group("graph")]
@graph-manifest indexer="all" chain="all":
    just cli codegen graph-manifest \
        --indexer {{ indexer }} \
        --chain {{ chain }}

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run three commands in parallel (airdrops, analytics, streams)
@_concurrent-envio-indexers cmd1 cmd2 cmd3:
    pnpm concurrently --group \
        -n "airdrops,analytics,streams" \
        -c "blue,cyan,green" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}" \
        "{{ cmd3 }}"

# Helper to run an Envio recipe for all indexers or a specific one
[script("bash")]
_envio-for-each recipe indexer:
    case "{{ indexer }}" in
        all)
            just codegen::_concurrent-envio-indexers \
                "just {{ recipe }} airdrops" \
                "just {{ recipe }} analytics" \
                "just {{ recipe }} streams"
            ;;
        protocols)
            just _concurrent-indexers \
                "just {{ recipe }} airdrops" \
                "just {{ recipe }} streams"
            ;;
        *)
            just {{ recipe }} {{ indexer }}
            ;;
    esac

# Helper to run a Graph recipe for all indexers or a specific one
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
