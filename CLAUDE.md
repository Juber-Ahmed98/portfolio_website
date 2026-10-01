# Portfolio Website — Design Brief

Owner: Mohammed Juber Ahmed · Birmingham, UK
Domain: **juberahmed.dev** (owned, empty — this site goes at root)
GitHub: **github.com/Juber-Ahmed98** · Email: mohammed.juber.ahmed@gmail.com
Host: **Cloudflare** (domain + Jembatan Worker already here)

This brief is the source of truth. It captures decisions made in a full planning
session. Feed it to Claude Code as context (it's also mirrored in `CLAUDE.md`).

---

## Purpose & positioning

- **Goal:** A job-hunting portfolio aimed at hiring managers/recruiters, to land a
  frontend (frontend-leaning full-stack) role a level up from the current one.
  Optimise for credibility, skimmable-in-30-seconds structure, and a few strong
  featured projects.
- **Positioning:** *"Frontend developer who ships real products."*
  - Anchor claim: **3+ years building a high-traffic B2B e-commerce frontend at
    Wolseley** (responsive/accessible pages, A/B testing, Monetate personalisation,
    Agile). This is the professional backbone — lead with it.
  - Full-stack / AI framed as **"currently building"** — growth, not overclaim.
    Every live demo must back the claim; nothing to get caught out on in interview.
- **Identity hook: "The prolific builder."** Someone who builds constantly, across
  AI, fitness, faith, and e-commerce. Turn *volume* into a design feature (a visible
  "things I've built" wall), while featuring 3 projects deeply.

## Content

### Featured projects
- **Jembatan — HERO (flagship card).** Android floating-bubble translator + Cloudflare
  Worker backend (`/api/v1/translate`). Full-stack + mobile + real product maturity
  (roadmap, marketing, privacy, UX research on onboarding/keyboard/latency, branding).
  - Live demo → **https://jembatan.juberahmed.dev/** · Code → github.com/Juber-Ahmed98/Jembatan-app
  - Angle: "I don't just build UIs — I ship a whole product, backend included."
  - Its case study carries a "the website" block showcasing the marketing site's
    site-wide language picker and motion (the live URL is surfaced there).
- **UMMA BJJ (client site, first featured row).** Six-page site for a Birmingham
  Jiu-Jitsu/MMA gym, replacing a GoDaddy template: static HTML/CSS/JS, no build step,
  served as Workers static assets. Timetable renders from one data block; the free-trial
  form composes a WhatsApp message to the coaches. Paid, signed off, and the client
  approved portfolio use. Card-only: one **"Visit site"** button → https://ummabjj.com/.
  No case-study page, no code link (repo holds client photos of children, stays private).
- **Al-Ilm Martial Arts (client site).** One-pager for a Birmingham martial arts club:
  plain HTML/CSS/JS served off a Cloudflare Worker that also runs `POST /api/enquiry`,
  mailing both waiting-list forms to the club via a `send_email` binding. Forms post
  natively and work with JS off. Card-only: one **"Visit site"** button →
  https://alilmmartialarts.co.uk/. No case-study page, no code link.

> **Demoted, not deleted:** `mission_to_abs_app` and `ecommerce_store` moved out of Featured
> into the wall, but their `/work/` case-study pages stay live and indexed; each wall entry
> links to its case study. Don't restore them to Featured.
>
> **Yoosuf Zaman** (personal-brand site for a business-setup consultant, plain
> HTML/CSS/vanilla JS, https://yoosufzaman.com/) moved from Featured to the wall on
> 2026-08-22 to make room for Al-Ilm. It keeps its "live site" link and never had a
> case study.
>
> **Stratemize** (full-stack agency site: React 19 + TS over Workers, tRPC + D1 behind
> a live consultation booker, https://stratemize.co.uk/) moved from Featured to the wall
> on 2026-10-01 to make room for UMMA BJJ. It stays in the wall's collapsed first six.

### Works in progress (honest WIP — no live-demo button, or clearly labelled)

> The dashed "currently building" strip under the wall was removed on 2026-08-22 as
> redundant: the wall's `building` stamps already say it. These live on the wall.
- **habit_tracker (headliner).** Impressive *shell*: Next.js 16, React 19, TS strict,
  Tailwind v4, installable PWA, light/dark theming, 5-tab architecture. Features not
  wired yet (tabs empty) — so it lives here, NOT in featured, to avoid an empty demo.
  Angle: modern-stack architecture showcase.
- quran-just-one-verse, Qibla_Compass — early, shown as genuine works-in-progress.
  (quran-just-one-verse is off the wall for now — see the exclusions below.)

### More builds (the index)
- v3 replaced the collapsing card wall with a ruled index (`builds` in `site.ts`): every
  other real build with something public to click, strongest first, each with name,
  month started, live/building status, one line, stack and links. The count in the
  copy is derived from `builds.length`.
- Rows without a public link stay off the list (a row you can't open is a dead end), and
  so does any line about private work. Thin builds stay off too (the FFMI calculator was
  dropped on 2026-10-01): every row should be worth an interview question.
- **Exclude** empty scaffolds/starter templates (`my-react-app`, `AI-ecommerce-project`),
  third-party clones (`open-design`), duplicates (`qibla_compass_v2`), docs-only folders,
  and anything personal (`sakinah`, `little_one`, `bali_itinerary`, `job-hunt`).
  `quran-just-one-verse` returns when there's something to point at.

### Experience (from CV)
- Wolseley — Digital Developer (Aug 2024–present) & Apprentice Merchandiser/Developer
  (Dec 2022–Aug 2024). Amazon (2021–22) optional/short.
- Education: L3 Software Development Technician (QA Apprenticeships). BSc Radiotherapy
  (part). A-levels.
- Skills: HTML, CSS (SASS), JavaScript, Responsive design; A/B testing, Monetate,
  functional testing; Python, C#, SQL/NoSQL; Bloomreach, YEXT, GitHub, Jira, Asana.

### Contact / CTA
- **Download CV (PDF)** button (primary) · **mailto** email button ·
  **GitHub** (Juber-Ahmed98) · **LinkedIn**. No contact form.

## Design direction — v3, "Proof you can hold" (2026-10-01, branch `redesign/v3`)

- **Idea:** the site is built for the phone in someone's hand (the owner shows it on his
  phone, in person), and the work appears there as the real thing, working, at device
  scale. Supersedes "The Workshop" (2026-08-04), which read as a picked style and went
  flat on touch. **DESIGN.md is the binding contract**; the working direction doc is
  local-only in `design-reference/plans/`.
- **First screen:** "I build web products, front to back." in Mona Sans at its condensed
  end, poster scale, with the same line in Bengali beneath (switchable through
  Jembatan's languages), then Email / CV.
- **The film:** the phone under the hero pins, the room goes dark, and a real
  full-screen recording of the Jembatan keyboard scrubs under the scroll (speak →
  review → sent). Runs on phones. Then Jembatan's spec sheet and a demo panel styled as
  the keyboard's review strip (canned samples until the demo proxy is live).
- **Then:** client sites in DOM phones whose full pages pan as you scroll by;
  "By day, Wolseley." (above the side projects: it's the job being applied for); a ruled
  index of more builds; a close in the same dark room.
- **Type & colour:** Mona Sans (wdth 75 / 900 display, normal width body), Anek Bangla
  for the Bengali line, JetBrains Mono for data only. Warm paper / espresso, terracotta
  as the one signal, plus a "night" surface identical in both themes. Fully dual-themed,
  system preference, visible toggle (the new theme spreads from the button).
- **Motion:** zero dependencies; the type never moves; everything gated on reduced
  motion, which gets a complete still page.
- **No blog.** Depth lives in the case-study pages.

## Tech & architecture

- **Stack:** Next.js + TypeScript + Tailwind CSS.
- **Structure:** Single-page **home** (hero → film → Jembatan + demo → client sites →
  day job → more builds → contact) + **dedicated case-study pages** for Jembatan,
  mission_to_abs, and ecommerce (problem, approach, screenshots, stack, live + code links).
  The client sites are card-only "Visit site" links with no case page.
- **Deploy:** **Cloudflare Pages** via Next.js **static export** (`output: 'export'`).
  No SSR needed. Root domain `juberahmed.dev`. Keep everything in the existing
  Cloudflare account (also quietly demonstrates Cloudflare skills).
  - Note: static export means no server features — use client components / build-time
    data only. Images: `next/image` with `unoptimized: true` (or plain `<img>`).

## Sequencing (owner has a full-time job)

**Ship a lean MVP first, then deepen.**
- **Milestone 1 (live ASAP):** Home page — hero, featured-3 as cards (link out to live
  + GitHub), project wall, experience, contact + CV download. Deploy to
  juberahmed.dev. It's real and shareable.
- **Milestone 2:** The 3 case-study pages (Jembatan first).
- **Milestone 3:** Polish, motion, SEO/meta, accessibility pass.

## Copy starters (draft, make them yours)

- Hero H1 options:
  - "I build web products — front to back."
  - "Frontend developer who ships real products."
  - "Mohammed Juber Ahmed — I build things, constantly."
- Hero sub: "Birmingham-based developer. 3 years building a high-traffic B2B
  e-commerce frontend at Wolseley — and a stack of my own products in AI, health,
  and language on the side."