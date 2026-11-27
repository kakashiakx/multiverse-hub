# multiverse-hub

Multi-universe, multi-platform, multi-environment, multi-civilization.

A single repository that organizes everything along four dimensions:

| Dimension | Directory | Meaning |
| --- | --- | --- |
| Universe | `universes/` | Independent worlds, contexts, or projects |
| Platform | `platforms/` | Web, mobile, desktop, cloud, IoT, and so on |
| Environment | `environments/` | dev, staging, production, sandbox, and so on |
| Civilization | `civilizations/` | Languages, cultures, and localization |

Shared code lives in `shared/`, and automation lives in `scripts/`.

## Getting started

Requires Node.js 20 or newer. There are no dependencies to install.

```sh
cp .env.example .env   # fill in real values
npm run validate       # check the repository structure
npm test               # run the tests
```

Use the shared helpers from any platform:

```js
import { loadConfig, loadMessages, t } from "./shared/src/index.mjs";

const config = await loadConfig("dev");
const messages = await loadMessages("vi");
console.log(config.apiUrl, t(messages, "welcome"));
```

## Adding things

- New universe: add `universes/<name>/` with a `universe.json`.
- New environment: add `environments/<name>/config.json` and list it in `shared/src/config.mjs`.
- New language: add `civilizations/<locale>/messages.json`. Missing keys fall back to English.
- New platform: add `platforms/<name>/` with a README.

See [`docs/`](docs/README.md) for the architecture and roadmap, and [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request.

## License

[MIT](LICENSE)
