# UX + Search-visibility plan — juberahmed.dev

Handoff spec for improving the live site's UX (light-theme washout, big-screen "void",
type size, heading font) and search/social visibility (metadata, OG cards, structured
data, sitemap). Written so a fresh session can build straight from it with no extra
discovery.

**Read first:** [`DESIGN.md`](../DESIGN.md) (design contract), [`CLAUDE.md`](../CLAUDE.md)
(brief). This plan **overrides** two DESIGN.md decisions on purpose — see "Design-contract
overrides" below. When you implement a checkpoint, update DESIGN.md in the same commit so a
later session doesn't "restore" the old decision.

**Stack facts that constrain every change:** Next.js 16 App Router, TypeScript, Tailwind
**v4** (CSS-first config in `src/app/globals.css`, tokens exposed via `@theme inline`),
`next-themes` (class strategy, `.dark` on `<html>`), `output: 'export'` +
`trailingSlash: true` (static export → Cloudflare Pages; **no SSR, no server actions,
build-time only**). Fonts via `next/font/google`.

---

## Diagnosis — what's actually wrong on screen

Measured on the live site (computed styles, not guesses):

**1. Light theme reads as a white void.** Tokens are `--bg: #fcfdfd` (page) and
`--panel: #fdfefe` (cards). The card surface is a hair *lighter* than the page, so raised
surfaces don't lift — they disappear. Hairlines are `--line: #e6ecee` (barely visible).
Secondary/tertiary text (`--muted #5c6b70`, `--faint #74858a`) reads as "small light grey"
because it sits on near-white with weak separation. `--faint` on the page is ~3.5:1 contrast
— **below WCAG AA (4.5:1)** for the 12px mono captions it's used on.

**2. Content is swallowed on large desktops.** At a 1728px viewport the content column is
`max-w-[1180px]` sitting at `left: 267px` — **~548px of empty near-white gutter** with
nothing in it. The nav is full-bleed (wordmark hard against the true edge) while content
starts 267px in, so the chrome and the content float apart. Combined with #1, the column
looks marooned.

**3. Type is small for the canvas.** Body 16px, section body 15px, wall desc **13px**,
several mono labels **11–12.5px**, and section H2 a fixed **30px** that never grows. On a
1400px+ screen the only large element is the 84px hero H1; everything below feels
undersized.

**4. Headings are a serif the owner doesn't want.** Current display face is **Instrument
Serif** (roman 400) on H1/H2/H3. Owner wants **Plus Jakarta Sans** headings. (Owner said
"instead of jetpack" — JetBrains Mono; verified the actual heading font is Instrument Serif,
and JetBrains Mono is used only for micro-labels. Target is unambiguous: sans headings in
Plus Jakarta.)

**5. Search/social surface is nearly empty.** `public/` contains only `cv.pdf`. There is
**no** OpenGraph/Twitter metadata, no `metadataBase`, no canonical, no JSON-LD, no
`sitemap.xml`, no `robots.txt`, no OG share image. A job-hunt portfolio shared on LinkedIn
currently renders a bare link with no preview card.

**6. Minor UX correctness bug.** On the home Featured rows, "Mission to Abs" and "E-commerce
Store" render a **"Live demo" link pointing to `#`** (jumps to top / dead control). The
case-study template already filters `#` live links; the home rows don't. Fix for consistency.

---

## Design-contract overrides (do these deliberately, and document them)

DESIGN.md's "post-audit" section mandates the opposite of two changes here. These overrides
are the **owner's call** and are defensible; record the rationale in DESIGN.md so they stick.

- **Headings become Plus Jakarta Sans, not Instrument Serif.** DESIGN.md argues "Plus Jakarta
  for display *and* body is no pairing at all." The mitigation: this is **not** one
  undifferentiated family — display uses **700/800 weight + tight tracking (−0.02/−0.03em)**,
  body stays **400/500**. "Plus Jakarta Sans, single family, weight-differentiated" is a
  recognized professional pairing (ui-ux-pro-max typography DB, "Enterprise SaaS / geometric
  single family"). Keep JetBrains Mono for micro-labels — the mono is what still makes the
  type system distinctive, so the "Plus Jakarta + JetBrains" combo the audit disliked is
  offset by weight-driven display hierarchy and a tinted, layered surface system.
- **Light page background is tinted, not near-white.** DESIGN.md set `--bg #fcfdfd` /
  `--panel #fdfefe` on purpose. That is exactly what produces the washout. Cards must become
  the lightest surface; the page must recede.

Everything else in DESIGN.md stays (dark flagship/contact cards in both themes, no numbered
indices, no arrows-in-labels, Lucide icons only, mono labels stack above headings, edge-min
nav intent).

---

## Checkpoint map

| CP | Goal | Primary files |
|----|------|---------------|
| **CP1** | Light-theme surface + color + contrast rework (kills the washout) | `globals.css`, `DESIGN.md` |
| **CP2** | Typography: Plus Jakarta headings + fluid, larger type scale | `layout.tsx`, `globals.css`, all section components, case-study page, `DESIGN.md` |
| **CP3** | Large-screen layout: container, gutters, section rhythm, nav alignment | all section components, `nav.tsx`, case-study page, `DESIGN.md` |
| **CP4** | SEO + social: metadata, OG image, JSON-LD, sitemap, robots | `layout.tsx`, new `sitemap.ts`/`robots.ts`/`opengraph-image.tsx`, case-study page |

Build in order (CP1 is the foundation the others sit on). Each CP ends with
`npm run build` succeeding (static export) and a visual check in both themes.

---

## CP1 — Light-theme surface, color & contrast

**Goal:** Cards lift off a softly tinted page; borders read; text feels solid, not washed
out; every text/background pair clears WCAG AA. Dark theme is unchanged except where noted.

**File:** `src/app/globals.css` — the `:root` token block (lines ~9–30). Replace the light
values below. **Do not touch `.dark`** unless a pairing fails (it won't).

| Token | Before (light) | After (light) | Why |
|-------|----------------|---------------|-----|
| `--bg` | `#fcfdfd` | `#eef3f4` | Page recedes to a soft teal-grey "paper"; no longer near-white. |
| `--panel` | `#fdfefe` | `#ffffff` | Cards become the **lightest** surface → they lift off the page. |
| `--ink` | `#0e181b` | `#0c1518` | Marginally deeper headings. |
| `--body` | `#3d4f54` | `#2f4247` | Solid body text (≈9:1 on white). |
| `--muted` | `#5c6b70` | `#4c5b60` | Secondary text clears AA on both surfaces. |
| `--faint` | `#74858a` | `#5b686d` | Tertiary/mono captions now ≥4.5:1 even at 12px. |
| `--line` | `#e6ecee` | `#d4dee0` | Hairlines actually visible. |
| `--hover` | `#f4fafb` | `#e7f1f3` | Row/card hover reads as a tint on white cards. |
| `--chip` | `#dde5e7` | `#c9d5d8` | Chip/pill borders visible on white. |
| `--wipbg` | `#f2f9fb` | `#e6f2f5` | WIP strip separates from the new page bg. |
| `--accent` | `#0e7490` | `#0c6a82` | Deepen teal slightly so accent-colored text (links/badges) clears 4.5:1 on the tinted bg. Highlight `--hl` stays `#bdeef7`. |

Leave `--panel` usages as-is in components — they now resolve to white automatically.

**Add card elevation in light only.** Cards currently rely on borders alone; on a tinted
page they want a soft shadow. Add a token and apply it to the light-theme raised surfaces
(flagship + contact cards are dark-in-both and keep their own look — do **not** add this to
them). In `globals.css`:

```css
:root  { --shadow-card: 0 1px 2px rgba(12,20,22,.04), 0 10px 30px -18px rgba(12,20,22,.14); }
.dark  { --shadow-card: none; }
```
Expose it in `@theme inline` as `--shadow-card: var(--shadow-card);` then add
`shadow-[var(--shadow-card)]` to: the **wall** grid container (`wall.tsx`, the
`grid ... bg-line` wrapper) and the **featured-row screenshot tiles** + the wall cards read
fine from the grid shadow, so applying it to the outer wall grid and to the two featured
screenshot tiles is enough. Keep it subtle — this is lift, not a drop-shadow theme.

**Contrast acceptance (verify each, light theme):**
- `--body`, `--muted`, `--faint` on **both** `--bg` and `--panel` ≥ 4.5:1.
- `--accent` text on `--bg` and `--panel` ≥ 4.5:1 (deepened value handles this).
- `--line` against `--bg` visibly distinguishable (≥1.3:1 luminance separation).
- Dark theme re-checked once (should be untouched and already passing).

**Acceptance check:**
- Load light theme at 1728px: cards visibly sit **above** a tinted page; hairlines read; no
  element looks like it's floating on pure white.
- Toggle to dark: identical to before (no regressions).
- `npm run build` passes.

---

## CP2 — Typography: Plus Jakarta headings + fluid, larger type

**Goal:** All display headings render in **Plus Jakarta Sans** with weight-driven hierarchy,
and the whole type scale grows on large screens so nothing feels small. Instrument Serif is
removed entirely (one fewer font to load).

### 2a. Swap the display family

**`src/app/layout.tsx`:**
- Remove the `Instrument_Serif` import and its `const instrumentSerif = …` block.
- Remove `instrumentSerif.variable` from the `<html className={…}>` list.
- Keep `plusJakarta` and `jetbrainsMono`. Ensure Plus Jakarta loads weights up to 800 (it's
  a variable font via `next/font/google`, so 400–800 are available by default — no `weight`
  array needed).

**`src/app/globals.css`:**
- In `@theme inline`, change:
  `--font-display: var(--font-instrument-serif), Georgia, "Times New Roman", serif;`
  → `--font-display: var(--font-plus-jakarta), system-ui, sans-serif;`
- **Delete** the `.font-display { font-weight: 400; font-style: normal; }` guard block
  (lines ~80–85). It existed only to stop the serif being faux-bolded/italicised. Weight is
  now set per-heading via utilities.

After this, every existing `font-display` heading renders Plus Jakarta at its utility weight.

### 2b. Heading weights, sizes, tracking (fluid)

Apply per component. Weight utilities: `font-bold` = 700, `font-extrabold` = 800. All
headings keep `font-display` (now Plus Jakarta).

| Heading | File | Before | After |
|---------|------|--------|-------|
| Hero H1 | `hero.tsx` | `font-display text-[clamp(44px,7vw,84px)] leading-[1.04] tracking-[-0.02em]` | `font-display font-extrabold text-[clamp(42px,6vw,78px)] leading-[1.03] tracking-[-0.03em]` |
| Section H2 | `section-heading.tsx` | `font-display text-[30px] tracking-[-0.015em]` | `font-display font-bold text-[clamp(28px,3vw,40px)] tracking-[-0.02em]` |
| Flagship H3 | `featured.tsx` | `font-display text-[40px] tracking-[-0.015em]` | `font-display font-bold text-[clamp(30px,3vw,40px)] tracking-[-0.02em]` |
| Featured-row H3 | `featured.tsx` | `font-display text-[28px] tracking-[-0.015em]` | `font-display font-bold text-[clamp(22px,2vw,28px)] tracking-[-0.02em]` |
| Contact H2 | `contact.tsx` | `font-display text-[36px] … sm:text-[46px] tracking-[-0.02em]` | `font-display font-bold text-[clamp(30px,3.6vw,46px)] leading-[1.1] tracking-[-0.02em]` (drop the `sm:text-[46px]`) |
| Case-study H1 | `work/[slug]/page.tsx` | `font-display text-[clamp(40px,6.4vw,72px)] … tracking-[-0.02em]` | `font-display font-extrabold text-[clamp(38px,5.6vw,66px)] leading-[1.05] tracking-[-0.03em]` |

Case-study **block H2s** stay `font-mono text-[13px]` — they are labels, not display
headings (DESIGN.md, correct as-is). The hero highlight (`box-shadow` inset on
`headingHighlight`) is unaffected and still works under the sans face.

### 2c. Body/label scale bump (grows on large screens)

| Element | File | Before | After |
|---------|------|--------|-------|
| Hero eyebrow | `hero.tsx` | `text-[15px]` | `text-[clamp(15px,1.1vw,16.5px)]` |
| Hero sub | `hero.tsx` | `text-[17.5px] leading-[1.7]` | `text-[clamp(17px,1.3vw,20px)] leading-[1.65]` |
| Hero stat row | `hero.tsx` | `text-[12.5px]` | `text-[13px]` |
| Hero jump list | `hero.tsx` | `text-[13px]` | `text-[13.5px]` |
| Flagship blurb | `featured.tsx` | `text-[15.5px]` | `text-[clamp(15.5px,1.15vw,17px)]` |
| Featured-row blurb | `featured.tsx` | `text-[15px] leading-[1.65]` | `text-[clamp(15px,1.1vw,16.5px)] leading-[1.65]` |
| Wall sub | `wall.tsx` | `text-[14.5px]` | `text-[15px]` |
| Wall card name | `wall.tsx` | `text-[14.5px]` | `text-[15px]` |
| Wall card desc | `wall.tsx` | `text-[13px]` | `text-[13.5px]` |
| Wall card tags | `wall.tsx` | `font-mono text-[12px]` | `font-mono text-[12px]` (unchanged; now readable via `--faint` fix) |
| Experience role title | `experience.tsx` | `text-[17px]` | `text-[clamp(17px,1.3vw,19px)]` |
| Experience role desc | `experience.tsx` | `text-[14.5px]` | `text-[15px]` |
| Case-study tagline | `work/[slug]/page.tsx` | `text-[19px]` | `text-[clamp(18px,1.6vw,22px)]` |
| Case-study intro/body | `work/[slug]/page.tsx` | `text-[16px]` | `text-[clamp(16px,1.15vw,17.5px)]` |

Keep line-length in check: hero sub `max-w-[560px]`, case-study body `max-w-[640px]` — these
stay (they hold ~60–70 chars, the readable range). Do **not** widen text measures when the
container widens in CP3.

**Acceptance check:**
- Every H1/H2/H3 renders Plus Jakarta (inspect computed `font-family` — no "Instrument
  Serif" anywhere). Hero/case H1 visibly heavier (800) than section/card headings (700).
- At 1728px, section headings are clearly larger than at 1280px (fluid clamp working); at
  390px nothing is smaller than before.
- No synthetic-bold artifacts; `npm run build` passes; Instrument Serif no longer downloaded
  (check the built `out/` `_next/static/media` or Network panel).

---

## CP3 — Large-screen layout: container, gutters, rhythm, nav

**Goal:** On 1400px+ screens the content uses more of the canvas, the chrome aligns with the
content, and the tinted page (CP1) turns the former "void" into intentional margin.

### 3a. Responsive container

Every section repeats `mx-auto max-w-[1180px] … px-6 … sm:px-10`. Widen the column and
gutters at the largest breakpoint so content breathes instead of floating.

**Find/replace across** `hero.tsx`, `featured.tsx`, `wall.tsx`, `experience.tsx`,
`contact.tsx`, and the `<main>` in `work/[slug]/page.tsx`:
- `max-w-[1180px]` → `max-w-[1180px] 2xl:max-w-[1320px]`
- `px-6 … sm:px-10` → `px-6 sm:px-10 2xl:px-16`

(`2xl` = ≥1536px in Tailwind's default scale. This leaves ≤1536px screens exactly as-is and
only expands on genuinely large monitors, where the void was worst.)

### 3b. Nav alignment on large screens

The nav is intentionally edge-minimal (DESIGN.md N9) but full-bleed padding leaves the
wordmark ~350px from where content begins on a wide monitor. Keep the edge-min *intent* but
anchor the inner row to the same column so chrome and content line up.

**`src/components/nav.tsx`** — the inner `<div>`:
- Before: `flex items-center justify-between px-6 py-[22px] sm:px-10`
- After: `mx-auto flex w-full max-w-[1180px] 2xl:max-w-[1320px] items-center justify-between px-6 py-[22px] sm:px-10 2xl:px-16`

The header itself stays full-bleed (sticky, bottom border spans the viewport) — only its
*contents* align to the content column. Apply the identical change to the case-study header
inner `<div>` in `work/[slug]/page.tsx`. **Update DESIGN.md's Nav note** to record that the
bar is full-bleed but its contents are container-aligned (this is a refinement of N9, not a
return to the banned centered-links nav — do not add links).

### 3c. Section vertical rhythm on large screens

DESIGN.md's varied rhythm (featured ~88, wall ~58, experience ~70, hero 96/84) is good and
stays at small/medium widths. Let the biggest sections gain a little air on large screens
only, so tall monitors don't feel cramped under the now-larger headings:
- Featured section: `py-[88px]` → `py-[88px] 2xl:py-[112px]`
- Hero: `pt-24 … pb-[84px]` (sm) → add `2xl:pt-32 2xl:pb-[104px]`
- Leave wall/experience/contact rhythm as-is (the wall is meant to feel tight).

Keep `scroll-mt-6` anchors. Do not touch mobile paddings.

### 3d. Wall grid on very wide screens (optional, low-risk)

At `2xl` the 3-col wall cards get wide. Optional: allow a 4th column so cards stay compact
and the "wall of builds" reads denser. In `wall.tsx` grid:
- `sm:grid-cols-2 lg:grid-cols-3` → `sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4`

Only 6 builds today, so this yields 4+2; acceptable. Skip if it looks unbalanced with 6
items — judgment call, note the decision.

**Acceptance check:**
- At 1728px: content column is ~1320px wide, side gutters roughly halved vs before, and the
  wordmark/CV button sit directly above the content's left/right edges.
- At 1280px and 1024px: layout is pixel-identical to pre-change (only `2xl` was added).
- At 768px and 390px: unchanged; no horizontal scroll.
- `npm run build` passes.

---

## CP4 — SEO, social cards & discoverability

**Goal:** Sharing the site (LinkedIn/Slack/iMessage) shows a branded preview card; search
engines get a sitemap, robots, canonical, and a Person knowledge-graph entity for
"Mohammed Juber Ahmed". All build-time/static (compatible with `output: 'export'`).

### 4a. Root metadata — `src/app/layout.tsx`

Replace the current `metadata` (title + description only) with the full object below. Keep
the existing title/description strings.

```ts
export const metadata: Metadata = {
  metadataBase: new URL("https://juberahmed.dev"),
  title: {
    default: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    template: "%s · Mohammed Juber Ahmed",
  },
  description:
    "Frontend developer in Birmingham, UK. 3+ years shipping and A/B-testing Wolseley's high-traffic B2B e-commerce frontend, plus live self-built products — including an AI-powered Android translator with its own Cloudflare Workers API.",
  alternates: { canonical: "/" },
  authors: [{ name: "Mohammed Juber Ahmed", url: "https://juberahmed.dev" }],
  creator: "Mohammed Juber Ahmed",
  keywords: [
    "Mohammed Juber Ahmed", "frontend developer", "Birmingham", "React", "Next.js",
    "TypeScript", "e-commerce frontend", "A/B testing", "Cloudflare",
  ],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://juberahmed.dev/",
    siteName: "Mohammed Juber Ahmed",
    title: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    description:
      "Frontend developer shipping a high-traffic B2B e-commerce frontend at Wolseley — plus live self-built products in AI, health, and language.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammed Juber Ahmed — Frontend Developer, Birmingham",
    description:
      "Frontend developer shipping a high-traffic B2B e-commerce frontend — plus live self-built products in AI, health, and language.",
  },
  robots: { index: true, follow: true },
};
```

Because `metadataBase` is set, a repo OG image is auto-referenced by both `openGraph` and
`twitter` — see 4b. The case-study `generateMetadata` already sets per-page title/desc; the
`title.template` above will suffix the site name, and case pages inherit the root OG image.
(Optionally add a per-case `openGraph.description` = `study.tagline` in that function.)

### 4b. OG share image — `src/app/opengraph-image.tsx`

Add a build-time OG image (1200×630) so shares render a card instead of a bare link. This
route is rendered to a static PNG during `next build` (works under static export). Match the
dark flagship look.

```tsx
import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", background: "#0b1418", color: "#f2f7f8",
        padding: "72px 80px", fontFamily: "sans-serif",
      }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 1, color: "#22c8e0" }}>
          juberahmed.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Mohammed Juber Ahmed
          </div>
          <div style={{ fontSize: 34, color: "#b8c8cd" }}>
            Frontend developer who ships real products — Birmingham, UK
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#7e959c" }}>
          React · Next.js · TypeScript · Cloudflare Workers
        </div>
      </div>
    ),
    { ...size }
  );
}
```

The default ImageResponse font is fine for MVP. (If you later want Plus Jakarta in the card,
`fetch` the .ttf at build and pass it via the `fonts` option — not required now.)

**Static-export gotcha:** confirm the image emits into `out/` after `next build` (look for an
`opengraph-image` PNG and the injected `<meta property="og:image">` in `out/index.html`). If
the ImageResponse route ever fails under export, fall back to a hand-made `public/og.png`
(1200×630) referenced explicitly via `openGraph.images: ["/og.png"]` and
`twitter.images: ["/og.png"]`.

### 4c. Structured data (JSON-LD Person) — `src/app/layout.tsx`

Add a Person entity so search engines associate the site with the named individual. Render a
plain script in `<body>` (static, no client JS):

```tsx
const personLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Mohammed Juber Ahmed",
  url: "https://juberahmed.dev",
  jobTitle: "Frontend Developer",
  email: "mailto:mohammed.juber.ahmed@gmail.com",
  address: { "@type": "PostalAddress", addressLocality: "Birmingham", addressCountry: "GB" },
  worksFor: { "@type": "Organization", name: "Wolseley" },
  knowsAbout: ["Frontend development", "React", "Next.js", "TypeScript", "E-commerce", "A/B testing", "Cloudflare Workers"],
  sameAs: [
    "https://github.com/Juber-Ahmed98",
    "https://www.linkedin.com/in/mohammed-juber-ahmed/",
  ],
};
```
…and just inside `<body>`:
```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
/>
```
(Optional, later: add `SoftwareApplication`/`CreativeWork` JSON-LD per case study for Jembatan
et al. Not needed for MVP.)

### 4d. Sitemap — `src/app/sitemap.ts`

```ts
import type { MetadataRoute } from "next";

const base = "https://juberahmed.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work/jembatan/", "/work/mission-to-abs/", "/work/ecommerce-store/"];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
```
Trailing slashes match `trailingSlash: true`. Keep this list in sync with
`caseStudyOrder` in `src/content/site.ts` if slugs change.

### 4e. Robots — `src/app/robots.ts`

```ts
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://juberahmed.dev/sitemap.xml",
    host: "juberahmed.dev",
  };
}
```

### 4f. Fix the dead "Live demo" links (UX correctness)

In `src/components/featured.tsx`, the featured-row `links.map(...)` renders every link
including `live` links whose `href` is `#`. Filter them out the same way the case-study
template does, so no button jumps to top:
- Before mapping, drop live links that aren't public:
  `project.links.filter((l) => !(l.kind === "live" && l.href === "#"))`
- (The flagship card's live link is a real URL, so it's unaffected.)

When the Mission-to-Abs / E-commerce demos are actually deployed, set their real URLs in
`site.ts` and the buttons reappear automatically.

**Acceptance check (CP4):**
- `npm run build` produces `out/sitemap.xml`, `out/robots.txt`, an OG PNG, and
  `out/index.html` contains `og:image`, `og:title`, `twitter:card`, `<link rel="canonical">`,
  and the JSON-LD script.
- Paste `https://juberahmed.dev` into the LinkedIn Post Inspector / a Slack message (after
  deploy) → a branded card renders. Locally, validate the built `index.html` meta tags and
  run the JSON-LD through Google's Rich Results test (paste the JSON).
- No home button links to `#`; every visible "Live demo" goes to a real URL.

---

## Cross-cutting verification (run after each CP and at the end)

1. `npm run build` — static export must succeed with zero errors (no SSR/server-action
   regressions).
2. **Both themes, three widths:** 390px, 1280px, 1728px. Light theme: cards lift, text
   solid, no white void. Dark theme: unchanged from today.
3. **Contrast:** spot-check `--faint`/`--muted`/`--accent` text on `--bg` and `--panel` at
   ≥4.5:1 (light).
4. **Fonts:** no "Instrument Serif" in any computed `font-family`; headings are Plus Jakarta,
   labels are JetBrains Mono.
5. **Reduced motion / keyboard:** focus ring still visible; hover-lift still disabled under
   `prefers-reduced-motion` (both already handled in `globals.css` — don't break them).
6. **No horizontal scroll** at any width.
7. Update `DESIGN.md` (color table, typography section, layout/nav notes) and tick relevant
   items so the contract matches the built site.

## Out of scope (note for later, don't do here)
- Real project screenshots (placeholder tiles stay until captured; add `alt` text then).
- Deploying the Mission-to-Abs / E-commerce live demos (owner action; unblocks 4f buttons).
- framer-motion polish pass (planned separately in the roadmap).
