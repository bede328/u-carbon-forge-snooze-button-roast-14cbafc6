// Snooze Button Roast.
// Writes a single roast line (one line, at most 200 characters) to
// /output/entry.txt. The line roasts an alarm clock that rings at 6 AM
// on a Saturday morning, treating it like a debt collector demanding
// payment in sleep.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "6 AM on a Saturday, and my alarm is ringing like I owe it money — mate, the only debt I have today is eight more hours of sleep.";

// The competition gate allows 1-200 characters; keep the cap in one place
// so the guard and the comment above cannot drift apart.
const MAX_CHARS = 200;

const codePoints = [...LINE];
if (codePoints.length < 1 || codePoints.length > MAX_CHARS) {
  throw new Error(
    `entry must be 1-${MAX_CHARS} characters, got ${codePoints.length}`,
  );
}
if (LINE.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("entry must be a single line");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");

// Read back what was written and verify it is exactly the validated line:
// a mismatch means the entry on disk is not the entry that was checked.
import { readFileSync } from "node:fs";
const written = readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt on disk does not match the validated line");
}
