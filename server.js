import http from "node:http";
import { readFile } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = dirname(fileURLToPath(import.meta.url));
const port = Number(process.env.PORT || 3000);

const status = {
  service: "meshsense-ruview-status",
  state: "operational",
  evidenceLevel: "runtime-surface",
  source: "ndrorchestration/Meshsense",
  generatedAt: () => new Date().toISOString()
};

const server = http.createServer(async (req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ ...status, generatedAt: status.generatedAt() }));
    return;
  }

  if (req.url === "/api/status") {
    res.writeHead(200, { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" });
    res.end(JSON.stringify({ ...status, generatedAt: status.generatedAt() }));
    return;
  }

  if (req.url !== "/" && req.url !== "/index.html") {
    res.writeHead(404, { "content-type": "application/json; charset=utf-8" });
    res.end(JSON.stringify({ error: "not_found" }));
    return;
  }

  try {
    const html = await readFile(join(root, "public", "index.html"), "utf8");
    res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store" });
    res.end(html);
  } catch {
    res.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
    res.end("MeshSense status surface unavailable");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`MeshSense status listening on ${port}`);
});
