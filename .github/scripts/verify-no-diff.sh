#!/usr/bin/env bash

set -euo pipefail

error_message="${1:?missing error message}"
group_title="${2:?missing group title}"
shift 2

if [[ "$#" -eq 0 ]]; then
  echo "::error::No files were provided to verify-no-diff.sh"
  exit 1
fi

if git diff --quiet -- "$@"; then
  exit 0
fi

echo "::error::${error_message}"
echo "Changed files:"
git diff --name-only -- "$@" | sed 's/^/- /'
echo "::group::${group_title}"
git diff -- "$@"
echo "::endgroup::"
exit 1
