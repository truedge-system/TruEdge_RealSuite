#!/usr/bin/env bash
# TruEdge Full Setup Script
# Run once after cloning: bash scripts/setup.sh

set -euo pipefail
echo "═══════════════════════════════════════════════"
echo " TruEdge x TradingAgents x Claude FSI — Setup"
echo "═══════════════════════════════════════════════"

# Python venv + TradingAgents
echo "→ Setting up Python environment..."
python3 -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install tradingagents pyyaml requests

# Copy .env template
if [[ ! -f ".env" ]]; then
  cp .env.example .env
  echo "→ .env created — fill in your API keys!"
else
  echo "→ .env already exists — skipping"
fi

# Node dependencies
if [[ -f "package.json" ]]; then
  echo "→ Installing Node dependencies..."
  npm install
fi

echo ""
echo "✅ TruEdge setup complete!"
echo ""
echo "Quick test:"
echo "  source .venv/bin/activate"
echo "  python3 packages/trading-agents/engine.py --ticker SPY --date $(date +%Y-%m-%d)"
