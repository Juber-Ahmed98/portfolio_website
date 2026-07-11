# Roadmap — juberahmed.dev

Build plan for the portfolio site. Structured as **checkpoints**, each sized to fit
one Claude Code session. Read this + [`CLAUDE.md`](CLAUDE.md) (the brief) +
[`DESIGN.md`](DESIGN.md) (the concrete design system) before starting a checkpoint.

The finished visual design already exists — see
[`design-reference/home-mockup.html`](design-reference/home-mockup.html) (open it in a
browser to see both themes). Our job is to rebuild it as a real Next.js app and ship it.

---

## Locked decisions (from planning session, 2026-07-11)

- **Greenfield.** Fresh `create-next-app` in this folder. Claude inits git + first
  commit. **Owner creates the empty GitHub repo** (`Juber-Ahmed98/…`) — Claude then
  wires the remote and pushes.
- **CV PDF:** owner will provide the file. Until then the "Download CV" button points
  to a clearly-marked placeholder (`/cv.pdf`, not yet added) — do not fake it.
- **Screenshots:** MVP ships with the styled **placeholder tiles** from the mockup.
  Real screenshots of the three live demos get swapped in during Milestone 3.
- **Deploy:** build & polish the whole home page locally first, then a **single
  Cloudflare Pages setup** at the end of Milestone 1 (CP4).

## Tech (from CLAUDE.md)

- Next.js (App Router) + TypeScript + Tailwind CSS.
- **Static export** (`output: 'export'`) → Cloudflare Pages. No SSR, no server
  actions. Client components for interactivity; build-time data only.
- Images: `next/image` with `unoptimized: true`, or plain `<img>`.
- Deploy target: root domain `juberahmed.dev` on the existing Cloudflare account.

## How to run a checkpoint

1. Pick the next unchecked checkpoint below. Do **only** that checkpoint.
2. Match the mockup — pull exact tokens/specs from [`DESIGN.md`](DESIGN.md).
3. Hit the **Done when** bar. Verify `npm run build` (static export) still succeeds.
4. Commit with a clear message. Tick the box here and jot anything the next session
   needs under **Notes**.

---

## Milestone 1 — MVP home page, live and shareable

### ☑ CP0 · Scaffold & foundation  ✅ done 2026-07-11
Goal: a themed, empty app that static-exports cleanly.
- `create-next-app` — TypeScript, Tailwind, App Router, `src/` dir, no ESLint prompt drama.
- `next.config`: `output: 'export'`, `images.unoptimized: true`, `trailingSlash: true`.
- Fonts via `next/font/google`: **Plus Jakarta Sans** (400–800) + **JetBrains Mono**
  (400–600). Expose as CSS variables.
- Global CSS: drop in the **full light + dark token set** from DESIGN.md as CSS
  variables on `:root` / `.dark`.
- Theme system: use **`next-themes`** (class strategy, `defaultTheme="system"`,
  no default opinion) so system preference is respected and there's **no flash** on
  load. Build the toggle button (☾ / ☀) but it can live in a placeholder header for now.
- `git init`, `.gitignore`, first commit.

Done when: `npm run dev` shows a page that switches light/dark with no flash, and
`npm run build` produces a static `out/` with no errors.

**Notes for next session (CP1):**
- Stack landed: **Next 16.2.10, React 19.2.4, Tailwind v4** (no `tailwind.config`
  — theme lives in `src/app/globals.css` via `@theme`/`@custom-variant`).
- Tokens are Tailwind utilities now: `bg-bg`, `text-ink`, `text-body`, `text-muted`,
  `bg-accent`, `border-line`, `bg-chip`, `text-wip`, `bg-flag`, etc. Fonts:
  `font-sans` (Plus Jakarta) / `font-mono` (JetBrains Mono). Prefer these over
  raw `var(--x)` where a utility exists.
- Theme: `next-themes`, class strategy, `.dark` on `<html>`, `defaultTheme="system"`.
  Toggle at `src/components/theme-toggle.tsx`; provider at `theme-provider.tsx`.
- `next.config.ts` pins `turbopack.root` (a stray `package-lock.json` sits in the
  parent `GitHub/` dir — leave it, the pin handles it).
- Branch is `main`; first commit `6e47d13`. `src/app/page.tsx` is a throwaway CP0
  placeholder — replace it in CP1. Left-over scaffold SVGs in `public/` can be
  deleted whenever.

### ☐ CP1 · Nav + Hero + content data model
Goal: top of the page pixel-matches the mockup, and content is data-driven.
- Create a typed content module (e.g. `src/content/site.ts`) holding: nav links,
  hero copy + stats, the 6 **wall** projects, the 3 **featured** projects, experience
  entries, toolbox chips, contact links. Source the data from the mockup's script
  block and CLAUDE.md.
- **Nav** component: logo `juberahmed.dev` (accent on `.dev`), links, theme toggle,
  Download CV button. Sticky-or-static per DESIGN.md.
- **Hero** component: eyebrow line, H1 with the highlight underline on "front to
  back.", sub-paragraph, mono stat row (gated on `showHeroStats`).

Done when: nav + hero match the mockup in both themes, content comes from the data
module, build passes.

### ☐ CP2 · Featured work + The Wall
Goal: the two core "proof" sections.
- **Featured work**: the dark **Jembatan flagship** card (2-col, "live in production"
  badge, live/case-study/code buttons) + the two featured rows (Mission to Abs,
  E-commerce). Screenshot areas use the **placeholder tiles** for now.
  Case-study links point to `#` (wired in Milestone 2).
- **The Wall**: 3-col grid of all 6 builds, data-driven from the content module, with
  live/building badges and tags. The dashed **"currently building → habit_tracker"**
  strip sits directly beneath (this is how the mockup folds the "currently building"
  content in — no separate section needed).

Done when: both sections match the mockup in both themes, wall renders from data, build passes.

### ☐ CP3 · Experience + Contact + responsive & a11y pass
Goal: finish the page and make it real on mobile + accessible.
- **Experience**: two-column (roles timeline + toolbox chips).
- **Contact**: dark CTA card ("Hire someone who ships."), Download CV (placeholder),
  Email (mailto), GitHub, **LinkedIn** (needs URL — see Open questions). Footer line.
- **Responsive**: the mockup is desktop-only (fixed px grid columns). Add breakpoints
  so every multi-column grid stacks cleanly on tablet/mobile (nav collapses, flagship
  card goes single-column, wall 3→2→1, experience 2→1). This is real work — budget for it.
- **A11y**: semantic landmarks, real heading order, focus-visible states, `aria-label`
  on the toggle, `prefers-reduced-motion` respected, color-contrast check in both themes.

Done when: full home page complete, looks right from 375px → wide desktop, keyboard-
navigable, build passes.

### ☐ CP4 · Deploy to Cloudflare Pages
Goal: live at juberahmed.dev.
- Owner creates the GitHub repo; Claude wires remote + pushes.
- Create a Cloudflare Pages project from the repo (build: `next build`, output: `out`).
- Attach custom domain `juberahmed.dev` (root). Verify HTTPS + both themes live.

Done when: the polished home page is live at https://juberahmed.dev and shareable.
**← End of Milestone 1: the site is real.**

---

## Milestone 2 — Case-study pages (Jembatan first)

### ☐ CP5 · Case-study template + routing
- `/work/[slug]` static route with `generateStaticParams` (Jembatan, Mission to Abs,
  E-commerce). Shared layout: problem → approach → stack → screenshots → live + code
  links, plus back-to-home nav. Case-study content lives in the content module.
- Wire the "Case study →" links from the featured section to these routes.

Done when: three case-study routes build statically and link both ways with the home page.

### ☐ CP6 · Jembatan case study (the deep one)
- Full narrative: the product (app + Cloudflare Worker `/api/v1/translate`),
  approach, UX research (onboarding/keyboard/latency), roadmap, branding. This is the
  flagship — it should carry the most depth.

### ☐ CP7 · Mission to Abs + E-commerce case studies
- Two shorter studies. Mission to Abs → frontend craft (motion, charts, state).
  E-commerce → ties to the Wolseley day-job.

---

## Milestone 3 — Polish, real assets, launch-ready

### ☐ CP8 · Real screenshots + CV PDF
- Capture real screenshots from the three live demos (the `screenshots` skill can
  help), optimize, swap into the featured cards + case studies.
- Drop in the real CV PDF, wire the Download CV buttons to it.

### ☐ CP9 · Motion pass
- Add `framer-motion` **sparingly** (per the brief): hero entrance, purposeful card
  hovers, subtle scroll-reveal on sections. All gated behind `prefers-reduced-motion`.

### ☐ CP10 · SEO / meta / final a11y + launch
- Per-page metadata, OpenGraph + Twitter card, an OG image, favicon, `sitemap.xml`,
  `robots.txt`. Lighthouse pass (perf/SEO/a11y). Final accessibility audit.

Done when: strong Lighthouse scores, share previews look right, ready to send to recruiters.

---

## Open questions to resolve before they're needed

- **LinkedIn URL** — needed at CP3 (contact card currently has a `#` placeholder).
- **CV PDF** — needed at CP8 (or earlier if ready).
- **Real screenshots** — captured at CP8 from the three live demos.

## Progress tracker

| CP | Milestone | Status |
|----|-----------|--------|
| CP0 | 1 · Scaffold & foundation | ☑ done |
| CP1 | 1 · Nav + Hero + data | ☐ |
| CP2 | 1 · Featured + Wall | ☐ |
| CP3 | 1 · Experience + Contact + responsive/a11y | ☐ |
| CP4 | 1 · Deploy to Cloudflare Pages | ☐ |
| CP5 | 2 · Case-study template + routing | ☐ |
| CP6 | 2 · Jembatan case study | ☐ |
| CP7 | 2 · Mission to Abs + E-commerce | ☐ |
| CP8 | 3 · Real screenshots + CV | ☐ |
| CP9 | 3 · Motion pass | ☐ |
| CP10 | 3 · SEO/meta/a11y + launch | ☐ |
