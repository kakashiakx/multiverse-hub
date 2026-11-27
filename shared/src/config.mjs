import { readFile } from "node:fs/promises";
import path from "node:path";
import { root } from "./paths.mjs";

export const ENVIRONMENTS = ["dev", "staging", "production"];

/**
 * Load the configuration for an environment from environments/<env>/config.json.
 * Defaults to the APP_ENV variable, or "dev" when it is not set.
 */
export async function loadConfig(env = process.env.APP_ENV ?? "dev") {
  if (!ENVIRONMENTS.includes(env)) {
    throw new Error(`Unknown environment: ${env}`);
  }
  const file = path.join(root, "environments", env, "config.json");
  return JSON.parse(await readFile(file, "utf8"));
}
