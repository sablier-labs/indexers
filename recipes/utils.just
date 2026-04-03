# ---------------------------------------------------------------------------- #
#                                 SHARED UTILS                                 #
# ---------------------------------------------------------------------------- #

# Helper to run CLI commands through the main entry point
[private]
@cli *args:
    pnpm tsx cli/index.ts {{ args }}

# Run a just recipe with CI-friendly logging.
# - Default (`CI_LOG_MODE=quiet`): capture full logs, print concise status.

# - `CI_LOG_MODE=verbose` (or `ACTIONS_STEP_DEBUG=true`): stream output.
@ci-run recipe *args:
    just --quiet _ci-run {{ recipe }} {{ args }}

[private]
[script("bash")]
@_ci-run recipe *args:
    set -uo pipefail

    mode="${CI_LOG_MODE:-quiet}"
    tail_lines="${CI_LOG_TAIL_LINES:-200}"

    if [[ "${ACTIONS_STEP_DEBUG:-false}" == "true" ]]; then
        mode="verbose"
    fi

    if ! [[ "$tail_lines" =~ ^[0-9]+$ ]] || [[ "$tail_lines" -lt 1 ]]; then
        tail_lines=200
    fi

    cmd_display="just {{ recipe }} {{ args }}"
    start_seconds=$(date +%s)

    print_status() {
        status="$1"
        end_seconds=$(date +%s)
        duration=$((end_seconds - start_seconds))

        if [[ "$status" -eq 0 ]]; then
            echo "✅ {{ recipe }} completed in ${duration}s"
        else
            echo "::error::{{ recipe }} failed in ${duration}s (exit code ${status})"
        fi
    }

    if [[ "$mode" == "verbose" ]]; then
        echo "▶ $cmd_display"
        just {{ recipe }} {{ args }}
        status=$?
        print_status "$status"
        exit "$status"
    fi

    log_dir=".logs/ci"
    mkdir -p "$log_dir"

    timestamp=$(date +%Y%m%d-%H%M%S)
    safe_recipe=$(printf '%s' "{{ recipe }}" | tr -cs '[:alnum:]_-' '_')
    log_file="${log_dir}/${timestamp}-${safe_recipe}-$$.log"

    just {{ recipe }} {{ args }} >"$log_file" 2>&1
    status=$?
    print_status "$status"

    if [[ "$status" -eq 0 ]]; then
        exit 0
    fi

    echo "----- Last ${tail_lines} log lines from ${log_file} -----"
    tail -n "$tail_lines" "$log_file" || true
    echo "::group::Full log for $cmd_display (${log_file})"
    cat "$log_file"
    echo "::endgroup::"

    exit "$status"

# Helper to run two commands in parallel (airdrops, streams)
[private]
@concurrent-indexers cmd1 cmd2:
    pnpm concurrently --group \
        -n "airdrops,streams" \
        -c "blue,green" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}"

# Helper to run two commands in parallel (envio & graph)
[private]
@concurrent-vendors cmd1 cmd2:
    pnpm concurrently --group \
        -n "envio,graph" \
        -c "cyan,magenta" \
        "{{ cmd1 }}" \
        "{{ cmd2 }}"
