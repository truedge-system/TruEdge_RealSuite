# FusionMaster Commentary
## A cockpit-grade narrative of real-time orchestration

FusionMaster coordinates the live behavior of core modules—signals, diagnostics, overlays, and regime sync—across multiple timeframes and pattern classes. This commentary serves as the operator’s manual for understanding fusion logic and system behavior in context.

---

## 🔄 Timeframe Sync & Signal Fusion

FusionMaster runs a multi-timeframe signal engine that fuses:

- **Primary Pulse Signals:** From `HarmonicPulse`, `PatternPulse`, and `FractalSync` layers
- **Regime-Aware Filters:** Supplied by `RegimeOverlay` modules (e.g. TrendState, VolatilityLens)
- **Contextual Overrides:** From `MLOverride` and `EventSync` classes

These signals are scored, merged, and ranked in the `FusionScore` engine, with real-time annotations in the cockpit shell.

---

## 🧩 Overlay Integration

All overlays feed FusionMaster with normalized states:

| Overlay Module       | Input Flow     | Cockpit Output              |
|----------------------|----------------|------------------------------|
| `HarmonicPulse`      | Pattern Type   | Signal ID + Validity Markers |
| `RegimeOverlay`      | Trend/Volatility | Filtered Enable Flags     |
| `DivergenceEngine`   | Strength Score | Confirmation Overlay         |
| `FractalSync`        | Resolution Lag | Layer Sync Marker            |

Toggle switches and overlay masks allow visual separation per module.

---

## 🧠 Commentary Labels

The cockpit shell displays live commentary such as:

- `🟢 Fusion Long Bias active (Regime OK, Pattern Confirmed)`
- `🟡 Divergence cross detected, awaiting TrendState`
- `🔴 FusionScore < 0.5 – overrides on hold`

Each label is tied to a `DropClass` and visualized within `CockpitView`.

---

## 🗂 Commentary Sources

Signals and commentary are logged for:

- **Fusion Diagnostics** (`FusionScoreLog`)
- **Trade Setup Classifiers** (`DropClassManager`)
- **Module Tracebacks** (`FusionTraceShell`)

These can be used in live dashboards or exported for audit.

---

## 🔧 Deployment Notes

- Ensure `FusionMasterShell` is toggle-safe and viewport-aware
- All commentary modules support multi-symbol, multi-timeframe routing
- Commentary can be scoped per viewport or per overlay fusion

---

For cockpit clarity and orchestration-grade diagnostics, this commentary is indispensable. For integration, add this doc reference in `README.md`:

📘 See [FusionMaster_Commentary.md](docs/FusionMaster_Commentary.md) for signal orchestration and operator guidance.
