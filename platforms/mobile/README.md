# Platform: mobile

A minimal [Expo](https://expo.dev) (React Native) app for iOS and Android. It shows translated messages from `civilizations/` and lets you switch between English, Vietnamese, and Japanese.

Requires Node.js 20 or newer.

```sh
cd platforms/mobile
npm install
npm start
```

Then scan the QR code with the Expo Go app, or press `i` for the iOS simulator or `a` for the Android emulator.

To add a language, create `civilizations/<locale>/messages.json` and register it in the `LOCALES` map in `App.js`.
