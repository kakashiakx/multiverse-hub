const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("multiverse", {
  getMessages: (locale) => ipcRenderer.invoke("messages:get", locale),
  listLocales: () => ipcRenderer.invoke("locales:list"),
});
