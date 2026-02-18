# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# Import modular justfiles, which share the parent's settings, variables, and shell
# See https://just.systems/man/en/imports.html
import "./recipes/envio.just"
import "./recipes/graph.just"
import "./recipes/print.just"
import "./recipes/query.just"
import "./recipes/utils.just"

# Load env vars from .env file
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

GLOBS_CLEAN := "**/{.logs,bindings,build,dist,generated}"
GLOBS_CLEAN_IGNORE := "!graph/common/bindings"

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Default: show all recipes
default:
    just --list

# Run all code checks
[group("checks")]
@full-check:
    just _run-with-status biome-check
    just _run-with-status prettier-check
    just _run-with-status type-check
    just _run-with-status depcruise-check
    echo ""
    echo '{{ GREEN }}All code checks passed!{{ NORMAL }}'

# Clean build artifacts
@clean globs=GLOBS_CLEAN:
    echo "🧹 Deleting files:"
    nlx del-cli --verbose \
        "{{ globs }}" \
        "{{ GLOBS_CLEAN_IGNORE }}"

# Codegen all indexers
[group("codegen")]
@codegen:
    just concurrent-vendors \
        "just codegen-envio" \
        "just codegen-graph"
alias codegen-indexers := codegen

# Codegen the GraphQL schema
[group("codegen"), group("envio"), group("graph")]
@codegen-schema vendor="all" indexer="all":
    just cli codegen schema \
        --vendor {{ vendor }} \
        --indexer {{ indexer }}
    just --quiet biome-write "envio/**/*.graphql"

# Export the schemas to the ./src directory
# lint-staged will call this recipe and pass the globs to it
[group("cli")]
@export-schema +globs="src/schemas/*.graphql":
    just cli export-schema
    just --quiet biome-write "{{ globs }}"

# Run tests
[group("test")]
@test *args="--hideSkippedTests --silent":
    pnpm vitest run {{ args }}
alias t := test

# Run the vendor tests
[group("test")]
@test-vendors *args="--hideSkippedTests":
    TEST_VENDORS=true \
        pnpm vitest run {{ args }}
alias tv := test-vendors

# ---------------------------------------------------------------------------- #
#                                     BUILD                                    #
# ---------------------------------------------------------------------------- #

# Run the complete build pipeline
#   1. Export GraphQL schemas
#   2. Clean the dist directory
#   3. Build all packages (CJS, ESM, types)
[group("build")]
@build:
    just --quiet export-schema

    nlx del-cli dist
    echo "🗑️  Cleaned build files"
    echo ""

    echo "🔨 Building all packages..."
    just tsc-build
    echo ""
    echo "✅ All packages built successfully"
alias b := build
alias build-package := build

# Build all packages in parallel
[group("build")]
@tsc-build:
    nlx concurrently --group \
        -n "cjs,esm,types" \
        -c "blue,green,yellow" \
        "just tsc-build-cjs" \
        "just tsc-build-esm" \
        "just tsc-build-types"
    mkdir -p dist/cjs dist/esm
    printf '{"type":"commonjs"}' > dist/cjs/package.json
    printf '{"type":"module","sideEffects":false}' > dist/esm/package.json

# Build the CJS package
[group("build")]
@tsc-build-cjs:
    echo ""
    echo "📦 Building CJS package..."
    pnpm tsc -p configs/tsconfig.cjs.json
    echo "✅ Built CJS package"

# Build the ESM package
[group("build")]
@tsc-build-esm:
    echo ""
    echo "📦 Building ESM package..."
    pnpm tsc -p configs/tsconfig.esm.json
    echo "✅ Built ESM package"

# Build the types package
[group("build")]
@tsc-build-types:
    echo ""
    echo "📦 Building types..."
    pnpm tsc -p configs/tsconfig.types.json
    echo "✅ Built types"
