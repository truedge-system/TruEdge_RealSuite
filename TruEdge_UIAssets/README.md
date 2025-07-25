# TruEdge_UIAssets — Branded Themes, Icons, and Animations

This module contains visual assets for cockpit overlays, HUD panels, and orchestration shells.

---

## 🎨 Assets

- `themes/` — Branded color palettes for overlays and diagnostics
- `icons/` — TruEdge icon sets for HUD panels and commentary tags
- `animations/` — Glow pulses, tier transitions, and regime fades

---

## 🔗 Orchestration Sync

- Used by `CockpitView.ts`, `FusionMaster.ts`, and `ViewportSplitter.ts`
- Syncs with `ThemeBridge.ts` and `OverlayToggle.ts` in `TruEdge_VisualSuite`
- Indexed in `TruEdge_Launchpad/README.md` under “Visual Assets”

---

## 🧭 Version Tags

- `v1.0_VisualBase` — Initial theme and icon deployment
- `v1.1_OrchestrationSync` — Adds regime-aware animations and theme bridge logic

---

## 📝 Deployment Notes

- Assets are toggle-safe and orchestration-ready
- Compatible with DropVault visual presets
- Designed for remixing and theme expansion

---

## 🛠️ Roadmap

- Add SoulMap™ visuals and adaptive tempo layers
- Extend icon set for commentary routing and diagnostics
