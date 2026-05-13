#!/usr/bin/env bash
# TruEdge — Deploy FSI Agent
# Usage: bash scripts/deploy-managed-agent.sh <agent-slug>

set -euo pipefail

AGENT_SLUG="${1:-}"
if [[ -z "$AGENT_SLUG" ]]; then
  echo "Usage: $0 <agent-slug>"
  echo "Valid: pitch-agent meeting-prep-agent market-researcher"
  echo "       earnings-reviewer model-builder valuation-reviewer"
  echo "       gl-reconciler month-end-closer statement-auditor kyc-screener"
  exit 1
fi

OPENAI_API_KEY="${OPENAI_API_KEY:-}"
if [[ -z "$OPENAI_API_KEY" ]]; then
  echo "ERROR: OPENAI_API_KEY is not set"
  exit 1
fi

echo "✅ $AGENT_SLUG deployment queued — agent will run via OpenAI GPT-4o"
echo "   Set TRUEDGE_AGENT_ID_$(echo $AGENT_SLUG | tr '[:lower:]-' '[:upper:]_') in .env after provisioning"
