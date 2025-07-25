# TruEdge_Studio — Layout Logic & Live Preview Sandbox

This module provides a testing ground for cockpit panels, layout logic, and live preview orchestration. Designed for rapid prototyping and visual diagnostics.

---

## 🔧 Modules

- `PanelTests.ts` — HUD layout and toggle logic
- `LayoutLogic.ts` — Visual separation and regime sync
- `LivePreview.ts` — Real-time overlay preview engine
- `StudioConfig.json` — Sandbox parameters

---

## 🔗 Orchestration Sync

- Feeds into `CockpitView.ts` and `FusionMaster.ts`
- Syncs regime context via `RegimeBridge.ts`
- Indexed in `TruEdge_Launchpad/README.md` under “Studio Modules”

---

## 🧭 Version Tags

- `v1.0_StudioBase` — Initial release
- `v1.1_LivePreview` — Adds real-time overlay preview and layout sync

---

## 📝 Deployment Notes

- Toggle-safe for orchestration shells
- Compatible with DropVault visual presets
- Designed for layout prototyping and cockpit testing

---

## 🛠️ Roadmap

- Add ML-driven layout suggestions
- Integrate with TruScript visual composer
