# Platform: iot

A simulated sensor that prints a temperature and humidity reading on a timer. Use it as a starting point for real device firmware or a gateway.

Requires Node.js 20 or newer. Run it from the repository root:

```sh
DEVICE_ID=sensor-001 INTERVAL_MS=2000 DEFAULT_LOCALE=vi node platforms/iot/sensor.mjs
```

Each line is a JSON reading followed by a message translated from `civilizations/`. Press Ctrl+C to stop.

To send readings to a server, replace the `console.log` in `sensor.mjs` with an HTTP or MQTT publish.
