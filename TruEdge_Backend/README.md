# TruEdge_Backend — Node + Express API Layer

This module powers backend orchestration for the TruEdge ecosystem, including drop sync, user auth, and data routing.

---

## 🔧 Modules

- `routes/` — API endpoints for drop metadata, diagnostics, and orchestration sync
- `auth/` — Token-based user authentication and session management
- `data-sync/` — GitHub preset loader, drop registry, and orchestration cache

---

## 🔗 Orchestration Sync

- Powers `DropManager.ts` and `GitHubPresetBridge.ts` in `TruEdge_CompilerSuite`
- Syncs drop metadata into `FusionMaster.ts` and `CockpitView.ts`
- Indexed in `TruEdge_Launchpad/README.md` under “Infrastructure Modules”

---

## 🧭 Version Tags

- `v1.0_BackendBase` — Initial API deployment
- `v1.1_MetadataSync` — Adds drop registry and orchestration cache

---

## 📝 Deployment Notes

- Built with Node.js + Express
- Supports GitHub webhook triggers and Vercel sync
- Designed for modular expansion (e.g. ML feedback, drop scoring API)

---

## 🛠️ Roadmap

- Add drop diagnostics endpoint for CockpitView overlays
- Enable real-time orchestration sync via WebSocket
