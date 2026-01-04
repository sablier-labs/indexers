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
