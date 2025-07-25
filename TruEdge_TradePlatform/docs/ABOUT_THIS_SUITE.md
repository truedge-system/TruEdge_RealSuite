# ABOUT_THIS_SUITE.md — TruEdge_TradePlatform

## Purpose  
Provides execution logic, scan routing, and journaling infrastructure for orchestration shells.

## Modules  
- `ExecutionCore.ts` — Entry/exit logic
- `ScannerColumn.ts` — Signal surfacing
- `TradeJournal.csv` — Outcome tracking
- `Config.json` — Shared parameters

## Orchestration Role  
Routes signals into `LauncherShell.ts` and `FusionMaster.ts`.  
Syncs regime context via `RegimeBridge.ts`.

## Deployment Notes  
- Toggle-safe and scan/export compatible  
- Versioned under `v1.1_ScanSync`
