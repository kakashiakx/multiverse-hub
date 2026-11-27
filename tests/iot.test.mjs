import test from "node:test";
import assert from "node:assert/strict";
import { loadMessages } from "../shared/src/index.mjs";
import { createReading, formatReading } from "../platforms/iot/sensor.mjs";

const fixedNow = new Date("2026-01-01T00:00:00.000Z");

test("createReading is deterministic with a fixed random and clock", () => {
  const reading = createReading("sensor-001", () => 0.5, fixedNow);
  assert.deepEqual(reading, {
    deviceId: "sensor-001",
    temperatureC: 22.5,
    humidity: 55,
    timestamp: "2026-01-01T00:00:00.000Z",
  });
});

test("readings stay in range", () => {
  const low = createReading("d", () => 0, fixedNow);
  const high = createReading("d", () => 0.999, fixedNow);
  assert.equal(low.temperatureC, 15);
  assert.ok(high.temperatureC <= 30);
  assert.equal(low.humidity, 30);
  assert.ok(high.humidity <= 80);
});

test("formatReading uses the locale's message", async () => {
  const reading = createReading("sensor-001", () => 0.5, fixedNow);
  const en = formatReading(reading, await loadMessages("en"));
  const vi = formatReading(reading, await loadMessages("vi"));
  assert.equal(en, "Temperature 22.5 °C, humidity 55 %");
  assert.notEqual(vi, en);
});
