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

### Featured projects (all functional — safe behind a "Live Demo" button)
- **Jembatan — HERO.** Android floating-bubble translator + Cloudflare Worker
  backend (`/api/v1/translate`). Full-stack + mobile + real product maturity
  (roadmap, marketing, privacy, UX research on onboarding/keyboard/latency, branding).
  - Live demo → **https://jembatan.juberahmed.dev/** · Code → github.com/Juber-Ahmed98/Jembatan-app
  - Angle: "I don't just build UIs — I ship a whole product, backend included."
- **mission_to_abs_app.** Polished React frontend (framer-motion, recharts, zustand).
  Angle: frontend craft — animation, data-viz, state management. Live web demo.
- **ecommerce_store.** React + Tailwind + react-router. Angle: ties directly to the
  Wolseley e-commerce experience. Live web demo.

### "Currently building" strip (honest WIP — no live-demo button, or clearly labelled)
- **habit_tracker (headliner).** Impressive *shell*: Next.js 16, React 19, TS strict,
  Tailwind v4, installable PWA, light/dark theming, 5-tab architecture. Features not
  wired yet (tabs empty) — so it lives here, NOT in featured, to avoid an empty demo.
  Angle: modern-stack architecture showcase.
- quran-just-one-verse, Qibla_Compass — early, shown as genuine works-in-progress.

### Project wall / index
- A compact grid listing *all* real builds (even small ones) as proof of constant
  building. Each: name, one line, tags, GitHub link, live link if any.
- **Exclude** empty scaffolds/starter templates: `my-react-app`, `AI-ecommerce-project`,
  and the empty folders `just_arabic`, `sylhet-language-app`.

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

## Design direction

- **Style:** Clean, modern, one bold accent. Generous whitespace, strong typography,
  the work is the star, subtle motion (framer-motion — used sparingly, purposeful).
  Distinctive accent so it never reads as a template.
- **Theme:** Fully dual-themed (light + dark), respects system preference, visible
  toggle, no opinionated default. (Reuse the CSS-variable token pattern from
  habit_tracker.)
- **No blog.** Depth lives in the case-study pages instead.

## Tech & architecture

- **Stack:** Next.js + TypeScript + Tailwind CSS.
- **Structure:** Single-page **home** (hero → featured 3 → project wall → currently
  building → experience → about → contact) + a **dedicated case-study page per
  featured project** (problem, approach, screenshots, stack, live + code links).
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
- **Milestone 3:** "Currently building" section, polish, motion, SEO/meta, accessibility pass.

## Copy starters (draft, make them yours)

- Hero H1 options:
  - "I build web products — front to back."
  - "Frontend developer who ships real products."
  - "Mohammed Juber Ahmed — I build things, constantly."
- Hero sub: "Birmingham-based developer. 3 years building a high-traffic B2B
  e-commerce frontend at Wolseley — and a stack of my own products in AI, health,
  and language on the side."