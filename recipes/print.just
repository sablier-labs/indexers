# Print available chain arguments
[group("cli")]
@print-chains use_graph_slugs="false":
    just cli print chains --graph {{ use_graph_slugs }}

# Print available log levels available in Winston logger
[group("cli")]
@print-log-levels:
    echo "Available log levels: error, warn, info, http, verbose, debug, silly"

# Print available protocol arguments
[group("cli")]
@print-protocols:
    echo "Available protocol arguments: flow, lockup, airdrops"
