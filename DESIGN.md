# Design system — juberahmed.dev

Concrete tokens & component specs, extracted from the approved mockup so they survive
independent of the zip. The living reference is
[`design-reference/home-mockup.html`](design-reference/home-mockup.html) — open it in a
browser (it has a working light/dark toggle) whenever pixel truth is needed. This file
is the machine-readable summary; the HTML wins if they ever disagree.

Design language: **clean, modern, one bold accent (teal), generous whitespace, strong
type, monospace micro-labels as the distinctive touch.** Fully dual-themed, respects
system preference, no default opinion.

---

## Color tokens

Set as CSS variables on `:root` (light) and `.dark`. Names match the mockup.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#fcfdfd` | `#0b1418` | page background |
| `--panel` | `#ffffff` | `#101d22` | raised surfaces |
| `--ink` | `#0e181b` | `#f2f7f8` | headings / primary text |
| `--body` | `#3d4f54` | `#b8c8cd` | body text |
| `--muted` | `#5c6b70` | `#9fb2b8` | secondary text |
| `--faint` | `#74858a` | `#7e959c` | tertiary / mono captions |
| `--line` | `#e6ecee` | `#1c2f35` | borders / dividers |
| `--accent` | `#0e7490` | `#22c8e0` | the teal accent |
| `--hl` | `#bdeef7` | `rgba(34,200,224,.32)` | hero highlight underline |
| `--hover` | `#f4fafb` | `#101d22` | row/card hover bg |
| `--chip` | `#dde5e7` | `#2c4148` | chip / pill borders |
| `--wip` | `#9a6b1f` | `#d9a44a` | "building" badge color |
| `--wipbg` | `#f2f9fb` | `#0f1c21` | WIP strip background |
| `--wipline` | `#b9dde6` | `#1c3a42` | WIP strip dashed border |
| `--btn-bg` | `#0e181b` | `#f2f7f8` | primary button bg |
| `--btn-fg` | `#ffffff` | `#0b1418` | primary button text |
| `--flag` | `#0b1418` | `#101d22` | dark flagship/contact card bg |
| `--flag-line` | `#0b1418` | `#1c3a42` | flagship/contact card border |

**Note:** the flagship (Jembatan) card and the contact CTA card are **dark in both
themes** — they use fixed dark values internally (`#22c8e0` accent, `#f2f7f8` text,
`#b8c8cd`/`#7e959c` sub-text, `#2c4148` borders), not the theme variables. Keep that.

Base transition: `background .3s, color .3s` on the body for theme switches.

## Typography

- **Display / UI:** `Plus Jakarta Sans` — weights 400, 500, 600, 700, 800.
- **Mono (labels, tags, numbers, badges):** `JetBrains Mono` — 400, 500, 600.
- Load via `next/font/google`; expose as `--font-sans` / `--font-mono`.

Type scale (from the mockup):

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Hero H1 | `clamp(44px, 6.5vw, 78px)` | 800 | `line-height:1.03`, `letter-spacing:-.035em`, max-width 920px |
| Section H2 | `26px` | 800 | `letter-spacing:-.02em`, paired with mono index (`01`…) |
| Flagship H3 | `38px` | 800 | `-.025em` |
| Featured-row H3 | `25px` | 800 | `-.02em` |
| Contact H2 | `42px` | 800 | `-.03em` |
| Body | `15–17.5px` | 400 | `line-height:1.6–1.7`, `text-wrap:pretty` on hero sub |
| Mono labels | `11–13px` | 500–600 | section indices, tags, badges, footer |

## Layout

- **Container:** `max-width: 1180px`, centered, horizontal padding `40px`.
- **Section rhythm:** vertical padding `~70px`, each section separated by a
  `1px solid var(--line)` bottom border. Hero padding `96px 40px 84px`.
- **Section header pattern:** mono index (`01`, `02`… in accent) + H2, baseline-aligned,
  gap `14px`. Sub-text/content often indented `~74px` to line up under the H2.
- **Radii:** buttons `8–9px`, cards `10–20px` (flagship 18px, contact 20px), chips/pills `4–5px`.
- `scroll-behavior: smooth`; sections have `scroll-margin-top: 24px` for anchor nav.

## Components

- **Nav** — space-between: logo left (`juberahmed` + accent `.dev`), right cluster of
  links (Work / Wall / Experience / Contact) + circular theme toggle (34px, ☾/☀) +
  dark "Download CV" button. Bottom border. (Decide sticky vs static at CP1; mockup is static.)
- **Hero** — eyebrow line → H1 (with `box-shadow` inset highlight on "front to back.")
  → sub-paragraph (max 560px) → mono stat row (`3+ yrs`, `6 builds`, `1 API`, "See the
  work ↓"). Stat row gated behind `showHeroStats` prop.
- **Flagship card (Jembatan)** — dark, 2-col grid `1.05fr 460px`: left = content
  (badges, H3, blurb, mono stack line, 3 buttons: Live demo / Case study / Code),
  right = screenshot area (diagonal-stripe placeholder). Hover: `translateY(-3px)` +
  soft shadow. Live demo button is filled accent; others are outlined.
- **Featured row** — 3-col grid `60px 1.1fr 420px`: mono index / content / screenshot
  tile. Row hover tints background `var(--hover)`. Links: Live demo, Case study, Code.
- **The Wall** — 3-col grid of cards, joined by `1px` gaps over a `--line` background
  (hairline-grid look), outer radius 12px. Each card: name + badge (live=accent /
  building=wip), one-line desc, mono tags. Whole card is a link. Below it: dashed
  **"currently building →"** strip (WIP tokens) describing habit_tracker.
- **Experience** — 2-col: left = role entries (mono date, bold title, description),
  right = "toolbox" chip cloud (bordered mono pills).
- **Contact** — dark CTA card, space-between: left = mono `04` + H2 "Hire someone who
  ships."; right = filled "Download CV (PDF)" + outlined Email / GitHub / LinkedIn.
  Footer line below: copyright + "birmingham, uk · juberahmed.dev" in mono.

## Interaction & motion

- Hover lift on buttons/cards: `transform: translateY(-2px/-3px)`, `transition ~.2s`.
- Theme toggle swaps `.dark` class on the root/body (use `next-themes`).
- Motion stays **subtle and purposeful** (framer-motion added at CP9). Everything
  animated must respect `prefers-reduced-motion`.

## Data model (drives Wall + Featured)

The mockup embeds this — mirror it in the typed content module:

```ts
type WallProject = {
  name: string;        // "Jembatan-app"
  badge: string;       // "live ↗" | "building"
  live: boolean;       // controls badge color: accent vs --wip
  desc: string;        // one line
  tags: string;        // "kotlin · workers"
  link: string;        // GitHub (or live) URL
};
```

Wall projects (6): `Jembatan-app` (live), `mission_to_abs_app` (live),
`ecommerce_store` (live), `habit_tracker` (building), `quran-just-one-verse`
(building), `Qibla_Compass` (building). **Exclude** the empty scaffolds per CLAUDE.md.

## Responsive note (important — not in the mockup)

The mockup is **desktop-only**: it uses fixed-px `grid-template-columns` everywhere and
will overflow on mobile. Building for real means adding breakpoints so every grid
stacks — nav → collapsed/menu, flagship `2col → 1col`, featured rows `3col → stacked`,
wall `3 → 2 → 1`, experience `2col → 1col`, contact card wraps. Treat this as first-class
work at CP3, not an afterthought.
