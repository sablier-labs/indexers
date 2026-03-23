# NOTE: this file is not meant to be run directly.
# Go to each indexer's directory and run `just --list` to see the available recipes.
mod root "../justfile"

set allow-duplicate-variables
set dotenv-load
set shell := ["bash", "-euo", "pipefail", "-c"]
set unstable

# Two levels up: from individual indexer dirs (e.g., envio/flow/) to repo root
set dotenv-path := "../../.env"

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Install Ni: https://github.com/antfu-collective/ni
ni := require("ni")

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Remove build files
clean:
    pnpm dlx del-cli bindings build

# Codegen everything for the Envio indexer
@codegen:
    just root::codegen-envio $INDEXER_NAME
alias c := codegen

# Codegen the Envio bindings
@codegen-bindings:
    just root::codegen-envio-bindings $INDEXER_NAME
alias cb := codegen-bindings

# Codegen the Envio config
@codegen-config:
    just root::codegen-envio-config $INDEXER_NAME
alias cc := codegen-config

# Codegen the Envio schema
@codegen-schema:
    just root::codegen-schema envio $INDEXER_NAME
alias cs := codegen-schema

# Envio CLI: dev, start, stop
[script("bash")]
envio command tui_mode="tui_on" *args:
    just _ensure-root-dist-fresh
    set -euo pipefail
    repo_root="{{ source_dir() }}/.."
    if [ "{{ tui_mode }}" = "tui_off" ]; then
        export TUI_OFF=true
    else
        export TUI_OFF=false
    fi
    cd "$repo_root"
    pnpm envio {{ command }} {{ args }} \
        --directory {{ justfile_dir() }} \
        --config {{ justfile_dir() }}/config.yaml \
        --output-directory {{ justfile_dir() }}/bindings

# Run the Vitest tests
test:
    just _ensure-root-dist-fresh
    just root::test "{{ justfile_dir() }}/tests/**/*.test.ts"

# Ensure dist artifacts consumed by envio/ are present and fresh.
# Envio is CJS only, so it cannot import TypeScript sources directly.
[private, script("bash")]
_ensure-root-dist-fresh:
    repo_root="{{ source_dir() }}/.."
    dist_envio="$repo_root/dist/cjs/indexers/envio.js"
    dist_types="$repo_root/dist/types/types.d.ts"
    src_envio="$repo_root/src/indexers/envio.ts"
    src_types="$repo_root/src/types.ts"

    if [ ! -f "$dist_envio" ] || [ ! -f "$dist_types" ]; then
        echo "❌ Missing dist artifacts required by envio runtime/type imports."
        echo "Run: just root::tsc-build"
        exit 1
    fi

    # -nt = "newer than": rebuild if source files were modified after dist artifacts
    if [ "$src_envio" -nt "$dist_envio" ] || [ "$src_types" -nt "$dist_types" ]; then
        echo "❌ dist artifacts are stale for envio shared imports."
        echo "Run: just root::tsc-build"
        exit 1
    fi
