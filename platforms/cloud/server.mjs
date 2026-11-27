import http from "node:http";
import { fileURLToPath } from "node:url";
import { loadConfig, loadMessages } from "../../shared/src/index.mjs";

/** Pick a language from ?lang=xx, then the Accept-Language header, then English. */
function pickLocale(url, acceptLanguage) {
  const fromQuery = url.searchParams.get("lang");
  if (fromQuery) return fromQuery;
  const first = (acceptLanguage ?? "").split(",")[0].split(";")[0].trim();
  return first.split("-")[0].toLowerCase() || "en";
}

function sendJson(res, status, body) {
  res.writeHead(status, { "content-type": "application/json; charset=utf-8" });
  res.end(JSON.stringify(body));
}

export function createServer() {
  return http.createServer(async (req, res) => {
    try {
      const url = new URL(req.url, "http://localhost");

      if (req.method !== "GET") {
        return sendJson(res, 405, { error: "Method not allowed" });
      }

      if (url.pathname === "/health") {
        return sendJson(res, 200, { status: "ok" });
      }

      if (url.pathname === "/config") {
        const { name, logLevel } = await loadConfig();
        return sendJson(res, 200, { name, logLevel });
      }

      if (url.pathname === "/messages") {
        const locale = pickLocale(url, req.headers["accept-language"]);
        return sendJson(res, 200, await loadMessages(locale));
      }

      return sendJson(res, 404, { error: "Not found" });
    } catch (error) {
      console.error(error);
      return sendJson(res, 500, { error: "Internal server error" });
    }
  });
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const port = Number(process.env.PORT ?? 3000);
  createServer().listen(port, () => {
    console.log(`multiverse-hub API listening on port ${port}`);
  });
}
