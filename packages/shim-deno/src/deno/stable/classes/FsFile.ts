///<reference path="../lib.deno.d.ts" />

import * as fs from "fs";
import { fstat } from "../functions/fstat.js";
import { fstatSync } from "../functions/fstatSync.js";
import { ftruncate } from "../functions/ftruncate.js";
import { ftruncateSync } from "../functions/ftruncateSync.js";
import { read } from "../functions/read.js";
import { readSync } from "../functions/readSync.js";
import { write } from "../functions/write.js";
import { writeSync } from "../functions/writeSync.js";
import { seek } from "../functions/seek.js";
import { seekSync } from "../functions/seekSync.js";

export class FsFile implements Deno.FsFile {
  constructor(readonly rid: number) {}

  async write(p: Uint8Array): Promise<number> {
    return await write(this.rid, p);
  }

  writeSync(p: Uint8Array): number {
    return writeSync(this.rid, p);
  }

  async truncate(len?: number): Promise<void> {
    await ftruncate(this.rid, len);
  }

  truncateSync(len?: number): void {
    return ftruncateSync(this.rid, len);
  }

  read(p: Uint8Array): Promise<number | null> {
    return read(this.rid, p);
  }

  readSync(p: Uint8Array): number | null {
    return readSync(this.rid, p);
  }

  seek(offset: number, whence: Deno.SeekMode): Promise<number> {
    return seek(this.rid, offset, whence);
  }

  seekSync(offset: number, whence: Deno.SeekMode): number {
    return seekSync(this.rid, offset, whence);
  }

  async stat(): Promise<Deno.FileInfo> {
    return await fstat(this.rid);
  }

  statSync(): Deno.FileInfo {
    return fstatSync(this.rid);
  }

  close(): void {
    fs.closeSync(this.rid);
  }

  get readable(): ReadableStream<Uint8Array> {
    throw new Error("Not implemented.");
  }

  get writable(): WritableStream<Uint8Array> {
    throw new Error("Not implemented.");
  }
}

const File = FsFile;

export { File };
