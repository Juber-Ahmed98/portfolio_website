# Portfolio Website — Design Brief

Owner: Mohammed Juber Ahmed · Birmingham, UK
Domain: **juberahmed.dev** · GitHub: **github.com/Juber-Ahmed98** · Email: mohammed.juber.ahmed@gmail.com
Host: **Cloudflare** (the domain, this site and the Jembatan Worker all live in one account)

This brief is the source of truth for what the site says and why. **`DESIGN.md` is the
binding contract for how it looks.** The site is on its fourth version (v4, November 2026).

---

## Purpose & positioning

- **Goal:** a job-hunting portfolio for hiring managers and recruiters, to land a frontend
  (frontend-leaning full-stack) role a level up from the current one. A visitor should think
  "the quality of this is amazing, I'd trust this person with my site."
- **Positioning:** a frontend developer who ships real things.
  - Anchor claim: **Wolseley's online store since December 2022** (responsive, accessible
    pages, A/B and multivariate tests in Monetate). It is in the first sentence of the site.
  - Paid client websites come next, then his own apps. Recruiters want websites first.
  - Full-stack and AI work is shown as what he builds on his own, never as the day job.
    Every claim has something to open; nothing to get caught out on in an interview.
- **Copy:** short, plain, first person, British English. Nothing that sounds like marketing
  or like an AI wrote it. Never invent a fact, a quote or a number.

## Content

All copy lives in `src/content/site.ts` (home page and case studies) and
`src/content/websites.ts` (`/websites`). Pages never hold copy inline.

### The home page, top to bottom

1. **First screen:** his photo and one sentence. "I'm Juber, a frontend developer in
   Birmingham. I've worked on Wolseley's online store since 2022, and I build websites and
   apps of my own." Name, Email and Download CV above it. Nothing else goes here.
2. **UMMA BJJ** (paid client site). Six-page site for a Birmingham Jiu-Jitsu and MMA gym,
   replacing a GoDaddy template: hand-coded HTML/CSS/JS, no build step, served as Workers
   static assets. The timetable renders from one data block; the free-trial form composes a
   WhatsApp message to the coaches. Paid, signed off, portfolio use approved. One link:
   **Visit ummabjj.com**. No case study, **no code link** (the repo holds client photos of
   children and stays private).
3. **Al-Ilm Martial Arts** (paid client site). One page for a Birmingham martial arts club:
   plain HTML/CSS/JS on a Cloudflare Worker that also runs `POST /api/enquiry`, mailing both
   waiting-list forms to the club. Forms work with JavaScript off. One link: **Visit
   alilmmartialarts.co.uk**. No case study, **no code link**.
4. **Two more client sites**, as a pair: **Yoosuf Zaman** (a business coach's site with a
   Worker-backed booking form, https://yoosufzaman.com/) and **Stratemize** (a marketing
   agency's site: React 19 + TypeScript on Workers, a live consultation booker on tRPC and
   D1, https://stratemize.co.uk/). Live links only.
5. **Wolseley** (the day job). The claim, the two roles with dates, the two tool lists, a CV
   link. Keep it at exactly this level: nothing internal, no numbers he hasn't cleared.
6. **Jembatan.** Android keyboard that turns what you say into the message a native speaker
   would send, on his own Cloudflare Worker. Used daily by his family; in open testing on
   Google Play. Shown as the real recording looping in a phone, plus one real said/sent pair
   in Bengali ("Real output, not written by hand"). Links: the case study and
   https://jembatan.juberahmed.dev/. **No code link** (the repo is private).
7. **Waystone.** Native Android fitness app (Kotlin + Compose, Room, Bluetooth scale sync,
   an AI coach that only proposes), in testing on Google Play. Links: the case study and
   https://waystone.juberahmed.dev/. **No code link** (private: health data in the docs).
8. **Also:** E-commerce store (case study + code), Qibla Compass (live + code), Habit
   tracker (code, in progress). Then the footer: email, CV, GitHub, LinkedIn, and the one-way
   door to `/websites`.

### Rules for what goes on the page

- **Privacy:** no code links for UMMA BJJ, Al-Ilm, Jembatan or Waystone. Nothing about
  private repos. Wolseley stays at the level of the current copy.
- **Rows need a link.** A build with nothing public to open stays off, and so does any
  sentence about private work. Thin builds stay off too: every row should be worth an
  interview question.
- **Excluded:** empty scaffolds and starter templates (`my-react-app`,
  `AI-ecommerce-project`), third-party clones (`open-design`), duplicates
  (`qibla_compass_v2`), docs-only folders, and anything personal (`sakinah`, `little_one`,
  `bali_itinerary`, `job-hunt`). `quran-just-one-verse` returns when there is something to
  point at.
- **Real output only.** Jembatan's examples are the pair on screen in the recording and the
  production prompt and model's most common answers in its eval sweep. Each is the message
  itself ("can you pick up some rice…"), never an instruction ("Tell Dad…").
- **Quotes** from clients are being collected (Stratemize, Yoosuf Zaman, UMMA BJJ). The
  quotes section on `/websites` stays hidden until a real one is in `websites.ts`.

### History worth knowing

- `ecommerce_store` was demoted from Featured long ago; its case study stays live and
  indexed, and the "Also" row links to it.
- Waystone replaced Mission to Abs (2026-10-15). `/work/mission-to-abs/` 301s to
  `/work/waystone/` through `public/_redirects`.
- v3's bilingual poster hero, scroll-scrubbed film, canned demo panel and builds index are
  gone in v4. The film's phone cut is still the recording on the home page.

### Experience (from the CV)

- Wolseley — Digital Developer (Aug 2024–present) and Apprentice Merchandiser/Developer
  (Dec 2022–Aug 2024). Amazon (2021–22) optional/short.
- Education: L3 Software Development Technician (QA Apprenticeships). BSc Radiotherapy
  (part). A-levels.
- Skills: HTML, CSS (SASS), JavaScript, responsive design; A/B testing, Monetate,
  functional testing; Python, C#, SQL/NoSQL; Bloomreach, Yext, GitHub, Jira, Asana.

### Contact

**Download CV (PDF)** (`public/cv.pdf`) · **mailto** · **GitHub** · **LinkedIn**. No
contact form. No blog: depth lives in the case studies.

## Design direction — v4 (2026-11-13, branch `redesign/v4`)

The owner gave Claude full control of the design after v1–v3, in his words, looked AI-made,
too busy and too clever, so the work got lost. What he chose from the sketches:

- **The first screen is him:** his photo and one sentence, taking the whole first screen on
  phone, tablet and desktop. Seeing him builds trust.
- **Then a room for each piece of work:** the full screen, in that project's own colour,
  with the real capture in it. Websites first, then apps.
- **Normal scrolling.** No sliding or stacking panels, no reveals, no empty desktop space.
- One typeface (Schibsted Grotesk), one light theme, no motion beyond the Jembatan recording.

The finished home page design is `design-reference/v4/home.html`; the production page
matches it element for element. `DESIGN.md` has the tokens, the layouts and the rules.
Design, copy and layout decisions in it are final: change `DESIGN.md` first if the
direction ever changes.

## Tech & architecture

- **Stack:** [Astro](https://astro.build) 7, static output, TypeScript for the content
  modules, one hand-written stylesheet (`src/styles/site.css`, inlined at build time). No
  UI framework, no CSS framework. The only JavaScript on the site is one inline script that
  plays the Jembatan recording while it is on screen.
- **Pages** (`src/pages/`): `index.astro` (home), `websites.astro`, `work/[slug].astro`
  (Jembatan, Waystone, E-commerce store, from `caseStudies` in `site.ts`), `404.astro`,
  `sitemap.xml.ts`. Shared: `src/layouts/Base.astro`, `src/components/Footer.astro`,
  `src/components/Recording.astro`, `src/lib/text.ts`.
- **URLs are fixed:** `/`, `/websites/`, `/work/jembatan/`, `/work/waystone/`,
  `/work/ecommerce-store/`, `/cv.pdf`, plus the redirects in `public/_redirects`. Never
  break one.
- **`/websites`:** the page linked from cold emails to small and medium businesses, read by
  an owner on a phone. Same design: a bare first screen (photo and one sentence), the four
  client sites as rooms in the owner's terms, what he can build, how it works, "I build
  apps too" (Jembatan), who you're working with, contact. It **never links back to the
  job-hunting material** (no CV, day job or builds list); the home page's footer links to
  it, one way. The WhatsApp buttons (top bar and close) come from `reach.whatsapp` in
  `websites.ts`, set on 2026-11-13; emptying it hides them. No prices or timelines until
  the owner sets them.
- **Fonts** are self-hosted in `public/fonts/` (Schibsted Grotesk 400–700, Anek Bangla 500
  for Bengali). No request leaves the site.
- **Media** lives in `public/`: `juber.webp`, `shots/<client>/{desktop,phone}.webp`,
  `film/`, `work/<project>/`, `og.jpg`, `og-websites.jpg`, favicons. The repo is public:
  only the photo crop the site uses is committed; the masters stay untracked.
- **Build and deploy:** `npm run build` writes `dist/`. `wrangler.jsonc` serves it as
  Workers static assets with `dist/404.html` for unknown paths. `main` auto-deploys through
  `.github/workflows/deploy.yml`, so **never push or merge to `main` without the owner
  saying so**.
- **Local:** `npm run dev` (Astro, port 4321). The sketches in `design-reference/` are
  served from the repo root by any static server, which is why their media paths start
  `/public/`.

## Checking a change

Done means all of these, on the built site (`npm run build`, then serve `dist/`):

- Every page looked at in screenshots at phone (390×844) and desktop (1440×900) widths.
- No horizontal overflow at 360, 390, 768, 1024, 1440 and 1920 wide.
- Under `prefers-reduced-motion` the recording never plays (the poster shows instead).
- The home page still matches `design-reference/v4/home.html`.

The screenshot and comparison scripts (`shot.mjs`, `compare.mjs`, `check.mjs`,
`icons.mjs`) are local-only in `design-reference/plans/v4-tools/` (gitignored, with the
working plans). They drive the installed Edge through `puppeteer-core` and must be run from
PowerShell. `icons.mjs` regenerates the favicons and the two share images from
`public/favicon.svg` and `design-reference/v4/og.html`.

## Still to come from the owner

Nothing below can be written until he supplies it. Never fill a gap with something invented.

- Client quotes (Stratemize, Yoosuf Zaman, UMMA BJJ).
- One concrete Wolseley A/B test result with rough scale, if he is allowed to share it.
- A live demo URL for the e-commerce store, if there is one.
- Prices or timelines for `/websites`, if he wants them shown.
- Whether he takes contract work, and whether to say so.
- A photo facing the camera, if he prefers one. (The current photo is his own touched-up
  version, supplied 2026-11-13; its master is local-only in `design-reference/plans/`.)
- A Bengali recording of the keyboard (the current one is English into Indonesian).
