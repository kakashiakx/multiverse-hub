import { access, readdir } from "node:fs/promises";
import path from "node:path";
import { root } from "../shared/src/paths.mjs";

const errors = [];

async function exists(relativePath) {
  try {
    await access(path.join(root, relativePath));
    return true;
  } catch {
    return false;
  }
}

async function requireFile(relativePath) {
  if (!(await exists(relativePath))) {
    errors.push(`Missing file: ${relativePath}`);
  }
}

async function subdirectories(relativePath) {
  const entries = await readdir(path.join(root, relativePath), {
    withFileTypes: true,
  });
  return entries.filter((entry) => entry.isDirectory()).map((entry) => entry.name);
}

const topLevel = [
  "universes",
  "platforms",
  "environments",
  "civilizations",
  "shared",
  "scripts",
  "docs",
];

for (const dir of topLevel) {
  await requireFile(`${dir}/README.md`);
}

for (const env of await subdirectories("environments")) {
  await requireFile(`environments/${env}/config.json`);
}

for (const locale of await subdirectories("civilizations")) {
  await requireFile(`civilizations/${locale}/messages.json`);
}

for (const universe of await subdirectories("universes")) {
  await requireFile(`universes/${universe}/universe.json`);
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log("Repository structure is valid.");
