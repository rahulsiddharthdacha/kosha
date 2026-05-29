# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:5173)
npm run build     # Production build (outputs to dist/)
npm run preview   # Preview production build locally
```

No linter or test runner is configured.

## Architecture

**Stack:** Vue 3 (`<script setup>`) · Pinia · Vue Router 4 · Vite · CSS custom properties (no component library)

### Entry flow

`main.js` reads `localStorage('kosha-theme')` and sets `data-theme` on `<html>` before mounting — this prevents a flash-of-wrong-theme. The app root (`App.vue`) renders either `LoginView` or `AppShell` based on `useAuthStore().isLoggedIn`.

### Layout

`AppShell.vue` owns the entire post-login chrome: topbar, collapsible sidebar (220px → 56px, persisted in localStorage, `Cmd+B` shortcut), and a `<router-view>` main area. All views are rendered inside it.

### Routing & auth

`src/router/index.js` uses lazy-loaded imports for all views. Routes with `meta.auth: true` are protected by a `beforeEach` guard that checks `useAuthStore().isLoggedIn`. Login uses a two-step flow (credentials → OTP), both handled in `LoginView.vue` with step state in `auth.js`.

### State (Pinia stores)

| Store | Key state |
|---|---|
| `auth.js` | `isLoggedIn`, `user` (name/initials/role), `step` (1=credentials, 2=OTP) |
| `wealth.js` | `assets`, `familyMembers`, `trusts`, `reconItems`, `documents` — all static demo data with mutation actions |

All wealth data is hardcoded in the store (no API). `reconItems` has `approveRecon(id)` and `rejectRecon(id, reason)` actions that mutate status in-place.

### Styling system

All color, spacing, and radius values are CSS custom properties defined in `src/styles/global.css`. Two theme blocks:

- `:root` — dark theme (default): warm charcoal backgrounds (`#09090B`), aged brass accent (`--gold: #9C7440`), cream text
- `[data-theme="light"]` — cream/paper backgrounds, darker brass for contrast

The `useTheme()` composable (`src/composables/useTheme.js`) exposes `isDark` (shared `ref`) and `toggle()`/`init()`. `AppShell` calls `toggle()` from the topbar sun/moon button.

**Design constraints:** No blue in UI chrome. `--steel` (`#7A98B0`) is reserved for chart/data-only use. Gold is the sole accent.

**Typography:** Inter Variable (all UI, `font-feature-settings: 'cv02','cv03','cv04','cv11'`) · JetBrains Mono (financial data/numbers only). `font-variant-numeric: tabular-nums` is set globally. Hero numbers use Inter at `font-weight: 200` with `letter-spacing: -.05em`.

### Charts

Three bespoke SVG chart components — no charting library:

- `DonutChart.vue` — asset allocation ring (hover dims non-hovered segments)
- `TrendChart.vue` — wealth trend polyline with gradient fill
- `CashflowChart.vue` — monthly bar chart with hover tooltip

### Views

| Route | View | Purpose |
|---|---|---|
| `/dashboard` | `DashboardView.vue` | Hero net-worth, KPI strip, allocation donut, trend, cashflow, Aria alerts |
| `/assets` | `AssetsView.vue` | Asset table with status tags and inline actions |
| `/family` | `FamilyView.vue` | Family members, trust cards, succession grid |
| `/recon` | `ReconciliationView.vue` | Variance items with approve/reject workflow |
| `/vault` | `VaultView.vue` | Document list with category filter |
| `/analysis` | `AnalysisView.vue` | XIRR table, scenario cards, AI placeholder |
| `/settings` | `SettingsView.vue` | Profile/preference forms |
