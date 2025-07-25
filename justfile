# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

set dotenv-load := true

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

# Build the entire package
build: export-schema codegen-gql
    pnpm tsc -p tsconfig.build.json
alias b := build

# Fetch assets from The Graph subgraphs and save them to JSON files
[group("envio")]
@check-vendors chain_id="1":
    just cli check-vendors --chain-id {{ chain_id }}

# Remove build files
clean globs=GLOBS_CLEAN:
    pnpm dlx del-cli "{{ globs }}" "{{ GLOBS_CLEAN_IGNORE }}"

# Codegen everything
[group("codegen")]
@codegen:
    just codegen-indexers
    echo ""
    just codegen-gql

# Codegen all indexers
[group("codegen")]
@codegen-indexers:
    just codegen-envio
    echo ""
    just codegen-graph

# Export the schemas to the ./src directory
# lint-staged will call this recipe and pass the globs to it
export-schema +globs="src/schemas/*.graphql":
    just cli export-schema
    just biome-write "{{ globs }}"

# Fetch assets from The Graph subgraphs and save them to JSON files
[group("envio")]
@fetch-assets protocol="all" chain="all":
    just cli fetch-assets \
        --protocol {{ protocol }} \
        --chain {{ chain }}
# Codegen the GraphQL schema
[group("codegen")]
[group("envio")]
[group("graph")]
@codegen-schema vendor="all" protocol="all":
    just cli codegen schema \
        --vendor {{ vendor }} \
        --protocol {{ protocol }}
    just biome-write "envio/**/*.graphql"

# Setup Husky - you should run this the first time you clone the repo
setup:
    pnpm husky

# Run tests
test args="--silent":
    pnpm vitest run {{ args }}
alias t := test

# Run cron tests
test-cron:
    CRON_TESTS=true pnpm vitest run

# ---------------------------------------------------------------------------- #
#                                RECIPES: ENVIO                                #
# ---------------------------------------------------------------------------- #

# Codegen everything for the Envio indexer (order matters):
# 1. GraphQL schema
# 2. Envio config YAML
[doc("Codegen everything for the Envio indexer")]
[group("codegen")]
[group("envio")]
@codegen-envio protocol="all":
    just for-each _codegen-envio {{ protocol }}

@_codegen-envio protocol:
    just codegen-schema envio {{ protocol }}
    just codegen-envio-config {{ protocol }}
    just codegen-envio-bindings {{ protocol }}

# Codegen the Envio bindings
[group("codegen")]
[group("envio")]
@codegen-envio-bindings protocol="all":
    just for-each _codegen-envio-bindings {{ protocol }}

_codegen-envio-bindings protocol:
    #!/usr/bin/env sh
    protocol_dir="envio/{{ protocol }}"
    pnpm envio codegen \
        --config $protocol_dir/config.yaml \
        --output-directory $protocol_dir/bindings
    echo "✅ Generated Envio bindings"

# Codegen the Envio config YAML
[group("codegen")]
[group("envio")]
@codegen-envio-config protocol="all":
    just cli codegen envio-config --protocol {{ protocol }}

# ---------------------------------------------------------------------------- #
#                                RECIPES: GRAPH                                #
# ---------------------------------------------------------------------------- #

# Build all Graph indexers
[group("graph")]
@build-graph-indexer protocol="all":
    just for-each _build-graph-indexer {{ protocol }}

_build-graph-indexer protocol: (codegen-graph protocol)
    #!/usr/bin/env sh
    manifest_path=graph/{{ protocol }}/manifests/mainnet.yaml
    pnpm graph build \
        $manifest_path \
        --output-dir graph/{{ protocol }}/build
    echo "✅ Built Graph indexer"

# Codegen everything for the Graph indexer (order matters):
# 1. GraphQL schema
# 2. YAML manifest
# 3. AssemblyScript bindings
[doc("Codegen everything for the Graph indexer")]
[group("codegen")]
[group("graph")]
@codegen-graph protocol="all":
    just for-each _codegen-graph {{ protocol }}

@_codegen-graph protocol:
    just codegen-schema graph {{ protocol }}
    just codegen-graph-manifest {{ protocol }} all
    just codegen-graph-bindings {{ protocol }}

# Codegen the Graph subgraph bindings
[group("codegen")]
[group("graph")]
@codegen-graph-bindings protocol="all":
    just for-each _codegen-graph-bindings {{ protocol }}

_codegen-graph-bindings protocol:
    #!/usr/bin/env sh
    protocol_dir="graph/{{ protocol }}"
    bindings_dir=$protocol_dir/bindings
    pnpm dlx del-cli $bindings_dir
    pnpm graph codegen \
        --output-dir $bindings_dir \
        $protocol_dir/manifests/mainnet.yaml
    echo "✅ Generated Graph bindings"

# Codegen the Graph subgraph manifest
[group("codegen")]
[group("graph")]
@codegen-graph-manifest protocol="all" chain="all":
    just cli codegen graph-manifest \
        --protocol {{ protocol }} \
        --chain {{ chain }}

# ---------------------------------------------------------------------------- #
#                                 RECIPES: GQL                                 #
# ---------------------------------------------------------------------------- #


# Codegen all GraphQL types and queries
[group("codegen")]
[group("gql")]
@codegen-gql:
    just codegen-gql-envio
    just codegen-gql-graph

# Codegen GraphQL types and queries for Envio indexers
[group("codegen")]
[group("gql")]
[group("envio")]
codegen-gql-envio:
    pnpm graphql-codegen --config ./codegen/gql-config/airdrops/envio.ts
    pnpm graphql-codegen --config ./codegen/gql-config/flow/envio.ts
    pnpm graphql-codegen --config ./codegen/gql-config/lockup/envio.ts

# Codegen GraphQL types and queries for Graph indexers
[group("codegen")]
[group("gql")]
[group("graph")]
codegen-gql-graph:
    pnpm graphql-codegen --config ./codegen/gql-config/airdrops/graph.ts
    pnpm graphql-codegen --config ./codegen/gql-config/flow/graph.ts
    pnpm graphql-codegen --config ./codegen/gql-config/lockup/graph.ts

# ---------------------------------------------------------------------------- #
#                                RECIPES: PRINT                                #
# ---------------------------------------------------------------------------- #

# Print available chain arguments
[group("print")]
@print-chains use_graph_slugs="false":
    just cli print chains --graph {{ use_graph_slugs }}

# Print available log levels available in Winston logger
[group("print")]
@print-log-levels:
    echo "Available log levels: error, warn, info, http, verbose, debug, silly"

# Print available protocol arguments
[group("print")]
@print-protocols:
    echo "Available protocol arguments: all, flow, lockup, airdrops"

# ---------------------------------------------------------------------------- #
#                               INTERNAL HELPERS                               #
# ---------------------------------------------------------------------------- #

# Helper to run CLI commands through the main entry point
[private]
@cli *args:
    pnpm tsx cli/index.ts {{ args }}

# Helper to run a recipe for all protocols or a specific one
[private]
for-each recipe protocol:
    #!/usr/bin/env sh
    if [ "{{ protocol }}" = "all" ]; then
        just {{ recipe }} airdrops
        just {{ recipe }} flow
        just {{ recipe }} lockup
    else
        just {{ recipe }} {{ protocol }}
    fi
