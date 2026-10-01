# Design system — juberahmed.dev · v3, "Proof you can hold"

The design contract for the site. v3 was decided on 2026-10-01 under the owner's
full-control brief ("make something amazing… especially for mobile, since I share and
show it on mobile… without making performance poor"). It supersedes "The Workshop"
(2026-08-04). Production code is built from this file; any change of direction edits
this file first. The working direction doc (premise, world, rung argument, budget,
fallback matrix, kill criteria, session plan) is local-only at
`design-reference/plans/2026-10-01-v3-direction.md`.

## The idea

**Proof you can hold.** The site is built for the phone in someone's hand, and the work
shows up there as the real thing, working, at device scale. The first screen is a claim
at poster scale with the same claim in Bengali beneath it; the phone that rises under it
plays a real recording of Jembatan as you scroll, while the room goes dark.

**The world:** warm paper and lit glass, evening lamp light from the upper left. Things
arrive like a phone set down on a table and stop: no float, no drift, no bounce.

**Two signature devices, and only two:** the bilingual poster hero, and the film. Every
other section is quieter on purpose (bands and hairline rules, real screenshots as the
only imagery), so the film is unmistakably the biggest thing on the page.

## Decision log

Rules carried forward. These were anti-AI-tell decisions, not aesthetics, and they
survive any redesign:

- **No numbered section eyebrows**, anywhere.
- **No mono kicker above headings.** JetBrains Mono is for data only: dates, stacks,
  status, spec-sheet keys.
- **The header has no inline link row.** Wordmark left, theme + CV right.
- **No directional Unicode glyphs in link text** (`↗ → ↓`). Icons come from
  `lucide-react` only.
- **No italic headings.** No serif display face (twice rejected by the owner).
- **The type never moves.** No fade-up, slide-in or reveal on any text. Media and planes
  move; text is simply there. (The one text-level change, the language switch, is a
  short opacity swap the visitor asked for.)
- **No skills chip wall. No metric without its denominator.** Tools are a sentence each.
- **Every interactive element has a touch state** (`.tap`: scale .97), because on a phone
  it is the only state feedback there is. Hover is extra, never required.
- **Counts are derived** (`builds.length`), never typed.
- **Nothing overclaims.** The demo says "sample messages" until it is live; the Bengali
  line is labelled as one of Jembatan's languages, not as the app's output.

v3 decisions (2026-10-01):

- **The Workshop is retired.** Measured against the vault's `AI tells` and `Portfolio &
  personal brand` notes it carried the very tells it was meant to avoid: bordered cards
  around every unit, five equal bands, a skills chip wall, denominator-free stats, a mono
  kicker over the H1. On a phone its personality (all hover) disappeared, and its best
  moment, the flagship scrub, was switched off below `md`. Kept: the warm palette's logic
  (it echoes Jembatan), dual theme with no default, the content module, every honesty rule.
- **Phone first, literally.** The film runs on phones (a 480px encode, 578 KB) because
  that is where the owner shows the site. Desktop gets a 720px encode (1.3 MB).
- **Mona Sans over Bricolage.** Rendered side by side at 390px (Mona 75 / Bricolage 75 /
  Archivo 62 / Mona 125): Mona's condensed 900 fills a phone width like a poster;
  Bricolage condensed read soft and is now a common pick. Mona is GitHub's typeface,
  which is a quiet nod for a developer, and its width axis gives a real display/body split
  from one family.
- **Rung 0–1 only (no Three.js).** A DOM phone with a lit rim reads as a phone; a modelled
  one would cost ~150 KB gz and GPU on the phone the owner hands to people. Revisit only if
  real-device measurements leave headroom.
- **Client sites are shown on phones, panning.** A desktop screenshot shrunk to a phone
  is illegible; the client's own mobile layout at device scale, sliding from hero to
  footer as you scroll past, shows the whole site in two seconds.
- **The builds index is a contents page, not a card grid.** Rows without a public link
  stay off; the private work gets one honest sentence under the list.

## Color tokens

CSS variables on `:root` (light) / `.dark`, exposed to Tailwind via `@theme inline` in
`globals.css`. Contrast is measured (WCAG 2.x), not eyeballed.

| Token | Light | Dark | Use / contrast |
|-------|-------|------|-----|
| `--bg` | `#f3ede3` | `#15110e` | paper / espresso |
| `--surface` | `#fbf8f2` | `#1e1914` | raised band (day job) |
| `--ink` | `#1d1611` | `#f1e8da` | headings, primary text · 15.4:1 / 15.5:1 on bg |
| `--body` | `#4a3d30` | `#cbbda8` | body · 9.0:1 / 10.2:1 |
| `--muted` | `#6e5e4e` | `#a08f7a` | secondary · 5.3:1 / 6.0:1 |
| `--line` | `#dcd1bf` | `#2f2620` | hairline rules |
| `--line-strong` | `#c4b6a0` | `#463a2f` | outline buttons |
| `--accent` | `#a94b25` | `#e3895b` | terracotta · 4.85:1 / 7.15:1 as text on bg |
| `--on-accent` | `#fff8f0` | `#1a120c` | text on accent · 5.4:1 / 7.0:1 |
| `--live` | `#3f5c37` | `#9dc48f` | "live" status · 6.5:1 / 9.6:1 |
| `--wip` | `#85591a` | `#d9ae4a` | "building" status · 5.2:1 / 9.0:1 |

**The room** (`--night-*`) is identical in both themes. The film, the Jembatan section
and the contact close sit in it:

| Token | Value | Contrast on `--night` |
|-------|-------|------|
| `--night` | `#14100d` | — |
| `--night-raise` | `#1d1813` | demo panel |
| `--night-ink` | `#f1e8da` | 15.6:1 |
| `--night-body` | `#c4b5a0` | 9.4:1 |
| `--night-muted` | `#968671` | 5.4:1 (5.0:1 on raise) |
| `--night-line` | `#2c241d` | rules |
| `--night-accent` | `#e3895b` | 7.2:1 |

`--lift` is the only shadow: warm, offset, soft elevation for device frames
(`0 34px 60px -28px` + `0 12px 24px -14px`), black in dark. No block shadows, no glows.

The Workshop's token names (`--panel`, `--hl`, `--chip`, `--shadow-card`, `--flag`, …)
survive as aliases at the bottom of each block **only** so the case-study pages render
until they are rebuilt in v3 (session 2). Delete them with that work.

## Typography

- **Mona Sans** (variable: `wdth` 75–125, `wght` 200–900), `--font-mona`, display + body.
- **Anek Bangla** 600, Bengali subset only, not preloaded: the hero's Bengali line.
- **JetBrains Mono**, not preloaded: data only.

| Class / element | Spec |
|---|---|
| `.t-poster` (H1, section H2s) | wdth 75, 900, −0.018em, lh .86 |
| `.t-head` (H3s, film beats, client names) | wdth 75, 850, −0.012em, lh .92 |
| `.t-data` | JetBrains Mono 12px 500 |
| Hero H1 | `clamp(64px, 19vw, 156px)`; from `lg` `min(9.6vw, 148px)` with the break at the comma |
| Section H2 | `clamp(52px, 14vw, 120px)` |
| Body | 16–18px, 450 weight, lh 1.55–1.65 |

## Layout

- Container `max-w-[1240px]`, gutters 20px / 40px (`sm`) / 64px (`xl`).
- Sections are bands separated by hairlines or a change of surface, never boxed.
- Order: Hero → Film → Jembatan (+ demo) → Clients → Builds → Day job → Contact.
- Radii: pill buttons 999px; demo panel 26px; review strip 18px; browser frame 14px.

## Components

- **Header** (`site-header.tsx`): fixed, 64px. Transparent at the top, paper with blur once
  scrolled, night-toned over any `[data-night]` section. Slides away while scrolling down,
  returns on scroll up.
- **Theme toggle**: 40px circle. The new theme spreads from the button as a circle
  (`document.startViewTransition` + `clip-path`), instant under reduced motion or without
  the API.
- **Hero** (`hero.tsx`, `bilingual.tsx`): name · place; the H1; the Bengali line with a
  one-button language switch (bn → id → ar → es; `lang`/`dir` set; `aria-live`); sub;
  Email (accent) + Download CV (outline).
- **Phone** (`phone.tsx`): DOM body, lit rim, side keys, punch-hole, screen at the
  capture's own 480:1040. Scales via container units.
- **Film** (`film.tsx`): see *Motion*.
- **Jembatan** (`jembatan.tsx`): status with live dot; name at poster scale; meaning;
  lede; four-row spec sheet (App / API / Model / Product); Visit the site + case study.
- **Demo** (`demo.tsx`): the keyboard's review strip on the page. Canned mode: three
  sample messages × four languages, streamed in grapheme clusters (Intl.Segmenter, so
  Bengali conjuncts never render half-built), auto-plays once on first view. Live mode
  (`demo.live`): free text → POST to the landing Worker's demo proxy, SSE frames
  `{"delta"}` / `{"done","translation"}` / `{"error"}` exactly as the API emits them.
- **Clients** (`clients.tsx`): name, who, summary, four facts in a ruled 2×2, Visit
  button. Media: the client's mobile full-page capture in a Phone, panning as it passes;
  from `lg` a browser frame with the desktop capture sits behind it.
- **Builds** (`builds.tsx`): ruled index; name, month started, status, what, stack, links.
- **Day job** (`day-job.tsx`): "By day, Wolseley." at poster scale; two roles; tools as
  two sentences.
- **Contact** (`contact.tsx`): the room again. Heading, the address at poster scale
  (mailto), Copy address, CV, GitHub, LinkedIn; footer with a one-line colophon.

## Motion

Zero animation dependencies. All of it is gated on `prefers-reduced-motion:
no-preference`; under reduce the page is complete and still.

- **Set down** (`.set-down`): the film's phone rises 64px and fades in on load, .9s
  expo-out. The page's one load animation, and it moves a plane, not text.
- **The film** (`film.tsx`), the one scroll-bound set-piece. A 340svh track (320vh at
  `lg`) holds a sticky stage. JS writes `--enter` (the phone straightens from −6° and
  scales .9→1 as the track arrives), `--dim` (the stage mixes from paper to night,
  smoothstep over 32% of a screen so it never sits at a muddy mid-grey) and the playhead.
  Mechanics: Blob fetch a screen early; lerped playhead (0.22) that stops when settled;
  no seek while seeking or under one frame; play()/pause() prime for iOS; video revealed
  on its first painted frame. Beats: phones show one at a time under a three-part progress
  bar; desktop lists all three with the current one lit. Save-Data never fetches the clip.
- **Client pans** (`.pan-y`): CSS scroll-driven animation on the frame's own
  `view-timeline` (`--frame`), range `cover 12% → 88%`. Compositor-only, no JS; rests on
  the top of the page where unsupported.
- **The lamp** theme transition (above). **Swap-in** for the language line (opacity).
- **Touch** (`.tap`): scale .97 on `:active`, 140ms.

## Fallbacks

| Condition | Result |
|---|---|
| No JS | `.js` never lands on `<html>`, so CSS shows the stills version of the film (three phones, swipeable); everything else is server-rendered; the demo panel renders but cannot stream |
| Reduced motion | Same stills; no set-down, no pans, no lamp transition; demo output appears whole |
| Save-Data | The film pins and its beats advance over the poster frame; the clip is never fetched |
| No scroll-driven animation support | Client captures rest at the top of their pages |
| No View Transitions | Instant theme swap |

## Measured (2026-10-01, production build)

| | Budget | Measured |
|---|---|---|
| HTML (gz) | — | 16 KB |
| JS gz, modern browsers | ≤ 130 KB (set below Next's floor; revised to ≤ 170 KB) | 161 KB, of which React DOM + Next runtime ≈ 111 KB |
| CSS gz | — | 10 KB |
| Fonts on first view | — | Mona Sans 98 KB (preloaded) + Anek Bangla Bengali subset |
| Film | ≤ 600 KB / ≤ 1.4 MB | 578 KB / 1.3 MB, fetched a screen early |
| Client captures | — | 244–372 KB each, lazy |
| Real-device fps, LCP, CLS | ≥ 50 fps · ≤ 1.8 s · ≤ 0.02 | **not yet measured: owner's phone, session 3** |

## Meta surfaces

Not yet moved to v3 (session 2): `opengraph-image.tsx` and `icon.svg` still carry the
Workshop palette, close enough to v3's that nothing clashes. `themeColor` is updated
(`#f3ede3` / `#15110e`).
