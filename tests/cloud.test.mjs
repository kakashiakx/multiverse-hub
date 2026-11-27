import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "../platforms/cloud/server.mjs";

async function withServer(run) {
  const server = createServer();
  await new Promise((resolve) => server.listen(0, resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  try {
    await run(base);
  } finally {
    await new Promise((resolve) => server.close(resolve));
  }
}

test("GET /health returns ok", async () => {
  await withServer(async (base) => {
    const res = await fetch(`${base}/health`);
    assert.equal(res.status, 200);
    assert.deepEqual(await res.json(), { status: "ok" });
  });
});

test("GET /messages honors ?lang", async () => {
  await withServer(async (base) => {
    const en = await (await fetch(`${base}/messages?lang=en`)).json();
    const vi = await (await fetch(`${base}/messages?lang=vi`)).json();
    assert.equal(en.title, "multiverse-hub");
    assert.notEqual(vi.welcome, en.welcome);
  });
});

test("unknown paths return 404 and other methods return 405", async () => {
  await withServer(async (base) => {
    assert.equal((await fetch(`${base}/nope`)).status, 404);
    assert.equal((await fetch(`${base}/health`, { method: "POST" })).status, 405);
  });
});
