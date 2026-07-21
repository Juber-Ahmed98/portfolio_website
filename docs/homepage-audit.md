# Home page audit — implementation plan

Findings from a Hallmark audit of the home page (`src/app/page.tsx`, `src/components/*`,
`src/content/site.ts`), run 2026-07-21. Verdict was **4 critical · 2 major · 4 minor**,
reading as AI-generated but narrowly: the layout and motion layers are clean, and every
tell sits in the labelling, nav, and type layers.

This plan groups the ten findings into six passes by **root cause**, not by severity, because
three of the criticals are the same underlying decision and fixing them separately means
touching the same files three times.

---

## Decide this before writing any code

`DESIGN.md` is the stated source of truth and it *mandates* two of the things the audit flags:

- Line 9: "monospace micro-labels as the distinctive touch"
- Line 69: "Section header pattern: mono index (`01`, `02`… in accent) + H2, baseline-aligned, gap `14px`"

So Pass C is not a bug fix. It is a reversal of an approved mockup decision, and the code and
the brief will disagree until `DESIGN.md` is amended. Two honest options:

- **Amend the brief and do the work.** The numbering reads as template to a reviewer who has
  seen a lot of dev portfolios, and "I chose it deliberately" is not a defence they will ever hear.
- **Keep the mono-index signature, fix the placement only.** Drop the four section indices but
  keep mono labels elsewhere, and stack every remaining label above its heading instead of beside
  it. This retires the hard-banned pattern while keeping the touch `DESIGN.md` calls distinctive.

The second is the smaller change and keeps the design language intact. The rest of this plan
assumes it. If you take the first instead, Pass C grows to include deleting the mono label
treatment from case-study block headings too.

## Blast radius

The audit targeted the home page, but two of the fixes reach further:

| Change | Home page | Case studies (`/work/[slug]/`) |
|---|---|---|
| Section heading placement | `section-heading.tsx` (3 call sites) | `page.tsx:160` grid, ~18 block headings |
| Arrow glyph removal | `site.ts` nav/hero/wall/featured/contact | `site.ts` case-study `links[]` |
| Type pairing | every heading | every heading |

`SectionHeading` itself is only used by the home page. The case-study pages hand-roll the same
two-column pattern at `work/[slug]/page.tsx:160`, so fixing the shared component does not fix them.
Do both in the same pass or the tell survives one click deep.

---

## Pass A · Amend the brief

Edit `DESIGN.md` first so the rest of the work has something true to build against.

- Typography section: replace the single-family spec with the display/body/mono pairing from Pass B.
- Layout section, "Section header pattern": replace the baseline-aligned index+H2 rule with
  a vertical stack, and note that the tag-beside-heading form is banned.
- Colour tokens table: update `--panel` per Pass F.
- Add a line recording that the section indices `01`–`04` were removed and why, so a future
  checkpoint does not helpfully restore them.

## Pass B · Type pairing

The highest-leverage single change on the list. Right now Plus Jakarta Sans is display *and*
body, so there is no pairing, and Plus Jakarta + JetBrains Mono is itself a recognisable
generated-portfolio combination.

Target is display + body + mono, with Plus Jakarta demoted to body and JetBrains Mono unchanged.

**Recommendation: Instrument Serif for display.** A serif display face is genuinely uncommon in
developer portfolios, which is the differentiation the brief asks for, and it reads editorial
without fighting "clean, modern". Alternate if you want to stay all-sans: Bricolage Grotesque.

Ship it roman. Instrument Serif is often used in italic and italic headings are one of the most
reliable AI tells, so headings stay `font-style: normal` and carry emphasis with weight or the
teal accent instead.

Files:

- `src/app/layout.tsx` — add the `next/font/google` import, expose `--font-instrument-serif`,
  add the variable to the `<html>` className alongside the existing two.
- `src/app/globals.css` — add `--font-display` to the `@theme inline` block so `font-display`
  resolves as a Tailwind utility.
- Headings — apply `font-display` to the hero H1 (`hero.tsx:22`), section H2s
  (`section-heading.tsx:17`), flagship H3 (`featured.tsx:68`), featured-row H3
  (`featured.tsx:115`), contact H2 (`contact.tsx:24`), and the case-study H1.
- Re-tune the hero `clamp(44px, 6.5vw, 78px)` and the `-0.035em` tracking. A serif at that size
  will not want the same negative tracking a geometric sans does.

## Pass C · The label system

Kills three findings at once: the hard-banned tag-left/header-right head, the Specimen
structural fingerprint, and the seven-eyebrow density.

**Remove the four section indices.** In `site.ts:49-59`, drop `index` from `sections.featured`,
`sections.wall`, `sections.experience`, `sections.contact`. Four of the seven numbered labels
go with them and nothing downstream needs the number.

**Flatten `SectionHeading`.** `section-heading.tsx:15` is `flex items-baseline gap-[14px]`, which
is the banned form. With the indices gone the component no longer needs an index prop at all, so
it collapses to a plain H2 and the three call sites lose an argument. If you keep an index
anywhere, stack it: `flex flex-col`, label above heading, same column. `contact.tsx:20` already
does this correctly and is the pattern to copy.

**Drop the featured-row index column.** `featured.tsx:105` is `md:grid-cols-[60px_1.1fr_420px]`.
Remove the 60px track and the `<span>` at `featured.tsx:111-113`, leaving content + screenshot.
Then decide what happens to `flagship.index` (`site.ts:77`, `"/01 · flagship"`) and the row
indices at `site.ts:95` and `:109`. Keeping only the flagship's is defensible if it is carrying
"this is the best one" meaning; otherwise all three go and `FeaturedProject.index` leaves the type.

**Fix the case-study blocks.** `work/[slug]/page.tsx:160` is `md:grid-cols-[180px_1fr]` with the
mono heading in the left track. Same fix: one column, heading above body. This is ~18 instances
across the three studies and is the larger half of this pass by volume.

**Drop the hanging indents.** `wall.tsx:21` and `experience.tsx:22` both carry `sm:ml-[74px]` to
line content up under the old H2. With the index gone the indent has nothing to align to.

## Pass D · Nav

`nav.tsx:15-46` matches all seven attributes of the named AI-nav fingerprint: wordmark hard-left,
four inline links, CTA button hard-right, full width, sticky, hairline border-bottom, near-white
background. The shape is genre-blind, which is what makes it read as templated.

Target an edge-aligned minimal treatment: brand pushed to the true left edge, a single CTA at the
true right, anchor links demoted out of the top bar. On a one-page site the four anchors can live
in the hero as a jump list, which also gives the hero something to do below the sub-paragraph.

At implementation time load `references/components/N9-*.md` from the Hallmark skill for the
archetype spec rather than working from this summary. If you want the bolder option, N6 masthead
makes the domain the headline, at the cost of vertical space above the hero.

`mobile-menu.tsx` moves with it.

## Pass E · Glyphs and icons

Two problems, one fix.

**Unicode dingbats standing in for an icon library.** `☾ ☀` at `theme-toggle.tsx:31` and `✕ ☰`
at `mobile-menu.tsx:25`. These render per-OS, and `☀` has an emoji presentation variant that some
Windows and Android builds draw as a colour emoji. Adopt Lucide (`lucide-react`), use `Sun` /
`Moon` / `X` / `Menu`, and keep the existing 34px circular button shell and `aria-label` logic.

**Directional arrows on nearly every link.** About fifteen instances of `↗ → ↓` across `site.ts`
plus the case-study `links[]`. Strip them all. `target="_blank"` already carries the external
meaning and `Live demo` reads fine without the glyph.

Labels affected: `hero.cta.label`, every `links[].label` on `flagship` / `featured` / case studies,
`wall[].badge` (`"live ↗"` → `"live"`), `currentlyBuilding.label`, `contact.links[]` (`"GitHub ↗"`).

## Pass F · Minors

Batch these, they are all small.

- **Uniform section padding.** `featured.tsx:51`, `wall.tsx:14`, `experience.tsx:14` are all
  `py-[70px]`, mandated by `DESIGN.md:67`. Vary it. Tighten the wall, give featured more room.
- **Pure white surface.** `globals.css:11`, `--panel: #ffffff`. Tint toward the teal anchor,
  e.g. `#fdfefe`. Low practical impact since `--panel` only surfaces on screenshot tiles and chips,
  but it is a named tell and it is a one-line change.
- **Card-in-card.** `featured.tsx:94-97`, flagship card → screenshot pane → bordered label chip.
  Drop the chip's border and let the label sit on the stripe.
- **Straight quotes.** `site.ts:281`, `:302`, `:309` use escaped `\"` in case-study body copy.
  Replace with curly quotes.

## Pass G · Verify

One finding could not be settled by reading the source and needs a browser.

- **Two-line clickable text.** Check `Download CV (PDF)` in the contact card and the flagship's
  three buttons at 320 / 375 / 414 / 768px. A wrapped button label is a responsive-discipline
  tell. Fix by shortening the label first, `white-space: nowrap` second.
- Re-check the Pass B serif at 375px. Display serifs break differently to geometric sans at
  small sizes and the hero `clamp()` may need another pass.
- Confirm no horizontal scroll at any of the four widths.
- Both themes, since the flagship and contact cards use fixed dark hex rather than tokens.

### Result — run 2026-07-21, both themes, 320 / 375 / 414 / 768

The original finding did not reproduce: **no button label wraps to two lines** at any width.
`whitespace-nowrap` was already on the contact CV button, the contact link row, the flagship's
three buttons, and the featured-row links, and each one clears its container. The contact links
and flagship buttons *do* wrap onto extra rows at 320px, but that is the flex container wrapping
whole buttons, not text breaking inside one.

The pass found a different bug instead. **The nav CV button overflowed the bar below 349px** —
wordmark (121px) + toggle (34px) + gap (16px) + button (130px) + 2×24px padding needs 349px, so
at 320px the button sat flush against the viewport edge with its right padding gone, and
`header > div` reported `scrollWidth 325 > clientWidth 320`. `whitespace-nowrap` is what turned a
wrap into an overflow, so the audit's own order applied: shorten the label first.

Fixed in `nav.tsx` + `site.ts:23` — the button renders `nav.cv.shortLabel` (`"CV"`) below 375px
and the full `"Download CV"` at or above it, with `aria-label` holding the accessible name steady
at both widths. The breakpoint is 375 rather than the 349 the maths gives, because between 349
and 375 the full label clears the wordmark by only ~11px and reads cramped.

Everything else came back clean:

- No horizontal scroll at any of the four widths, in either theme, on the home page or on all
  three case studies.
- The Instrument Serif hero holds at 375px (two lines, accent rule under the second) and at 320px
  (three lines). The `clamp()` did not need another pass.
- Light and dark both check out. The flagship and contact cards stay dark in light theme, as
  designed.
- No console errors. `next build` generates all 7 static routes.

---

## Findings to passes

| # | Finding | Severity | Pass |
|---|---|---|---|
| 1 | Tag-left / header-right section head | critical | C |
| 2 | Specimen fall-through | critical | C |
| 3 | The AI nav | critical | D |
| 4 | One-family type (no display/body pairing) | critical | B |
| 5 | Eyebrow on every section | major | C |
| 6 | Unicode glyphs as the icon system | major | E |
| 7 | Every section padded the same | minor | F |
| 8 | Pure white surface | minor | F |
| 9 | Card-in-card | minor | F |
| 10 | Straight quotes | minor | F |
| — | Two-line clickable text | not reproduced | G |
| — | Nav CV button overflows the bar below 349px | found by G | G |

## Gotchas

- **`featured.tsx:126` matches on label strings.** `link.label.startsWith("Code")` and
  `startsWith("Case")` drive the link styling. Stripping a *trailing* glyph keeps both working,
  but the coupling is fragile and a future label edit will break styling silently. Worth replacing
  with an explicit `kind` field on `FeaturedLink` while you are in there.
- **`wall.tsx:40` reads `project.live`, not the badge string.** Changing `badge: "live ↗"` to
  `"live"` is safe; the colour logic does not depend on it.
- **Pass B and Pass C both touch every heading.** Do B first so C is not re-tuning tracking twice.
- **`work/[slug]/page.tsx` uses `dynamicParams = false`.** Nothing here changes routing, but any
  edit to `caseStudyOrder` or a slug is a build-time 404 rather than a runtime one.
- **The flagship and contact cards use fixed dark hex, not tokens** (`DESIGN.md:40-42`). Pass F's
  `--panel` change will not reach them, by design. Do not "fix" that.

## Not changing

The audit found these already clean. Listed so no pass quietly undoes them.

- Hero is left-biased and content-height, not the `100vh` centred default.
- No three-column feature grid. Dark flagship plus asymmetric rows is a real structure.
- Footer is a single mono line, not the four-column-plus-social AI footer.
- No invented metrics. All three hero stats check out against real data: 3+ years matches the
  Dec 2022 start, "6 builds" matches `wall.length`, "1 API in production" is the Jembatan Worker.
  If Stratemize lands (see `stratemize-portfolio-plan.md`), keep this property.
- Motion discipline: zero `transition-all`, zero `hover:scale-105`, one signal per element,
  explicit property lists.
- `prefers-reduced-motion` handled properly at `globals.css:97-117`, including neutralising the
  hover-lift transforms.
- Focus ring is instant, visible, and works in both themes. Never transition it.
- None of: gradient headline, aurora blobs, floating orbs, glassmorphism, icon-tile cards.

## Suggested order

A → B → C → D → E → F → G.

B before C so headings are only re-tuned once. G last, but re-run the 375px check after B as well,
since the serif is the change most likely to break narrow layouts.
