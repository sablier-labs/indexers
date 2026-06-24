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

# Refresh EVM-derived effect caches from live-used addresses and RPC
[arg("indexer", pattern="^(airdrops|streams|all)$")]
@refresh-caches indexer="all" *args:
    just cli refresh-caches --indexer {{ indexer }} {{ args }}

# Verify token metadata effect cache files before deploying public Envio indexers
[arg("indexer", pattern="^(airdrops|streams|all)$")]
[group("checks")]
@cache-check indexer="all":
    just envio::_cache-check-for-each {{ indexer }}

# Run TypeScript type-checking for the Envio project
@type-check:
    na tsc --noEmit -p envio/airdrops/tsconfig.json
    na tsc --noEmit -p envio/analytics/tsconfig.json
    na tsc --noEmit -p envio/streams/tsconfig.json

alias tc := type-check

# Deploy Envio indexer(s) by syncing current branch to deployment branches
[confirm("This will force-push to deployment branch(es). Continue? [y/N]")]
@deploy indexer="all":
    just envio::_deploy-for-each {{ indexer }}

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
    tmpdir=$(mktemp -d "${TMPDIR:-/tmp}/envio-deploy.XXXXXX")
    worktree="$tmpdir/worktree"
    cleanup() {
        git worktree remove --force "$worktree" >/dev/null 2>&1 || true
        rm -rf "$tmpdir"
    }
    trap cleanup EXIT

    git worktree add --detach "$worktree" HEAD
    cd "$worktree"

    case "$deployment_indexer" in
        airdrops | streams)
            cache_source="envio/$deployment_indexer/.envio/cache"
            cache_file="$cache_source/tokenMetadata.tsv"

            if [ ! -s "$cache_file" ]; then
                echo "❌ $cache_file is missing or empty" >&2
                exit 1
            fi

            # Envio restores effect caches from .envio/cache relative to its process cwd.
            # Hosted can perform that restore from repo root, while local/package starts cd into envio/<indexer>.
            # Commit a root cache copy on deployment branches so token metadata is visible in both cwd layouts.
            rm -rf .envio/cache
            mkdir -p .envio
            cp -R "$cache_source" .envio/cache
            git add -A .envio/cache
            ;;
    esac

    timestamp=$(date -u '+%Y-%m-%dT%H:%M:%SZ')
    git commit --allow-empty -m "chore(envio): prepare $deployment_indexer deployment $timestamp"

    echo "Deploying to $deployment_branch..."
    git push --force origin HEAD:"$deployment_branch"
    echo "✅ Deployed to $deployment_branch"

# Open the Envio dashboard in the default browser
[unix]
@open:
    open "https://envio.dev/app/sablier-labs"

# ---------------------------------------------------------------------------- #
#                                 PRIVATE UTILS                                #
# ---------------------------------------------------------------------------- #

[arg("indexer", pattern="^(airdrops|analytics|streams|all)$")]
[script("bash")]
_deploy-for-each indexer:
    set -euo pipefail
    case "{{ indexer }}" in
        all)
            just envio::_deploy airdrops
            just envio::_deploy analytics
            just envio::_deploy streams
            ;;
        airdrops | analytics | streams)
            just envio::_deploy {{ indexer }}
            ;;
        *)
            echo "❌ Invalid indexer: '{{ indexer }}'. Must be one of: airdrops, streams, analytics, all" >&2
            exit 1
            ;;
    esac

[arg("indexer", pattern="^(airdrops|streams|all)$")]
[script("bash")]
_cache-check-for-each indexer:
    set -euo pipefail
    case "{{ indexer }}" in
        all)
            just envio::_cache-check-one airdrops
            just envio::_cache-check-one streams
            ;;
        airdrops | streams)
            just envio::_cache-check-one {{ indexer }}
            ;;
        *)
            echo "❌ Invalid indexer: '{{ indexer }}'. Must be one of: airdrops, streams, all" >&2
            exit 1
            ;;
    esac

[arg("indexer", pattern="^(airdrops|streams)$")]
[script("bash")]
_cache-check-one indexer:
    set -euo pipefail
    indexer="{{ indexer }}"
    cache_path="envio/$indexer/.envio/cache/tokenMetadata.tsv"

    if ! git ls-files --error-unmatch "$cache_path" >/dev/null 2>&1; then
        echo "❌ $cache_path is not tracked" >&2
        exit 1
    fi

    if [ ! -s "$cache_path" ]; then
        echo "❌ $cache_path is missing or empty" >&2
        exit 1
    fi

    IFS= read -r header < "$cache_path"
    if [ "$header" != $'id\toutput' ]; then
        echo "❌ $cache_path has invalid header" >&2
        exit 1
    fi

    if ! (cd "envio/$indexer" && test -s ".envio/cache/tokenMetadata.tsv"); then
        echo "❌ $indexer cache is not visible from the indexer cwd" >&2
        exit 1
    fi

    line_count=$(wc -l < "$cache_path" | tr -d ' ')
    echo "✅ $cache_path ($line_count lines)"

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
