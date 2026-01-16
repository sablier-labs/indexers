# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# Import modular justfiles, which share the parent's settings, variables, and shell
# See https://just.systems/man/en/imports.html
import "./recipes/envio.just"
import "./recipes/graph.just"
import "./recipes/print.just"
import "./recipes/typegen.just"
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

GLOBS_CLEAN := "**/{.logs,bindings,build,generated}"
GLOBS_CLEAN_IGNORE := "!graph/common/bindings"

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Default: show all recipes
default:
    just --list

# Build the npm package
@build:
    just --quiet export-schema
    nlx del-cli _cjs _esm _types
    echo "🗑️  Cleaned build files"
    echo ""
    echo "🔨 Building all packages..."
    just tsc-build
    echo ""
    echo "✅ All packages built successfully"
alias b := build
alias build-package := build

# Build with TypeScript CLI (parallel cjs/esm/types)
@tsc-build:
    nlx concurrently --group \
        -n "cjs,esm,types" \
        -c "blue,green,yellow" \
        "just tsc-build-cjs" \
        "just tsc-build-esm" \
        "just tsc-build-types"
    mkdir -p _cjs _esm
    printf '{"type":"commonjs"}' > _cjs/package.json
    printf '{"type":"module","sideEffects":false}' > _esm/package.json

@tsc-build-cjs:
    echo ""
    echo "📦 Building CJS package..."
    pnpm tsc -p configs/tsconfig.cjs.json
    echo "✅ Built CJS package"

@tsc-build-esm:
    echo ""
    echo "📦 Building ESM package..."
    pnpm tsc -p configs/tsconfig.esm.json
    echo "✅ Built ESM package"

@tsc-build-types:
    echo ""
    echo "📦 Building types..."
    pnpm tsc -p configs/tsconfig.types.json
    echo "✅ Built types"

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
[group("codegen"), group("envio"), group("graph")]
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

test-vendors:
    TEST_VENDORS=true \
        pnpm vitest run --hideSkippedTests
