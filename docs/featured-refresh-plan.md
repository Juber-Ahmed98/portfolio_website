# Featured refresh plan — swap in client sites, showcase Jembatan

Handoff spec for reworking the homepage's featured line-up. A fresh session should be
able to build straight from this with no extra discovery. Everything below references
real files and current code.

**Read first:** [`src/content/site.ts`](../src/content/site.ts) (single source of truth for
all copy/data), [`DESIGN.md`](../DESIGN.md), [`CLAUDE.md`](../CLAUDE.md).

**Stack facts that constrain every change:** Next.js App Router, TypeScript, Tailwind v4
(tokens in `src/app/globals.css`), `next-themes`, **`output: 'export'` + `trailingSlash: true`**
(static export → Cloudflare Pages; no SSR, no server actions, build-time only). Images must
be plain `<img>` or `next/image` with `unoptimized` — no image optimization server exists.

---

## The change in one line

Move **Mission to Abs** and **E-commerce Store** out of Featured (they stay on the wall),
put **Stratemize** and **Yoosuf Zaman** into Featured as card-only links to the live sites,
and give the **Jembatan** marketing site a proper write-up inside its case study.

### Before → after

| Slot | Before | After |
|---|---|---|
| Flagship (dark card) | Jembatan | **Jembatan** (unchanged; case study gets a new "the website" block) |
| Featured row 1 | Mission to Abs | **Stratemize** — card links to stratemize.co.uk |
| Featured row 2 | E-commerce Store | **Yoosuf Zaman** — card links to yoosufzaman.com |
| Wall (6 builds) | lists all 6 incl. mission/ecommerce | unchanged entries; mission + ecommerce gain a "case study" link |
| Case studies | jembatan, mission-to-abs, ecommerce-store | **all three kept** — no new case pages for the client sites |

### Locked decisions (from the planning session)

1. **Client sites are card-only.** No `/work/` case-study pages for Stratemize or Yoosuf —
   the featured card links straight to the live site.
2. **Live-demo only, no code link.** Client work; repos are private/client-owned. Each card
   shows one **"Visit site"** button and nothing else.
3. **Keep the demoted case studies, link them from the wall.** `mission-to-abs` and
   `ecommerce-store` pages stay live; their wall entries gain a small "case study" link so the
   writing isn't orphaned.
4. **Jembatan is showcased by linking the site in its case study** — a dedicated narrative
   block about the animations + the site-wide language picker, with the live URL surfaced.
   No iframe or video (deliberately deferred; see CP5 note).

---

## File map (everything you'll touch)

- [`src/content/site.ts`](../src/content/site.ts) — `FeaturedProject` type, `featured[]`,
  `WallProject` type, `wall[]`, `caseStudies.jembatan`. **Most of the work is here.**
- [`src/components/featured.tsx`](../src/components/featured.tsx) — featured-row rendering
  (add optional real screenshot image).
- [`src/components/wall.tsx`](../src/components/wall.tsx) — cell refactor to allow a second link.
- `public/featured/` — new folder for the two client-site screenshots.
- [`DESIGN.md`](../DESIGN.md) + [`CLAUDE.md`](../CLAUDE.md) — update the "featured projects"
  list so a later session doesn't "restore" the old line-up (CP6).

**Not touched:** [`sitemap.ts`](../src/app/sitemap.ts), `caseStudyOrder`, and the
`mission-to-abs` / `ecommerce-store` case-study entries all stay exactly as they are — the
pages remain live and indexed.

---

## CP1 — Swap the featured entries in `site.ts`

**Goal:** `featured[]` holds the two client cards; the type supports card-only entries.

1. **Loosen the type.** In `site.ts`, `FeaturedProject.slug` currently forces a case-study
   route. Make it optional and add an optional real screenshot:

   ```ts
   export type FeaturedProject = {
     name: string;
     slug?: string;            // only for entries that own a /work/ case page
     blurb: string;
     stack: string;            // mono stack line
     links: FeaturedLink[];
     screenshotLabel: string;  // placeholder tile caption (fallback when no image)
     image?: { src: string; alt: string }; // real screenshot for the card (CP2)
   };
   ```

2. **Replace both `featured[]` entries** with the client cards below (see the *Draft copy*
   appendix for the full objects, ready to paste). Each has a single `live` link labelled
   **"Visit site"** and **no** `case`/`code` links. The existing filter in `featured.tsx`
   (`kind === "live" && href === "#"`) doesn't affect these — the hrefs are real URLs.

3. **Leave `flagship` (Jembatan) untouched.**

**Verify:** `npm run build` type-checks (the optional `slug` is the only type-surface change).

> **Stacks are confirmed** (from the owner): Stratemize is `react · cloudflare-workers · d1`
> (React 19 + TS + Vite frontend, Cloudflare Workers + tRPC + D1 backend); Yoosuf is
> `html · css · vanilla-js` (hand-written, no framework, static on Cloudflare). Both are baked
> into the appendix — no guessing needed.

---

## CP2 — Real screenshots in the featured cards (recommended)

A "featured" slot that's just a blurb over the diagonal-stripe placeholder reads as unfinished
— and these are **live sites**, so a real screenshot is the whole selling point.

1. **Capture** a clean desktop screenshot of each site (in-app Browser pane → desktop viewport
   → full hero, light theme). Save as:
   - `public/featured/stratemize.png`
   - `public/featured/yoosuf.png`

   Keep each ≤ ~1400px wide and compressed (these ship in the static bundle).

2. **Render the image when present** in [`featured.tsx`](../src/components/featured.tsx). The
   right column of each featured row is currently the stripe tile (lines ~144–148). Swap to:

   ```tsx
   {project.image ? (
     <img
       src={project.image.src}
       alt={project.image.alt}
       loading="lazy"
       className="h-[200px] w-full rounded-[10px] border border-line object-cover object-top shadow-[var(--shadow-card)]"
     />
   ) : (
     /* existing stripe-tile fallback with project.screenshotLabel */
   )}
   ```

   Plain `<img>` (not `next/image`) keeps it simple under static export.

3. Wire `image` into both entries in `site.ts` (already stubbed in the Draft copy appendix).

**Verify:** preview the home page — both featured cards show the real site, `object-top` keeps
the hero in frame, and the "Visit site" button opens the live URL in a new tab.

---

## CP3 — Wall: link the two demoted case studies

**Goal:** `mission_to_abs_app` and `ecommerce_store` wall cells get a small "case study" link.

1. **Extend the type** in `site.ts`:

   ```ts
   export type WallProject = {
     name: string;
     badge: string;
     live: boolean;
     desc: string;
     tags: string;
     link: string;              // GitHub (or live) URL
     caseHref?: string;         // internal /work/ route, when a case study exists
   };
   ```

   Set `caseHref: "/work/mission-to-abs/"` and `caseHref: "/work/ecommerce-store/"` on those
   two entries. Leave the other four alone.

2. **Refactor the wall cell** in [`wall.tsx`](../src/components/wall.tsx). The cell is
   currently one `<a>` wrapping the whole card (lines ~24–51). You **can't** nest a second
   `<a>` (the case link) inside it — invalid HTML. Convert every cell to a `div` with an
   explicit links row at the bottom, applied uniformly so all six cells match:

   ```tsx
   {wall.map((project) => (
     <div key={project.name} className="flex flex-col gap-[6px] bg-bg px-[22px] py-5 transition-colors hover:bg-hover">
       <span className="flex items-baseline justify-between">
         <span className="text-[15px] font-bold text-ink">{project.name}</span>
         <span className={`font-mono text-[11px] font-semibold ${project.live ? "text-accent" : "text-wip"}`}>
           {project.badge}
         </span>
       </span>
       <span className="text-[13.5px] leading-[1.5] text-muted">{project.desc}</span>
       <span className="font-mono text-[12px] text-faint">{project.tags}</span>
       <span className="mt-1 flex gap-4 font-mono text-[12px]">
         <a href={project.link} target="_blank" rel="noreferrer" className="font-semibold text-muted hover:text-accent">code ↗</a>
         {project.caseHref && (
           <Link href={project.caseHref} className="font-semibold text-ink hover:text-accent">case study →</Link>
         )}
       </span>
     </div>
   ))}
   ```

   Add `import Link from "next/link";` at the top. Giving every cell an explicit `code ↗` link
   is a bonus — the whole card no longer has to be the click target.

3. **Counts stay at 6.** No wall entries are added or removed, so `sections.wall.title`
   ("6 builds and counting") and the hero stat ("6 builds on the wall") remain correct — don't
   touch them.

> **Not doing:** adding the two client sites to the wall. The wall is the personal-build index
> (the "prolific builder" proof); client work lives in Featured only. If the owner later wants
> them on the wall, add them and bump both "6" strings to "8".

**Verify:** the two demoted cells show a working "case study →" link into their `/work/` pages;
the other four show only "code ↗".

---

## CP4 — Confirm the case-study pages are still wired (no-op check)

The `mission-to-abs` and `ecommerce-store` entries in `caseStudies`, in `caseStudyOrder`, and in
[`sitemap.ts`](../src/app/sitemap.ts) must **stay**. This checkpoint is just a guard: don't
delete them. `generateStaticParams` still emits all three `/work/` routes; both pages keep
rendering and stay in the sitemap. Nothing to edit — just confirm.

---

## CP5 — Showcase the Jembatan website in its case study

**Goal:** surface jembatan.juberahmed.dev's animations + site-wide language picker where a
recruiter reads about the product, per decision #4.

1. **Add a narrative block** to `caseStudies.jembatan.blocks` in `site.ts` (drop it near the
   `design & brand` / `where it is now` blocks). Draft copy in the appendix — heading
   **"the website"**, covering the marketing site, its motion, and the site-wide language
   picker that translates the whole page (a live demo of exactly what the app does).

2. **Make the live link read as the site.** The jembatan case study already lists a
   `{ label: "Live demo", href: "https://jembatan.juberahmed.dev/" }` link — that's the site.
   Optionally relabel to **"Visit the site"** so it's unambiguous it's the web experience, not
   an app download.

3. **Optional — real site screenshots.** `caseStudies.jembatan.screenshots` currently lists
   four *app* captions. You may add one or two real captures of the website (e.g. the hero mid-
   animation and the **language picker open**) to `public/` and reference them once the case
   study renders real images (that image work is a separate, later effort — the screenshots
   array is still placeholder tiles today, so only do this if you're wiring real images).

> **Deferred on purpose:** a looping video preview or a live embedded iframe of the site would
> be flashier, but the owner chose the simple, robust route (link + write-up). If revisited
> later: an iframe needs the Jembatan Worker to send `Content-Security-Policy: frame-ancestors`
> permitting juberahmed.dev; a muted looping `<video>` avoids that entirely.

**Verify:** `/work/jembatan/` shows the new "the website" block and the live link opens the site.

---

## CP6 — Doc sync, build, verify, ship

1. **Update the briefs so the change sticks.** Grep `DESIGN.md` and `CLAUDE.md` for
   `Mission to Abs`, `ecommerce`, and `Featured` and update the featured-projects list to
   Jembatan + Stratemize + Yoosuf. Otherwise a future session reads the old brief and "restores"
   mission/ecommerce to Featured.

2. **Build:** `npm run build` — must pass and produce `out/` with `/work/jembatan/`,
   `/work/mission-to-abs/`, `/work/ecommerce-store/` all present.

3. **Preview and verify** (in-app Browser pane):
   - Featured shows Jembatan flagship + two client cards, each with a real screenshot and a
     working "Visit site" button (new tab, `rel="noreferrer"`).
   - Wall shows "case study →" on the two demoted builds, "code ↗" on all.
   - `/work/jembatan/` shows the new block; mission + ecommerce case pages still load.
   - A11y: every screenshot has alt text; external links are `target="_blank" rel="noreferrer"`;
     check the client cards in both light and dark theme.

4. **Commit** (no `Co-Authored-By: Claude` trailer — see `CLAUDE.md` global rule).

---

## Appendix — Draft copy (ready to paste)

Copy is drafted from the live sites (2026-07-21). Tighten to the owner's voice; **confirm the
`stack` lines** (marked `TODO`).

### `featured[]` — the two client cards

```ts
export const featured: FeaturedProject[] = [
  {
    name: "Stratemize",
    blurb:
      "A full-stack agency site, not a brochure: a React 19 and TypeScript frontend over a Cloudflare Workers backend, with a tRPC API and a D1 database behind a real consultation booker that stores live date and time slots. Eight services, a five-step process, and a lead-magnet capture — designed, built, and shipped.",
    stack: "react · cloudflare-workers · d1",
    links: [
      { kind: "live", label: "Visit site", href: "https://stratemize.co.uk/", external: true },
    ],
    screenshotLabel: "stratemize.co.uk",
    image: { src: "/featured/stratemize.png", alt: "Stratemize marketing agency homepage" },
  },
  {
    name: "Yoosuf Zaman",
    blurb:
      "A personal-brand site for a business-setup consultant, hand-built in plain HTML, CSS, and vanilla JavaScript with no framework. An editorial hero, a portfolio grid of the ventures he's launched, a services-and-outcomes breakdown, a booking page, and a consultation CTA, with purposeful motion throughout.",
    stack: "html · css · vanilla-js",
    links: [
      { kind: "live", label: "Visit site", href: "https://yoosufzaman.com/", external: true },
    ],
    screenshotLabel: "yoosufzaman.com",
    image: { src: "/featured/yoosuf.png", alt: "Yoosuf Zaman consultant portfolio homepage" },
  },
];
```

### New Jembatan case-study block

Add to `caseStudies.jembatan.blocks`:

```ts
{
  heading: "the website",
  body: [
    "Jembatan has its own site at jembatan.juberahmed.dev, and I built it to do the one thing the app does: cross a language barrier in front of you. A site-wide language picker re-renders the entire page in your chosen language on the spot, so a visitor sees the product make its own case in their own words instead of reading about it.",
    "The rest is motion in service of that idea — a calm, staged reveal down the page, the same terracotta accent the app uses, and transitions that only fire to show state, never for decoration. It's the quickest way to feel what the keyboard does without installing anything, so it's the first thing I point people to.",
  ],
},
```

(Optionally relabel the existing live link in `caseStudies.jembatan.links` from
`"Live demo"` to `"Visit the site"`.)

---

## Quick checklist

- [ ] CP1 — `FeaturedProject.slug` optional + `image?`; `featured[]` = Stratemize, Yoosuf (stacks confirmed)
- [ ] CP2 — capture `public/featured/*.png`; render `<img>` in `featured.tsx`
- [ ] CP3 — `WallProject.caseHref`; set on mission + ecommerce; refactor wall cell to a div
- [ ] CP4 — confirm case pages + sitemap untouched
- [ ] CP5 — add "the website" block to jembatan; surface the live link
- [ ] CP6 — sync DESIGN.md/CLAUDE.md; build; preview-verify; commit (no AI trailer)
