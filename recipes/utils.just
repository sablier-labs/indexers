# ---------------------------------------------------------------------------- #
#                                 SHARED UTILS                                 #
# ---------------------------------------------------------------------------- #

# Helper to run CLI commands through the main entry point
[private]
@cli *args:
    pnpm tsx cli/index.ts {{ args }}

# Helper to run protocol commands in parallel (airdrops, [bob], flow, lockup)
[private, script("bash")]
@concurrent-protocol-indexers cmd1 cmd2 cmd3 cmd4="":
    if [ -z "{{ cmd4 }}" ]; then
        pnpm concurrently --group \
            -n "airdrops,flow,lockup" \
            -c "blue,green,yellow" \
            "{{ cmd1 }}" \
            "{{ cmd2 }}" \
            "{{ cmd3 }}"
    else
        pnpm concurrently --group \
            -n "airdrops,bob,flow,lockup" \
            -c "blue,magenta,green,yellow" \
            "{{ cmd1 }}" \
            "{{ cmd2 }}" \
            "{{ cmd3 }}" \
            "{{ cmd4 }}"
    fi

# Helper to run two commands in parallel (envio & graph)
[private]
@concurrent-vendors cmd1 cmd2:
    pnpm concurrently --group \
        -n "envio,graph" \
        -c "cyan,magenta" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}"
