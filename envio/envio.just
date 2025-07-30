# NOTE: this file is not meant to be run directly.
# Go to each indexer's directory and run `just --list` to see the available recipes.
mod root "../justfile"

set allow-duplicate-variables := true
set shell := ["bash", "-euo", "pipefail", "-c"]

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
    just root::codegen-envio $PROTOCOL
alias c := codegen

# Codegen the Envio bindings
@codegen-bindings:
    just root::codegen-envio-bindings $PROTOCOL
alias cb := codegen-bindings

# Codegen the Envio config
@codegen-config:
    just root::codegen-envio-config $PROTOCOL
alias cc := codegen-config

# Codegen the Envio schema
@codegen-schema:
    just root::codegen-schema envio $PROTOCOL
alias cs := codegen-schema

# Envio CLI: dev, start, stop
envio command tui_mode="tui_on" *args:
    #!/usr/bin/env sh
    set -a
    if [ "{{ tui_mode }}" = "tui_off" ]; then
        TUI_OFF=true
    else
        TUI_OFF=false
    fi
    pnpm envio {{ command }} {{ args }} \
    --config {{ justfile_dir() }}/config.yaml \
    --output-directory {{ justfile_dir() }}/bindings
