#!/usr/bin/env bun

import { existsSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import type { JsonTestResults } from "vitest/reporters";

const ERROR_REGEX = /^.*?Error:\s*/u;
const TEST_LOGS = 'See the "Run the tests" step log for details.';

function extractFirstErrorLine(errorMessage: string): string {
  // Extract the most relevant error line
  const lines = errorMessage.split("\n");

  // Look for "expected X to equal Y" pattern
  const expectedLine = lines.find(
    (line) => line.includes("expected") && (line.includes("equal") || line.includes("deeply equal"))
  );
  if (expectedLine) {
    return expectedLine.trim();
  }

  // Look for Error: messages
  const errorLine = lines.find((line) => line.includes("Error:"));
  if (errorLine) {
    return errorLine.replace(ERROR_REGEX, "").trim();
  }

  // Fall back to first non-empty line
  return lines.find((line) => line.trim())?.trim() || "Unknown error";
}

function summarizeReport(results: JsonTestResults): string {
  const failures: [name: string, message: string][] = [];
  for (const testFile of results.testResults) {
    const failedAssertions = testFile.assertionResults.filter((test) => test.status === "failed");
    for (const test of failedAssertions) {
      const fullName = [...test.ancestorTitles, test.title].join(" > ");
      failures.push([fullName, test.failureMessages?.[0] || "Unknown error"]);
    }

    if (testFile.status === "failed" && (testFile.message || failedAssertions.length === 0)) {
      const suite = relative(process.cwd(), testFile.name);
      failures.push([`Suite: ${suite}`, testFile.message || "Unknown suite error"]);
    }
  }

  if (failures.length > 0) {
    const rows = failures.map(([name, message]) => {
      const test = name.replace(/\s+/gu, " ").replace(/\|/gu, "\\|");
      const error = extractFirstErrorLine(message).slice(0, 100).replace(/\|/gu, "\\|");
      return `| ${test} | ${error} |`;
    });
    return `## ❌ Test Failures\n\n| Test or suite | Error |\n|---|---|\n${rows.join("\n")}\n\n${TEST_LOGS}`;
  }

  // Vitest 3 omits unhandled run errors from its JSON report.
  if (process.env.TEST_OUTCOME === "failure" || !results.success) {
    return `## ❌ Test run failed\n\nThe report contains no failed assertions or suite errors. ${TEST_LOGS}`;
  }

  return "## No failed tests or suites in the Vitest report";
}

function generateSummary(): string {
  const resultsPath = resolve(process.cwd(), "test-results.json");
  if (!existsSync(resultsPath)) {
    return `## Vitest report missing\n\nVitest did not produce \`test-results.json\`. ${TEST_LOGS}`;
  }

  try {
    const results: JsonTestResults = JSON.parse(readFileSync(resultsPath, "utf8"));
    return summarizeReport(results);
  } catch (error) {
    return `## Vitest report unreadable\n\n${String(error)}\n\n${TEST_LOGS}`;
  }
}

console.log(generateSummary());
