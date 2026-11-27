# Platform: cloud

A small HTTP API with no dependencies. It serves the shared config and translated messages.

Requires Node.js 20 or newer. Run it from the repository root:

```sh
APP_ENV=dev PORT=3000 node platforms/cloud/server.mjs
```

| Endpoint | Response |
| --- | --- |
| `GET /health` | `{ "status": "ok" }` |
| `GET /config` | The environment name and log level |
| `GET /messages?lang=vi` | Messages for a locale. Falls back to the `Accept-Language` header, then English |

To run it in a container, build from the repository root:

```sh
docker build -f platforms/cloud/Dockerfile -t multiverse-hub-cloud .
docker run -p 8080:8080 multiverse-hub-cloud
```
