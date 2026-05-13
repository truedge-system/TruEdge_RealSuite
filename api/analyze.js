/**
 * TruEdge Signal API — POST /api/analyze
 * Runs TradingAgents 8-agent pipeline for a ticker + date.
 * Body: { ticker, date?, provider? }
 */
const { execSync } = require("child_process");
const path = require("path");

module.exports = async function handler(req, res) {
  if (req.method !== "POST")
    return res.status(405).json({ error: "Method Not Allowed — use POST" });

  const {
    ticker,
    date = new Date().toISOString().split("T")[0],
    provider,
  } = req.body || {};

  if (!ticker)
    return res.status(400).json({ error: "ticker is required" });

  const enginePath = path.join(
    process.cwd(),
    "packages/trading-agents/engine.py"
  );
  const providerArg = provider ? `--provider ${provider}` : "";

  try {
    const stdout = execSync(
      `python3 ${enginePath} --ticker ${ticker} --date ${date} ${providerArg}`,
      { timeout: 120_000, env: { ...process.env } }
    ).toString();
    return res.status(200).json(JSON.parse(stdout));
  } catch (err) {
    return res.status(500).json({ error: err.message, ticker, date });
  }
};
