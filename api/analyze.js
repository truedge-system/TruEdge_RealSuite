/**
 * TruEdge Analysis API — POST /api/analyze
 * Runs a multi-agent TradingAgents analysis via Claude.
 * Body: { ticker, date?, depth? }
 */
const https = require("https");

const TRADING_AGENTS = [
  "market-researcher",
  "fundamentals-analyst",
  "earnings-reviewer",
  "sentiment-analyst",
  "bearish-researcher",
  "bullish-researcher",
  "portfolio-manager",
  "trader",
];

function callClaude(payload, apiKey) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);
    const options = {
      hostname: "api.anthropic.com",
      path: "/v1/messages",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error("Failed to parse Claude response"));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

module.exports = async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(200).end();

  if (req.method === "GET") {
    return res.status(200).json({
      status: "✅ TruEdge /api/analyze is live",
      platform: "TruEdge",
      agents: TRADING_AGENTS,
      usage: 'POST with { "ticker": "NVDA", "date": "2026-05-14" }',
    });
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { ticker, date, depth = "standard" } = req.body || {};

  if (!ticker) {
    return res.status(400).json({ error: "ticker is required" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "ANTHROPIC_API_KEY not configured in Vercel environment variables",
    });
  }

  const analysisDate = date || new Date().toISOString().split("T")[0];

  const payload = {
    model: process.env.TRUEDGE_DEEP_MODEL || "claude-opus-4-5",
    max_tokens: 1024,
    system:
      "You are TruEdge, a financial AI platform coordinating 8 TradingAgents. " +
      "Return ONLY a valid JSON object with these fields: " +
      "decision (BUY/SELL/HOLD), confidence (0-100), risk_level (LOW/MEDIUM/HIGH), " +
      "price_target (string), reasoning (string, 2-3 sentences), " +
      "agent_signals (object mapping each of the 8 agent names to their one-line signal), " +
      "final_recommendation (string, 1 sentence).",
    messages: [
      {
        role: "user",
        content: `Run a ${depth} TradingAgents analysis on ${ticker.toUpperCase()} as of ${analysisDate}. Coordinate all 8 agents: ${TRADING_AGENTS.join(", ")}.`,
      },
    ],
  };

  try {
    const claude = await callClaude(payload, apiKey);

    if (claude.error) {
      return res.status(500).json({ error: claude.error.message || "Claude API error" });
    }

    const rawContent = claude.content?.[0]?.text || "{}";
    const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
    const analysis = jsonMatch ? JSON.parse(jsonMatch[0]) : { raw: rawContent };

    return res.status(200).json({
      ticker: ticker.toUpperCase(),
      date: analysisDate,
      platform: "TruEdge",
      depth,
      agents_consulted: TRADING_AGENTS,
      model: process.env.TRUEDGE_DEEP_MODEL || "claude-opus-4-5",
      ...analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
