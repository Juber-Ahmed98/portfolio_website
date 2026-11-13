# Design system — juberahmed.dev · v4

The design contract for the site. v4 was decided between 9 and 13 November 2026 under the
owner's full-control brief: v1–v3 looked, in his words, AI-made, too busy and too clever,
and the work got lost. Production code is built from this file; any change of direction
edits this file first.

**The reference:** `design-reference/v4/home.html` is the finished home page, hand-written,
and the production home page matches it element for element (same boxes, same type, same
colours at 360, 390, 768, 1024, 1440 and 1920 wide). The case studies and `/websites` were
built afterwards from the same parts.

## The idea

**Him first, then the work, one room at a time.**

- The first screen is his photo and one sentence, and nothing else. It takes the whole
  first screen on a phone, a tablet and a desktop, less a strip of the next room's colour
  along the bottom edge so the page reads as continuing.
- Every piece of work gets a **room**: the full screen, in that project's own colour, with
  the real capture in it and a few plain words on the colour.
- Websites first, then the day job, then the apps. Recruiters and hiring managers want the
  websites first.
- The page scrolls normally. Nothing slides, stacks, pins or fades in.

## Rules that hold on every page

- **The first screen stays bare:** name, at most two links, the photo, the sentence, the
  peek. Adding to it turns the site back into v3.
- **One typeface, one theme.** Schibsted Grotesk everywhere; one light theme. No dark
  theme, no theme toggle.
- **No motion** beyond the Jembatan recording, which plays only while it is on screen and
  never under `prefers-reduced-motion`. No reveals, no scroll effects, no hover animation,
  no view transitions.
- **Edge-aligned.** Everything hangs off the left edge or the 5fr / 7fr split. No centred
  column, no max-width container: the page uses the screen it is given.
- **Rules, not boxes.** Lists are ruled with a hairline above each row. No cards, no
  borders around units, no chips or pills. Corners are 4px (buttons, the photo) or 6px
  (screen captures); only phone frames are rounder.
- **Links are underlined text.** The one filled button is the CV (or "Get in touch" on
  `/websites`), solid ink with 4px corners.
- **No numbered eyebrows, no monospace labels, no icons, no directional glyphs** (`→ ↗`).
  The small line above a heading (`.kind`) says what the thing is, in words.
- **Real captures only.** Every picture is the real site or app. Nothing is illustrated.
- **Nothing overclaims.** Real output is labelled as real output; a section with nothing
  real to show (client quotes) stays hidden.
- **Words on a room's colour need contrast.** Check a new room colour against its text
  before using it (the table below).

## Colour

| Token | Value | Use |
|---|---|---|
| `--bg` | `#f5f5f2` | the ground: first screen, Wolseley, lists |
| `--ink` | `#121211` | text, the footer, the CV button · 17.2:1 on the ground |
| `--soft` | `#6c6b66` | the quiet half of a sentence, labels, dates · 4.9:1 |
| `--line` | `#dcdbd5` | hairline rules on the ground |
| body grey | `#3d3c39` | long paragraphs on the ground · 10.1:1 |

Rooms set `--room` (background) and `--on` (text) through a class:

| Class | Room | `--room` | `--on` | Contrast |
|---|---|---|---|---|
| `.umma` | UMMA BJJ | `#14245e` | `#fff` | 14.5:1 |
| `.alilm` | Al-Ilm Martial Arts | `#e6e1d6` | `#14110f` | 14.4:1 |
| `.more`, `.screens`, `.how` | charcoal: two more sites, captures, how it works | `#171716` | `#f5f5f2` | 16.4:1 |
| `.day`, `.offer` | the ground: Wolseley, what's on offer | `--bg` | `--ink` | 17.2:1 |
| `.jem`, `.apps` | Jembatan | `#b84d37` | `#fff` | 5.1:1 |
| `.way` | Waystone | `#0c4f4b` | `#fff` | 9.4:1 |
| `.shop` | E-commerce store (case study) | `#1d4ed8` | `#fff` | 6.7:1 |
| `.yoosuf` | Yoosuf Zaman (`/websites`) | `#c9a227` | `#0a1f45` | 6.7:1 |
| `.strat` | Stratemize (`/websites`) | `#16213b` | `#fff` | 16.0:1 |

Each colour comes from the project itself (UMMA's navy, Al-Ilm's bone, Jembatan's
terracotta, Waystone's teal, Yoosuf Zaman's gold and navy, Stratemize's slate, the store's
button blue). The footer is ink with `#a3a29c` labels (7.3:1) and `#c9c8c2` body (11.2:1).

Rules inside a room are `color-mix(in srgb, currentColor 26%, transparent)`, so they work
on any colour. Shadows exist only under captures and phone frames.

## Type

- **Schibsted Grotesk**, variable, weights 400–700, Latin subset, self-hosted
  (`public/fonts/schibsted-grotesk-latin.woff2`, 43 KB, preloaded). Chosen on 13 Nov over
  Instrument Sans, Host Grotesk and Funnel Display, tried on the first screen and a room:
  its serifed capital I suits a first-person sentence, and it is not one of the faces
  everything else uses.
- **Anek Bangla** 500 for Bengali (`anek-bangla-500-bengali.woff2`, 51 KB, plus a 5 KB file
  for the punctuation inside a Bengali sentence). Loaded only where Bengali text appears.
- No monospace face is loaded. `code` in case-study copy uses the system monospace.

| Element | Phone | Wide | Notes |
|---|---|---|---|
| First-screen sentence (`.hero h1`) | `clamp(25px, 7.1vw, 52px)` | `clamp(40px, 5vw, 104px)` | 500, −0.04em, lh 1.04, balanced; the tail in `--soft` |
| Room name (`.room h1, h2`) | `clamp(44px, 12.6vw, 96px)` | `clamp(56px, 6.6vw, 104px)` | 600, −0.048em, lh .96 |
| Long room heading (`.more`, `.offer`) | `clamp(32px, 9.4vw, 96px)` | as room name | lh 1 |
| Claim (`.claim`) | `clamp(21px, 5.7vw, 40px)` | `clamp(32px, 3.5vw, 70px)` | 500, −0.03em; `.about p` runs a step smaller |
| Lede | 17px / 1.42 | 19px / 1.45, max 37ch | |
| Facts | 14px, .78 opacity | 16px, 500, ruled | |
| Body | 16px / 1.5–1.6 | 17–18px | |
| Small label (`.kind`, list headings) | 14px, 500 | 15px | |

From 1700px wide the small type steps up with the headings (lede 24px, facts 20px, and so
on), so a big monitor does not get poster headings over tiny text.

## Layout

- Page padding `--pad`: 20px (phone), 32px (upright tablet), 36px (wide), 48px (from 1700).
- **The split:** `minmax(0, 5fr) minmax(0, 7fr)` with a `--gap` of 56px (72px from 1700).
  Words take the 5, the work takes the 7. Ruled lists use the same split.
- **Breakpoints are about shape, not just width:**
  - *Wide:* `(min-width: 900px) and (min-aspect-ratio: 11/10)`. Two columns.
  - *Upright tablet:* `(min-width: 700px) and (max-aspect-ratio: 11/10)`. The phone layout
    with more room and larger type.
  - Everything else is the phone layout.
- A room is `min-height: 100svh`. On a phone it is a column: name, capture (the stage,
  which flexes), lede, facts, links; every home-page room fits 390×844. Wide: name and lede
  at the top of the left column, the ruled facts and the links at its foot, the stage
  filling the right column and bleeding off the right edge.
- Sections after the rooms (`.also`, `.lead`, `.story`, `.about`) are padded 60px on a
  phone and 104px wide, on the ground.

## Parts

All in `src/styles/site.css`; the class names are the vocabulary.

- **First screen** (`.hero`): `.top` (name left; links and the `.cv` button right), `.me`
  (the photo, cropped to fill), the `h1`. Phone: photo above the sentence. Wide: photo left
  (5fr), sentence bottom-right (7fr); he looks right, towards his words, so the photo stays
  on the left. Height is `100svh` minus `--peek` (30–44px).
- **Room** (`.room` + a colour class): `.head` (`.kind`, the name), `.stage`, `.lede`,
  `.facts`, `.links`.
- **Stages:**
  - *Client site* (`.site`): the desktop capture (`.screen`) with the phone capture
    (`.device`) over its corner.
  - *Pair* (`.pairs`): two sites side by side. Phones show phone captures in device frames;
    wide shows the desktop captures, each with name, one line, stack and link.
  - *Recording* (`.jem .stage`, `Recording.astro`): the video in a phone with its caption,
    and beside it "You say" / "It sends, in Bengali" with "Real output, not written by hand."
  - *Phones* (`.way`): two overlapping app captures, a third where there is room.
  - *One screen* (`.shop`), *one phone* (`.apps`).
- **The words as the stage** (`.day`): for Wolseley, which has no picture. The claim, the
  roles as a ruled list with dates, the two tool lists (`.tools`) and a CV link.
- **Ruled list** (`.rows`): name on the left of the split, what it is on the right, links
  at the end of the row. Used for "Also", the Jembatan steps and examples, services and
  how-it-works.
- **Footer** (`.end`): ink. A label, the email address large, one sentence, the CV button
  with GitHub and LinkedIn, then a ruled last line. `/websites` has its own, with no CV.

## The other pages

- **Case studies** (`/work/<slug>/`): the first screen is the project's room (`.first`),
  with the top bar on its colour. Then on the ground: the first sentence of the intro as a
  claim with the rest under it and a "Built with" line (`.lead`); for Jembatan, how it
  works and three real said/sent pairs; the captures on charcoal (`.screens`: phones four
  across, two on a phone; web captures two across); the story as a ruled list with the
  heading on the left of the split (`.blocks`); the footer, whose last line leads back to
  the home page.
- **`/websites`:** a bare first screen with a sentence for a business owner and a "Get in
  touch" button; the four client sites as rooms, each with what it does for the business
  and one quiet line on how it is built; what's on offer (`.offer`); client quotes
  (`.quotes`, hidden until there is a real one); how it works (`.how`); "I build apps too"
  in Jembatan's room (`.apps`); who you're working with (`.about`); the close. No CV, no
  day-job room, no builds list, no link to the home page.
- **404:** the ground, the name, one line at room-name scale, a link home.

## Motion and fallbacks

| Condition | Result |
|---|---|
| Default | The recording plays, muted and looping, while at least 35% of it is on screen, and pauses when it leaves. `preload="metadata"`, so the clip (729 KB) is fetched when it first plays |
| `prefers-reduced-motion: reduce` | The recording never plays. Its poster, the review frame, shows instead |
| No JavaScript, or no IntersectionObserver | The same poster. Every page is complete without script |
| Fonts not yet loaded | `font-display: swap` over `system-ui` |

## Meta surfaces

- **Share images:** `public/og.jpg` (home and case studies) and `public/og-websites.jpg`,
  1200×630: the photo, the page's sentence, and the navy peek along the bottom. Their
  source is `design-reference/v4/og.html` (`?websites` for the second).
- **Favicon:** `public/favicon.svg`, the ink plate with a drawn capital J in the ground
  colour (a path, since an SVG favicon cannot load the typeface); `favicon.ico` (32 and 16)
  and `apple-touch-icon.png` (180) are rendered from it.
- `theme-color` is the ground, `#f5f5f2`.

## Measured (2026-11-13, production build)

| | v4 | v3 for comparison |
|---|---|---|
| Home HTML, gzipped, stylesheet included | 8.8 KB | 16 KB + 10 KB CSS |
| JavaScript | one inline script, about 0.4 KB | 161 KB gz |
| Requests before the first screen is complete | the document, one font (43 KB), the photo | — |
| The photo | 293 KB at 1200 wide (phones at 3x); 720-wide cut for 1x desktops | — |
| Client captures | 56–143 KB each, lazy | 244–372 KB each |
| The recording | 729 KB, fetched when it first plays | the same |
| Real-device LCP and CLS | **not yet measured on the owner's phone** | |

## Decision log

- **9 Nov.** Three ideas (work-first, person-first, words on colour). He picked work-first,
  then asked for his photo on the first screen and for each section to take the whole
  screen. He rejected sliding or stacking scroll ("cool or gimmicky", and the text
  disappears first) and empty desktop space.
- **9 Nov.** The first screen stays bare: his one condition from Claude, and he agreed.
- **13 Nov.** A blind review (a recruiter, a buyer, a lead developer) of the sketch led to:
  the first sentence naming Wolseley; a tighter photo crop; Wolseley as its own room between
  the client sites and the apps; hard facts as a ruled list in each room; real links and
  stacks on every "Also" row.
- **13 Nov.** Schibsted Grotesk replaced Instrument Sans. One light theme; no dark theme.
- **13 Nov.** Built in Astro with one hand-written stylesheet and no client framework.
  v3 shipped 161 KB of JavaScript for a static page.
- **Carried from earlier versions:** no numbered eyebrows, no monospace kickers, no italic
  or serif headings, no directional glyphs in links, no skills chip wall, no metric without
  its denominator, nothing that overclaims.
