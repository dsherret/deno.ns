/// <reference path="../lib.deno.d.ts" />

import { readSync } from "fs";

export const seekSync: typeof Deno.seekSync = function seek(
  rid,
  position,
  whence,
) {
  if (whence !== Deno.SeekMode.Start) {
    throw new Error("Only SeekMode.Start is currently supported.");
  }
  position = Number(position);

  readSync(rid, Buffer.alloc(0), 0, 0, position);
  return position;
};
