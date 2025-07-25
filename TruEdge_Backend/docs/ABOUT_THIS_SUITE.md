# ABOUT_THIS_SUITE.md — TruEdge_Backend

## Purpose  
Provides backend API infrastructure for drop sync, orchestration metadata, and GitHub integration.

## Modules  
- `routes/`, `auth/`, `data-sync/`

## Orchestration Role  
Feeds metadata into `DropManager.ts`, `FusionMaster.ts`, and `CockpitView.ts`.  
Supports GitHub-based drop sync and orchestration cache.

## Deployment Notes  
- Node.js + Express  
- Versioned under `v1.1_MetadataSync`
