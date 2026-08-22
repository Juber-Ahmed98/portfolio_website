# Design system — juberahmed.dev · "The Workshop"

The design contract for the site. The direction was chosen 2026-08-04 from three
rendered, deliberately contrasting candidates (see `design-reference/directions/`);
the owner signed off **Direction C — The Workshop**. The signed-off render is
[`design-reference/directions/c-the-workshop.html`](design-reference/directions/c-the-workshop.html)
— open it in a browser (working light/dark toggle) when pixel truth is needed. This
file is the machine-readable contract; production code is built from it, and any
change of direction edits this file first.

## Design language

**A warm maker's workshop.** Cream paper, espresso ink, one terracotta accent,
offset block shadows like letterpress plates, stamp-style badges, taped-down
screenshots, a literal pegboard behind the project wall, hand-drawn squiggle
underlines. Tactile and hand-made, calibrated to stay professional: rotations are
≤2°, shadows are a consistent 4px system, and type does the serious work.

The palette deliberately echoes **Jembatan's brand world** (warm neutrals +
terracotta) so the flagship product and the portfolio read as one hand's work.

Fully dual-themed, respects system preference, visible toggle, no default opinion.
Dark mode is **warm espresso, not blue-black**.

## Decision log

Rules carried forward from the previous system (they were anti-AI-tell decisions,
not aesthetics — they survive any redesign):

- **No numbered section eyebrows** (`01`–`04` or equivalents), in any section or
  case-study block.
- **Mono labels never sit beside a heading.** Stack above, same column, or omit.
- **The nav has no inline link row.** Wordmark left, toggle + CV right, nothing
  between. Anchors live in the hero jump list.
- **No directional arrows / Unicode dingbats in link labels** (`↗ → ↓`). Icons come
  from `lucide-react` only. (The old wall cards still carried `↗`/`→` — the Workshop
  build removes them.)
- **No italic headings.**
- **2026-08-22 — link affordance pass.** The featured "Visit site" outline pills
  and the wall's `--line` underlines were too close to the non-interactive stack
  chips and mono captions to read as clickable. Primary links are now filled
  letterpress buttons, wall links sit on a terracotta underline, and the row
  screenshot links to its one destination. Don't quieten these back down.
- **2026-08-22 — the wall collapses instead of growing.** It's meant to read as
  "a lot of builds", which stops being true the moment it reads as "a long list".
  The count in the H2 and in the hero stat is derived from `wall.length`, not
  typed — both had already drifted once.
- **2026-08-22 — the dashed-gold "currently building" strip is gone.** It restated
  what the wall's `building` stamps already say. WIPs are carried by the stamp
  alone now; don't reintroduce a second place that says the same thing. `--wip`
  still colours those stamps; `--wipbg` and `--wipline` went unused with the strip
  and are kept in the palette unclaimed.

Superseded / historical:

- **2026-08-04 — "The Workshop" supersedes "clean, modern, one bold teal accent".**
  The old system read professional but forgettable; the owner asked for
  "personality within professional" where the site itself is part of the proof.
  Teal, the tinted teal-grey paper, and the weight-only Plus Jakarta system are gone.
- **Serif history:** Instrument Serif was removed at CP2 as "a serif the owner
  doesn't want". A serif direction ("The Ledger", Fraunces) was offered again in the
  2026-08-04 exploration and not chosen — the sans direction won on its merits.
  Display is now **Bricolage Grotesque** (characterful sans), not a serif.
- **CP3:** a 4th wall column at `2xl` was tried and reverted (6 builds → two empty
  cells). The wall stays 3-col max.

## Color tokens

CSS variables on `:root` (light) / `.dark`, exposed to Tailwind via `@theme inline`
in `globals.css`. Token *names* are unchanged from the old system so utility
classes (`bg-bg`, `text-ink`, …) survive; the values are the Workshop palette.
Contrast figures are measured, not eyeballed.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--bg` | `#f8f2e9` | `#201812` | page — warm cream paper / espresso |
| `--panel` | `#fffdf8` | `#2a2019` | raised card surfaces |
| `--ink` | `#2b2016` | `#f4ead9` | headings / primary text (~14.9:1 on bg) |
| `--body` | `#4d3f30` | `#d3c4ad` | body text (≈8.9:1 light / ≈10:1 dark) |
| `--muted` | `#75634f` | `#a8967c` | secondary text (≥5:1 both) |
| `--faint` | `#7a6954` | `#9d8c74` | tertiary / mono captions (≥4.5:1 at 12px, measured on panel too) |
| `--line` | `#e0d5c2` | `#3d3125` | borders / dividers |
| `--accent` | `#a84b26` | `#e08a5c` | terracotta (≥5:1 as text on bg) |
| `--hl` | `#f3e2d4` | `#35261c` | marker-highlight fill behind hero phrase |
| `--hover` | `#f3ead9` | `#332818` | hover washes |
| `--chip` | `#d9cbb4` | `#4a3c2d` | chip / pill borders |
| `--live` | `#3f5c37` | `#9dc48f` | "live" stamp green (new token) |
| `--wip` | `#8a5f1a` | `#d9ae4a` | "building" stamp gold |
| `--wipbg` | `#fffdf8` | `#2a2019` | WIP strip background |
| `--wipline` | `#b08a3f` | `#8a6f33` | WIP strip dashed border |
| `--btn-bg` | `#2b2016` | `#f4ead9` | solid ink button bg |
| `--btn-fg` | `#fffdf8` | `#201812` | solid ink button text |
| `--flag` | `#2b2016` | `#2b2016` | flagship/contact card bg — **warm dark in both themes** |
| `--flag-line` | `#2b2016` | `#f4ead9` | flagship/contact card 2px border (cream frame in dark) |
| `--shadow-card` | `4px 4px 0 #2b2016` | `4px 4px 0 rgba(0,0,0,.55)` | the letterpress block shadow |

**Flagship + contact cards stay dark in both themes** — fixed internals, not tokens:
bg `#2b2016`, text `#f4ead9`, body `#d3c4ad`, faint `#a8967c`, quiet borders
`#5c4a38`, accent `#e08a5c` (text-on-accent `#201812`), live-stamp `#9dc48f`.
Their outer shadow is `6px 6px 0 var(--accent)` in both themes.

Base transition: `background .3s, color .3s` on the body for theme switches.

## The shadow system

Depth is **offset block shadows**, not blur — the letterpress signature. It is a
system, not a garnish:

- Resting cards / buttons: `4px 4px 0` ink (light) / black-55% (dark) = `--shadow-card`.
- Hover: element translates `(-2px,-2px…-3px)` and the shadow grows to
  `6px 6px 0 var(--accent)` — the lift reveals terracotta.
- The two dark cards (flagship, contact): `6px 6px 0 var(--accent)` at rest,
  `9px 9px 0` on hover.
- Small controls (theme toggle): `2px 2px 0` ink.

## Typography

- **Display + body: `Bricolage Grotesque`** (variable, 200–800 via
  `next/font/google`, exposed as `--font-bricolage`). Headings 700/800 with
  `font-variation-settings: "opsz" 96` and tight tracking (−0.02 to −0.03em);
  body 400/500.
- **Mono (labels, tags, stamps, footer): `JetBrains Mono`** 400–600 — unchanged.
- `--font-display` and `--font-sans` both resolve to Bricolage; `--font-mono` to
  JetBrains Mono. Plus Jakarta Sans is removed entirely.

Fluid type via `clamp()` — same scale skeleton as before:

| Element | Size | Weight |
|---------|------|--------|
| Hero H1 | `clamp(42px, 6vw, 80px)` | 800, `-.025em`, lh 1.03 |
| Section H2 | `clamp(28px, 3vw, 42px)` | 800, `-.02em` |
| Flagship H3 | `clamp(30px, 3vw, 44px)` | 800 |
| Featured-row H3 | `clamp(22px, 2vw, 28px)` | 800 |
| Contact H2 | `clamp(30px, 3.6vw, 46px)` | 800, lh 1.1 |
| Case-study H1 | `clamp(38px, 5.6vw, 66px)` | 800, `-.025em` |
| Body | 15–20px fluid | 400/500, lh 1.6–1.7 |
| Mono labels | 11–13.5px | 500–600 |
| Case-study block H2 | 13px mono 600 | stacked above its body |

## Signature elements

- **Squiggle underline** — a hand-drawn SVG path (`stroke: var(--accent)`,
  2–2.5px, round caps) under the nav wordmark and under every section H2. One
  shared path shape; `aria-hidden`.
- **Marker highlight** — the hero's "front to back." sits on an irregular SVG blob
  filled `var(--hl)` behind the text (replaces the old inset box-shadow underline).
- **Stamps** — status badges are mono uppercase, 1.5–2px border, 5–6px radius,
  rotated −2°: live = `--live` green, building = `--wip` gold **dashed**.
- **Tape** — screenshot frames carry translucent masking-tape strips
  (semi-transparent cream/terracotta rectangles with dashed edges), rotated a few
  degrees.
- **Pegboard** — the wall grid sits inside a `--hl`-tinted container with a
  radial-gradient dot grid (26px spacing) and 2px ink border.
- **Rotation budget:** static rotations only on stat tiles (≤0.6°), screenshot
  frames (≤1.4°), stamps/tape labels (≤2°). Nothing else rotates at rest.

## Layout

- **Container:** `max-width: 1180px`, px `40px`; at `2xl` (≥1536px) `1320px` / `64px`
  gutters. Nav header full-bleed, inner row container-aligned. (Unchanged.)
- **Section rhythm:** varied vertical padding — featured `~88px` (`112px` at 2xl),
  wall `~58px`, experience `~70px`; hero `96px/84px` (`128/104` at 2xl). Sections
  separated by **2px solid `var(--ink)`** rules (the Workshop's heavier hand replaces
  the old 1px `--line` hairlines between sections; hairlines remain for interior
  dividers, which are **2px dashed `var(--line)`** between featured rows).
- **Radii:** buttons 10px, cards 12px, flagship/contact 18px, screenshot frames 6px,
  pills/chips 999px, stamps 5–6px.
- Section header: H2 + squiggle. No index, no eyebrow, nothing beside it.
- `scroll-behavior: smooth`; `scroll-margin-top` on sections.

## Components

- **Nav** — edge-aligned minimal (unchanged shape): wordmark + squiggle hard-left,
  theme toggle + CV button hard-right, nothing between, no mobile menu. Toggle is a
  36px **rounded-square** (10px radius, 2px ink border, 2px block shadow, Lucide
  Sun/Moon). CV button is ghost-style: panel bg, 2px ink border, block shadow,
  hover lift.
- **Hero** — kicker (mono, accent) → H1 with marker-blob highlight → sub →
  stat **tiles** (bordered, block-shadowed, alternately rotated ≤0.6°, terracotta
  numerals; still gated behind `showStats`) → jump list as **sticker pills**
  (2px border, pill radius, hover: `--hl` wash + −2px lift + −1° tilt).
- **Flagship card (Jembatan)** — warm-dark in both themes, 18px radius, 2px
  `--flag-line` border, `6px 6px 0` terracotta shadow, 2-col `1.05fr 440px`.
  Left: mono "flagship" label + live stamp, H3, blurb, mono stack, buttons (Live
  demo = filled `#e08a5c`; Case study / Code = quiet `#5c4a38` borders). Right:
  screenshot as a **taped polaroid** (rotated 1.4°, tape strips top-left +
  bottom-right) rendering the real capture (`public/featured/jembatan.png`, cropped
  from the app's home screen); caption tile only as fallback.
- **Featured rows** — 2-col `1.1fr 400px`, separated by 2px dashed `--line`.
  Content left; screenshot right in a rotated (∓1°) 2px-ink-border frame with block
  shadow and one tape strip; real `<img>` from `public/featured/` fills the frame,
  else the placeholder caption tile. On a row with exactly one destination the
  frame **is** the link (out of the tab order — the button already covers it).
  Links still carry `kind` (`live`|`case`|`code`): `live` is a filled-terracotta
  letterpress pill (2px ink border, block shadow), the rest take the nav CV
  button's cream-on-ink treatment. External labels carry a Lucide `ArrowUpRight`.
- **The Wall** — pegboard container; inside it the 3→2→1 grid of **tool cards**
  (12px radius, 2px ink border, block shadow; hover −2/−3px lift + −0.4° tilt +
  terracotta shadow). Card: name + stamp, one-liner, mono tags, mono links row
  (`code`, `case study`, `live site` — no arrows) in ink on a solid 2px terracotta
  underline; hover fills `--hl` behind the label. Cards stay `div`s
  (nested-anchor rule), and a card with nothing public to point at shows no row.
  **The board collapses to whole rows** — 4 below `sm` (one mobile column), 6 from
  `sm` up (3×2, then 2×3 at `lg`) — with a centred "view all N builds" button on
  the pegboard beneath the grid. Collapsing is `display:none`, so every build stays
  in the HTML for crawlers and leaves the tab order at the same time. Ordering the
  `wall` array is an editorial act: only the first 6 show unexpanded.
- **Experience** — 2-col: role **cards** (bordered, block-shadowed) left; toolbox
  as sticker pills right (hover: terracotta border + −1.5° tilt).
- **Contact** — warm-dark card like the flagship (18px, terracotta shadow):
  H2 with the second line in `#e08a5c`; filled Download CV + quiet Email / GitHub /
  LinkedIn. Mono footer line below on the page surface.
- **Case-study pages** — same header as home nav (back link, brand + squiggle,
  toggle, CV ghost button). Eyebrow copy stays (it's content), styled mono accent.
  Block headings stay mono labels stacked above their body. Stack chips are sticker
  pills. Screenshot placeholders are taped, alternately-rotated polaroid tiles.
  First link = filled terracotta button, rest = 2px ink outline.

## Interaction & motion

Zero dependencies — all motion is CSS. Everything gated `motion-safe`
(`prefers-reduced-motion` honoured); static rotations are layout, not motion, and
persist under reduced motion.

- **The one authored moment:** on home load, the hero marker-blob sweeps in
  (scaleX 0→1, origin left, ~.5s exponential ease-out, ~.15s delay) while the H1
  and sub fade up 8px. Runs once; no scroll-triggered entrances elsewhere.
- Hover grammar: lift `(-2px,-2px)` + shadow grows and turns terracotta (cards,
  buttons), pills tilt −1 to −2°, screenshot frames straighten to 0° and lift.
- Theme toggle: `next-themes` class strategy, Lucide `Sun`/`Moon`, unchanged logic.
- Transitions ~.15–.2s ease-out.

## Data model

Unchanged — `src/content/site.ts` remains the single content source; the redesign
touches zero copy. `WallProject`, `FeaturedProject`, `CaseStudy` types as before.
Wall links drop the `↗`/`→` glyphs (presentation, not content).

## Meta surfaces

- **OG image** (`src/app/opengraph-image.tsx`): espresso `#2b2016` field, cream
  `#f4ead9` name, terracotta `#e08a5c` wordmark, `#a8967c` stack line. (System bold
  sans — ImageResponse doesn't load web fonts without bundling font data; the
  palette carries the brand.)
- **Favicon** `src/app/icon.svg`: espresso rounded square, cream "j" as a *drawn
  stroked path* (SVG favicons can't load web fonts and serif fallbacks are ruled
  out by the decision log), terracotta tittle.
- **`themeColor`** viewport export: `#f8f2e9` light / `#201812` dark.

## Responsive

Same breakpoints and stacking behaviour as the old system (flagship 2→1, rows
stack, wall 3→2→1, experience 2→1, contact wraps; verified at 375/768/desktop, no
horizontal overflow). The pegboard padding tightens on mobile so cards keep width.
