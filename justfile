# See https://github.com/sablier-labs/devkit/blob/main/just/base.just
import "./node_modules/@sablier/devkit/just/base.just"

# Modules, use like this: just codegen::<recipe>
mod build "recipes/build.just"
mod codegen "recipes/codegen.just"
mod envio "recipes/envio.just"
mod graph "recipes/graph.just"
mod query "recipes/query.just"

import "./recipes/misc.just"
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
    echo ""
    echo '{{ GREEN }}All code checks passed!{{ NORMAL }}'

# Clean build artifacts
@clean globs=GLOBS_CLEAN:
    echo "🧹 Deleting files:"
    nlx del-cli --verbose \
        "{{ globs }}" \
        "{{ GLOBS_CLEAN_IGNORE }}"

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

# Hide the inherited devkit `tsc-build` recipe from the root surface.
[private]
@tsc-build:
    just build::tsc
