# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

set dotenv-load

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Ni: https://github.com/antfu-collective/ni
na := require("na")
ni := require("ni")
nlx := require("nlx")

# Pnpm: https://github.com/pnpm/pnpm
pnpm := require("pnpm")

# ---------------------------------------------------------------------------- #
#                               ENVIRONMENT VARS                               #
# ---------------------------------------------------------------------------- #

export LOG_LEVEL := env("LOG_LEVEL", "info")

# ---------------------------------------------------------------------------- #
#                                   CONSTANTS                                  #
# ---------------------------------------------------------------------------- #

GLOBS_CLEAN := "**/{.logs,bindings,build,generated}"
GLOBS_CLEAN_IGNORE := "!graph/common/bindings"

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Show available commands
default: full-check

# Build the npm package
@build:
    just export-schema
    just codegen-gql
    pnpm tsc -p tsconfig.build.json
alias b := build
alias build-package := build

# Fetch assets from The Graph subgraphs and save them to JSON files
[group("cli")]
[group("envio")]
@check-vendors chain_id="1":
    just cli check-vendors --chain-id {{ chain_id }}

# Remove build files
clean globs=GLOBS_CLEAN:
    pnpm dlx del-cli "{{ globs }}" "{{ GLOBS_CLEAN_IGNORE }}"

# Codegen all indexers
[group("codegen")]
@codegen:
    just concurrent-vendors "just codegen-envio" "just codegen-graph"
alias codegen-indexers := codegen

# Export the schemas to the ./src directory
# lint-staged will call this recipe and pass the globs to it
[group("cli")]
@export-schema +globs="src/schemas/*.graphql":
    just cli export-schema
    just --quiet biome-write "{{ globs }}"

# Codegen the GraphQL schema
[group("codegen")]
[group("envio")]
[group("graph")]
@codegen-schema vendor="all" indexer="all":
    just cli codegen schema \
        --vendor {{ vendor }} \
        --indexer {{ indexer }}
    just --quiet biome-write "envio/**/*.graphql"

# Open the Envio dashboard in the default browser
[group("envio")]
@open-envio:
    open "https://envio.dev/app/sablier-labs"

# Run tests
[group("test")]
test args="--silent":
    pnpm vitest run --hideSkippedTests {{ args }}
alias t := test

# Run vendor tests
[group("test")]
test-vendors:
    TEST_VENDORS=true pnpm vitest run --hideSkippedTests

# ---------------------------------------------------------------------------- #
#                                SCRIPTS: ENVIO                                #
# ---------------------------------------------------------------------------- #

# Codegen everything for the Envio indexer (order matters):
# 1. GraphQL schema
# 2. Envio config YAML
[doc("Codegen everything for the Envio indexer")]
[group("codegen")]
[group("envio")]
@codegen-envio indexer="all":
    just envio-for-each _codegen-envio {{ indexer }}

@_codegen-envio indexer:
    just codegen-schema envio {{ indexer }}
    just codegen-envio-config {{ indexer }}
    just codegen-envio-bindings {{ indexer }}

# Codegen the Envio bindings
[group("codegen")]
[group("envio")]
@codegen-envio-bindings indexer="all":
    just envio-for-each _codegen-envio-bindings {{ indexer }}

[script]
_codegen-envio-bindings indexer:
    indexer_dir="envio/{{ indexer }}"
    pnpm envio codegen \
        --config $indexer_dir/config.yaml \
        --output-directory $indexer_dir/bindings
    echo "✅ Generated Envio bindings"

# Codegen the Envio config YAML
[group("codegen")]
[group("envio")]
@codegen-envio-config indexer="all":
    just cli codegen envio-config --indexer {{ indexer }}

# Verify price data in cache matches node_modules version
[group("checks")]
[group("cli")]
[group("envio")]
@prices-check:
    just cli prices-check

# Sync price data from @sablier/price-data to Envio cache
[group("cli")]
[group("envio")]
@prices-sync:
    just cli prices-sync

# Deploy Envio indexer(s) by syncing current branch to deployment branches
[confirm("This will force-push to deployment branch(es). Continue?")]
[group("envio")]
@deploy-envio indexer="all":
    just envio-for-each _deploy-envio {{ indexer }}
alias de := deploy-envio

[private]
[script("bash")]
_deploy-envio indexer:
    deployment_branch="deployment/{{ indexer }}"
    echo "Deploying to $deployment_branch..."
    git push --force origin HEAD:$deployment_branch
    echo "✅ Deployed to $deployment_branch"

# Deploy protocol Envio indexers (airdrops, flow, lockup)
[confirm("This will force-push to deployment branches. Continue?")]
[group("envio")]
@deploy-envio-protocols:
    just concurrent-protocol-indexers \
        "just _deploy-envio airdrops" \
        "just _deploy-envio flow" \
        "just _deploy-envio lockup"
alias dep := deploy-envio-protocols


# ---------------------------------------------------------------------------- #
#                                SCRIPTS: GRAPH                                #
# ---------------------------------------------------------------------------- #

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
[group("codegen")]
[group("graph")]
@codegen-graph indexer="all":
    just graph-for-each _codegen-graph {{ indexer }}

@_codegen-graph indexer:
    just codegen-schema graph {{ indexer }}
    just codegen-graph-manifest {{ indexer }} all
    just codegen-graph-bindings {{ indexer }}

# Codegen the Graph subgraph bindings
[group("codegen")]
[group("graph")]
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
[group("codegen")]
[group("graph")]
@codegen-graph-manifest indexer="all" chain="all":
    just cli codegen graph-manifest \
        --indexer {{ indexer }} \
        --chain {{ chain }}

# ---------------------------------------------------------------------------- #
#                                 SCRIPTS: GQL                                 #
# ---------------------------------------------------------------------------- #


# Codegen all GraphQL types and queries
[group("codegen")]
[group("gql")]
@codegen-gql:
    just concurrent-vendors "just codegen-gql-envio" "just codegen-gql-graph"

# Codegen GraphQL types and queries for Envio indexers
[group("codegen")]
[group("gql")]
[group("envio")]
codegen-gql-envio:
    just concurrent-protocol-indexers \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/airdrops/envio.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/flow/envio.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/lockup/envio.ts"

# Codegen GraphQL types and queries for Graph indexers
[group("codegen")]
[group("gql")]
[group("graph")]
codegen-gql-graph:
    just concurrent-protocol-indexers \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/airdrops/graph.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/flow/graph.ts" \
        "pnpm graphql-codegen --config ./cli/commands/codegen/gql-config/lockup/graph.ts"

# ---------------------------------------------------------------------------- #
#                                SCRIPTS: PRINT                                #
# ---------------------------------------------------------------------------- #

# Print available chain arguments
[group("cli")]
@print-chains use_graph_slugs="false":
    just cli print chains --graph {{ use_graph_slugs }}

# Print available log levels available in Winston logger
[group("cli")]
@print-log-levels:
    echo "Available log levels: error, warn, info, http, verbose, debug, silly"

# Print available indexer arguments
[group("cli")]
@print-protocols:
    echo "Available indexer arguments: all, flow, lockup, airdrops"

# ---------------------------------------------------------------------------- #
#                               INTERNAL HELPERS                               #
# ---------------------------------------------------------------------------- #

# Helper to run CLI commands through the main entry point
[private]
@cli *args:
    pnpm tsx cli/index.ts {{ args }}

# Helper to run four commands in parallel (airdrops, analytics, flow, lockup)
[private]
@concurrent-envio-indexers cmd1 cmd2 cmd3 cmd4:
    pnpm concurrently --group \
        -n "airdrops,analytics,flow,lockup" \
        -c "blue,cyan,green,yellow" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}" \
        "{{ cmd3 }}" \
        "{{ cmd4 }}"

# Helper to run three commands in parallel (airdrops, flow, lockup)
[private]
@concurrent-protocol-indexers cmd1 cmd2 cmd3:
    pnpm concurrently --group \
        -n "airdrops,flow,lockup" \
        -c "blue,green,yellow" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}" \
        "{{ cmd3 }}"

# Helper to run two commands in parallel (envio & graph)
[private]
@concurrent-vendors cmd1 cmd2:
    pnpm concurrently --group \
        -n "envio,graph" \
        -c "cyan,magenta" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}"

# Helper to run a recipe for all protocols or a specific one
[private]
[script("bash")]
envio-for-each recipe indexer:
    if [ "{{ indexer }}" = "all" ]; then
        just concurrent-envio-indexers \
            "just {{ recipe }} airdrops" \
            "just {{ recipe }} analytics" \
            "just {{ recipe }} flow" \
            "just {{ recipe }} lockup"
    else
        just {{ recipe }} {{ indexer }}
    fi

# Helper to run a recipe for all protocols or a specific one
[private]
[script("bash")]
graph-for-each recipe indexer:
    if [ "{{ indexer }}" = "all" ]; then
        just concurrent-protocol-indexers \
            "just {{ recipe }} airdrops" \
            "just {{ recipe }} flow" \
            "just {{ recipe }} lockup"
    else
        just {{ recipe }} {{ indexer }}
    fi
