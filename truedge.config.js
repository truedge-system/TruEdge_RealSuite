// truedge.config.js — Unified TruEdge platform configuration
module.exports = {
  platform: {
    name: "TruEdge",
    version: "1.0.0",
    org: "truedge-system",
  },
  llm: {
    provider: process.env.TRUEDGE_LLM_PROVIDER || "openai",
    deepModel: process.env.TRUEDGE_DEEP_MODEL   || "gpt-4o",
    quickModel: process.env.TRUEDGE_QUICK_MODEL || "gpt-4o-mini",
  },
  tradingAgents: {
    version: "0.2.5",
    debateRounds: parseInt(process.env.TRUEDGE_DEBATE_ROUNDS || "2"),
    checkpoint: process.env.TRUEDGE_CHECKPOINT === "true",
    marketDataProvider: "alpha_vantage",
    agents: [
      "fundamentals-analyst",
      "sentiment-analyst",
      "news-analyst",
      "technical-analyst",
      "bullish-researcher",
      "bearish-researcher",
      "trader",
      "portfolio-manager",
    ],
  },
  fsiAgents: [
    "pitch-agent",
    "meeting-prep-agent",
    "market-researcher",
    "earnings-reviewer",
    "model-builder",
    "valuation-reviewer",
    "gl-reconciler",
    "month-end-closer",
    "statement-auditor",
    "kyc-screener",
  ],
  mcp: {
    connectors: [
      "factset", "sp-global", "morningstar", "moodys", "pitchbook",
      "lseg", "daloopa", "aiera", "chronograph", "mt-newswires", "egnyte",
    ],
  },
  repos: {
    "TruEdge_RealSuite":              "platform",
    "--TruEdge_OrchestrationShells---": "orchestrator",
    "--TruEdge_CompilerSuite---":      "compiler",
    "TruEdge_Launchpad":              "launcher",
  },
};
