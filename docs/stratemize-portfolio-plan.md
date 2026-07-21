# CP11 · Stratemize (client work)

Add the Stratemize client project to juberahmed.dev: a featured row at `/02` (above the
personal work), a wall entry, and a full case study at `/work/stratemize/`.

**Decisions locked (2026-07-15):**
- Client has agreed to be named and linked. Live link is real, screenshots allowed.
- Framing: **platform migration story.** Lead on the engineering (Manus → Cloudflare,
  Express → Worker, MySQL → D1, Forge → Resend), not on "I built a marketing site".
- Placement: featured `/02`. Jembatan stays flagship. Mission to Abs → `/03`, E-commerce → `/04`.
- Repo is **private**. No "Code ↗" link anywhere. The live site carries the proof instead.

---

## Why this project changes the site

Every current project says "I build things for myself." Stratemize is the only one that says
**someone hired me and it's in production**. It's also the only piece of evidence that backs the
brief's weakest claim: `CLAUDE.md` currently frames full-stack as *"currently building"* to avoid
overclaiming. A shipped Cloudflare migration with a production D1, a verified sending domain, and a
custom domain isn't "currently building" any more. The brief should be updated to say so.

The honesty rule from `CLAUDE.md` ("nothing to get caught out on in interview") is exactly why the
migration framing is the right one. You didn't write the first version of this site, and a case
study that implies you did would collapse under one interview question. What you actually did is
the more employable story anyway: you took a codebase welded to a vendor's platform and made it
something the client owns, hosts, and can leave. That's the work a company pays a mid-level dev to do.

---

## The one thing to be careful about

Do not let any sentence imply you designed and built Stratemize from a blank page. The case study
should name the inherited base in the **intro**, not bury it in block 6. Suggested phrasing is
already in the draft copy below: *"It came to me as a working site with a catch."* That sentence
does all the honesty work up front and then lets the rest of the study be about your engineering.

---

## Content changes — `src/content/site.ts`

All of it is data. Only one component change is needed (the featured badge, below).

### New featured project — insert at the TOP of the `featured` array

```ts
{
  index: "/02",
  badge: "client work",              // requires the featured.tsx change below
  name: "Stratemize",
  slug: "stratemize",
  blurb:
    "My first client project. A live marketing site that was locked to the platform that generated it, rebuilt on Cloudflare Workers and D1 and shipped to the client's own domain.",
  stack: "cloudflare-workers · d1 · trpc · react",
  links: [
    { label: "Live demo ↗", href: "https://stratemize.co.uk/", external: true },
    { label: "Case study →", href: "/work/stratemize/" },
    // No code link: private client repo.
  ],
  screenshotLabel: "stratemize.co.uk",
},
```

Then renumber the existing two: Mission to Abs `/02` → `/03`, E-commerce `/03` → `/04`.

### Wall entry — insert as the SECOND item in `wall`

The wall's `link` is a plain external anchor, so a live-site URL works with no type change.
Every other entry points at GitHub; this one points at the live site because the repo is private.

```ts
{
  name: "stratemize",
  badge: "live ↗",
  live: true,
  desc: "Client marketing site: ported off a vendor platform onto Workers + D1",
  tags: "workers · d1 · trpc",
  link: "https://stratemize.co.uk/",
},
```

### Counts and copy that go stale the moment you add a 7th build

| Where | Now | Change to |
|---|---|---|
| `hero.stats[1]` | `{ value: "6", label: "builds on the wall" }` | `value: "7"` |
| `sections.wall.title` | `"The wall: 6 builds and counting"` | `"The wall: 7 builds and counting"` |
| `caseStudyOrder` | `["jembatan", "mission-to-abs", "ecommerce-store"]` | `["jembatan", "stratemize", "mission-to-abs", "ecommerce-store"]` |

`hero.stats` renders by default (`showStats = true` in `hero.tsx`), so the "6" is live on the page.

**Consider a third stat swap.** The current stats are `3+ yrs shipping at scale` /
`6 builds on the wall` / `1 API in production`. "1 client shipped" is a stronger third stat than
"1 API in production" for a hiring manager, and the API still gets its due on the flagship card.
Your call. If you take it: `{ value: "1", label: "site shipped for a client" }`.

### Hero sub — currently excludes client work by construction

```
"Three years shipping Wolseley's high-traffic B2B e-commerce frontend by day. On my own time I
 build and ship my own products, including a live AI translation keyboard with its own API."
```

"my own products" is now literally untrue of the work you most want read. Suggested rewrite:

```ts
sub: "Three years shipping Wolseley's high-traffic B2B e-commerce frontend by day. On my own time I build and ship products, including a live AI translation keyboard with its own API, and a client's site I moved onto Cloudflare and took live.",
```

### Contact heading — no change, just noticing

`"Next on the wall: your product."` was aspirational when it was written. It now has a precedent
sitting three sections above it. Leave it.

---

## Component change — `src/components/featured.tsx`

The featured rows have no badge; only the flagship does. "client work" is the single most valuable
word on this card, so it needs to be visible without reading the blurb.

- Add `badge?: string` to the `FeaturedProject` type in `site.ts`.
- In the row, render it next to the mono index. The flagship's badge (`featured.tsx:64`) is the
  pattern to copy, using tokens instead of the flagship's hardcoded dark hexes:

```tsx
<span className="font-mono text-[14px] text-muted">{project.index}</span>
{project.badge && (
  <span className="rounded-[4px] bg-hover px-[9px] py-[3px] font-mono text-[11px] text-accent">
    {project.badge}
  </span>
)}
```

Note the row grid is `md:grid-cols-[60px_1.1fr_420px]` and the index sits in that 60px column, so
the badge likely wants to go above the `<h3>` inside the middle column rather than beside the index.
Check it at 1280px and 375px before committing.

`ProjectLink` already handles a links array of any length, and the `isCode` branch is styling only,
so **dropping the code link needs no component change**.

---

## Case study — draft copy for `caseStudies.stratemize`

Voice matched to the existing three: mono lowercase block headings, no em-dashes (your copy pass
stripped them from both repos), no intensifiers, concrete numbers where they exist.

```ts
stratemize: {
  slug: "stratemize",
  eyebrow: "case study · client work",
  name: "Stratemize",
  tagline: "A client's marketing site, moved off a vendor platform and onto Cloudflare.",
  intro:
    "Stratemize is the live site for a UK marketing consultant, and my first client project. It came to me as a working site with a catch: it had been generated on Manus, and everything holding it up was Manus's. Their email API, their file storage, their auth, a MySQL database and a long-running Express server. The client could look at it but couldn't own it, host it, or leave. So I rebuilt the runtime underneath it while keeping the product intact: Express became a Cloudflare Worker, MySQL became D1, their email service became Resend, and the site went live on the client's own domain and their own Cloudflare account.",
  stack: "cloudflare-workers · d1 · trpc · react",
  stackChips: [
    "Cloudflare Workers",
    "Cloudflare D1",
    "tRPC",
    "Drizzle ORM",
    "React 19",
    "TypeScript",
    "Tailwind v4",
    "Resend",
  ],
  blocks: [
    {
      heading: "what I inherited",
      body: [
        "About 15,000 lines of working React that was structurally a hostage. Four separate Manus platform services were load-bearing: their email API sent the lead magnet, their notification API pinged the owner on every form submit, their storage served a single PDF, and their OAuth was wired through the client and the server. Underneath it sat MySQL and an Express process that expected to run forever on a box someone had to pay for.",
        "The first useful thing I did was read it properly rather than start typing. The OAuth turned out to be dead: no page and no procedure ever required a login. A pile of template scaffolding (an LLM client, image generation, a map, voice transcription, an AI chat box) was imported by nothing at all. A meaningful part of the migration was work that didn't need doing.",
      ],
    },
    {
      heading: "salvage, don't rebuild",
      body: [
        "The tempting move was a rewrite. It was the wrong one. The client's actual product was the copy, the design, and seven tRPC procedures that validate a form, write a row, and email the owner. None of that logic cared what it ran on. Only the layer beneath it was the problem, so only that layer got replaced.",
        "I wrote the target architecture and a decisions log before changing a line, then worked in checkpoints with one rule: every checkpoint ends buildable and committed. If a change would leave the site broken halfway, it belonged inside one checkpoint rather than split across two. That constraint is what let me do this in evenings around a full-time job and pick it up cold a week later.",
      ],
    },
    {
      heading: "prune first",
      body: [
        "Deletion came before porting, because every dead file is a file you might otherwise migrate. Out went the unused auth, the untouched template services, the Manus dev tooling and runtime plugins, and the analytics script. It was almost pure subtraction, which meant near-zero risk and a much smaller surface to move.",
        "Then the brand rename, with one rule: every user-facing URL routes through a single SITE constant. The site had no domain yet at that point. When the domain arrived, it was a one-line change instead of another sweep.",
      ],
    },
    {
      heading: "the runtime",
      body: [
        "Express came out and a single Cloudflare Worker went in. The SPA is served through Workers Static Assets, and the API moved from tRPC's Express adapter to its fetch adapter, so the routers themselves were untouched. Request context stopped carrying Express req/res and cookies and started carrying the D1 binding.",
        "The PDF was the neatest cut. It sat behind Manus storage and a proxy route, so an object store and a set of AWS SDK dependencies existed to serve one file that never changes. It became a static asset. The storage layer, the proxy, and the SDK all left with it.",
      ],
    },
    {
      heading: "the database",
      body: [
        "MySQL to Cloudflare D1, which is SQLite. Drizzle absorbed most of the difference but not all: mysql-core became sqlite-core, varchar became text, autoincrement changed shape, timestamps and booleans became integers with a mode, and enums became text. Upserts changed from onDuplicateKeyUpdate to onConflictDoUpdate.",
        "The real shift is how you get the handle. There's no connection string and no pool. The database arrives as a binding on the Worker's env, which is what makes it work at the edge and what makes it cost nothing at this traffic. The site was pre-launch, so there was no data to migrate. Migrations regenerate for SQLite and apply to local and production D1 through wrangler.",
      ],
    },
    {
      heading: "email and go-live",
      body: [
        "The forms are the entire point of a lead-gen site, so email had to survive the move exactly. I kept the sendEmail signature identical and swapped what happened inside it, so not one caller in the routers changed. Resend replaced both the Forge email API and the owner-notification API, since a notification is just an email to the owner.",
        "Going live was the part with no undo. Production D1 created and migrated, secrets set through wrangler rather than committed, the site deployed, then stratemize.co.uk and www attached as custom domains. Sending needed SPF and DKIM verified on a send subdomain so the client's mail wouldn't land in spam, and because Resend only sends, inbound mail to contact@stratemize.co.uk runs through Cloudflare Email Routing to the client's inbox. Every form was smoke-tested against production, and the test rows were deleted afterwards.",
      ],
    },
    {
      heading: "then the frontend it deserved",
      body: [
        "With the migration done, the site still read like something generated: uppercase kicker eyebrows above every section, enormous vertical gaps, a process section that rendered at half width on mobile, repeated icons, and no favicon, sitemap, or per-route meta. So I did a UX and SEO pass and measured it rather than eyeballing it. The home page went from a target of 6,300px to 5,318px at desktop and 7,155px at 375px, with no horizontal scroll at any breakpoint and a 44px minimum touch target on the menu.",
        "The SEO foundation went in underneath: real favicon and icons, robots.txt, a generated sitemap that excludes drafts, canonical URLs and per-route titles, and JSON-LD for the business, the FAQ, and each blog post. Then a copy pass to strip the AI tells, em-dashes, intensifiers, and the 'not X, but Y' constructions, leaving exactly one where it earned its place.",
      ],
    },
    {
      heading: "what shipped",
      body: [
        "stratemize.co.uk is live on the client's own Cloudflare account, on the free plan, with a production D1 behind the forms and branded email going out through a verified domain. There is no vendor left in the stack that they can't walk away from, and no server for them to pay for or patch.",
        "The lesson I'll carry into the next one is that the hardest parts weren't the ports. Drizzle and tRPC made those close to mechanical. It was deciding what not to rebuild, keeping every checkpoint shippable, and asking before touching production.",
      ],
    },
  ],
  screenshots: [
    "stratemize.co.uk home",
    "services & process",
    "consultation booking form",
    "blog post",
  ],
  links: [
    { label: "Live demo ↗", href: "https://stratemize.co.uk/", external: true },
    // Private client repo: no code link.
  ],
},
```

Eight blocks is Jembatan-depth. If it reads long next to Mission to Abs (five), the first two
blocks merge cleanly into one called "what I inherited".

---

## Explaining the private repo

Every other item on the site links to code, and this one won't. That silence is louder than you'd
think for a reviewer who wants to see how you work. Two options, both cheap:

- **Say nothing.** The live site plus a specific case study is decent evidence on its own.
- **One line in the case study.** Something like *"The repo is the client's and stays private, so
  this write-up is the code tour."* It converts an absent button into a professional signal.

Recommend the second option, appended to the intro or the final block.

---

## Screenshots

Follow the repo convention: **placeholder tiles now, real captures at CP8** along with everything
else. Don't ship one card with real images while five others show diagonal stripes.

When CP8 comes, this one is the easiest of the four: the stratemize repo has a `screenshots` skill
whose whole job is capturing portfolio screenshots, and `.claude/launch.json` already defines a
`wrangler-dev` config to run the site locally.

---

## Docs to update

- **`ROADMAP.md`** — add this as CP11 under a new "Milestone 4 · Client work", and bump the
  progress tracker table at the bottom. CP8/CP9/CP10 stay as they are.
- **`CLAUDE.md`** — the brief is the stated source of truth and is now out of date in two places:
  the featured list (under "Content") needs Stratemize as #2, and the positioning section still
  hedges full-stack as *"currently building"*. A shipped client migration retires that hedge.

---

## Order of work

- `site.ts`: featured entry, wall entry, `caseStudyOrder`, the counts, the hero sub.
- `featured.tsx`: optional badge, checked at 1280px and 375px.
- `site.ts`: the `caseStudies.stratemize` block.
- Verify: `/` renders 7 wall cards and the /02 row, `/work/stratemize/` builds
  (`dynamicParams = false`, so a missing `caseStudyOrder` entry is a build-time 404), no code link
  renders anywhere, live link opens in a new tab.
- `ROADMAP.md` + `CLAUDE.md`.
- Build, deploy, commit.
