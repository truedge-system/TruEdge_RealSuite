# ABOUT_THIS_SUITE.md — TruEdge_CompilerSuite

## Purpose  
Translates TruScript logic into ThinkScript overlays, manages drop presets, and syncs orchestration bundles from GitHub.

## Modules  
- `TruScriptCompiler.ts`, `DropManager.ts`, `GitHubPresetBridge.ts`, `ASTVisualizer.ts`

## Orchestration Role  
Routes drops into `FusionMaster.ts` and `LauncherShell.ts`.  
Syncs regime context via `RegimeBridge.ts`.

## Deployment Notes  
- Toggle-safe and orchestration-ready  
- Versioned under `v1.1_DropSync`
