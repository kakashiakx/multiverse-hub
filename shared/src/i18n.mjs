import { readFile } from "node:fs/promises";
import path from "node:path";
import { root } from "./paths.mjs";

export const FALLBACK_LOCALE = "en";

const LOCALE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

async function readMessages(locale) {
  const file = path.join(root, "civilizations", locale, "messages.json");
  return JSON.parse(await readFile(file, "utf8"));
}

/**
 * Load the messages for a locale from civilizations/<locale>/messages.json.
 * Missing keys, and unknown or invalid locales, fall back to English.
 */
export async function loadMessages(locale = FALLBACK_LOCALE) {
  const fallback = await readMessages(FALLBACK_LOCALE);
  if (locale === FALLBACK_LOCALE || !LOCALE_PATTERN.test(locale)) {
    return fallback;
  }
  try {
    return { ...fallback, ...(await readMessages(locale)) };
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
}

/** Look up a message by key. Returns the key itself when it is missing. */
export function t(messages, key) {
  return messages[key] ?? key;
}
