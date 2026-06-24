# NOTE: this file is not meant to be run directly.
# Go to each indexer's directory and run `just --list` to see the available recipes.
mod root "../justfile"
import "../node_modules/@sablier/devkit/just/settings.just"

# Load env vars from the repo root
set dotenv-path := "{{ source_dir() }}/../.env"

# Isolate each indexer's local Postgres data; sharing one schema makes Envio
# refuse to start when the stored indexer name differs from the config name.
export ENVIO_PG_SCHEMA := INDEXER_NAME

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Codegen everything for the Envio indexer
@codegen:
    just root::codegen::envio $INDEXER_NAME
alias c := codegen

# Codegen the Envio bindings
@codegen-bindings:
    just root::codegen::envio-bindings $INDEXER_NAME
alias cb := codegen-bindings

# Codegen the Envio config
@codegen-config:
    just root::codegen::envio-config $INDEXER_NAME
alias cc := codegen-config

# Codegen the Envio schema
@codegen-schema:
    just root::codegen::schema envio $INDEXER_NAME
alias cs := codegen-schema

# Envio CLI: dev, start, stop
[script("bash")]
envio command tui_mode="tui_on" *args:
    set -euo pipefail
    repo_root="{{ source_dir() }}/.."
    indexer_dir="{{ justfile_dir() }}"
    if [ "{{ tui_mode }}" = "tui_off" ]; then
        export ENVIO_TUI=false
    else
        export ENVIO_TUI=true
    fi
    cd "$indexer_dir"
    PATH="$repo_root/node_modules/.bin:$PATH" \
        envio {{ command }} {{ args }} \
        --config config.yaml

# Run the Vitest tests
test:
    just root::test "{{ justfile_dir() }}/tests/**/*.test.ts"
