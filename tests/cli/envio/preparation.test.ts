import { execFileSync, spawnSync } from "node:child_process";
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import os from "node:os";
import path from "node:path";
import { NodeContext } from "@effect/platform-node";
import { Effect } from "effect";
import { afterEach, describe, expect, it } from "vitest";
import {
  prepareDeployment,
  readPreparedDeployment,
  withProjectLock,
} from "../../../cli/commands/envio/preparation.js";

const temporaryDirectories: string[] = [];
afterEach(() => {
  for (const directory of temporaryDirectories) {
    rmSync(directory, { force: true, recursive: true });
  }
  temporaryDirectories.length = 0;
});

function fixture() {
  const directory = mkdtempSync(path.join(os.tmpdir(), "envio-preparation-test-"));
  temporaryDirectories.push(directory);
  const root = path.join(directory, "checkout");
  const remote = path.join(directory, "remote.git");
  mkdirSync(root);
  const git = (...args: string[]) =>
    execFileSync("git", args, {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  git("init", "--initial-branch=main");
  git("config", "user.name", "Envio preparation test");
  git("config", "user.email", "envio-test@example.com");
  mkdirSync(path.join(root, "envio/streams/.envio/cache"), { recursive: true });
  mkdirSync(path.join(root, "envio/analytics"), { recursive: true });
  const configText = "chains:\n  - id: 1\n    start_block: 10\n    end_block: 100\n";
  writeFileSync(path.join(root, "envio/streams/config.yaml"), configText);
  writeFileSync(path.join(root, "envio/analytics/config.yaml"), configText);
  writeFileSync(
    path.join(root, "envio/streams/indexer-info.json"),
    '{"commitHash":"development","deployedAt":null,"versionLabel":null}\n'
  );
  writeFileSync(
    path.join(root, "envio/streams/.envio/cache/tokenMetadata.tsv"),
    "id\toutput\n1_0xabc\t{}\n"
  );
  writeFileSync(path.join(root, "README.md"), "original source\n");
  git("add", "--force", ".");
  git("commit", "-m", "test: source");
  const sourceCommit = git("rev-parse", "HEAD");
  // A local bare repository exercises exact fetch recovery without a network or push.
  execFileSync("git", ["clone", "--bare", root, remote], { stdio: "ignore" });
  git("remote", "add", "origin", remote);
  return { configText, directory, git, remote, root, sourceCommit };
}

describe("detached Envio deployment preparation", () => {
  it("copies root caches and metadata, distinguishes source/prepared commits, and leaves shared checkout/index untouched", async () => {
    const f = fixture();
    writeFileSync(path.join(f.root, "README.md"), "unrelated staged work\n");
    f.git("add", "README.md");
    writeFileSync(path.join(f.root, "untracked.txt"), "unrelated unstaged work\n");
    const before = f.git("status", "--porcelain");
    const prepared = await Effect.runPromise(
      prepareDeployment("streams", "HEAD", f.root).pipe(Effect.provide(NodeContext.layer))
    );
    expect(prepared.sourceCommit).toBe(f.sourceCommit);
    expect(prepared.preparedCommit).not.toBe(f.sourceCommit);
    expect(prepared.configText).toBe(f.configText);
    expect(f.git("show", `${prepared.preparedCommit}:.envio/cache/tokenMetadata.tsv`)).toBe(
      "id\toutput\n1_0xabc\t{}"
    );
    expect(
      JSON.parse(f.git("show", `${prepared.preparedCommit}:envio/streams/indexer-info.json`))
    ).toEqual({ commitHash: f.sourceCommit, deployedAt: prepared.deployedAt, versionLabel: null });
    expect(f.git("rev-parse", "HEAD")).toBe(f.sourceCommit);
    expect(f.git("branch", "--show-current")).toBe("main");
    expect(f.git("status", "--porcelain")).toBe(before);
    expect(f.git("worktree", "list", "--porcelain").split("worktree ")).toHaveLength(2);
    expect(
      JSON.parse(readFileSync(path.join(f.root, "envio/streams/indexer-info.json"), "utf8"))
        .commitHash
    ).toBe("development");
    const loaded = await Effect.runPromise(
      readPreparedDeployment("streams", prepared.preparedCommit, f.root).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    expect(loaded.sourceCommit).toBe(prepared.sourceCommit);
    expect(loaded.deployedAt).toBe(prepared.deployedAt);
    expect(loaded.config).toEqual(prepared.config);
  });

  it("prepares an explicit historical source ref and handles analytics without public metadata", async () => {
    const f = fixture();
    writeFileSync(path.join(f.root, "README.md"), "new source\n");
    f.git("commit", "-am", "test: newer source");
    const prepared = await Effect.runPromise(
      prepareDeployment("analytics", f.sourceCommit, f.root).pipe(Effect.provide(NodeContext.layer))
    );
    expect(prepared.sourceCommit).toBe(f.sourceCommit);
    expect(f.git("show", `${prepared.preparedCommit}:README.md`)).toBe("original source");
    const loaded = await Effect.runPromise(
      readPreparedDeployment("analytics", prepared.preparedCommit, f.root).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    expect(loaded.sourceCommit).toBe(f.sourceCommit);
    expect(f.git("show", "-s", "--format=%B", prepared.preparedCommit)).toContain(
      `Envio-Source: ${f.sourceCommit}`
    );
  });

  it("cleans temporary worktrees on invalid cache and rejects non-prepared commits", async () => {
    const f = fixture();
    writeFileSync(
      path.join(f.root, "envio/streams/.envio/cache/tokenMetadata.tsv"),
      "id\toutput\n"
    );
    f.git("commit", "-am", "test: invalid cache");
    await expect(
      Effect.runPromise(
        prepareDeployment("streams", "HEAD", f.root).pipe(Effect.provide(NodeContext.layer))
      )
    ).rejects.toThrow("cache");
    expect(f.git("worktree", "list", "--porcelain").split("worktree ")).toHaveLength(2);
    await expect(
      Effect.runPromise(
        readPreparedDeployment("streams", f.sourceCommit, f.root).pipe(
          Effect.provide(NodeContext.layer)
        )
      )
    ).rejects.toThrow("not a prepared deployment");
  });

  it("recovers an unavailable prepared object by exact fetch from a throwaway local remote", async () => {
    const f = fixture();
    const prepared = await Effect.runPromise(
      prepareDeployment("streams", "HEAD", f.root).pipe(Effect.provide(NodeContext.layer))
    );
    execFileSync(
      "git",
      [
        "--git-dir",
        f.remote,
        "fetch",
        f.root,
        `${prepared.preparedCommit}:refs/heads/deployment/streams`,
      ],
      { stdio: "ignore" }
    );
    const fresh = path.join(f.directory, "fresh");
    execFileSync(
      "git",
      ["clone", "--no-local", "--single-branch", "--branch", "main", f.remote, fresh],
      {
        stdio: "ignore",
      }
    );
    expect(() =>
      execFileSync("git", ["cat-file", "-e", prepared.preparedCommit], {
        cwd: fresh,
        stdio: "ignore",
      })
    ).toThrow();
    const loaded = await Effect.runPromise(
      readPreparedDeployment("streams", prepared.preparedCommit.slice(0, 7), fresh).pipe(
        Effect.provide(NodeContext.layer)
      )
    );
    expect(loaded.preparedCommit).toBe(prepared.preparedCommit);
    expect(loaded.sourceCommit).toBe(f.sourceCommit);
  });

  it("serializes local project mutations and releases its lock after failure", async () => {
    const f = fixture();
    const blocked = withProjectLock(
      "streams",
      withProjectLock("streams", Effect.void, f.root),
      f.root
    );
    await expect(
      Effect.runPromise(blocked.pipe(Effect.provide(NodeContext.layer)))
    ).rejects.toThrow("Another local streams mutation");
    await expect(
      Effect.runPromise(
        withProjectLock("streams", Effect.succeed("released"), f.root).pipe(
          Effect.provide(NodeContext.layer)
        )
      )
    ).resolves.toBe("released");
  });

  it("forwards a selector containing spaces and shell syntax literally to CLI validation", () => {
    const temporary = mkdtempSync(path.join(os.tmpdir(), "envio-wrapper-test-"));
    temporaryDirectories.push(temporary);
    const marker = path.join(temporary, "must-not-exist");
    const selector = `production ; touch '${marker}' $(touch '${marker}')`;
    const result = spawnSync("just", ["envio::endpoint", "streams", selector], {
      encoding: "utf8",
    });
    expect(result.status).not.toBe(0);
    expect(`${result.stdout}\n${result.stderr}`).toContain("Deployment must be production");
    expect(existsSync(marker)).toBe(false);
  });
});
