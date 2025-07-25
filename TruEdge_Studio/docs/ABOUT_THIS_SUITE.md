# ABOUT_THIS_SUITE.md — TruEdge_Studio

## Purpose  
Provides layout logic, panel testing, and live preview orchestration for cockpit modules.

## Modules  
- `PanelTests.ts`, `LayoutLogic.ts`, `LivePreview.ts`, `StudioConfig.json`

## Orchestration Role  
Feeds into `CockpitView.ts` and `FusionMaster.ts`.  
Syncs regime context via `RegimeBridge.ts`.

## Deployment Notes  
- Toggle-safe and orchestration-ready  
- Versioned under `v1.1_LivePreview`
