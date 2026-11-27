const titleElement = document.getElementById("title");
const welcomeElement = document.getElementById("welcome");
const localeSelect = document.getElementById("locale");

async function render(locale) {
  const messages = await window.multiverse.getMessages(locale);
  document.documentElement.lang = locale;
  titleElement.textContent = messages.title;
  welcomeElement.textContent = messages.welcome;
}

async function main() {
  const locales = await window.multiverse.listLocales();
  for (const locale of locales) {
    const option = document.createElement("option");
    option.value = locale;
    option.textContent = locale;
    localeSelect.append(option);
  }
  localeSelect.value = locales.includes("en") ? "en" : locales[0];
  localeSelect.addEventListener("change", () => render(localeSelect.value));
  await render(localeSelect.value);
}

main();
