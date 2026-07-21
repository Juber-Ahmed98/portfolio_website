# Design system — juberahmed.dev

Concrete tokens & component specs, extracted from the approved mockup so they survive
independent of the zip. The living reference is
[`design-reference/home-mockup.html`](design-reference/home-mockup.html) — open it in a
browser (it has a working light/dark toggle) whenever pixel truth is needed. This file
is the machine-readable summary; the HTML wins if they ever disagree — **except where
this file says "post-audit"**, which supersedes the mockup (see below).

Design language: **clean, modern, one bold accent (teal), generous whitespace, a serif
display face against a sans body, monospace micro-labels as the distinctive touch.**
Fully dual-themed, respects system preference, no default opinion.

## Post-audit changes (2026-07-21)

A Hallmark audit of the home page found ten AI-tells. The fixes changed decisions this
file previously mandated, so the affected specs below are rewritten rather than annotated.
The full finding-by-finding plan is [`docs/homepage-audit.md`](docs/homepage-audit.md).
What changed, and why, so a future checkpoint doesn't helpfully restore it:

- **Section indices `01`–`04` are gone.** Numbered section eyebrows are a recognisable
  generated-portfolio pattern. Do not reintroduce them, in any section or case-study block.
- **Mono labels never sit beside a heading.** The old baseline-aligned index+H2 pair is a
  hard-banned form. Labels stack above their heading, same column, or they don't exist.
- **Type is a real pairing now**, not one family doing display and body both.
- **The nav lost its inline link row.** Anchors live in the hero.
- **No directional arrows in link labels.** `↗ → ↓` are stripped site-wide; icons come
  from Lucide, not from Unicode dingbats.

---

## Color tokens

Set as CSS variables on `:root` (light) and `.dark`. Names match the mockup.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#eef3f4` | `#0b1418` | page background (CP1: tinted teal-grey "paper", recedes) |
| `--panel` | `#ffffff` | `#101d22` | raised surfaces (CP1: pure white so cards are the lightest surface) |
| `--ink` | `#0c1518` | `#f2f7f8` | headings / primary text |
| `--body` | `#2f4247` | `#b8c8cd` | body text (CP1: ≈9:1 on white) |
| `--muted` | `#4c5b60` | `#9fb2b8` | secondary text (CP1: clears AA on both surfaces) |
| `--faint` | `#5b686d` | `#7e959c` | tertiary / mono captions (CP1: ≥4.5:1 even at 12px) |
| `--line` | `#d4dee0` | `#1c2f35` | borders / dividers (CP1: hairlines actually read) |
| `--accent` | `#0c6a82` | `#22c8e0` | the teal accent (CP1: deepened so accent text ≥4.5:1 on tinted bg) |
| `--hl` | `#bdeef7` | `rgba(34,200,224,.32)` | hero highlight underline |
| `--hover` | `#e7f1f3` | `#101d22` | row/card hover bg |
| `--chip` | `#c9d5d8` | `#2c4148` | chip / pill borders |
| `--wip` | `#9a6b1f` | `#d9a44a` | "building" badge color |
| `--wipbg` | `#e6f2f5` | `#0f1c21` | WIP strip background |
| `--wipline` | `#b9dde6` | `#1c3a42` | WIP strip dashed border |
| `--btn-bg` | `#0e181b` | `#f2f7f8` | primary button bg |
| `--btn-fg` | `#ffffff` | `#0b1418` | primary button text |
| `--flag` | `#0b1418` | `#101d22` | dark flagship/contact card bg |
| `--flag-line` | `#0b1418` | `#1c3a42` | flagship/contact card border |
| `--shadow-card` | soft lift | `none` | CP1: light-only card elevation on the tinted page (wall grid + featured screenshot tiles). Dark separates by value. Not applied to the dark-in-both flagship/contact cards. |

**Note:** the flagship (Jembatan) card and the contact CTA card are **dark in both
themes** — they use fixed dark values internally (`#22c8e0` accent, `#f2f7f8` text,
`#b8c8cd`/`#7e959c` sub-text, `#2c4148` borders), not the theme variables. Keep that.

Base transition: `background .3s, color .3s` on the body for theme switches.

## Typography (CP2 — display swapped to Plus Jakarta)

Two families now. The former Instrument Serif display face is removed entirely (CP2, an
owner override of the earlier serif decision — see `docs/ux-seo-plan.md`). Display hierarchy
comes from **weight + tight tracking**, not from a second family: Plus Jakarta at 700/800
for headings against 400/500 body is a recognised single-family pairing. JetBrains Mono
stays for micro-labels — that mono is what still makes the type system distinctive.

- **Display (headings only):** `Plus Jakarta Sans` — **700 (bold) / 800 (extrabold)**, tight
  tracking (−0.02 to −0.03em). It's a variable font (400–800 available, no `weight` array).
- **Body / UI:** `Plus Jakarta Sans` — 400, 500, 600.
- **Mono (labels, tags, badges):** `JetBrains Mono` — 400, 500, 600.
- Load via `next/font/google`; expose as `--font-display` / `--font-sans` / `--font-mono`
  (`--font-display` now resolves to `--font-plus-jakarta`).

The old `.font-display { font-weight:400; font-style:normal }` guard is deleted — it existed
only to stop the serif being faux-bolded. Weight is now set per-heading via utilities
(`font-bold` = 700, `font-extrabold` = 800). Hero/case H1 are 800, everything else 700.

Type is **fluid** — headings and key body text grow on large screens via `clamp()` so
nothing feels small on a 1400px+ canvas, while staying at-or-above old sizes on mobile.

| Element | Size | Weight | Notes |
|---------|------|--------|-------|
| Hero H1 | `clamp(42px, 6vw, 78px)` | display 800 | `line-height:1.03`, `-.03em`, max-width 1000px |
| Section H2 | `clamp(28px, 3vw, 40px)` | display 700 | `-.02em`, no index, nothing beside it |
| Flagship H3 | `clamp(30px, 3vw, 40px)` | display 700 | `-.02em` |
| Featured-row H3 | `clamp(22px, 2vw, 28px)` | display 700 | `-.02em` |
| Contact H2 | `clamp(30px, 3.6vw, 46px)` | display 700 | `-.02em`, `line-height:1.1` |
| Case-study H1 | `clamp(38px, 5.6vw, 66px)` | display 800 | `-.03em`, `line-height:1.05` |
| Body | `15–20px` fluid | sans 400 | `line-height:1.6–1.7`, `text-wrap:pretty` on hero sub |
| Mono labels | `11–13.5px` | mono 500–600 | tags, badges, footer, hero jump list |
| Case-study block H2 | `13px` | mono 600 | stays mono — it *is* the label; stacked above its body |

## Layout

- **Container:** `max-width: 1180px`, centered, horizontal padding `40px`. **CP3:** at `2xl`
  (≥1536px) the column widens to `1320px` and gutters grow to `64px` (`2xl:max-w-[1320px]
  2xl:px-16`) so content uses more of a large canvas instead of floating in a void; ≤1536px
  is unchanged. The nav bar itself still spans the full viewport, but its *contents* align to
  the same container (see Components).
- **Section rhythm (post-audit + CP3):** vertical padding **varies** — every section on the
  same `70px` was a flat, mechanical rhythm. Featured gets room (`~88px`, `112px` at `2xl`),
  the wall is tight (`~58px`), experience sits in the middle (`~70px`). Each section still
  separated by a `1px solid var(--line)` bottom border. Hero padding `96px 40px 84px`
  (`128px … 104px` at `2xl`). Only the biggest sections gain air on large screens; the wall
  stays tight on purpose.
- **Section header pattern (post-audit):** a plain H2 in the display serif. **No index, no
  eyebrow, nothing beside it.** Where a section genuinely needs a mono label, it stacks
  *above* the heading in the same column (`flex flex-col`) — never to its left.
  The old baseline-aligned label+heading row is banned; so is the `~74px` hanging indent
  that existed only to line content up under it.
- **Radii:** buttons `8–9px`, cards `10–20px` (flagship 18px, contact 20px), chips/pills `4–5px`.
- `scroll-behavior: smooth`; sections have `scroll-margin-top: 24px` for anchor nav.

## Components

- **Nav (post-audit — Hallmark N9, edge-aligned minimal)** — wordmark hard-left at the
  true viewport edge, theme toggle + dark "Download CV" button hard-right, **nothing in
  between**. The empty middle is the design: the wordmark-left / four-inline-links /
  CTA-right shape it replaced is the single most recognisable AI-nav fingerprint.
  Do not "fill the space" with links. **CP3 refinement:** the `<header>` stays full-bleed
  (sticky, bottom border spans the viewport), but its *inner row* is now container-aligned
  (`mx-auto max-w-[1180px] 2xl:max-w-[1320px]`) so the wordmark and CV button sit directly
  above the content's left/right edges instead of floating ~350px away on a wide monitor.
  This is a refinement of the edge-min intent, **not** a return to the banned centered-links
  nav — still no links in the bar. With no links to collapse, there is no mobile menu.
- **Hero** — eyebrow line → H1 (with `box-shadow` inset highlight on "front to back.")
  → sub-paragraph (max 560px) → mono stat row (`3+ yrs`, `6 builds`, `1 API`)
  → **jump list** (Work / Wall / Experience / Contact) — the anchors the nav gave up.
  Stat row gated behind `showHeroStats` prop.
- **Flagship card (Jembatan)** — dark, 2-col grid `1.05fr 460px`: left = content
  (badges, H3, blurb, mono stack line, 3 buttons: Live demo / Case study / Code),
  right = screenshot area (diagonal-stripe placeholder). Hover: `translateY(-3px)` +
  soft shadow. Live demo button is filled accent; others are outlined. The screenshot
  label sits directly on the stripe — **no bordered chip** (card-in-card, post-audit).
- **Featured row (post-audit)** — 2-col grid `1.1fr 420px`: content / screenshot tile.
  The `60px` mono-index track is gone with the rest of the numbering. Row hover tints
  background `var(--hover)`. Links: Live demo, Case study, Code — each carries an explicit
  `kind` (`live` | `case` | `code`) that drives its styling. Never match on label text.
- **The Wall** — 3-col grid of cards (CP3: a 4th column at `2xl` was tried and reverted —
  with only 6 builds it left two empty grey cells reading as a rendering gap; the balanced
  3+3 wins). Joined by `1px` gaps over a `--line` background
  (hairline-grid look), outer radius 12px. Each card: name + badge (live=accent /
  building=wip), one-line desc, mono tags. Whole card is a link. Below it: dashed
  **"currently building"** strip (WIP tokens) describing habit_tracker.
- **Experience** — 2-col: left = role entries (mono date, bold title, description),
  right = "toolbox" chip cloud (bordered mono pills).
- **Contact** — dark CTA card, space-between: left = H2 "Next on the wall: your product."
  (the mono `04` above it is gone); right = filled "Download CV" + outlined Email /
  GitHub / LinkedIn. Footer line below: copyright + "birmingham, uk · juberahmed.dev"
  in mono.

## Interaction & motion

- Hover lift on buttons/cards: `transform: translateY(-2px/-3px)`, `transition ~.2s`.
- Theme toggle swaps `.dark` class on the root/body (use `next-themes`). Icons are
  Lucide `Sun`/`Moon` inside the 34px circular shell — **not** the `☀`/`☾` characters,
  which render per-OS and can come back as a colour emoji on Windows and Android.
- Any icon added from here on comes from `lucide-react`. No Unicode dingbats.
- Motion stays **subtle and purposeful** (framer-motion added at CP9). Everything
  animated must respect `prefers-reduced-motion`.

## Data model (drives Wall + Featured)

The mockup embeds this — mirror it in the typed content module:

```ts
type WallProject = {
  name: string;        // "Jembatan-app"
  badge: string;       // "live" | "building"  (no arrow — post-audit)
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
