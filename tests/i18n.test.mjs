import test from "node:test";
import assert from "node:assert/strict";
import { loadMessages, t } from "../shared/src/index.mjs";

test("English messages load", async () => {
  const messages = await loadMessages("en");
  assert.equal(t(messages, "title"), "multiverse-hub");
});

test("another locale overrides English", async () => {
  const messages = await loadMessages("vi");
  assert.notEqual(t(messages, "welcome"), t(await loadMessages("en"), "welcome"));
});

test("unknown and invalid locales fall back to English", async () => {
  const en = await loadMessages("en");
  assert.deepEqual(await loadMessages("zz"), en);
  assert.deepEqual(await loadMessages("../../etc"), en);
});

test("a missing key returns the key", async () => {
  const messages = await loadMessages("en");
  assert.equal(t(messages, "does.not.exist"), "does.not.exist");
});
