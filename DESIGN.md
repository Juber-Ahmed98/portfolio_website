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
| `--bg` | `#fcfdfd` | `#0b1418` | page background |
| `--panel` | `#fdfefe` | `#101d22` | raised surfaces (post-audit: tinted off pure white) |
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

## Typography (post-audit)

Three families, one job each. The mockup used Plus Jakarta for display *and* body, which
is no pairing at all — and Plus Jakarta + JetBrains Mono is itself a recognisable
generated-portfolio combination.

- **Display (headings only):** `Instrument Serif` — weight 400, **roman only**.
- **Body / UI:** `Plus Jakarta Sans` — 400, 500, 600, 700, 800.
- **Mono (labels, tags, badges):** `JetBrains Mono` — 400, 500, 600.
- Load via `next/font/google`; expose as `--font-display` / `--font-sans` / `--font-mono`.

**Never italicise the display face.** Instrument Serif is most often seen in italic, and
italic serif headings are one of the most reliable AI tells. Headings stay
`font-style: normal` and carry emphasis with size, the teal accent, or the hero highlight.

**Never bold it either.** The family ships 400 only, so `font-weight: 700` gets a synthetic
smear from the browser. Every display heading is weight 400 — the size does the work.

A serif at display size doesn't want the tight negative tracking a geometric sans does,
hence the looser values below.

| Element | Size | Family | Notes |
|---------|------|--------|-------|
| Hero H1 | `clamp(44px, 7vw, 84px)` | display 400 | `line-height:1.04`, `letter-spacing:-.02em`, max-width 1000px |
| Section H2 | `30px` | display 400 | `-.015em`, no index, nothing beside it |
| Flagship H3 | `40px` | display 400 | `-.015em` |
| Featured-row H3 | `28px` | display 400 | `-.015em` |
| Contact H2 | `36→46px` | display 400 | `-.02em` |
| Case-study H1 | `clamp(40px, 6.4vw, 72px)` | display 400 | `-.02em` |
| Body | `15–17.5px` | sans 400 | `line-height:1.6–1.7`, `text-wrap:pretty` on hero sub |
| Mono labels | `11–13px` | mono 500–600 | tags, badges, footer, hero jump list |
| Case-study block H2 | `13px` | mono 600 | stays mono — it *is* the label; stacked above its body |

## Layout

- **Container:** `max-width: 1180px`, centered, horizontal padding `40px`. The nav is the
  one exception — it spans the full viewport (see Components).
- **Section rhythm (post-audit):** vertical padding **varies** — every section on the same
  `70px` was a flat, mechanical rhythm. Featured gets room (`~88px`), the wall is tight
  (`~58px`), experience sits in the middle (`~70px`). Each section still separated by a
  `1px solid var(--line)` bottom border. Hero padding `96px 40px 84px`.
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
  Do not "fill the space" with links. Full-bleed (no `max-w-[1180px]`), sticky, bottom
  border. With no links to collapse, there is no mobile menu.
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
- **The Wall** — 3-col grid of cards, joined by `1px` gaps over a `--line` background
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
