// LM Studio proxy — converts stream→non-stream + injects reasoning_effort=none
// Handles: content responses, tool_calls, and mixed responses
import http from "node:http";

const LM_PORT = 1234;
const PROXY_PORT = 1235;
const API_KEY = "sk-lm-lTx6H171:rNxT8R8M7ptHEyiQUU47";

process.on("uncaughtException", (e) => console.error(`[proxy ${ts()}] uncaught:`, e.message));
process.on("unhandledRejection", (e) => console.error(`[proxy ${ts()}] rejection:`, e));

function ts() { return new Date().toISOString().slice(11,23); }

function makeSseChunk(id, model, delta, finishReason = null, usage = null) {
  const chunk = {
    id, object: "chat.completion.chunk", created: Math.floor(Date.now()/1000),
    model, choices: [{ index: 0, delta, finish_reason: finishReason }]
  };
  if (usage) chunk.usage = usage;
  return `data: ${JSON.stringify(chunk)}\n\n`;
}

const server = http.createServer((req, res) => {
  let body = [];
  req.on("data", chunk => body.push(chunk));
  req.on("error", (e) => console.error(`[proxy ${ts()}] req error:`, e.message));
  res.on("error", (e) => console.error(`[proxy ${ts()}] res error:`, e.message));

  req.on("end", () => {
    let bodyBuf = Buffer.concat(body);
    let wasStream = false;
    let model = "?";

    console.log(`[proxy ${ts()}] ${req.method} ${req.url}`);

    if (req.method === "POST" && req.url.includes("/chat/completions")) {
      try {
        const data = JSON.parse(bodyBuf.toString());
        model = data.model || "?";
        data.reasoning_effort = "none";
        wasStream = !!data.stream;
        data.stream = false;

        // Tool loop cap: strip tools to force text response
        const msgCount = data.messages?.length || 0;
        const toolCount = data.tools?.length || 0;
        // Extract last message text (handles string or array-of-parts format)
        const rawLast = data.messages?.[data.messages.length - 1]?.content || "";
        const lastMsg = typeof rawLast === 'string' ? rawLast : 
          (Array.isArray(rawLast) ? rawLast.map(p => p.text || '').join(' ') : JSON.stringify(rawLast));
        if (msgCount <= 3) console.log(`[proxy ${ts()}] BOOT_DBG: msgs=${msgCount} last="${lastMsg.slice(0,120)}"`);
        // Detect boot heartbeats: msgs<=3 with boot-check content → strip tools for fast boot
        const isHeartbeat = msgCount <= 3 && toolCount > 0 && (
          lastMsg.includes("boot check") || lastMsg.includes("BOOT.md") ||
          lastMsg.includes("__openclaw") || lastMsg.includes("heartbeat") ||
          lastMsg.includes("HEARTBEAT") || lastMsg.includes("NO_REPLY")
        );
        if (isHeartbeat && toolCount > 0) {
          console.log(`[proxy ${ts()}] ⚡ HEARTBEAT DETECTED: stripping ${toolCount} tools for fast boot`);
          delete data.tools;
          delete data.tool_choice;
        } else if (msgCount > 40 && toolCount > 0) {
          console.log(`[proxy ${ts()}] ⚠️ TOOL CAP: ${msgCount} msgs, stripping ${toolCount} tools to force text response`);
          delete data.tools;
          delete data.tool_choice;
        }

        bodyBuf = Buffer.from(JSON.stringify(data));
        console.log(`[proxy ${ts()}] ${model} stream=${wasStream}→false msgs=${msgCount} tools=${data.tools?.length || 0}`);
      } catch(e) { console.error(`[proxy ${ts()}] parse error:`, e.message); }
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
      console.log(`[proxy ${ts()}] upstream ${upRes.statusCode} wasStream=${wasStream}`);
      if (!wasStream) {
        res.writeHead(upRes.statusCode, upRes.headers);
        upRes.pipe(res);
      } else {
        let chunks = [];
        upRes.on("data", c => chunks.push(c));
        upRes.on("end", () => {
          const raw = Buffer.concat(chunks).toString();
          console.log(`[proxy ${ts()}] upstream done: ${raw.length}b`);
          try {
            const data = JSON.parse(raw);
            const choice = data.choices?.[0];
            const content = choice?.message?.content || "";
            const toolCalls = choice?.message?.tool_calls;
            const finishReason = choice?.finish_reason || "stop";
            const mname = data.model || model;
            const id = data.id || "chatcmpl-proxy";

            res.writeHead(200, {
              "Content-Type": "text/event-stream",
              "Cache-Control": "no-cache",
              "Connection": "keep-alive",
            });

            // Chunk 1: role assignment
            res.write(makeSseChunk(id, mname, { role: "assistant" }));

            // Chunk 2: content (if present)
            if (content) {
              console.log(`[proxy ${ts()}] content: "${content.slice(0,80)}..." (${content.length} chars)`);
              res.write(makeSseChunk(id, mname, { content }));
            }

            // Chunk 3+: tool_calls (if present)
            if (toolCalls && toolCalls.length > 0) {
              console.log(`[proxy ${ts()}] tool_calls: ${toolCalls.length} calls [${toolCalls.map(t => t.function?.name).join(', ')}]`);
              for (const tc of toolCalls) {
                // Send each tool_call as a separate SSE chunk (streaming format)
                res.write(makeSseChunk(id, mname, {
                  tool_calls: [{
                    index: tc.index ?? 0,
                    id: tc.id,
                    type: "function",
                    function: { name: tc.function.name, arguments: tc.function.arguments }
                  }]
                }));
              }
            }

            if (!content && (!toolCalls || toolCalls.length === 0)) {
              console.log(`[proxy ${ts()}] WARNING: no content, no tool_calls! finish=${finishReason} raw=${raw.slice(0,300)}`);
              res.write(makeSseChunk(id, mname, { content: "(empty response)" }));
            }

            // Final chunk: finish + usage
            const usage = data.usage || {};
            res.write(makeSseChunk(id, mname, {}, finishReason, {
              prompt_tokens: usage.prompt_tokens || 0,
              completion_tokens: usage.completion_tokens || 0,
              total_tokens: usage.total_tokens || 0,
            }));
            res.write("data: [DONE]\n\n");
            res.end();
          } catch(e) {
            console.error(`[proxy ${ts()}] SSE convert error:`, e.message);
            console.error(`[proxy ${ts()}] raw: ${raw.slice(0,300)}`);
            res.writeHead(upRes.statusCode || 500, upRes.headers);
            res.end(raw);
          }
        });
      }

      upRes.on("error", (e) => {
        console.error(`[proxy ${ts()}] upstream read error:`, e.message);
        res.end();
      });
    });

    upstream.on("error", (e) => {
      console.error(`[proxy ${ts()}] upstream error:`, e.message);
      try { res.writeHead(502); res.end(JSON.stringify({error: e.message})); } catch(x) {}
    });

    upstream.setTimeout(300000);
    if (bodyBuf.length > 0) upstream.write(bodyBuf);
    upstream.end();
  });
});

server.on("error", (e) => console.error(`[proxy ${ts()}] server error:`, e.message));
server.listen(PROXY_PORT, "127.0.0.1", () => {
  console.log(`[proxy ${ts()}] LM Studio proxy :${PROXY_PORT} → :${LM_PORT}`);
});
