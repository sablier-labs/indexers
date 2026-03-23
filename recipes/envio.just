# Fetch assets from The Graph subgraphs and save them to JSON files
[group("cli"), group("envio")]
@check-vendors chain_id="1":
    just cli check-vendors --chain-id {{ chain_id }}

# Codegen everything for the Envio indexer (order matters):
# 1. GraphQL schema
# 2. Envio config YAML
# 3. Envio bindings
[doc("Codegen everything for the Envio indexer")]
[group("codegen"), group("envio")]
@codegen-envio indexer="all":
    just envio-for-each _codegen-envio {{ indexer }}

@_codegen-envio indexer:
    just codegen-schema envio {{ indexer }}
    just codegen-envio-config {{ indexer }}
    just codegen-envio-bindings {{ indexer }}

# Codegen the Envio bindings
[group("codegen"), group("envio")]
@codegen-envio-bindings indexer="all":
    just envio-for-each _codegen-envio-bindings {{ indexer }}

[script]
_codegen-envio-bindings indexer:
    indexer_dir="envio/{{ indexer }}"
    generated_types_file="$indexer_dir/bindings/src/Types.gen.ts"
    pnpm envio codegen \
        --directory $indexer_dir \
        --config config.yaml \
        --output-directory bindings

    # Verify the critical files were generated
    if [ ! -f "$generated_types_file" ]; then
        echo "❌ Failed to generate Envio bindings for {{ indexer }}"
        exit 1
    fi
    echo "✅ Generated Envio bindings"

# Codegen the Envio config YAML
[group("codegen"), group("envio")]
@codegen-envio-config indexer="all":
    just cli codegen envio-config --indexer {{ indexer }}

# Verify price data in cache matches node_modules version
[group("checks"), group("cli"), group("envio")]
@prices-check:
    just cli prices-check

# Sync price data from @sablier/price-data to Envio cache
[group("cli"), group("envio")]
@prices-sync:
    just cli prices-sync

# Deploy Envio indexer(s) by syncing current branch to deployment branches
[confirm("This will force-push to deployment branch(es). Continue? [y/N]"), group("envio")]
@deploy-envio indexer="all":
    just envio-for-each _deploy-envio {{ indexer }}
alias de := deploy-envio

[private, script("bash")]
_deploy-envio indexer:
    deployment_branch="deployment/{{ indexer }}"
    echo "Deploying to $deployment_branch..."
    git push --force origin HEAD:$deployment_branch
    echo "✅ Deployed to $deployment_branch"

# Open the Envio dashboard in the default browser
[group("envio"), unix]
@open-envio:
    open "https://envio.dev/app/sablier-labs"

# Check envio/ import boundaries with dependency-cruiser
[group("checks"), group("envio")]
@depcruise-check:
    na depcruise envio/ --config .dependency-cruiser.mjs
alias dc := depcruise-check

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run five commands in parallel (airdrops, analytics, flow, lockup, streams)
[private]
@concurrent-envio-indexers cmd1 cmd2 cmd3 cmd4 cmd5:
    pnpm concurrently --group \
        -n "airdrops,analytics,flow,lockup,streams" \
        -c "blue,cyan,green,yellow,magenta" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}" \
        "{{ cmd3 }}" \
        "{{ cmd4 }}" \
        "{{ cmd5 }}"

# Helper to run an envio recipe for all protocols or a specific one
[private, script("bash")]
envio-for-each recipe indexer:
    case "{{ indexer }}" in
        all)
            just concurrent-envio-indexers \
                "just {{ recipe }} airdrops" \
                "just {{ recipe }} analytics" \
                "just {{ recipe }} flow" \
                "just {{ recipe }} lockup" \
                "just {{ recipe }} streams"
            ;;
        protocols)
            just concurrent-protocol-indexers \
                "just {{ recipe }} airdrops" \
                "just {{ recipe }} flow" \
                "just {{ recipe }} lockup" \
                "just {{ recipe }} streams"
            ;;
        *)
            just {{ recipe }} {{ indexer }}
            ;;
    esac
