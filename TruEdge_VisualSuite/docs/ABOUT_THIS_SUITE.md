# ABOUT_THIS_SUITE.md — TruEdge_VisualSuite

## Purpose  
A rhythm-aware overlay engine that interprets tiered market behavior using pulse logic, glow zones, and session-aware tempo overlays.

## Modules  
- `TierPulse.ts`, `VisualLayer.ts`, `OverlayToggle.ts`, `StageEngine.ts`, `ColorTheme.ts`

## Orchestration Role  
Feeds overlays into `FusionMaster.ts` and `CockpitView.ts` via `ViewportSplitter.ts`.  
Syncs regime context using `RegimeBridge.ts`.

## Deployment Notes  
- Toggle-safe and scan/export compatible  
- Versioned under `v1.1_OverlaySync`
