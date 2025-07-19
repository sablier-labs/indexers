/**
 * Memory-optimized RPC data cache management.
 *
 * Key optimizations:
 * 1. No in-memory cache - data is read from disk on demand
 * 2. Direct file reads instead of keeping entire JSON in memory
 * 3. Manual shallow merging instead of lodash deep merge
 * 4. Atomic writes using temp file + rename to prevent corruption
 *
 * These changes prevent OOM errors when dealing with large JSON files (>50KB)
 * containing hundreds of token metadata entries.
 */

import * as fs from "node:fs";
import * as path from "node:path";
import type { Logger } from "envio";
import { sablier } from "sablier";
import type { Envio } from "./bindings";
import type { RPCData } from "./types";

type ShapeMap = {
  [RPCData.Category.ERC20]: Record<Envio.Address, RPCData.ERC20Metadata>;
  [RPCData.Category.Proxender]: Record<Envio.Address, RPCData.ProxenderInfo>;
};

export function initDataEntry<C extends RPCData.Category>(category: C, chainId: number, logger: Logger): DataEntry<C> {
  return new DataEntry(category, chainId, logger);
}

export class DataEntry<C extends RPCData.Category> {
  public readonly file: string;

  private static readonly BASE_DIR = path.join(__dirname, "rpc-data");
  private static readonly ENCODING = "utf8" as const;

  constructor(
    public readonly category: C,
    public readonly chainId: number,
    public readonly logger: Logger,
  ) {
    const chain = sablier.chains.getOrThrow(chainId);
    this.file = path.join(DataEntry.BASE_DIR, category, `${chain.slug}.json`);

    this.preflight();
  }

  private preflight() {
    const fileExists = fs.existsSync(this.file);
    if (!fileExists) {
      fs.writeFileSync(this.file, "{}", DataEntry.ENCODING);
    }
  }

  private logError(error: unknown, message: string): void {
    this.logger.error(message, {
      category: this.category,
      chainId: this.chainId,
      error,
      file: this.file,
    });
  }

  public read<K extends keyof ShapeMap[C]>(key: K): ShapeMap[C][K] | undefined {
    try {
      const raw = fs.readFileSync(this.file, DataEntry.ENCODING);
      const data: ShapeMap[C] = JSON.parse(raw);
      return data[key];
    } catch (error) {
      this.logError(error, `Failed reading data from cache file`);
      return undefined;
    }
  }

  public write(newData: Partial<ShapeMap[C]>): void {
    // Data is only written in the development environment.
    const ENVIO_ENVIRONMENT = process.env.ENVIO_ENVIRONMENT;
    if (ENVIO_ENVIRONMENT !== "development") {
      return;
    }

    try {
      // Read existing data
      let existingData: ShapeMap[C] = {};
      try {
        const raw = fs.readFileSync(this.file, DataEntry.ENCODING);
        existingData = JSON.parse(raw);
      } catch {
        // File doesn't exist or is corrupted, start fresh
        existingData = {} as ShapeMap[C];
      }

      // Merge data manually to avoid deep cloning
      const mergedData = { ...existingData };
      for (const [key, value] of Object.entries(newData)) {
        mergedData[key as keyof ShapeMap[C]] = value as ShapeMap[C][keyof ShapeMap[C]];
      }

      // Write atomically to avoid corruption
      const tempFile = `${this.file}.tmp`;
      fs.writeFileSync(tempFile, JSON.stringify(mergedData), DataEntry.ENCODING);
      fs.renameSync(tempFile, this.file);
    } catch (error) {
      this.logError(error, `Failed writing data to cache file`);
    }
  }
}
