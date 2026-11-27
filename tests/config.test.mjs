import test from "node:test";
import assert from "node:assert/strict";
import { ENVIRONMENTS, loadConfig } from "../shared/src/index.mjs";

test("every environment has a config that names itself", async () => {
  for (const env of ENVIRONMENTS) {
    const config = await loadConfig(env);
    assert.equal(config.name, env);
  }
});

test("an unknown environment is rejected", async () => {
  await assert.rejects(() => loadConfig("nope"), /Unknown environment/);
});
