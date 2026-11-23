// THE WORLD LEDGER — Monday, November 23, 2026.
// Entry for make.fun news-image-20261123: one image summing up the day's world news.
//
// The front page is composed in this repository as entry.png (1024x1024, JPEG
// bytes under the name entry.png): masthead "THE WORLD LEDGER", dated Monday,
// November 23, 2026, headlined "TANKERS ABLAZE IN THE GULF" over a purpose-built
// illustration of two burning oil tankers in the Strait of Hormuz, carrying ten
// stories from around the world — Trump's dare to Iran at the naval blockade,
// the COP31 collapse, the Russian frigate Merkury sunk off Benghazi, a boy of 7
// pulled alive from rubble in Kyiv, the Democrats' biggest House win since 1992,
// the AI sell-off hitting Asian markets, and the Cikande factory fire, plus
// Belgium's airport strike, Liverpool 4-0 Manchester United, Verstappen in Las
// Vegas, South Korea's exports passing $1 trillion, the Vanuatu quake and the
// Mets' record signing for Skubal. Every fact was checked against reporting of
// 23 November 2026; the illustration carries no text, and all type on the page
// is drawn crisp by the build script so it stays legible at 300 pixels across.
//
// This program copies that image to /output/entry.png. It runs with no network,
// in a fresh container, twice, and both runs must write the same bytes — a plain
// copy is deterministic by construction.
//
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, existsSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const JPEG_MAGIC = Buffer.from([0xff, 0xd8, 0xff]);
const MAX_BYTES = 1048576; // 1 MiB, the competition's cap

// A PNG's dimensions sit in its IHDR chunk: after the 8-byte signature come a
// 4-byte length and the 4-byte type "IHDR", then width and height as 4-byte
// big-endian integers each.
function pngDimensions(bytes: Buffer): [number, number] {
  return [bytes.readUInt32BE(16), bytes.readUInt32BE(20)];
}

// A JPEG's dimensions sit in a Start of Frame segment (SOF0–SOF15 except DHT,
// JPG and DAC): its payload holds precision (1 byte), then height and width as
// 2-byte big-endian integers. Walk the segments past the SOI marker to find one.
// Standalone markers (RSTn, SOI, EOI, TEM) carry no length field, so the walk
// only ever meets length-prefixed segments before the first SOF.
function jpegDimensions(bytes: Buffer): [number, number] {
  let i = 2;
  while (i + 9 < bytes.length) {
    if (bytes[i] !== 0xff) throw new Error('bad JPEG marker');
    const marker = bytes[i + 1];
    const len = bytes.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
      return [bytes.readUInt16BE(i + 7), bytes.readUInt16BE(i + 5)];
    }
    i += 2 + len;
  }
  throw new Error('no JPEG SOF segment found');
}

const src = new URL('./entry.png', import.meta.url).pathname;
if (!existsSync(src)) throw new Error('entry.png missing from repository');
const bytes = readFileSync(src);
if (bytes.length > MAX_BYTES) throw new Error(`entry.png is ${bytes.length} bytes, over the 1 MiB cap`);

let width: number, height: number;
if (bytes.subarray(0, 8).equals(PNG_MAGIC)) {
  [width, height] = pngDimensions(bytes);
} else if (bytes.subarray(0, 3).equals(JPEG_MAGIC)) {
  [width, height] = jpegDimensions(bytes);
} else {
  throw new Error('entry.png is neither PNG nor JPEG');
}
if (width > 1024 || height > 1024) {
  throw new Error(`entry.png is ${width}x${height}, over the 1024x1024 cap`);
}

// The only write the program performs: an exact byte copy, so two runs in two
// fresh containers produce identical output.
copyFileSync(src, join(process.env.MAKEFUN_OUTPUT_DIR ?? '/output', 'entry.png'));
