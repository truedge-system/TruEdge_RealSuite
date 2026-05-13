/**
 * TruEdge Orchestration API — POST /api/orchestrate
 * Full pipeline: TradingAgents signal + Claude FSI advisory in one call.
 * Body: { ticker, date?, agents?, mode? }
 * Modes: "signal" | "advisory" | "full"
 */
const { execSync } = require("child_process");
const path = require("path");
const https = require("https");

function post(url, headers, body) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(body);
    const u = new URL(url);
    const req = https.request(
      {
        hostname: u.hostname,
        path: u.pathname + u.search,
        method: "POST",
        headers: {
          ...headers,
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(data),
        },
      },
      (res) => {
        let raw = "";
        res.on("data", (c) => (raw += c));
        res.on("end", () => {
          try { resolve(JSON.parse(raw)); }
          catch { resolve({ raw }); }
        });
      }
    );
    req.on("error", reject);
    req.write(data);
    req.end();
  });
}

async function runTradingAgents(ticker, date) {
  const enginePath = path.join(
    process.cwd(),
    "packages/trading-agents/engine.py"
  );
  try {
    const stdout = execSync(
      `python3 ${enginePath} --ticker ${ticker} --date ${date}`,
      { timeout: 120_000, env: { ...process.env } }
    ).toString();
    return JSON.parse(stdout);
  } catch (err) {
    return { error: err.message, ticker, date, decision: null };
  }
}

async function runFSIAgent(agent, ticker, date, signal) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return { error: "OPENAI_API_KEY not set" };

  return post("https://api.openai.com/v1/chat/completions", {
    Authorization: `Bearer ${apiKey}`,
  }, {
    model: process.env.TRUEDGE_DEEP_MODEL || "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are the TruEdge ${agent} FSI agent.
Every output is a draft for human review — not investment advice.`,
      },
      {
        role: "user",
        content: `Provide a comprehensive ${ticker} analysis for ${date}.
TradingAgents signal: ${signal || "pending"}.
Include: sector overview, key risks, valuation quick-take,
and recommended next steps for human review.`,
      },
    ],
    max_tokens: 4096,
  });
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed — use POST" });

  const {
    ticker,
    date    = new Date().toISOString().split("T")[0],
    agents  = ["market-researcher", "earnings-reviewer"],
    mode    = "full",
  } = req.body || {};

  if (!ticker)
    return res.status(400).json({ error: "ticker is required" });

  const packet = {
    platform:  "TruEdge",
    ticker,
    date,
    mode,
    timestamp: new Date().toISOString(),
    signal:    null,
    advisory:  {},
    errors:    [],
  };

  if (mode === "signal" || mode === "full") {
    packet.signal = await runTradingAgents(ticker, date);
    if (packet.signal?.error)
      packet.errors.push({ layer: "trading-agents", error: packet.signal.error });
  }

  if (mode === "advisory" || mode === "full") {
    const signal = packet.signal?.decision || "pending";
    const results = await Promise.allSettled(
      agents.map((slug) => runFSIAgent(slug, ticker, date, signal))
    );
    agents.forEach((slug, i) => {
      const r = results[i];
      if (r.status === "fulfilled") packet.advisory[slug] = r.value;
      else packet.errors.push({ layer: "claude-fsi", agent: slug, error: r.reason?.message });
    });
  }

  return res.status(200).json(packet);
};
