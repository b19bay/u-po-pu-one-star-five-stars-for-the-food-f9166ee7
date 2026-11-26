import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "I waited nine light-years for a table, the waiter called me 'buddy', and the ramen still earned this planet its single star.";
const EXPECTED_CHARS = 124;

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    console.error("MAKEFUN_OUTPUT_DIR is not set");
    process.exit(1);
  }
  if (LINE.length !== EXPECTED_CHARS) {
    console.error(`line is ${LINE.length} characters, expected ${EXPECTED_CHARS}`);
    process.exit(1);
  }
  if (LINE.length < 1 || LINE.length > 200) {
    console.error(`line is ${LINE.length} characters, must be 1-200`);
    process.exit(1);
  }
  if (LINE.trim().length === 0 || LINE.includes("\n")) {
    console.error("line must be non-whitespace and a single line");
    process.exit(1);
  }
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, LINE, "utf8");
  const readBack = readFileSync(target, "utf8");
  if (readBack !== LINE) {
    console.error("read-back mismatch: entry.txt differs from the line");
    process.exit(1);
  }
}

main();
