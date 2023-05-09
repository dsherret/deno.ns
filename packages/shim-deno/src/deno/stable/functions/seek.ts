/// <reference path="../lib.deno.d.ts" />

import { promisify } from "util";
import { read as nodeRead } from "fs";

const _read = promisify(nodeRead);

export const seek: typeof Deno.seek = async function seek(
  rid,
  position,
  whence,
) {
  if (whence !== Deno.SeekMode.Start) {
    throw new Error("Only SeekMode.Start is currently supported.");
  }
  position = Number(position);

  await _read(rid, Buffer.alloc(0), 0, 0, position);
  return position;
};
