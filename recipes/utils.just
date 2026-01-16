# ---------------------------------------------------------------------------- #
#                                 SHARED UTILS                                 #
# ---------------------------------------------------------------------------- #

# Helper to run CLI commands through the main entry point
[private]
@cli *args:
    pnpm tsx cli/index.ts {{ args }}

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
