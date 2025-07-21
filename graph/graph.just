mod root "../justfile"

set allow-duplicate-variables := true
set dotenv-path := "{{ source_dir() }}/../../.env"
set shell := ["bash", "-euo", "pipefail", "-c"]

# ---------------------------------------------------------------------------- #
#                                 DEPENDENCIES                                 #
# ---------------------------------------------------------------------------- #

# Install Ni: https://github.com/antfu-collective/ni
na := require("na")
ni := require("ni")
nlx := require("nlx")

# ---------------------------------------------------------------------------- #
#                               ENVIRONMENT VARS                               #
# ---------------------------------------------------------------------------- #

GRAPH_DEPLOY_KEY := env("GRAPH_DEPLOY_KEY")
PROTOCOL := env("PROTOCOL")

# ---------------------------------------------------------------------------- #
#                                   CONSTANTS                                  #
# ---------------------------------------------------------------------------- #

IPFS_URL := "https://api.thegraph.com/ipfs/api/v0"
NODE_LIGHTLINK := "https://graph.pegasus.lightlink.io/rpc"
NODE_XDC := "https://graph.xinfin.network"

# ---------------------------------------------------------------------------- #
#                                    RECIPES                                   #
# ---------------------------------------------------------------------------- #

# Authenticate with Graph hosted service
[group("graph")]
auth:
    pnpm graph auth {{ GRAPH_DEPLOY_KEY }}

# Build the subgraph
@build:
    just root::build-graph-indexer {{ PROTOCOL }}
alias b := build

# Remove build files
clean:
    pnpm dlx del-cli bindings build

# ---------------------------------------------------------------------------- #
#                               RECIPES: CODEGEN                               #
# ---------------------------------------------------------------------------- #

# Codegen the subgraph
[group("codegen")]
@codegen:
    just root::codegen-graph {{ PROTOCOL }}
alias c := codegen

# Codegen the subgraph bindings
[group("codegen")]
@codegen-bindings:
    just root::codegen-graph-bindings {{ PROTOCOL }}
alias cb := codegen-bindings

# Codegen the subgraph manifest
[group("codegen")]
@codegen-manifest chain="mainnet":
    just root::codegen-graph-manifest {{ PROTOCOL }} {{ chain }}
alias cm := codegen-manifest

# Codegen the GraphQL schema
[group("codegen")]
@codegen-schema:
    just root::codegen-schema graph {{ PROTOCOL }}
alias cs := codegen-schema

# ---------------------------------------------------------------------------- #
#                                RECIPES: DEPLOY                               #
# ---------------------------------------------------------------------------- #

# Deploy the subgraph (the chain_slug is The Graph's chain slug)
[group("deploy")]
deploy chain_slug version_label: codegen-schema codegen-manifest
    #!/usr/bin/env sh
    subgraph_name=sablier-{{ PROTOCOL }}-{{ chain_slug }}
    manifest_path={{ justfile_dir() }}/manifests/{{ chain_slug }}.yaml
    pnpm graph deploy \
        $subgraph_name \
        $manifest_path \
        --version-label {{ version_label }}
alias d := deploy

# Deploy all officials subgraphs to The Decentralized Network
[group("deploy")]
[confirm("Are you sure you want to deploy all Graph indexers? y/n")]
deploy-all version_label: codegen
    just root::cli deploy-all-graph \
    --protocol {{ PROTOCOL }} \
    --version-label {{ version_label }}
alias da := deploy-all

# Deploy to experimental subgraph on Ethereum Sepolia
[group("deploy")]
deploy-experimental version_label: codegen-schema (codegen-manifest "sepolia")
    #!/usr/bin/env sh
    subgraph_name=sablier-{{ PROTOCOL }}-experimental
    manifest_path={{ justfile_dir() }}/manifests/sepolia.yaml
    pnpm graph deploy \
        $subgraph_name \
        $manifest_path \
        --version-label {{ version_label }}
alias de := deploy-experimental

# Deploy to Lightlink
[group("deploy")]
deploy-lightlink version_label:
    deploy-custom lightlink \
    {{ version_label }} \
    {{ NODE_LIGHTLINK }} \
    {{ IPFS_URL }}

# Deploy to XDC
[group("deploy")]
deploy-xdc version_label:
    deploy-custom xdc \
    {{ version_label }} \
    {{ NODE_XDC }} \
    {{ IPFS_URL }}

# ---------------------------------------------------------------------------- #
#                               RECIPES: HELPERS                               #
# ---------------------------------------------------------------------------- #

# Deploy to a custom Graph node
[private]
deploy-custom chain_slug version_label node_url ipfs_url=IPFS_URL: codegen
    #!/usr/bin/env sh
    subgraph_name={{ chain_slug }}/sablier-{{ PROTOCOL }}-{{ chain_slug }}
    pnpm graph deploy \
        --version-label {{ version_label }} \
        --ipfs {{ ipfs_url }} \
        --node {{ node_url }} \
        $subgraph_name \
        {{ justfile_dir() }}/manifests/{{ chain_slug }}.yaml
