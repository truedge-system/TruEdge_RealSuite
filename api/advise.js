/**
 * TruEdge Advisory API — POST /api/advise
 * Dispatches to a Claude FSI named agent.
 * Body: { agent, message, context?, model? }
 */
const https = require("https");

const FSI_AGENTS = {
  "pitch-agent":        "Builds comps, precedents, LBO → branded pitch deck.",
  "meeting-prep-agent": "Produces briefing packs before client meetings.",
  "market-researcher":  "Sector/theme → industry overview, competitive landscape.",
  "earnings-reviewer":  "Earnings call + filings → model update → note draft.",
  "model-builder":      "DCF, LBO, 3-statement, comps.",
  "valuation-reviewer": "Valuation template, LP reporting.",
  "gl-reconciler":      "Break tracing, root cause, sign-off routing.",
  "month-end-closer":   "Accruals, roll-forwards, variance commentary.",
  "statement-auditor":  "LP statement audit before distribution.",
  "kyc-screener":       "Onboarding docs, rules engine, gap flags.",
};

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

module.exports = async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed" });

  const { agent = "market-researcher", message, context = {}, model } =
    req.body || {};

  if (!message)
    return res.status(400).json({ error: "message is required" });

  if (!FSI_AGENTS[agent])
    return res.status(400).json({
      error: `Unknown agent. Valid: ${Object.keys(FSI_AGENTS).join(", ")}`,
    });

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey)
    return res.status(500).json({ error: "OPENAI_API_KEY not configured" });

  const result = await post("https://api.openai.com/v1/chat/completions", {
    Authorization: `Bearer ${apiKey}`,
  }, {
    model: model || process.env.TRUEDGE_DEEP_MODEL || "gpt-4o",
    messages: [
      {
        role: "system",
        content: `You are the TruEdge ${agent}. ${FSI_AGENTS[agent]}
You apply the full Claude FSI skill ladder: comps, DCF, LBO, 3-statement,
KYC, GL reconciliation, and fund administration workflows.
Every output is a draft for human review — not investment, legal, or
accounting advice. Context: ${JSON.stringify(context)}`,
      },
      { role: "user", content: message },
    ],
    max_tokens: 4096,
  });

  return res.status(200).json({
    platform: "TruEdge",
    agent,
    agentDescription: FSI_AGENTS[agent],
    timestamp: new Date().toISOString(),
    source: "anthropics/financial-services",
    result,
  });
};
