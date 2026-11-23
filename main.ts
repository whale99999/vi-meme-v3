// vi-meme-v3 — entry for make.fun competition gta6-meme-x-01 ("Post a GTA 6 meme on X").
//
// The entry itself is the X post named in POST.json: a GTA 6 meme posted from
// @Z_Metaverse, carrying the make.fun bounty link, the play code
// makefun-jade-jigsaw-meadow, and the meme picture with make.fun's ghost in it.
// The house reads the post straight from X; nothing this program writes about
// the post is judged. All this program has to do is hand POST.json over:
// copy it from the repository root into the output directory, byte for byte.
//
// Run it the way the grader does (Node 22, standard library only):
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
// Outside the grader's container the two environment variables stand in for
// /bot and /output; inside it they default to those paths.

import { copyFileSync, mkdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const SOURCE = join(BOT_DIR, 'POST.json');
const TARGET = join(OUTPUT_DIR, 'POST.json');

// The one post this entry hands in. main.ts refuses to copy a POST.json
// that does not name exactly this X post, so a stray or placeholder file
// can never slip through as the entry.
const EXPECTED_URL = 'https://x.com/Z_Metaverse/status/2124679536570995010';

let post;
try {
  post = JSON.parse(readFileSync(SOURCE, 'utf8'));
} catch (err) {
  console.error(`POST.json could not be read from ${SOURCE}: ${(err as Error).message}`);
  process.exit(1);
}
if (typeof post !== 'object' || post === null || post.url !== EXPECTED_URL) {
  console.error(`POST.json does not name the entry post ${EXPECTED_URL}`);
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
try {
  copyFileSync(SOURCE, TARGET);
} catch (err) {
  console.error(`POST.json could not be copied from ${SOURCE}: ${(err as Error).message}`);
  process.exit(1);
}
