// LM Studio proxy — streaming passthrough with auth injection
// No stream conversion. No tool stripping. Just auth + logging.
import http from "node:http";

const LM_PORT = 1234;
const PROXY_PORT = 1235;
const API_KEY = process.env.LM_API_KEY || "sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47";

process.on("uncaughtException", (e) => console.error(`[proxy ${ts()}] uncaught:`, e.message));
process.on("unhandledRejection", (e) => console.error(`[proxy ${ts()}] rejection:`, e));

function ts() { return new Date().toISOString().slice(11,23); }

const server = http.createServer((req, res) => {
  let body = [];
  req.on("data", chunk => body.push(chunk));
  req.on("error", (e) => console.error(`[proxy ${ts()}] req error:`, e.message));
  res.on("error", (e) => console.error(`[proxy ${ts()}] res error:`, e.message));

  req.on("end", () => {
    let bodyBuf = Buffer.concat(body);

    console.log(`[proxy ${ts()}] ${req.method} ${req.url}`);

    // Log chat completion requests
    if (req.method === "POST" && req.url.includes("/chat/completions")) {
      try {
        const data = JSON.parse(bodyBuf.toString());
        const model = data.model || "?";
        const msgCount = data.messages?.length || 0;
        const toolCount = data.tools?.length || 0;
        const stream = !!data.stream;
        const toolNames = (data.tools || []).map(t => t?.function?.name || '?').join(',');
        console.log(`[proxy ${ts()}] ${model} stream=${stream} msgs=${msgCount} tools=${toolCount} names=${toolNames}`);
      } catch(e) { /* log-only parse, ignore errors */ }
    }

    const opts = {
      hostname: "127.0.0.1", port: LM_PORT, path: req.url, method: req.method,
      headers: {
        ...req.headers,
        "authorization": `Bearer ${API_KEY}`,
        "content-length": bodyBuf.length,
        "host": `127.0.0.1:${LM_PORT}`,
      },
    };
    delete opts.headers["transfer-encoding"];

    const upstream = http.request(opts, (upRes) => {
      res.writeHead(upRes.statusCode, upRes.headers);
      upRes.pipe(res);
    });

    upstream.on("error", (e) => {
      console.error(`[proxy ${ts()}] upstream error:`, e.message);
      try { res.writeHead(502); res.end(JSON.stringify({error: e.message})); } catch(x) {}
    });

    upstream.setTimeout(600000);
    if (bodyBuf.length > 0) upstream.write(bodyBuf);
    upstream.end();
  });
});

server.on("error", (e) => console.error(`[proxy ${ts()}] server error:`, e.message));
server.listen(PROXY_PORT, "127.0.0.1", () => {
  console.log(`[proxy ${ts()}] LM Studio proxy :${PROXY_PORT} → :${LM_PORT} (passthrough)`);
});
