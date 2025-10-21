#!/usr/bin/env bun

/**
 * Summarizes test failures from vitest JSON output for GitHub Actions.
 * Creates a clean markdown table showing unique failures instead of repeated retry errors.
 */

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

interface VitestResult {
  testResults: Array<{
    name: string;
    assertionResults: Array<{
      ancestorTitles: string[];
      title: string;
      status: "passed" | "failed" | "skipped";
      failureMessages: string[];
      retryReasons?: string[];
    }>;
  }>;
}

interface FailureSummary {
  fullName: string;
  shortError: string;
  retryCount: number;
}

function extractFirstErrorLine(errorMessage: string): string {
  // Extract the most relevant error line
  const lines = errorMessage.split("\n");

  // Look for "expected X to equal Y" pattern
  const expectedLine = lines.find(
    (line) => line.includes("expected") && (line.includes("equal") || line.includes("deeply equal")),
  );
  if (expectedLine) {
    return expectedLine.trim();
  }

  // Look for Error: messages
  const errorLine = lines.find((line) => line.includes("Error:") || line.includes("AssertionError:"));
  if (errorLine) {
    return errorLine.replace(/^.*?Error:\s*/, "").trim();
  }

  // Fall back to first non-empty line
  return lines.find((line) => line.trim())?.trim() || "Unknown error";
}

function summarizeFailures(): FailureSummary[] {
  const resultsPath = resolve(process.cwd(), "test-results.json");

  if (!existsSync(resultsPath)) {
    console.error("❌ No test-results.json found");
    return [];
  }

  const results: VitestResult = JSON.parse(readFileSync(resultsPath, "utf8"));
  const failureMap = new Map<string, FailureSummary>();

  for (const testFile of results.testResults) {
    for (const test of testFile.assertionResults) {
      if (test.status === "failed") {
        const fullName = [...test.ancestorTitles, test.title].join(" > ");
        const retryCount = (test.retryReasons?.length || 0) + 1; // +1 for initial attempt

        if (!failureMap.has(fullName)) {
          const firstError = test.failureMessages[0] || "Unknown error";
          failureMap.set(fullName, {
            fullName,
            retryCount,
            shortError: extractFirstErrorLine(firstError),
          });
        }
      }
    }
  }

  return Array.from(failureMap.values());
}

function generateMarkdownTable(failures: FailureSummary[]): string {
  if (failures.length === 0) {
    return "## ✅ All tests passed!\n";
  }

  let markdown = `## ❌ Test Failures (${failures.length} unique)\n\n`;
  markdown += "| Test | Error | Retries |\n";
  markdown += "|------|-------|:-------:|\n";

  for (const failure of failures) {
    const testName = failure.fullName.replace(/\|/g, "\\|"); // Escape pipes
    const error = failure.shortError.replace(/\|/g, "\\|").substring(0, 100); // Limit length
    const retries = `${failure.retryCount}/${failure.retryCount}`;

    markdown += `| ${testName} | ${error} | ${retries} |\n`;
  }

  return markdown;
}

function main() {
  const failures = summarizeFailures();
  const markdown = generateMarkdownTable(failures);

  // Output to stdout (will be redirected to GITHUB_STEP_SUMMARY)
  console.log(markdown);

  // Exit with code 1 if there were failures (to fail the job)
  process.exit(failures.length > 0 ? 1 : 0);
}

main();
