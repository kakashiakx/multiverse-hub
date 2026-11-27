import path from "node:path";
import { fileURLToPath } from "node:url";

/** Absolute path to the repository root. */
export const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "..",
);
