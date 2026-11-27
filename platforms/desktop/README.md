# Platform: desktop

A minimal [Electron](https://www.electronjs.org) app for Windows, macOS, and Linux. It shows translated messages from `civilizations/` and lists every locale it finds there in a dropdown.

Requires Node.js 20 or newer.

```sh
cd platforms/desktop
npm install
npm start
```

The app reads locale files from the repository, so run it from a full checkout. If you package it for distribution, copy `civilizations/` into the app bundle and update `repoRoot` in `main.js`.
