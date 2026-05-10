# TruEdge_RealSuite — Modular Orchestration Monorepo

Welcome to the cockpit. This monorepo fuses every TruEdge module into a unified orchestration-grade system—ready for scan/export, remix, and deployment.

---

## 🧩 Submodule Index

| Folder Name            | Module Name             | Role                                | Version Tag             |
|------------------------|-------------------------|-------------------------------------|-------------------------|
| `TruEdge_TradePlatform`| Execution Engine        | Entry/exit logic, journaling        | `v1.1_ScanSync`         |
| `TruEdge_VisualSuite`  | Overlay Engine          | Pulse overlays, SoulPatch themes    | `v1.1_OverlaySync`      |
| `TruEdge_CompilerSuite`| TruScript Compiler      | Drop manager, GitHub sync           | `v1.1_DropSync`         |
| `TruEdge_Studio`       | Layout Sandbox          | Panel testing, live preview         | `v1.1_LivePreview`      |
| `TruEdge_Backend`      | API Infrastructure      | Drop sync, metadata routing         | `v1.1_MetadataSync`     |
| `TruEdge_UIAssets`     | Visual Assets           | Themes, icons, animations           | `v1.1_OrchestrationSync`|

---

## 🔗 Orchestration Entry Points

- `FusionMaster.ts` — Central signal and overlay coordinator
- `LauncherShell.ts` — Scan/export interface
- `CockpitView.ts` — HUD diagnostics and commentary
- `RegimeBridge.ts` — Shared regime context
- `DropManager.ts` — Drop injection and preset routing

---

## 🧠 Design Philosophy

- **Modular over monolithic** — Each module is isolated, documented, and orchestration-safe
- **Visual clarity over clutter** — HUD overlays and diagnostics display only when toggled
- **Remixability over rigidity** — DropVault presets, TruScript logic, and Launchpad shells are designed for public remix and open-source collaboration

---

## 📝 License

MIT — remix, extend, and build your legacy.
name: Deploy to Vercel

on:
  push:
    branches:
      - main

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Vercel Deploy Hook
        run: |
          curl -X POST "${{ secrets.VERCEL_DEPLOY_HOOK_URL }}"
