# TruEdge_CompilerSuite — TruScript Compiler & Drop Manager

This module translates TruScript logic into ThinkScript overlays, manages drop-class presets, and syncs GitHub-based orchestration bundles.

---

## 🔧 Modules

- `TruScriptCompiler.ts` — Parses `.tru` logic into ThinkScript
- `DropManager.ts` — Loads, injects, and routes drop presets
- `GitHubPresetBridge.ts` — Syncs drops from remote repos
- `ASTVisualizer.ts` — Displays parsed logic trees
- `PresetLoader.ts` — Loads `.tru` files from `/src/presets/`

---

## 🔗 Orchestration Sync

- Routes drops into `FusionMaster.ts` and `LauncherShell.ts`
- Syncs regime context via `RegimeBridge.ts`
- Indexed in `TruEdge_Launchpad/README.md` under “Compiler Modules”

---

## 🧭 Version Tags

- `v1.0_CompilerBase` — Initial release
- `v1.1_DropSync` — Adds GitHub preset loader and orchestration routing

---

## 📝 Deployment Notes

- Compatible with DropVault presets
- Toggle-safe for orchestration shells
- Auto-deployed via Vercel at `truedge-compiler.vercel.app`

---

## 🛠️ Roadmap

- Add TruScript-to-Visual Composer UI
- Enable Gist-style publishing and cloud drop sync
