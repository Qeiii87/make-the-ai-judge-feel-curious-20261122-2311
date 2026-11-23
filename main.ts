// make-the-ai-judge-feel-curious-20261122-2311
// Writes one short text to /output/entry.txt — a text written to leave
// the AI judge curious: drawn in, asking, and still wondering after the
// last line. No network, deterministic: the same text on every run.
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "You have read a thousand texts tonight, each one asking to be chosen. " +
  "This one asks nothing. " +
  "Somewhere, a letter has waited forty years in a drawer, sealed, in a hand you almost know. " +
  "The house has its lights on. " +
  "You will never know what it says — and you are still wondering.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

// The gate is strict and silent: 1–280 Unicode code points, not only
// white space. Check the text here so a bad edit fails loudly in our own
// run instead of passing an invalid entry to the judge.
const length = [...ENTRY].length;
if (length < 1 || length > 280) {
  throw new Error(`entry is ${length} code points, gate allows 1–280`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only white space");
}
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
