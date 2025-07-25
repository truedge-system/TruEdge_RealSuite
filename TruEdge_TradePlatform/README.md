# TruEdge_TradePlatform — Execution, Scanning, Journaling

This module handles trade execution logic, scanner column routing, and journaling infrastructure for the TruEdge ecosystem.

---

## 🔧 Modules

- `TruEdge_ExecutionCore.ts` — Entry/exit logic with cooldown management
- `TruEdge_ScannerColumn.ts` — Signal surfacing for scan/export
- `TruEdge_TradeJournal.csv` — Outcome tracking and journaling
- `TruEdge_Config.json` — Shared parameters across modules

---

## 🔗 Orchestration Sync

- Feeds into `LauncherShell.ts` for scan/export routing
- Syncs regime context via `RegimeBridge.ts`
- Indexed in `TruEdge_Launchpad/README.md` under “Execution Modules”

---

## 🧭 Version Tags

- `v1.0_ExecutionBase` — Initial release
- `v1.1_ScanSync` — Adds scan/export compatibility and regime sync

---

## 📝 Deployment Notes

- Toggle-safe for orchestration shells
- Compatible with DropVault presets and commentary overlays
- Designed for modular expansion (e.g. divergence overlays, volume filters)

---

## 🛠️ Roadmap

- Add ML override layer for entry bias
- Integrate journaling feedback into CockpitView diagnostics
