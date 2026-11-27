import { fileURLToPath } from "node:url";
import { loadMessages, t } from "../../shared/src/index.mjs";

/**
 * Create one simulated sensor reading. Pass `random` and `now` to make it
 * deterministic, for example in tests.
 */
export function createReading(deviceId, random = Math.random, now = new Date()) {
  const round = (value) => Math.round(value * 10) / 10;
  return {
    deviceId,
    temperatureC: round(15 + random() * 15),
    humidity: round(30 + random() * 50),
    timestamp: now.toISOString(),
  };
}

/** Turn a reading into a human-readable line in the given messages' language. */
export function formatReading(reading, messages) {
  return t(messages, "iot.reading")
    .replace("{temperature}", reading.temperatureC)
    .replace("{humidity}", reading.humidity);
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const deviceId = process.env.DEVICE_ID ?? "sensor-001";
  const intervalMs = Number(process.env.INTERVAL_MS ?? 2000);
  const messages = await loadMessages(process.env.DEFAULT_LOCALE ?? "en");

  console.log(`${t(messages, "title")}: ${deviceId}`);
  setInterval(() => {
    const reading = createReading(deviceId);
    console.log(JSON.stringify(reading), formatReading(reading, messages));
  }, intervalMs);
}
