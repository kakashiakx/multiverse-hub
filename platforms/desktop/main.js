const { app, BrowserWindow, ipcMain } = require("electron");
const fs = require("node:fs/promises");
const path = require("node:path");

const repoRoot = path.resolve(__dirname, "..", "..");
const FALLBACK_LOCALE = "en";
const LOCALE_PATTERN = /^[a-z]{2}(-[A-Z]{2})?$/;

async function readMessages(locale) {
  const file = path.join(repoRoot, "civilizations", locale, "messages.json");
  return JSON.parse(await fs.readFile(file, "utf8"));
}

// English is the fallback, so other locales only need the keys they translate.
ipcMain.handle("messages:get", async (_event, locale) => {
  const fallback = await readMessages(FALLBACK_LOCALE);
  if (locale === FALLBACK_LOCALE || !LOCALE_PATTERN.test(locale)) {
    return fallback;
  }
  try {
    return { ...fallback, ...(await readMessages(locale)) };
  } catch (error) {
    if (error.code === "ENOENT") return fallback;
    throw error;
  }
});

ipcMain.handle("locales:list", async () => {
  const entries = await fs.readdir(path.join(repoRoot, "civilizations"), {
    withFileTypes: true,
  });
  return entries
    .filter((entry) => entry.isDirectory() && LOCALE_PATTERN.test(entry.name))
    .map((entry) => entry.name)
    .sort();
});

function createWindow() {
  const window = new BrowserWindow({
    width: 640,
    height: 400,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  window.loadFile(path.join(__dirname, "renderer", "index.html"));
}

app.whenReady().then(() => {
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});
