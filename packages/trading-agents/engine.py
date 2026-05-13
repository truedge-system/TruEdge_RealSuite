"""
TruEdge x TradingAgents — Python Signal Engine
Wraps TradingAgentsGraph for the TruEdge orchestration layer.
Uses OpenAI (GPT-4o) as the LLM provider.

Install:  pip install tradingagents
Run:      python3 packages/trading-agents/engine.py --ticker NVDA --date 2026-05-13
"""

import os, sys, json, argparse, logging
from datetime import datetime

# TruEdge env-var config
os.environ.setdefault("TRADINGAGENTS_LLM_PROVIDER",   os.getenv("TRUEDGE_LLM_PROVIDER",   "openai"))
os.environ.setdefault("TRADINGAGENTS_DEEP_THINK_LLM",  os.getenv("TRUEDGE_DEEP_MODEL",     "gpt-4o"))
os.environ.setdefault("TRADINGAGENTS_QUICK_THINK_LLM", os.getenv("TRUEDGE_QUICK_MODEL",    "gpt-4o-mini"))
os.environ.setdefault("TRADINGAGENTS_MAX_DEBATE_ROUNDS", os.getenv("TRUEDGE_DEBATE_ROUNDS","2"))

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [TruEdge/TradingAgents] %(levelname)s %(message)s",
)
log = logging.getLogger(__name__)


def build_config(overrides: dict = None) -> dict:
    from tradingagents.default_config import DEFAULT_CONFIG
    cfg = DEFAULT_CONFIG.copy()
    cfg["llm_provider"]       = os.getenv("TRADINGAGENTS_LLM_PROVIDER",    "openai")
    cfg["deep_think_llm"]     = os.getenv("TRADINGAGENTS_DEEP_THINK_LLM",  "gpt-4o")
    cfg["quick_think_llm"]    = os.getenv("TRADINGAGENTS_QUICK_THINK_LLM", "gpt-4o-mini")
    cfg["max_debate_rounds"]  = int(os.getenv("TRADINGAGENTS_MAX_DEBATE_ROUNDS", "2"))
    cfg["checkpoint_enabled"] = os.getenv("TRUEDGE_CHECKPOINT", "false").lower() == "true"
    if overrides:
        cfg.update(overrides)
    return cfg


def run_analysis(ticker: str, date: str, overrides: dict = None) -> dict:
    """Run the full 8-agent TradingAgents pipeline for a single ticker + date."""
    from tradingagents.graph.trading_graph import TradingAgentsGraph
    log.info("Starting analysis — ticker=%s date=%s", ticker, date)
    cfg = build_config(overrides)
    ta  = TradingAgentsGraph(debug=False, config=cfg)
    state, decision = ta.propagate(ticker, date)
    result = {
        "ticker":    ticker,
        "date":      date,
        "decision":  decision,
        "agents": {
            "analyst_team":   ["fundamentals-analyst", "sentiment-analyst",
                               "news-analyst", "technical-analyst"],
            "researcher_team": ["bullish-researcher", "bearish-researcher"],
            "execution_team":  ["trader", "portfolio-manager"],
        },
        "config": {
            "provider":      cfg["llm_provider"],
            "deep_model":    cfg["deep_think_llm"],
            "quick_model":   cfg["quick_think_llm"],
            "debate_rounds": cfg["max_debate_rounds"],
        },
        "timestamp": datetime.utcnow().isoformat() + "Z",
        "source":    "TauricResearch/TradingAgents@v0.2.5",
        "platform":  "TruEdge",
    }
    log.info("Analysis complete — decision=%s", decision)
    return result


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="TruEdge TradingAgents Signal Engine")
    parser.add_argument("--ticker",   required=True, help="Stock ticker e.g. NVDA")
    parser.add_argument("--date",     required=True, help="Analysis date YYYY-MM-DD")
    parser.add_argument("--provider", default=None,  help="Override LLM provider")
    parser.add_argument("--output",   default="-",   help="Output file path (- = stdout)")
    args = parser.parse_args()

    overrides = {}
    if args.provider:
        overrides["llm_provider"] = args.provider

    result  = run_analysis(args.ticker, args.date, overrides)
    payload = json.dumps(result, indent=2)

    if args.output == "-":
        print(payload)
    else:
        with open(args.output, "w") as f:
            f.write(payload)
        log.info("Result written to %s", args.output)
