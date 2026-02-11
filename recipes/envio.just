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
    pnpm envio codegen \
        --directory $indexer_dir \
        --config config.yaml \
        --output-directory bindings

    # Verify the critical files were generated
    if [ ! -f "$indexer_dir/bindings/src/Types.gen.ts" ]; then
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

# Deploy protocol Envio indexers (airdrops, flow, lockup)
[confirm("This will force-push to deployment branch(es). Continue? [y/N]"), group("envio")]
@deploy-envio-protocols:
    just concurrent-protocol-indexers \
        "just _deploy-envio airdrops" \
        "just _deploy-envio flow" \
        "just _deploy-envio lockup"
alias dep := deploy-envio-protocols

# Open the Envio dashboard in the default browser
[group("envio"), unix]
@open-envio:
    open "https://envio.dev/app/sablier-labs"

# Run envio dev for an indexer
[group("envio")]
@envio-dev indexer tui_mode="tui_on":
    just _envio-run {{ indexer }} dev {{ tui_mode }}

# Start an envio indexer
[group("envio")]
@envio-start indexer tui_mode="tui_on":
    just _envio-run {{ indexer }} start {{ tui_mode }}

# Stop envio indexer(s)
[group("envio")]
@envio-stop indexer="all":
    just envio-for-each _stop-envio {{ indexer }}

[private]
@_stop-envio indexer:
    just _envio-run {{ indexer }} stop

[private, script("bash")]
_envio-run indexer command tui_mode="tui_on" *args:
    set -a
    if [ "{{ tui_mode }}" = "tui_off" ]; then
        TUI_OFF=true
    fi
    pnpm envio {{ command }} {{ args }} \
        --directory envio/{{ indexer }} \
        --config config.yaml \
        --output-directory bindings

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run five commands in parallel (airdrops, analytics, billing, flow, lockup)
[private]
@concurrent-envio-indexers cmd1 cmd2 cmd3 cmd4 cmd5:
    pnpm concurrently --group \
        -n "airdrops,analytics,billing,flow,lockup" \
        -c "blue,cyan,magenta,green,yellow" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}" \
        "{{ cmd3 }}" \
        "{{ cmd4 }}" \
        "{{ cmd5 }}"

# Helper to run an envio recipe for all protocols or a specific one
[private, script("bash")]
envio-for-each recipe indexer:
    if [ "{{ indexer }}" = "all" ]; then
        just concurrent-envio-indexers \
            "just {{ recipe }} airdrops" \
            "just {{ recipe }} analytics" \
            "just {{ recipe }} billing" \
            "just {{ recipe }} flow" \
            "just {{ recipe }} lockup"
    else
        just {{ recipe }} {{ indexer }}
    fi
