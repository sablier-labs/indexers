import "../node_modules/@sablier/devkit/just/settings.just"

# Fetch assets from The Graph subgraphs and save them to JSON files
[no-cd]
@check-vendors chain_id="1":
    just cli check-vendors --chain-id {{ chain_id }}

# Verify price data in cache matches node_modules version
[no-cd]
@prices-check:
    just cli prices-check

# Sync price data from @sablier/price-data to Envio cache
[no-cd]
@prices-sync:
    just cli prices-sync

# Deploy Envio indexer(s) by syncing current branch to deployment branches
[confirm("This will force-push to deployment branch(es). Continue? [y/N]")]
[no-cd]
@deploy indexer="all":
    just envio::_envio-for-each envio::_deploy {{ indexer }}

[no-cd]
[script("bash")]
_deploy indexer:
    set -euo pipefail
    deployment_indexer="{{ indexer }}"
    deployment_branch="deployment/$deployment_indexer"
    echo "Deploying to $deployment_branch..."
    git push --force origin HEAD:$deployment_branch
    echo "✅ Deployed to $deployment_branch"

# Open the Envio dashboard in the default browser
[no-cd]
[unix]
@open:
    open "https://envio.dev/app/sablier-labs"

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

# Helper to run three commands in parallel (airdrops, analytics, streams)
[no-cd]
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
            just envio::_concurrent-envio-indexers \
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
