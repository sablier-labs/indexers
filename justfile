# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# Import modular justfiles
import "./just/helpers.just"
import "./just/envio.just"
import "./just/graph.just"
import "./just/gql.just"

set dotenv-load

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

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

# Run tests
[group("test")]
@test *args="--silent":
    pnpm vitest run --hideSkippedTests {{ args }}
alias t := test

# Run vendor tests
[group("test")]
@test-vendors:
    TEST_VENDORS=true pnpm vitest run --hideSkippedTests

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
