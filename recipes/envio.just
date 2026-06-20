import "../node_modules/@sablier/devkit/just/settings.just"

set no-cd

# Fetch assets from The Graph subgraphs and save them to JSON files
@check-vendors chain_id="1":
    just cli check-vendors --chain-id {{ chain_id }}

# Verify price data in cache matches node_modules version
@prices-check:
    just cli prices-check

# Sync price data from @sablier/price-data to Envio cache
@prices-sync:
    just cli prices-sync

# Run TypeScript type-checking for the Envio project
@type-check:
    na tsc --noEmit -p envio/airdrops/tsconfig.json
    na tsc --noEmit -p envio/analytics/tsconfig.json
    na tsc --noEmit -p envio/streams/tsconfig.json

alias tc := type-check

# Deploy Envio indexer(s) by syncing current branch to deployment branches
[confirm("This will force-push to deployment branch(es). Continue? [y/N]")]
@deploy indexer="all":
    just envio::_envio-for-each envio::_deploy {{ indexer }}

[script("bash")]
_deploy indexer:
    set -euo pipefail
    case "{{ indexer }}" in
        airdrops | analytics | streams) ;;
        *)
            echo "❌ Invalid indexer: '{{ indexer }}'. Must be one of: airdrops, streams, analytics" >&2
            exit 1
            ;;
    esac
    deployment_indexer="{{ indexer }}"
    deployment_branch="deployment/$deployment_indexer"
    echo "Deploying to $deployment_branch..."
    git push --force origin HEAD:$deployment_branch
    echo "✅ Deployed to $deployment_branch"

# Open the Envio dashboard in the default browser
[unix]
@open:
    open "https://envio.dev/app/sablier-labs"

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
